// Sanity Schema for Zizou's Healthy Bakes CMS

export const productSchema = {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'e.g., Date & Walnut Mini Cake',
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
      name: 'quantity',
      title: 'Quantity Label',
      type: 'string',
      description: 'e.g., "1 CAKE", "12 MUFFINS", "1 SLICE"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Section Image (Optional)',
      type: 'image',
      description: 'Use a different image for the hero cards. If not set, will use main product image.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description for the product card',
      validation: (Rule: any) => Rule.required().max(150),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in dollars (no $ symbol)',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'available',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show in hero section',
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3). Leave blank to sort by newest first.',
      validation: (Rule: any) => Rule.integer().min(0),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'quantity',
      media: 'image',
    },
    prepare({title, subtitle, media}: any) {
      return {
        title,
        subtitle: `${subtitle}`,
        media,
      };
    },
  },
};

export const orderSchema = {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'whatsappMessage',
      title: 'WhatsApp Message',
      type: 'text',
      rows: 5,
      description: 'Copy the message from WhatsApp',
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'product'}],
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              product: 'product.name',
              quantity: 'quantity',
            },
            prepare({product, quantity}: any) {
              return {
                title: `${quantity}x ${product}`,
              };
            },
          },
        },
      ],
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      description: 'Total in dollars',
    },
    {
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'text',
      rows: 3,
    },
    {
      name: 'deliveryDate',
      title: 'Delivery Date',
      type: 'date',
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'New Order', value: 'new'},
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'Baking', value: 'baking'},
          {title: 'Ready for Delivery', value: 'ready'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'new',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes about the order',
    },
    {
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      customerName: 'customerName',
      orderNumber: 'orderNumber',
      status: 'status',
      total: 'totalAmount',
    },
    prepare({customerName, orderNumber, status, total}: any) {
      return {
        title: `${orderNumber} - ${customerName}`,
        subtitle: `${status} • $${total}`,
      };
    },
  },
};

export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      initialValue: "Zizou's Healthy Bakes",
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Organic · Handmade · Mom-approved',
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'aboutStory',
      title: 'About Story',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code (e.g., +17572771735)',
      initialValue: '+17572771735',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without @ symbol',
    },
    {
      name: 'deliveryInfo',
      title: 'Delivery Information',
      type: 'text',
      rows: 2,
      initialValue: 'Order by 8pm · we bake & deliver next day.',
    },
  ],
};

export const schemas = [productSchema, orderSchema, siteSettingsSchema];
