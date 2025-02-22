interface GmcProduct {
    id: string;
    title: string;
    description: string;
    type: string;
    link: string;
    image_link: string;
    price: string;
    availability: string;
    condition: string;
    gtin: string;
    sku: string;
    mpn: string;
    brand: string;
    google_product_category: string;
    age_group: string;
    gender: string;
    color: string;
    size: string;
    tax: {
      country: string;
      rate: number;
      tax_ship: boolean;
    };
    shipping: {
      country: string;
      service: string;
      price: {
        currency: string;
        value: number;
      };
    };
    identifierExists: string;
  }