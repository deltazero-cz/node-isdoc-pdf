import { Invoice, InvoiceType, attachISDOC, extractISDOC, hasISDOC } from '..'
import { readFileSync, writeFileSync } from 'fs'
import { before } from 'mocha'
import { expect } from 'chai'
import createISDOCX from '../lib/createISDOCX'
import Zip from 'jszip'

const test0 = readFileSync(__dirname + '/test000.pdf'),
      test1 = readFileSync(__dirname + '/test001.isdoc.pdf'),
      test2 = readFileSync(__dirname + '/test002.isdoc.pdf'),
      invoice = readFileSync(__dirname + '/invoice.isdoc'),
      template = {
        DocumentType: 'invoice',
        ID: 1,
        IssuingSystem: 'ΔO Delta Zero',
        IssueDate: new Date(),
        TaxPointDate: new Date(),
        VATApplicable: true,
        AccountingSupplierParty: {
          Party: {
            PartyIdentification: {ID: '12345678'},
            PartyName: {Name: 'Test s.r.o.'},
            PostalAddress: {
              StreetName: 'Dodavatelská',
              BuildingNumber: '1',
              CityName: 'Dodavatelov',
              PostalZone: '12345',
              Country: {IdentificationCode: 'CZ', Name: ''}
            },
            PartyTaxScheme: {
              CompanyID: 'CZ12345678',
              TaxScheme: 'VAT'
            },
            Contact: {
              Telephone: '222111000',
              ElectronicMail: 'dodavatel@posta.cz'
            }
          }
        },
        AccountingCustomerParty: {
          Party: {
            PartyIdentification: {ID: '12345678'},
            PartyName: {Name: 'Test s.r.o.'},
            PostalAddress: {
              StreetName: 'Dodavatelská',
              BuildingNumber: '1',
              CityName: 'Dodavatelov',
              PostalZone: '12345',
              Country: {IdentificationCode: 'CZ', Name: ''}
            },
            PartyTaxScheme: {
              CompanyID: 'CZ12345678',
              TaxScheme: 'VAT'
            },
            Contact: {
              Telephone: '222111000',
              ElectronicMail: 'dodavatel@posta.cz'
            }
          }
        },
        InvoiceLines: {
          InvoiceLine: [
            {
              ID: '10001',
              InvoicedQuantity: 1,
              LineExtensionAmount: 100,
              LineExtensionAmountTaxInclusive: 121,
              LineExtensionTaxAmount: 21,
              UnitPrice: 100,
              UnitPriceTaxInclusive: 121,
              ClassifiedTaxCategory: {Percent: 21, VATCalculationMethod: 0, VATApplicable: true},
              Item: {Description: 'Zboží 10001'}
            },
          ]
        },
        TaxTotal: {
          TaxSubTotal: {
            TaxableAmount: 100,
            TaxAmount: 21,
            TaxInclusiveAmount: 121,
            AlreadyClaimedTaxableAmount: 0,
            AlreadyClaimedTaxAmount: 0,
            AlreadyClaimedTaxInclusiveAmount: 0,
            DifferenceTaxableAmount: 100,
            DifferenceTaxAmount: 21,
            DifferenceTaxInclusiveAmount: 121,
            TaxCategory: {
              Percent: 21,
              VATApplicable: true,
            }
          },
          TaxAmount: 21
        },
        LegalMonetaryTotal: {
          TaxExclusiveAmount: 5500,
          TaxInclusiveAmount: 6655,
          AlreadyClaimedTaxExclusiveAmount: 0,
          AlreadyClaimedTaxInclusiveAmount: 0,
          DifferenceTaxExclusiveAmount: 5500,
          DifferenceTaxInclusiveAmount: 6655,
          PayableRoundingAmount: 0,
          PaidDepositsAmount: 0,
          PayableAmount: 6655
        },
        PaymentMeans: {
          Payment: {
            PaidAmount: 6655,
            PaymentMeansCode: 42,
            Details: {
              PaymentDueDate: new Date(),
              ID: 1234567890,
              BankCode: 1234,
              Name: 'BANKA',
              IBAN: '',
              BIC: '',
              VariableSymbol: 10111,
              ConstantSymbol: '',
              SpecificSymbol: ''
            }
          }
        }
      }

