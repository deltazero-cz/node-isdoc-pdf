import {
  PDFDocument,
  PDFName,
  PDFDict,
  PDFArray,
  PDFHexString,
  PDFString,
  PDFStream,
  decodePDFRawStream,
  PDFRawStream,
} from 'pdf-lib'

export const PDFExtractAttachments = (pdfDoc: PDFDocument) => {
  const rawAttachments = PDFExtractRawAttachments(pdfDoc)
  return rawAttachments.map(({ fileName, fileSpec }) => {
    const stream = fileSpec
        .lookup(PDFName.of('EF'), PDFDict)
        .lookup(PDFName.of('F'), PDFStream) as PDFRawStream
    return {
      name: fileName.decodeText(),
      data: decodePDFRawStream(stream).decode(),
    }
  })
}

export const PDFExtractRawAttachments = (pdfDoc: PDFDocument) => {
  if (!pdfDoc.catalog.has(PDFName.of('Names'))) return []
  const Names = pdfDoc.catalog.lookup(PDFName.of('Names'), PDFDict)

  if (!Names.has(PDFName.of('EmbeddedFiles'))) return []
  let EmbeddedFiles = Names.lookup(PDFName.of('EmbeddedFiles'), PDFDict)

  if (!EmbeddedFiles.has(PDFName.of('Names')) && EmbeddedFiles.has(PDFName.of('Kids')))
    EmbeddedFiles = EmbeddedFiles.lookup(PDFName.of('Kids'), PDFArray).lookup(0) as PDFDict

  if (!EmbeddedFiles.has(PDFName.of('Names'))) return []
  const EFNames = EmbeddedFiles.lookup(PDFName.of('Names'), PDFArray)

  const rawAttachments = []
  for (let idx = 0, len = EFNames.size(); idx < len; idx += 2) {
    const fileName = EFNames.lookup(idx) as PDFHexString | PDFString
    const fileSpec = EFNames.lookup(idx + 1, PDFDict)
    rawAttachments.push({ fileName, fileSpec })
  }

  return rawAttachments
}
