export default `<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://isdoc.cz/namespace/2013" xmlns:isdoc="http://isdoc.cz/namespace/2013" targetNamespace="http://isdoc.cz/namespace/2013" elementFormDefault="qualified" version="6.0.2" xml:lang="cs">
  <xs:group name="Signature">
    <xs:sequence>
      <xs:any namespace="http://www.w3.org/2000/09/xmldsig#" processContents="lax"/>
    </xs:sequence>
  </xs:group>

  <xs:simpleType name="VersionType">
    <xs:restriction base="xs:string">
      <xs:pattern value="[0-9]+\\.[0-9]+(\\.[0-9]+)?"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="DocumentTypeType">
    <xs:restriction base="xs:integer">
      <xs:enumeration value="1">
        </xs:enumeration>
      <xs:enumeration value="2">
        </xs:enumeration>
      <xs:enumeration value="3">
        </xs:enumeration>
      <xs:enumeration value="4">
        </xs:enumeration>
      <xs:enumeration value="5">
        </xs:enumeration>
      <xs:enumeration value="6">
        </xs:enumeration>
      <xs:enumeration value="7">
        </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="SubDocumentTypeType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="SubDocumentTypeOriginType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>
  
  <xs:simpleType name="TargetConsolidatorType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="ClientOnTargetConsolidatorType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>
  
  <xs:simpleType name="ClientBankAccountType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="IDType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="ID36Type">
    <xs:restriction base="IDType">
      <xs:maxLength value="36"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="UUIDType">
    <xs:restriction base="xs:string">
      <xs:pattern value="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="IDSchemeType">
    <xs:restriction base="xs:anyURI"/>
  </xs:simpleType>

  <xs:simpleType name="IssuingSystemType">
    <xs:restriction base="xs:string">
      <xs:maxLength value="80"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="IssueDateType">
    <xs:restriction base="xs:date"/>
  </xs:simpleType>

  <xs:simpleType name="TaxPointDateType">
    <xs:restriction base="xs:date"/>
  </xs:simpleType>

  <xs:simpleType name="VATApplicableType">
    <xs:restriction base="BooleanType"/>
  </xs:simpleType>

  <xs:complexType name="NoteType">
    <xs:simpleContent>
      <xs:extension base="xs:string">
        <xs:attribute name="languageID" type="xs:language" use="optional">
          </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:complexType name="OrderReferencesType">
    <xs:sequence>
      <xs:element name="OrderReference" type="OrderReferenceType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="OrderReferenceType">
    <xs:sequence>
      <xs:element name="SalesOrderID" type="SalesOrderIDType">
        </xs:element>
      <xs:element name="ExternalOrderID" type="IDType" minOccurs="0">
        </xs:element>
      <xs:element name="IssueDate" type="IssueDateType" minOccurs="0">
        </xs:element>
      <xs:element name="ExternalOrderIssueDate" type="IssueDateType" minOccurs="0">
        </xs:element>
      <xs:element name="UUID" type="UUIDType" minOccurs="0">
        </xs:element>
      <xs:element name="ISDS_ID" type="ISDS_IDType" minOccurs="0">
        </xs:element>
      <xs:element name="FileReference" type="FileReferenceType" minOccurs="0">
        </xs:element>
      <xs:element name="ReferenceNumber" type="ReferenceNumberType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="IdAttribute"/>
  </xs:complexType>

  <xs:complexType name="OrderLineReferenceType">
    <xs:sequence>
      <xs:element name="LineID" type="LineIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="RefAttribute"/>
  </xs:complexType>

  <xs:simpleType name="SalesOrderIDType">
    <xs:restriction base="IDType"/>
  </xs:simpleType>

  <xs:simpleType name="LineIDType">
    <xs:restriction base="IDType"/>
  </xs:simpleType>

  <xs:simpleType name="ParagraphIDType">
    <xs:restriction base="IDType"/>
  </xs:simpleType>

  <xs:complexType name="DeliveryNoteReferencesType">
    <xs:sequence>
      <xs:element name="DeliveryNoteReference" type="DeliveryNoteReferenceType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="DeliveryNoteReferenceType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="IssueDate" type="IssueDateType" minOccurs="0">
        </xs:element>
      <xs:element name="UUID" type="UUIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="IdAttribute"/>
  </xs:complexType>

  <xs:complexType name="DeliveryNoteLineReferenceType">
    <xs:sequence>
      <xs:element name="LineID" type="LineIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="RefAttribute"/>
  </xs:complexType>

  <xs:complexType name="ContractReferencesType">
    <xs:sequence>
      <xs:element name="ContractReference" type="ContractReferenceType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="ContractReferenceType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="UUID" type="UUIDType" minOccurs="0">
        </xs:element>
      <xs:element name="IssueDate" type="IssueDateType">
        </xs:element>
      <xs:choice minOccurs="0">
        <xs:element name="LastValidDate" type="LastValidDateType">
          </xs:element>
        <xs:element name="LastValidDateUnbounded" type="LastValidDateUnboundedType">
          </xs:element>
      </xs:choice>
      <xs:element name="ISDS_ID" type="ISDS_IDType" minOccurs="0">
        </xs:element>
      <xs:element name="FileReference" type="FileReferenceType" minOccurs="0">
        </xs:element>
      <xs:element name="ReferenceNumber" type="ReferenceNumberType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="IdAttribute"/>
  </xs:complexType>

  <xs:complexType name="ContractLineReferenceType">
    <xs:sequence>
      <xs:element name="ParagraphID" type="ParagraphIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="RefAttribute"/>
  </xs:complexType>

  <xs:simpleType name="LastValidDateType">
    <xs:restriction base="xs:date"/>
  </xs:simpleType>

  <xs:complexType name="LastValidDateUnboundedType">
    </xs:complexType>

  <xs:simpleType name="CurrRateType">
    <xs:restriction base="xs:decimal"/>
  </xs:simpleType>

  <xs:simpleType name="RefCurrRateType">
    <xs:restriction base="xs:decimal"/>
  </xs:simpleType>

  <xs:complexType name="OriginalDocumentReferencesType">
    <xs:sequence>
      <xs:element name="OriginalDocumentReference" type="OriginalDocumentReferenceType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="OriginalDocumentReferenceType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="IssueDate" type="IssueDateType" minOccurs="0">
        </xs:element>
      <xs:element name="UUID" type="UUIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="IdAttribute"/>
  </xs:complexType>

  <xs:complexType name="OriginalDocumentLineReferenceType">
    <xs:sequence>
      <xs:element name="LineID" type="LineIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attributeGroup ref="RefAttribute"/>
  </xs:complexType>

  <xs:complexType name="SupplementsListType">
    <xs:sequence>
      <xs:element maxOccurs="unbounded" name="Supplement" type="SupplementType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="SupplementType">
    <xs:sequence>
      <xs:element name="Filename" type="FilenameType">
        </xs:element>
      <xs:element name="DigestMethod" type="DigestMethodType">
        </xs:element>
      <xs:element name="DigestValue" type="DigestValueType">
        </xs:element>
    </xs:sequence>
    <xs:attribute name="preview" type="BooleanType">
      </xs:attribute>
  </xs:complexType>

  <xs:simpleType name="FilenameType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="DigestMethodType">
    <xs:attribute name="Algorithm" use="required" type="xs:anyURI">
      </xs:attribute>
  </xs:complexType>

  <xs:simpleType name="DigestValueType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="BooleanType">
    <xs:restriction base="xs:boolean">
      <xs:pattern value="true|false"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="ExtensionsType">
    <xs:sequence>
      <xs:any minOccurs="1" maxOccurs="unbounded" namespace="##other" processContents="lax"/>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="AccountingSupplierPartyType">
    <xs:sequence>
      <xs:element name="Party" type="PartyType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="PartyType">
    <xs:sequence>
      <xs:element name="PartyIdentification" type="PartyIdentificationType">
        </xs:element>
      <xs:element name="PartyName" type="PartyNameType">
        </xs:element>
      <xs:element name="PostalAddress" type="PostalAddressType">
        </xs:element>
      <xs:element name="PartyTaxScheme" type="PartyTaxSchemeType" minOccurs="0" maxOccurs="unbounded">
        </xs:element>
      <xs:element minOccurs="0" name="RegisterIdentification" type="RegisterIdentificationType">
        </xs:element>
      <xs:element name="Contact" type="ContactType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="PartyIdentificationType">
    <xs:sequence>
      <xs:element name="UserID" type="UserIDType" minOccurs="0">
        </xs:element>
      <xs:element name="CatalogFirmIdentification" type="CatalogFirmIdentificationType" minOccurs="0">
        </xs:element>
      <xs:element name="ID" type="IDType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="UserIDType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="CatalogFirmIdentificationType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="PartyNameType">
    <xs:sequence>
      <xs:element name="Name" type="NameType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="NameType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="PostalAddressType">
    <xs:sequence>
      <xs:element name="StreetName" type="StreetNameType">
        </xs:element>
      <xs:element name="BuildingNumber" type="BuildingNumberType">
        </xs:element>
      <xs:element name="CityName" type="CityNameType">
        </xs:element>
      <xs:element name="PostalZone" type="PostalZoneType">
        </xs:element>
      <xs:element name="Country" type="CountryType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="StreetNameType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="BuildingNumberType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="CityNameType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="PostalZoneType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="CountryType">
    <xs:sequence>
      <xs:element name="IdentificationCode" type="IdentificationCodeType">
        </xs:element>
      <xs:element name="Name" type="NameType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="IdentificationCodeType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="PartyTaxSchemeType">
    <xs:sequence>
      <xs:element name="CompanyID" type="CompanyIDType">
        </xs:element>
      <xs:element name="TaxScheme" type="TaxSchemeType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="CompanyIDType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="TaxSchemeType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="RegisterIdentificationType">
    <xs:choice>
      <xs:sequence>
        <xs:element name="RegisterKeptAt" type="RegisterKeptAtType">
          </xs:element>
        <xs:element name="RegisterFileRef" type="RegisterFileRefType">
          </xs:element>
        <xs:element name="RegisterDate" type="RegisterDateType">
          </xs:element>
      </xs:sequence>
      <xs:element name="Preformatted" type="PreformattedType">
        </xs:element>
    </xs:choice>
  </xs:complexType>

  <xs:simpleType name="RegisterKeptAtType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="RegisterFileRefType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="RegisterDateType">
    <xs:restriction base="xs:date"/>
  </xs:simpleType>

  <xs:simpleType name="PreformattedType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="ContactType">
    <xs:sequence>
      <xs:element name="Name" type="NameType" minOccurs="0">
        </xs:element>
      <xs:element name="Telephone" type="TelephoneType" minOccurs="0">
        </xs:element>
      <xs:element name="ElectronicMail" type="ElectronicMailType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="TelephoneType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="ElectronicMailType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="SellerSupplierPartyType">
    <xs:sequence>
      <xs:element name="Party" type="PartyType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="AccountingCustomerPartyType">
    <xs:sequence>
      <xs:element name="Party" type="PartyType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="AnonymousCustomerPartyType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="IDScheme" type="IDSchemeType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="BuyerCustomerPartyType">
    <xs:sequence>
      <xs:element name="Party" type="PartyType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="DeliveryType">
    <xs:sequence>
      <xs:element name="Party" type="PartyType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="InvoiceLinesType">
    <xs:sequence>
      <xs:element maxOccurs="unbounded" name="InvoiceLine" type="InvoiceLineType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="InvoiceLineType">
    <xs:sequence>
      <xs:element name="ID" type="ID36Type">
        </xs:element>
      <xs:element name="OrderReference" type="OrderLineReferenceType" minOccurs="0">
        </xs:element>
      <xs:element name="DeliveryNoteReference" type="DeliveryNoteLineReferenceType" minOccurs="0">
        </xs:element>
      <xs:element name="OriginalDocumentReference" type="OriginalDocumentLineReferenceType" minOccurs="0">
        </xs:element>
      <xs:element name="ContractReference" type="ContractLineReferenceType" minOccurs="0">
        </xs:element>
      <xs:element name="EgovClassifier" type="EgovClassifierType" minOccurs="0">
        </xs:element>
      <xs:element name="InvoicedQuantity" type="QuantityType" minOccurs="0">
        </xs:element>
      <xs:element name="LineExtensionAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="LineExtensionAmount" type="AmountType">
        </xs:element>
      <xs:element name="LineExtensionAmountBeforeDiscount" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="LineExtensionAmountTaxInclusiveCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="LineExtensionAmountTaxInclusive" type="AmountType">
        </xs:element>
      <xs:element name="LineExtensionAmountTaxInclusiveBeforeDiscount" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="LineExtensionTaxAmount" type="AmountType">
        </xs:element>
      <xs:element name="UnitPrice" type="AmountType">
        </xs:element>
      <xs:element name="UnitPriceTaxInclusive" type="AmountType">
        </xs:element>
      <xs:element name="ClassifiedTaxCategory" type="ClassifiedTaxCategoryType">
        </xs:element>
      <xs:element name="Note" type="NoteType" minOccurs="0">
        </xs:element>
      <xs:element name="VATNote" type="NoteType" minOccurs="0">
        </xs:element>
      <xs:element name="Item" type="ItemType" minOccurs="0">
        </xs:element>
      <xs:element name="Extensions" type="ExtensionsType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="QuantityType">
    <xs:simpleContent>
      <xs:extension base="xs:decimal">
        <xs:attribute name="unitCode" use="optional" type="xs:string">
          </xs:attribute>
      </xs:extension>
    </xs:simpleContent>
  </xs:complexType>

  <xs:simpleType name="CurrencyCodeType">
    <xs:restriction base="xs:string">
      <xs:length value="3"/>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="AmountType">
    <xs:restriction base="xs:decimal"/>
  </xs:simpleType>

  <xs:complexType name="ClassifiedTaxCategoryType">
    <xs:sequence>
      <xs:element name="Percent" type="PercentType">
        </xs:element>
      <xs:element name="VATCalculationMethod" type="VATCalculationMethodType">
        </xs:element>
      <xs:element name="VATApplicable" type="VATApplicableType" minOccurs="0">
        </xs:element>
      <xs:element name="LocalReverseCharge" type="LocalReverseChargeType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="PercentType">
    <xs:restriction base="xs:decimal"/>
  </xs:simpleType>

  <xs:simpleType name="VATCalculationMethodType">
    <xs:restriction base="xs:integer">
      <xs:enumeration value="0">
        </xs:enumeration>
      <xs:enumeration value="1">
        </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="LocalReverseChargeType">
    <xs:sequence>
      <xs:element name="LocalReverseChargeCode" type="LocalReverseChargeCodeType">
        </xs:element>
      <xs:element name="LocalReverseChargeQuantity" type="QuantityType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="LocalReverseChargeCodeType">
    <xs:union>
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:enumeration value="1">
            </xs:enumeration>
          <xs:enumeration value="2">
            </xs:enumeration>
          <xs:enumeration value="4">
            </xs:enumeration>
          <xs:enumeration value="5">
            </xs:enumeration>
        </xs:restriction>
      </xs:simpleType>
      <xs:simpleType>
        <xs:restriction base="xs:string"/>
      </xs:simpleType>
    </xs:union>
  </xs:simpleType>

  <xs:complexType name="ItemType">
    <xs:sequence>
      <xs:element name="Description" type="DescriptionType" minOccurs="0">
        </xs:element>
      <xs:element name="CatalogueItemIdentification" type="CatalogueItemIdentificationType" minOccurs="0">
        </xs:element>
      <xs:element name="SellersItemIdentification" type="SellersItemIdentificationType" minOccurs="0">
        </xs:element>
      <xs:element name="SecondarySellersItemIdentification" type="SecondarySellersItemIdentificationType" minOccurs="0">
        </xs:element>
      <xs:element name="TertiarySellersItemIdentification" type="TertiarySellersItemIdentificationType" minOccurs="0">
        </xs:element>
      <xs:element name="BuyersItemIdentification" type="BuyersItemIdentificationType" minOccurs="0">
        </xs:element>
      <xs:element name="StoreBatches" type="StoreBatchesType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="DescriptionType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="CatalogueItemIdentificationType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="SellersItemIdentificationType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="SecondarySellersItemIdentificationType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="TertiarySellersItemIdentificationType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="BuyersItemIdentificationType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="StoreBatchesType">
    <xs:sequence>
      <xs:element name="StoreBatch" type="StoreBatchType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="StoreBatchType">
    <xs:sequence>
      <xs:element name="Name" type="NameType">
        </xs:element>
      <xs:element name="Note" type="NoteType" minOccurs="0">
        </xs:element>
      <xs:element name="ExpirationDate" type="ExpirationDateType" minOccurs="0">
        </xs:element>
      <xs:element name="Specification" type="SpecificationType" minOccurs="0">
        </xs:element>
      <xs:element name="Quantity" type="QuantityType">
        </xs:element>
      <xs:element name="BatchOrSerialNumber" type="BatchOrSerialNumberType">
        </xs:element>
      <xs:element name="SealSeriesID" type="SealSeriesIDType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="ExpirationDateType">
    <xs:restriction base="xs:date"/>
  </xs:simpleType>

  <xs:simpleType name="SpecificationType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="BatchOrSerialNumberType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="B">
        </xs:enumeration>
      <xs:enumeration value="S">
        </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:simpleType name="SealSeriesIDType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="NonTaxedDepositsType">
    <xs:sequence>
      <xs:element name="NonTaxedDeposit" type="NonTaxedDepositType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="NonTaxedDepositType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="VariableSymbol" type="VariableSymbolType">
        </xs:element>
      <xs:element name="DepositAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="DepositAmount" type="AmountType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="VariableSymbolType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="TaxedDepositsType">
    <xs:sequence>
      <xs:element name="TaxedDeposit" type="TaxedDepositType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="TaxedDepositType">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="VariableSymbol" type="VariableSymbolType">
        </xs:element>
      <xs:element name="TaxableDepositAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxableDepositAmount" type="AmountType">
        </xs:element>
      <xs:element name="TaxInclusiveDepositAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxInclusiveDepositAmount" type="AmountType">
        </xs:element>
      <xs:element name="ClassifiedTaxCategory" type="ClassifiedTaxCategoryType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="TaxTotalType">
    <xs:sequence>
      <xs:element name="TaxSubTotal" type="TaxSubTotalType" maxOccurs="unbounded">
        </xs:element>
      <xs:element name="TaxAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxAmount" type="AmountType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="TaxSubTotalType">
    <xs:sequence>
      <xs:element name="TaxableAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxableAmount" type="AmountType">
        </xs:element>
      <xs:element name="TaxAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxAmount" type="AmountType">
        </xs:element>
      <xs:element name="TaxInclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxInclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxableAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxableAmount" type="AmountType">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxAmount" type="AmountType">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxInclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxInclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="DifferenceTaxableAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="DifferenceTaxableAmount" type="AmountType">
        </xs:element>
      <xs:element name="DifferenceTaxAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="DifferenceTaxAmount" type="AmountType">
        </xs:element>
      <xs:element name="DifferenceTaxInclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="DifferenceTaxInclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="TaxCategory" type="TaxCategoryType">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="TaxCategoryType">
    <xs:sequence>
      <xs:element name="Percent" type="PercentType">
        </xs:element>
      <xs:element name="TaxScheme" type="TaxSchemeType" minOccurs="0">
        </xs:element>
      <xs:element name="VATApplicable" type="VATApplicableType" minOccurs="0">
        </xs:element>
      <xs:element name="LocalReverseChargeFlag" type="BooleanType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="LegalMonetaryTotalType">
    <xs:sequence>
      <xs:element name="TaxExclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="TaxExclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="TaxInclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="TaxInclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxExclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxExclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxInclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="AlreadyClaimedTaxInclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="DifferenceTaxExclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="DifferenceTaxExclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="DifferenceTaxInclusiveAmount" type="AmountType">
        </xs:element>
      <xs:element name="DifferenceTaxInclusiveAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="PayableRoundingAmount" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="PayableRoundingAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="PaidDepositsAmount" type="AmountType">
        </xs:element>
      <xs:element name="PaidDepositsAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
      <xs:element name="PayableAmount" type="AmountType">
        </xs:element>
      <xs:element name="PayableAmountCurr" type="AmountType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="PaymentMeansType">
    <xs:sequence>
      <xs:element name="Payment" type="PaymentType" maxOccurs="unbounded">
        </xs:element>
      <xs:element name="AlternateBankAccounts" type="AlternateBankAccountsType" minOccurs="0">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="PaymentType">
    <xs:sequence>
      <xs:element name="PaidAmount" type="AmountType">
        </xs:element>
      <xs:element name="PaymentMeansCode" type="PaymentMeansCodeType">
        </xs:element>
      <xs:element name="Details" type="DetailsType" minOccurs="0">
        </xs:element>
    </xs:sequence>
    <xs:attribute name="partialPayment" type="BooleanType">
      </xs:attribute>
  </xs:complexType>

  <xs:simpleType name="PaymentMeansCodeType">
    <xs:restriction base="xs:integer">
      <xs:enumeration value="10">
        </xs:enumeration>
      <xs:enumeration value="20">
        </xs:enumeration>
      <xs:enumeration value="31">
        </xs:enumeration>
      <xs:enumeration value="42">
        </xs:enumeration>
      <xs:enumeration value="48">
        </xs:enumeration>
      <xs:enumeration value="49">
        </xs:enumeration>
      <xs:enumeration value="50">
        </xs:enumeration>
      <xs:enumeration value="97">
        </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>

  <xs:complexType name="DetailsType">
    <xs:sequence>
      <xs:choice>
        <xs:sequence>
          <xs:element name="DocumentID" type="DocumentIDType">
            </xs:element>
          <xs:element name="IssueDate" type="IssueDateType">
            </xs:element>
        </xs:sequence>
        <xs:sequence>
          <xs:element name="PaymentDueDate" type="PaymentDueDateType">
            </xs:element>
          <xs:group ref="BankAccount"/>
          <xs:element name="VariableSymbol" type="VariableSymbolType" minOccurs="0">
            </xs:element>
          <xs:element name="ConstantSymbol" type="ConstantSymbolType" minOccurs="0">
            </xs:element>
          <xs:element name="SpecificSymbol" type="SpecificSymbolType" minOccurs="0">
            </xs:element>
        </xs:sequence>
      </xs:choice>
    </xs:sequence>
  </xs:complexType>

  <xs:simpleType name="DocumentIDType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="PaymentDueDateType">
    <xs:restriction base="xs:date"/>
  </xs:simpleType>

  <xs:simpleType name="BankCodeType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="IBANType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="BICType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="ConstantSymbolType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="SpecificSymbolType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="AlternateBankAccountsType">
    <xs:sequence>
      <xs:element name="AlternateBankAccount" type="AlternateBankAccountType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="AlternateBankAccountType">
    <xs:group ref="BankAccount"/>
  </xs:complexType>

  <xs:group name="BankAccount">
    <xs:sequence>
      <xs:element name="ID" type="IDType">
        </xs:element>
      <xs:element name="BankCode" type="BankCodeType">
        </xs:element>
      <xs:element name="Name" type="NameType">
        </xs:element>
      <xs:element name="IBAN" type="IBANType">
        </xs:element>
      <xs:element name="BIC" type="BICType">
        </xs:element>
    </xs:sequence>
  </xs:group>

  <xs:attributeGroup name="RefAttribute">
    <xs:attribute name="ref" type="IDType" use="required">
      </xs:attribute>
  </xs:attributeGroup>

  <xs:attributeGroup name="IdAttribute">
    <xs:attribute name="id" type="IDType">
      </xs:attribute>
  </xs:attributeGroup>

  <xs:simpleType name="EgovFlagType">
    <xs:restriction base="BooleanType"/>
  </xs:simpleType>

  <xs:simpleType name="FileReferenceType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="ReferenceNumberType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="ISDS_IDType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:simpleType name="EgovClassifierType">
    <xs:restriction base="xs:string"/>
  </xs:simpleType>

  <xs:complexType name="EgovClassifiersType">
    <xs:sequence>
      <xs:element name="EgovClassifier" type="EgovClassifierType" maxOccurs="unbounded">
        </xs:element>
    </xs:sequence>
  </xs:complexType>
  
  <xs:element name="Invoice">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="DocumentType" type="DocumentTypeType">
          </xs:element>
        <xs:sequence minOccurs="0">
          <xs:element name="SubDocumentType" type="SubDocumentTypeType">
            </xs:element>
          <xs:element name="SubDocumentTypeOrigin" type="SubDocumentTypeOriginType">
            </xs:element>
        </xs:sequence>
        <xs:element name="TargetConsolidator" type="TargetConsolidatorType" minOccurs="0">
          </xs:element>
        <xs:element name="ClientOnTargetConsolidator" type="ClientOnTargetConsolidatorType" minOccurs="0">
          </xs:element>
        <xs:element name="ClientBankAccount" type="ClientBankAccountType" minOccurs="0">
          </xs:element>
        <xs:element name="ID" type="IDType">
          </xs:element>
        <xs:element name="UUID" type="UUIDType">
          </xs:element>
        <xs:element name="EgovFlag" type="EgovFlagType" minOccurs="0">
          </xs:element>
        <xs:element name="ISDS_ID" type="ISDS_IDType" minOccurs="0">
          </xs:element>
        <xs:element name="FileReference" type="FileReferenceType" minOccurs="0">
          </xs:element>
        <xs:element name="ReferenceNumber" type="ReferenceNumberType" minOccurs="0">
          </xs:element>
        <xs:element name="EgovClassifiers" type="EgovClassifiersType" minOccurs="0">
          </xs:element>
        <xs:element name="IssuingSystem" type="IssuingSystemType" minOccurs="0">
          </xs:element>
        <xs:element name="IssueDate" type="IssueDateType">
          </xs:element>
        <xs:element name="TaxPointDate" type="TaxPointDateType" minOccurs="0">
          </xs:element>
        <xs:element name="VATApplicable" type="VATApplicableType">
          </xs:element>
        <xs:element name="ElectronicPossibilityAgreementReference" type="NoteType">
          </xs:element>
        <xs:element name="Note" type="NoteType" minOccurs="0">
          </xs:element>
        <xs:element name="LocalCurrencyCode" type="CurrencyCodeType">
          </xs:element>
        <xs:element name="ForeignCurrencyCode" type="CurrencyCodeType" minOccurs="0">
          </xs:element>
        <xs:element name="CurrRate" type="CurrRateType">
          </xs:element>
        <xs:element name="RefCurrRate" type="RefCurrRateType">
          </xs:element>
        <xs:element name="Extensions" type="ExtensionsType" minOccurs="0">
          </xs:element>
        <xs:element name="AccountingSupplierParty" type="AccountingSupplierPartyType">
          </xs:element>
        <xs:element name="SellerSupplierParty" type="SellerSupplierPartyType" minOccurs="0">
          </xs:element>
        <xs:choice>
          <xs:element name="AccountingCustomerParty" type="AccountingCustomerPartyType">
            </xs:element>
          <xs:sequence>
            <xs:element name="AnonymousCustomerParty" type="AnonymousCustomerPartyType">
              </xs:element>
            <xs:element name="AccountingCustomerParty" type="AccountingCustomerPartyType" minOccurs="0">
              </xs:element>
          </xs:sequence>
        </xs:choice>
        <xs:element name="BuyerCustomerParty" type="BuyerCustomerPartyType" minOccurs="0">
          </xs:element>
        <xs:element name="OrderReferences" type="OrderReferencesType" minOccurs="0">
          </xs:element>
        <xs:element name="DeliveryNoteReferences" type="DeliveryNoteReferencesType" minOccurs="0">
          </xs:element>
        <xs:element name="OriginalDocumentReferences" type="OriginalDocumentReferencesType" minOccurs="0">
          </xs:element>
        <xs:element name="ContractReferences" type="ContractReferencesType" minOccurs="0">
          </xs:element>
        <xs:element name="Delivery" type="DeliveryType" minOccurs="0">
          </xs:element>
        <xs:element name="InvoiceLines" type="InvoiceLinesType">
          </xs:element>
        <xs:element name="NonTaxedDeposits" type="NonTaxedDepositsType" minOccurs="0">
          </xs:element>
        <xs:element name="TaxedDeposits" type="TaxedDepositsType" minOccurs="0">
          </xs:element>
        <xs:element name="TaxTotal" type="TaxTotalType">
          </xs:element>
        <xs:element name="LegalMonetaryTotal" type="LegalMonetaryTotalType">
          </xs:element>
        <xs:element name="PaymentMeans" type="PaymentMeansType" minOccurs="0">
          </xs:element>
        <xs:element name="SupplementsList" type="SupplementsListType" minOccurs="0">
          </xs:element>
        <xs:group ref="Signature" minOccurs="0" maxOccurs="unbounded"/>
      </xs:sequence>
      <xs:attribute name="version" use="required" type="VersionType">
        </xs:attribute>
    </xs:complexType>
    <xs:unique name="OrderReferences">
      <xs:selector xpath="isdoc:OrderReferences/isdoc:OrderReference"/>
      <xs:field xpath="@id"/>
    </xs:unique>
    <xs:keyref name="OrderReferencesRef" refer="OrderReferences">
      <xs:selector xpath="isdoc:InvoiceLines/isdoc:InvoiceLine/isdoc:OrderReference"/>
      <xs:field xpath="@ref"/>
    </xs:keyref>
    <xs:unique name="DeliveryNoteReferences">
      <xs:selector xpath="isdoc:DeliveryNoteReferences/isdoc:DeliveryNoteReference"/>
      <xs:field xpath="@id"/>
    </xs:unique>
    <xs:keyref name="DeliveryNoteReferencesRef" refer="DeliveryNoteReferences">
      <xs:selector xpath="isdoc:InvoiceLines/isdoc:InvoiceLine/isdoc:DeliveryNoteReference"/>
      <xs:field xpath="@ref"/>
    </xs:keyref>
    <xs:unique name="OriginalDocumentReferences">
      <xs:selector xpath="isdoc:OriginalDocumentReferences/isdoc:OriginalDocumentReference"/>
      <xs:field xpath="@id"/>
    </xs:unique>
    <xs:keyref name="OriginalDocumentReferencesRef" refer="OriginalDocumentReferences">
      <xs:selector xpath="isdoc:InvoiceLines/isdoc:InvoiceLine/isdoc:OriginalDocumentReference"/>
      <xs:field xpath="@ref"/>
    </xs:keyref>    
    <xs:unique name="ContractReferences">
      <xs:selector xpath="isdoc:ContractReferences/isdoc:ContractReference"/>
      <xs:field xpath="@id"/>
    </xs:unique>
    <xs:keyref name="ContractReferencesRef" refer="ContractReferences">
      <xs:selector xpath="isdoc:InvoiceLines/isdoc:InvoiceLine/isdoc:ContractReference"/>
      <xs:field xpath="@ref"/>
    </xs:keyref>
    <xs:key name="InvoiceLines">
      <xs:selector xpath="isdoc:InvoiceLines/isdoc:InvoiceLine"/>
      <xs:field xpath="isdoc:ID"/>
    </xs:key>
  </xs:element>
  
</xs:schema>`
