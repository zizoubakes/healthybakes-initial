import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration for reading
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Use CDN for faster reads in production
})

// Sanity client configuration for writing (requires token)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Type definitions
export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  quantity: string
  image: any
  heroImage?: any
  description: string
  price: number
  available: boolean
  featured: boolean
}

export interface TrustItem {
  emoji: string
  title: string
  description: string
}

export interface NavigationLink {
  label: string
  url: string
  sectionHeading?: string
  sectionContent?: any[]
}

export interface SiteSettings {
  _id: string
  storeName: string
  tagline: string
  heroHeadline: string
  heroSubtitle: string
  heroRating: string
  shopHeading: string
  contactHeading: string
  contactDescription: string
  aboutStory: any[]
  trustItems: TrustItem[]
  navigationLinks: NavigationLink[]
  whatsappNumber: string
  instagramHandle?: string
  deliveryInfo: string
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && available == true] | order(sortOrder asc, _createdAt desc) {
    _id,
    name,
    slug,
    quantity,
    image,
    description,
    price,
    available,
    featured
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && featured == true && available == true] | order(sortOrder asc, _createdAt desc) {
    _id,
    name,
    slug,
    quantity,
    image,
    heroImage,
    description,
    price,
    available,
    featured
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    storeName,
    tagline,
    heroHeadline,
    heroSubtitle,
    heroRating,
    shopHeading,
    contactHeading,
    contactDescription,
    aboutStory,
    trustItems,
    navigationLinks[] {
      label,
      url,
      sectionHeading,
      sectionContent
    },
    whatsappNumber,
    instagramHandle,
    deliveryInfo
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Order interfaces
export interface OrderItem {
  productName: string
  productId: string
  quantity: number
  quantityLabel: string
  price: number
}

export interface CreateOrderData {
  customerName: string
  email: string
  items: OrderItem[]
  totalAmount: number
  needsShipping: boolean
  deliveryAddress?: string
  preferredDay: string
  preferredTime: string
  paymentMethod: 'zelle' | 'venmo' | 'credit-card'
}

// Create a new order
export async function createOrder(orderData: CreateOrderData): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    // Generate order number
    const orderNumber = `ORD-${Date.now()}`

    const order = {
      _type: 'order',
      orderNumber,
      customerName: orderData.customerName,
      email: orderData.email,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      needsShipping: orderData.needsShipping,
      deliveryAddress: orderData.deliveryAddress || '',
      preferredDay: orderData.preferredDay,
      preferredTime: orderData.preferredTime,
      paymentMethod: orderData.paymentMethod,
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    }

    const result = await writeClient.create(order)

    return {
      success: true,
      orderId: result._id,
    }
  } catch (error) {
    console.error('Error creating order:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
  }
}
