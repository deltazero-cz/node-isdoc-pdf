# ISDOC-PDF Node.js library

[ISDOC](https://isdoc.github.io/) is an XML Invoicing Standard for the Czech Republic.

This library can:
- extract ISDOC invoices from PDFs
- create ISDOC.PDF (PDF/A-3B with ISDOC attached)
- create IDDOCX archives (zips with PDF and ISDOC)

It also provides Node.js API for ISDOC format, see [node-isdoc](https://github.com/deltazero-cz/node-isdoc),
incl. XSD xchema validation.

### Installation

```shell
npm i isdoc-pdf
```

To create ISDOC.PDF (PDF/A-3B with ISDOC attached),
this package depends on Bash-like shell and Ghostscript,
see [isdoc-pdf (bash)](https://github.com/deltazero-cz/isdoc-pdf).

### Usage

Extract ISDOC from existing PDF

```js
import { hasISDOC, extractISDOC } from 'isdoc-pdf'

const plainInvoice = await fs.readFile('invoice.pdf'),
      isdocInvoice = await fs.readFile('invoice.isdoc.pdf')

await hasISDOC(plainInvoice)
// -> false

await hasISDOC(isdocInvoice)
// -> true

await extractISDOC(plainInvoice)
// -> null 

await extractISDOC(isdocInvoice)
// -> Invoice { DocumentType: number, ID: string, IssueDate: Date, ... }
```

Create ISDOC.PDF (attach ISDOC to PDF and convert into PDF/A-3)

```js
import { attachISDOC } from 'isdoc-pdf'

const invoice = await fs.readFile('invoice.pdf'),
      isdoc = await fs.readFile('invoice.isdoc')

const pdfa = await attachISDOC(invoice, isdoc)
// -> Buffer with PDF/A-3
```

Create ISDOC.PDF with a new Invoice

```js
import { Invoice, attachISDOC } from 'isdoc-pdf'

const isdoc = new Invoice({
  DocumentType: 1,
  ID: '2022123456',
  ... // see https://github.com/deltazero-cz/node-isdoc
})

const pdf = await fs.readFile('invoice.pdf')

const pdfa = await attachISDOC(pdf, isdoc)
// -> Buffer with PDF/A-3
```

Create IDDOCX archives (ZIP archives with PDF and ISDOC)

```js
import { createISDOCX } from 'isdoc-pdf'

const invoice = await fs.readFile('invoice.pdf'),
      isdoc = await fs.readFile('invoice.isdoc')

const isdocx = await createISDOCX(invoice, invoice)
// -> Buffer with ISDOCX (ZIP archive)
```

Create IDDOCX with a new Invoice

```js
import { Invoice, createISDOCX } from 'isdoc-pdf'

const isdoc = new Invoice({
  DocumentType: 1,
  ID: '2022123456',
  ... // see https://github.com/deltazero-cz/node-isdoc
})

const pdf = await fs.readFile('invoice.pdf')

const isdocx = await createISDOCX(pdf, isdoc)
// -> Buffer with ISDOCX (ZIP archive)
```
