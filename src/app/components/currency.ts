export const CURRENCIES = {
    EUR: {
      code: "EUR",
      symbol: "€",
      name: "Euro",
      locale: "fr-FR",
      decimal: 2,
    },
    USD: {
      code: "USD",
      symbol: "$",
      name: "US Dollar",
      locale: "en-US",
      decimal: 2,
    },
    GBP: {
      code: "GBP",
      symbol: "£",
      name: "British Pound",
      locale: "en-GB",
      decimal: 2,
    },
  } as const
  
  export type CurrencyCode = keyof typeof CURRENCIES
  
  export const DEFAULT_CURRENCY = CURRENCIES.GBP
  
  // Currency formatter function
  export const formatCurrency = (amount: number | string, currencyCode: CurrencyCode = DEFAULT_CURRENCY.code) => {
    const currency = CURRENCIES[currencyCode]
  
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: currency.decimal,
      maximumFractionDigits: currency.decimal,
    }).format(Number(amount))
  }
  
  // Parse currency string to number
  export const parseCurrency = (value: string): number => {
    // Remove currency symbols and spaces
    const cleanValue = value.replace(/[^0-9.-]+/g, "")
    return Number(cleanValue)
  }
  
  // Currency validation
  export const isValidCurrency = (code: string): code is CurrencyCode => {
    return code in CURRENCIES
  }
  
  