import { parse } from "csv-parse/sync"
import type { Product } from "../types/product"
import { Condition, FeedBuilder } from '@xcommerceweb/google-merchant-feed';
import { format } from "date-fns";

const CSV_URLS = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output_part1-TV4yhkdsn8w3TMeDd7AewqrAJKQx4V.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output_part2-tdDNJmk9hgRPa8eSS1rmY9GHeMixG1.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output_part3-aG5vp6o2cIvS0PCkJof4o7qoi1bceK.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output_part1%20(1)-6ujdrYMm0pKuYNeTqPfaTHzdgwRsZF.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output_part1%20(2)-YjeJZBQY8u1T9YZBYncaK9N1HoyGVL.csv",
]

interface ProductLabel {
  type: string
  value: string
}

function extractLabels(tags: string): ProductLabel[] {
  return (tags || "")
    .split(", ")
    .filter((tag) => tag.startsWith("__label"))
    .map((label) => {
      const [type, value] = label.replace("__label", "").split(":")
      return { type, value }
    })
}
export async function DownloadGmcProductsPage() {
  try {
    const siteUrl = window.location.origin; // e.g., "https://client2.example.com"

console.log(`Using domain: ${siteUrl}`);

    console.log("[1/6] Starting GMC products feed generation...");
    
    console.log("[2/6] Fetching products from source...");
    const products = await getProducts();
    console.log(`✅ Successfully retrieved ${products.length} products`);
    
    console.log("[3/6] Converting products to GMC format...");
    const gmcProducts = products.map((product) => convertToGmcProduct(product));
    console.log(`✅ Converted ${gmcProducts.length} products to GMC format`);

    console.log("[4/6] Building XML feed...");
    const feedBuilder = new FeedBuilder()
      .withTitle("Your Store Name")
      .withLink(siteUrl) // Must match product links
      .withDescription("Google Merchant Center Product Feed");

    console.log("[5/6] Adding products to feed...", gmcProducts.length);
    gmcProducts.forEach(product => {
      // if (!product.gtin && !product.mpn) {
      //   console.warn(`Product ${product.id} missing both GTIN and MPN`);
      // }

      feedBuilder.withProduct({
        id: product.id,
        title: product.title,
        description: product.description,
        link: product.link,
        imageLink: product.image_link,
        price: {
          currency: "USD",
          value: parseFloat(product.price.replace(" USD", ""))
        },
        availability: product.availability as "in_stock" | "out_of_stock" | "preorder" | "backorder",
        condition:product.condition as Condition,
        brand: product.brand,
        gtin: product.gtin,
        mpn: product.mpn,
        color: product.color,
        size: product.size,
        tax: product.tax,
        shipping: product.shipping,
        identifierExists:  product.identifierExists as "yes" | "no",
        customLabels: [product.color, product.size]
      });
    });

    console.log("[6/6] Generating XML...",feedBuilder.getFeed());
    const xml = feedBuilder.buildXml();
    const filename = `gmc-products-${format(new Date(), "yyyy-MM-dd")}.xml`;
    
    // Trigger download
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`🎉 XML feed generated! Filename: ${filename}`);
  } catch (error) {
    console.error("⚠️ Error during GMC feed generation process:", error);
    throw error;
  }
}

function convertToGmcProduct(product: Product): GmcProduct {
  const siteUrl = window.location.origin; // e.g., "https://client2.example.com"

  console.log(`Using domain: ${siteUrl}`);
  
  const priceValue = product.DiscountedPrice;
  
  return {
    id: product.Handle.substring(0, 50),
    title: product.Title.substring(0, 150),
    type:  product.Type,
    mpn: product.MPN as string,
    description: product["Body (HTML)"]
      .substring(0, 5000)
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
      
    link: `${siteUrl}/products/${product.Handle}`, // Must match feed domain
    image_link: product.Images?.[0]?.src || "",
    price: `${priceValue.toFixed(2)} USD`,
    availability: product.Status === "active" ? 'in_stock' : 'out_of_stock',
    condition: "new",
    gtin: product.GTIN || '',
    sku:product.SKU || '',

    brand: product.Vendor.substring(0, 70),
    google_product_category:  "Apparel & Accessories > Clothing",
    age_group: product.AgeGroup || 'adult',
    gender: product.Gender || 'unisex',
    color: product.Color || 'Multicolor',
    size: product.Size || 'One Size',
    tax: {
      country: "US",
      rate: product.TaxRate || 7.0, // Set your actual tax rate
      tax_ship: true
    },
    shipping: {
      country: "US",
      service: "Standard",
      price: {
        currency: "USD",
        value: product.ShippingCost || 0.00
      }
    },
    identifierExists: product.GTIN ? 'yes' : 'no'
  };
}
function extractSpecifications(html: string): { [key: string]: string } {
  const specs: { [key: string]: string } = {}
  const listMatch = html.match(/<ul>[\s\S]*?<\/ul>/g)

  if (listMatch) {
    const items = listMatch[0].match(/<li>(.*?)<\/li>/g) || []
    items.forEach((item) => {
      const content = item.replace(/<\/?li>/g, "")
      const [key, value] = content.split(":").map((s) => s.trim())
      if (key && value) {
        specs[key] = value
      } else {
        // Handle cases where there's no colon separator
        const parts = content.split(" ")
        if (parts.length >= 2) {
          specs[parts[0]] = parts.slice(1).join(" ")
        }
      }
    })
  }

  return specs
}

