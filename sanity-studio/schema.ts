// Sanity Schema for NourishBakes CMS
// This defines what content your wife can manage

export const productSchema = {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'For New Moms', value: 'new-moms' },
          { title: 'For Kids', value: 'kids' },
          { title: 'For Everyone', value: 'all' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(3).max(6),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'available',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
};

export const blogPostSchema = {
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'NourishBakes',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};

export const aboutPageSchema = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'ownerName',
      title: 'Your Name',
      type: 'string',
    },
    {
      name: 'ownerPhoto',
      title: 'Your Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'story',
      title: 'Your Story',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};

export const schemas = [productSchema, blogPostSchema, aboutPageSchema];
