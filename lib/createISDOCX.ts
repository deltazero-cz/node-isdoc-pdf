import Invoice, { InvoiceType } from '@deltazero/isdoc'
import Zip from 'jszip'
import { hasISDOC } from './extractISDOC'

export default async function createISDOCX(
    pdf: Buffer,
    isdoc: string|Buffer|Invoice|InvoiceType,
    name ?: string
) {
  // noinspection SuspiciousTypeOfGuard
  if (!(pdf instanceof Buffer))
    throw new Error('createISDOCX: PDF Is Not an Instance of Buffer')

  if (await hasISDOC(pdf))
    throw new Error('createISDOCX: This PDF Already Has an ISDOC Attachment')

  if (!(isdoc instanceof Invoice))
    isdoc = new Invoice(isdoc)

  name ??= isdoc.ID?.replace(/[^\w.-]/gi, '_')
  if (!name)
    throw new Error('createISDOCX: File Name Is Not Set')

  const zip = new Zip()
  zip.file(name + '.pdf', pdf)
  zip.file(name + '.isdoc', isdoc.toXML())
  zip.file('manifest.xml', createManifest(name))

  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
}

export const createManifest = (name: string) : string =>
`<?xml version="1.0"?>
<manifest xmlns="http://isdoc.cz/namespace/2013/manifest">
  <maindocument filename="${name}.isdoc"/>
</manifest>
`
