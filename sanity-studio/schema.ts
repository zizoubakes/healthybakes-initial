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
      description: 'Main product image (optional)',
      options: {
        hotspot: true,
      },
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
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
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
              name: 'productName',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'productId',
              title: 'Product ID',
              type: 'string',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'quantityLabel',
              title: 'Quantity Label',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
          ],
          preview: {
            select: {
              productName: 'productName',
              quantity: 'quantity',
            },
            prepare({productName, quantity}: any) {
              return {
                title: `${quantity}x ${productName}`,
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
      name: 'needsShipping',
      title: 'Needs Shipping',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'deliveryAddress',
      title: 'Delivery Address',
      type: 'text',
      rows: 3,
    },
    {
      name: 'preferredDay',
      title: 'Preferred Day',
      type: 'string',
    },
    {
      name: 'preferredTime',
      title: 'Preferred Time',
      type: 'string',
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          {title: 'Zelle', value: 'zelle'},
          {title: 'Venmo', value: 'venmo'},
          {title: 'Credit Card', value: 'credit-card'},
        ],
      },
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'New Order', value: 'new'},
          {title: 'Payment Confirmed', value: 'payment-confirmed'},
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
    {
      name: 'heroRating',
      title: 'Hero Rating Text',
      type: 'string',
      description: 'Text shown below the hero buttons',
      initialValue: 'Loved by 200+ Northern VA families',
    },
    {
      name: 'shopHeading',
      title: 'Shop Section Heading',
      type: 'string',
      initialValue: 'Always Fresh —',
    },
    {
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
      initialValue: 'Ready to order?',
    },
    {
      name: 'contactDescription',
      title: 'Contact Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'Message us on WhatsApp to place your order or ask any questions. We\'re here to help!',
    },
    {
      name: 'trustItems',
      title: 'Trust Strip Items',
      type: 'array',
      description: 'The 4 trust indicators shown below the hero',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'emoji',
              title: 'Emoji Icon',
              type: 'string',
              description: 'Single emoji (e.g., 🍯, 🌱, 🥣, 💗)',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              emoji: 'emoji',
            },
            prepare({title, emoji}: any) {
              return {
                title: `${emoji} ${title}`,
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(4),
    },
    {
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Links in the main navigation menu. For hash links (#how), you can add section content below.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
              description: 'Text to display (e.g., "Shop", "How it works")',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Use #how for same-page links, or full URL like https://example.com',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'sectionHeading',
              title: 'Section Heading (Optional)',
              type: 'string',
              description: 'If this is a hash link (#how), enter the heading for this section',
            },
            {
              name: 'sectionContent',
              title: 'Section Content (Optional)',
              type: 'array',
              description: 'If this is a hash link (#how), enter the content for this section',
              of: [{type: 'block'}],
            },
          ],
          preview: {
            select: {
              label: 'label',
              url: 'url',
              hasContent: 'sectionContent',
            },
            prepare({label, url, hasContent}: any) {
              return {
                title: label,
                subtitle: `${url}${hasContent && hasContent.length > 0 ? ' (has content)' : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.max(6),
    },
  ],
};

export const schemas = [productSchema, orderSchema, siteSettingsSchema];