describe('Extracting ISDOCs', () => {
  it ('test000.pdf -> false', async () => {
    expect(await hasISDOC(test0)).to.be.false
  })

  it ('test001.isdoc.pdf -> true', async () => {
    expect(await hasISDOC(test1)).to.be.true
    const isdoc = await extractISDOC(test1)
    expect(isdoc).to.be.instanceof(Invoice)
    expect(isdoc?.ID).to.be.eq('FV-1/2021')
    expect(isdoc?.UUID).to.be.eq('AEC4791C-4BA1-451E-A1DC-2BF634B1C29D')
    expect(isdoc?.['$_version']).to.be.eq('6.0.2')
  })

  it ('test002.isdoc.pdf -> true', async () => {
    expect(await hasISDOC(test2)).to.be.true
    const isdoc = await extractISDOC(test2)
    expect(isdoc).to.be.instanceof(Invoice)
    expect(isdoc?.ID).to.be.eq('FV-2/2021')
    expect(isdoc?.UUID).to.be.eq('A34D00BF-FFB3-445B-BA1F-C5764B89409E')
    expect(isdoc?.['$_version']).to.be.eq('6.0.2')
  })
})

describe('Attaching ISDOC', () => {
  it ('test000.pdf -> test000.isdoc.pdf', async () => {
    const test0isdoc = await attachISDOC(test0, template as InvoiceType)
    expect(test0isdoc).to.be.instanceof(Buffer)
    writeFileSync(__dirname + '/test000.isdoc.pdf', test0isdoc)
  })

  it ('test000.isdoc.pdf is valid', async () => {
    const test0i = readFileSync(__dirname + '/test000.isdoc.pdf')
    expect(await hasISDOC(test0i)).to.be.true

    const isdoc = await extractISDOC(test0i)
    expect(isdoc).to.be.instanceof(Invoice)
    expect(isdoc?.ID?.toString()).to.be.eq('1')
    expect(isdoc?.UUID).to.be.match(/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/)
    expect(isdoc?.['$_version']).to.be.eq('6.0.1')
  })

  it ('test001.isdoc.pdf -> throws that it already has one', async () => {
    expect(await attachISDOC(test1, invoice).catch(e => e.message)).to.be.include('This PDF Already Has an ISDOC Attachment')
  })
})

describe('Creating ISDOCX archive', () => {
  it ('test000.pdf + invoice.isdoc -> test000.isdox', async () => {
    const isdocx = await createISDOCX(test0, invoice)
    expect(isdocx).to.be.instanceof(Buffer)
    writeFileSync(__dirname + '/test000.isdocx', isdocx)
  })

  it ('test001.isdoc.pdf + invoice.isdoc -> throws ', async () => {
    expect(await createISDOCX(test1, invoice).catch(e => e.message)).to.be.include('This PDF Already Has an ISDOC Attachment')
  })
})

describe('Validating created ISDOCX archive', () => {
  let zip : Zip

  before(async () => {
    zip = await new Zip().loadAsync(readFileSync(__dirname + '/test000.isdocx'))
  })

  it ('test000.isdox is readable', async () => {
    expect(zip.files).to.be.an('object')
    expect(Object.keys(zip.files)).to.be.an('Array')
  })

  it ('test000.isdox has 3 files', async () => {
    expect(Object.keys(zip.files).length).to.be.eq(3)
  })

  it ('test000.isdox has a .pdf', async () => {
    expect(Object.keys(zip.files).find(r => r.match(/\.pdf$/i))).to.be.a('string')
  })

  it ('test000.isdox has a .isdoc', async () => {
    expect(Object.keys(zip.files).find(r => r.match(/\.isdoc$/i))).to.be.a('string')
  })

  it ('test000.isdox has a valid .isdoc', async () => {
    const name = Object.keys(zip.files).find(r => r.match(/\.isdoc$/i)) as string,
          file = await zip.file(name)?.async('nodebuffer'),
          isdoc = new Invoice(file)
    expect(isdoc?.['$_version']).to.be.eq('6.0.1')
  })

  it ('test000.isdox has a manifest.xml', async () => {
    expect(Object.keys(zip.files).find(r => r.toLowerCase() === 'manifest.xml')).to.be.a('string')
  })
})

// describe('Clean Up', () => {
//   it ('Clean Up', () => {
//     expect((() => {
//       rmSync(__dirname + '/test000.isdoc.pdf')
//       rmSync(__dirname + '/test000.isdocx')
//       return true
//     })()).not.to.throw
//   })
// })