function cleanHtml(html: string): string {
  // Remove image tags first
  const withoutImages = html.replace(/<img[^>]*>/g, "")

  return withoutImages
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove remaining HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim()
}

export async function getProducts(): Promise<Product[]> {
  try {
    // Fetch all CSV files in parallel
    const responses = await Promise.all(CSV_URLS.map((url) => fetch(url)))
    const csvDataArray = await Promise.all(responses.map((response) => response.text()))

    // Parse all CSV files and combine records
    const allRecords = csvDataArray.flatMap((csvData) =>
      parse(csvData, {
        columns: true,
        skip_empty_lines: true,
      }),
    )

    const productsMap = new Map<string, Product>()

    allRecords.forEach((record: any) => {
      const handle = record.Handle

      if (!productsMap.has(handle)) {
        // Extract regular tags and special labels
        const allTags = record.Tags ? record.Tags.split(", ") : []
        const regularTags = allTags.filter((tag: string) => !tag.startsWith("__"))
        const labels = extractLabels(record.Tags)

        const price = Number.parseFloat(record["Variant Price"]) || 0
        const comparePrice = record["Variant Compare At Price"]
          ? Number.parseFloat(record["Variant Compare At Price"])
          : null

        // Extract specifications from HTML description
        const specs = extractSpecifications(record["Body (HTML)"] || "")

        productsMap.set(handle, {
          Handle: handle,
          Title: record.Title,
          Description: cleanHtml(record["Body (HTML)"] || ""),
          "Body (HTML)": record["Body (HTML)"] || "", // Added required field
          Specifications: specs,
          Vendor: record.Vendor,
          Type: record.Type || record["Product Category"] || "Uncategorized",
          Tags: regularTags,
          Labels: labels,
          OriginalPrice: comparePrice || price,
          DiscountedPrice: price,
          CompareAtPrice: comparePrice,
          // Provide variant prices as strings (convert numbers if necessary)
          "Variant Price": record["Variant Price"] || price.toString(), 
          "Variant Compare At Price": record["Variant Compare At Price"] || (comparePrice ? comparePrice.toString() : ""),
          Images: [
            {
              src: record["Image Src"] || "/placeholder.svg",
              alt: record["Image Alt Text"] || record.Title,
              position: Number.parseInt(record["Image Position"]) || 0,
            },
          ],
          Options: [],
          Status: record.Status || "active",
          SKU: record["Variant SKU"] || "",
          InventoryQty: Number.parseInt(record["Variant Inventory Qty"]) || 0,
          RequiresShipping: record["Variant Requires Shipping"] === "True",
          IsGiftCard: record["Gift Card"] === "True",
          Published: record.Published === "True",
          InventoryPolicy: record["Variant Inventory Policy"] || "deny",
          FulfillmentService: record["Variant Fulfillment Service"] || "manual",
          GTIN: record["GTIN"] || "",
          MPN: "",
          AgeGroup: "",
          Gender: "",
          Color: "",
          Size: "",
          ShippingCost: 0,
          TaxRate: 0,
          ProductType: "",
          GoogleCategory: "",
          // Add default values for Rating and DiscountPercentage
          Rating: Number(record.Rating) || 0,
          DiscountPercentage: Number(record.DiscountPercentage) || 0,
        });
        
      }

      const product = productsMap.get(handle)!

      // Add variant image if it exists and is different
      if (record["Variant Image"] && !product.Images.find((img) => img.src === record["Variant Image"])) {
        product.Images.push({
          src: record["Variant Image"],
          alt: `${record.Title} variant`,
          position: product.Images.length,
        })
      }

      // Add regular image if it exists and is different
      if (record["Image Src"] && !product.Images.find((img) => img.src === record["Image Src"])) {
        product.Images.push({
          src: record["Image Src"],
          alt: record["Image Alt Text"] || record.Title,
          position: Number.parseInt(record["Image Position"]) || product.Images.length,
        })
      }
      // Add options if they exist
      ;[1, 2, 3].forEach((i) => {
        const optionName = record[`Option${i} Name`]
        const optionValue = record[`Option${i} Value`]

        if (optionName && optionValue && optionName.toLowerCase() !== "title") {
          const existingOption = product.Options.find((opt) => opt.name === optionName)
          if (existingOption) {
            if (!existingOption.values.includes(optionValue)) {
              existingOption.values.push(optionValue)
            }
          } else {
            product.Options.push({
              name: optionName,
              values: [optionValue],
            })
          }
        }
      })

      // Update price if current variant has a lower price
      const variantPrice = Number.parseFloat(record["Variant Price"]) || 0
      if (variantPrice > 0 && variantPrice < product.DiscountedPrice) {
        product.DiscountedPrice = variantPrice
      }
    })

    // Filter out inactive or unpublished products, sort images by position, and sort products by title
    const products = Array.from(productsMap.values())
      .filter((product) => product.Status === "active" && product.Published)
      .map((product) => ({
        ...product,
        Images: product.Images.sort((a, b) => a.position - b.position),
      }))
      .sort((a, b) => a.Title.localeCompare(b.Title))
    
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

