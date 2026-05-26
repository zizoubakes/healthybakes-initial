import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Use CDN for faster reads in production
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

export interface SiteSettings {
  _id: string
  storeName: string
  tagline: string
  heroHeadline: string
  heroSubtitle: string
  aboutStory: any[]
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
    aboutStory,
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
