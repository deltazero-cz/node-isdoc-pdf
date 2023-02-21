import PDFDocument from 'pdf-lib/cjs/api/PDFDocument'
import { PDFExtractAttachments } from './PDFAttachments'
import Invoice from '@deltazero/isdoc'

export default async function extractISDOC(pdf: Buffer|PDFDocument) : Promise<Invoice|null> {
  const document = !(pdf instanceof PDFDocument)
      ? await PDFDocument.load(pdf)
      : pdf

  const isdoc = PDFExtractAttachments(document)
      .find(r => r.name.match(/isdoc$/))
  if (!isdoc) return null

  return new Invoice(Buffer.from(isdoc.data))
}

export const hasISDOC = async (pdf: Buffer|PDFDocument) : Promise<boolean> => {
  const document = !(pdf instanceof PDFDocument)
      ? await PDFDocument.load(pdf)
      : pdf

  return !! PDFExtractAttachments(document).find(r => r.name.match(/isdoc$/))
}
