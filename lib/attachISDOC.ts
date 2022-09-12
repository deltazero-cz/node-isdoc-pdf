import Invoice, {InvoiceType} from '@deltazero/isdoc'
import { PDFDocument } from 'pdf-lib'
import { hasISDOC } from './extractISDOC'
import { readFile, writeFile, stat, unlink } from 'fs/promises'
import { exec } from 'child_process'

export default async function attachISDOC(
    pdf: Buffer|PDFDocument,
    isdoc: string|Buffer|Invoice|InvoiceType
) : Promise<Buffer> {
  if (await hasISDOC(pdf))
    throw new Error('attachISDOC: This PDF Already Has an ISDOC Attachment')

  if (!(isdoc instanceof Invoice))
    isdoc = new Invoice(isdoc)

  if (pdf instanceof PDFDocument)
    pdf = Buffer.from(await pdf.save())

  const bin = __dirname + '/../node_modules/isdoc-pdf-bash/isdoc-pdf'
  await stat(bin)
    .catch(() => { throw new Error('attachISDOC: Cannot find [isdoc-pdf] executable') })

  const [[ inpdf ], [ inisdoc ], [ outpdf ]] = await Promise.all([ execute('mktemp'), execute('mktemp'), execute('mktemp') ])
  await Promise.all([
      writeFile(inpdf, pdf),
      writeFile(inisdoc, isdoc.toXML())
  ])

  await execute(`${bin} ${inpdf} ${inisdoc} ${outpdf}`)
  const result = await readFile(outpdf)

  // clean up
  await Promise.all([ unlink(inpdf), unlink(inisdoc), unlink(outpdf) ])

  return result
}

const execute = async (cmd: string, options: any = {}) : Promise<[string, string?]> =>
    new Promise((resolve, reject) =>
      exec(cmd, options, (e, stdout, stderr) => {
        if (e) return reject(e)
        resolve([stdout.toString().trim(), stderr?.toString().trim()])
      })
    )
