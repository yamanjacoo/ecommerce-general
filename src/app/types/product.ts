export interface ProductLabel {
  type: string
  value: string
}

export interface Product {
  Handle: string
  Title: string
  Description: string
  Specifications: { [key: string]: string } // Added specifications
  Vendor: string
  Type: string
  Tags: string[]
  Labels: ProductLabel[]
  OriginalPrice: number
  DiscountedPrice: number
  CompareAtPrice: number | null
  Images: {
    src: string
    alt?: string
    position: number
  }[]
  Options: {
    name: string
    values: string[]
  }[]
  Status: string
  SKU: string
  InventoryQty: number
  RequiresShipping: boolean
  IsGiftCard: boolean
  Published: boolean // Added published flag
  InventoryPolicy: string // Added inventory policy
  FulfillmentService: string // Added fulfillment service


  "Body (HTML)": string

  "Variant Price": string
  "Variant Compare At Price": string

  Rating: number

  DiscountPercentage: number

  GTIN?: string;
  MPN?: string;
  AgeGroup?: string;
  Gender?: string;
  Color?: string;
  Size?: string;
  ShippingCost?: number;
  TaxRate?: number;
  ProductType?: string;
  GoogleCategory?: string;
}

