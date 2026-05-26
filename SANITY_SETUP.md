# Sanity CMS Admin Panel Setup Guide

## What's Been Built

Your website now has a complete admin panel powered by Sanity CMS! Here's what's ready:

### Admin Panel Features
- **Product Management**: Add, edit, and delete products with images, descriptions, and prices
- **Order Tracking**: Manage customer orders with status tracking (new, confirmed, baking, ready, delivered, cancelled)
- **Site Settings**: Update WhatsApp number, delivery info, and other site-wide settings
- **Admin Interface**: Beautiful, user-friendly dashboard at `/studio`

### Dynamic Website
The homepage now automatically fetches and displays:
- All products from the CMS
- WhatsApp contact number from settings
- Delivery information from settings
- Product images uploaded through the admin panel

## Next Steps: Get Your Sanity Credentials

To activate the admin panel, you need to create a free Sanity account and get your project credentials. Follow these steps:

### Step 1: Create a Sanity Account

1. Go to https://www.sanity.io/get-started
2. Click "Get started" or "Sign up"
3. Sign up with your email, Google, or GitHub account (free plan is perfect for this)

### Step 2: Create a New Project

1. After signing in, you'll see the Sanity dashboard
2. Click "Create new project" or the "+" button
3. **Project Name**: Enter "Zizous Healthy Bakes" (or any name you prefer)
4. **Dataset**: Keep it as "production" (default)
5. Click "Create project"

### Step 3: Get Your Project ID

1. In your new project dashboard, look for the **Project ID**
2. It will look something like: `abc123xy` (a random string of letters and numbers)
3. **Copy this Project ID** - you'll need it in the next step

### Step 4: Add Credentials to Your Website

1. Open the file `.env.local` in your project folder
2. Replace `your_project_id_here` with your actual Project ID:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy  # ← Replace with YOUR project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

3. Save the file

### Step 5: Restart Your Development Server

1. Stop your current dev server (press Ctrl+C in the terminal)
2. Restart it with: `npm run dev`
3. The website will now connect to your Sanity CMS!

## Accessing the Admin Panel

### Local Development
1. Make sure your dev server is running (`npm run dev`)
2. Open your browser and go to: **http://localhost:3000/studio**
3. Log in with your Sanity account

### What You'll See
- **Products**: Manage all your bakery items
- **Orders**: Track customer orders (you'll manually add these from WhatsApp messages for now)
- **Site Settings**: Update phone numbers, delivery info, etc.

## How to Add Your First Product

1. Go to http://localhost:3000/studio
2. Click on "Products" in the left sidebar
3. Click the "+ Create" button
4. Fill in the details:
   - **Product Name**: e.g., "Date & Walnut Mini Cake"
   - **URL Slug**: Click "Generate" (it creates a URL-friendly version)
   - **Quantity Label**: e.g., "1 CAKE" or "12 MUFFINS"
   - **Product Image**: Upload a photo
   - **Description**: Short description (max 150 characters)
   - **Price**: Just the number, no $ sign
   - **Available for Order**: Toggle on/off
   - **Featured Product**: Toggle if you want it highlighted
5. Click "Publish" at the bottom

Your product will immediately appear on the website!

## Deploying to Production (Vercel)

Once you've tested locally and everything works:

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com
2. Click on your "healthy-bakes" project
3. Go to "Settings" → "Environment Variables"
4. Add these three variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = production
   - `NEXT_PUBLIC_SANITY_API_VERSION` = 2024-01-01

### Step 2: Redeploy

1. After saving the environment variables, Vercel will automatically redeploy
2. Or you can manually trigger a redeploy from the Deployments tab
3. Once deployed, you can access the admin panel at: **https://zizoubakes.com/studio**

## Managing Orders (Current Workflow)

Since online ordering isn't implemented yet, here's how to track orders:

1. Customer messages you on WhatsApp
2. You confirm the order details
3. Go to `/studio` → "Orders"
4. Click "+ Create" and add:
   - Customer name and phone
   - Copy/paste their WhatsApp message
   - Select products and quantities
   - Add delivery address and date
   - Set status (starts as "New Order")
5. Update the status as you progress: Confirmed → Baking → Ready → Delivered

## Tips for Your Wife

### Easy Content Updates
- **Change prices**: Edit any product and update the price field
- **Update photos**: Click on a product image to replace it
- **Hide products**: Toggle "Available for Order" to off (product won't show on site)
- **Update contact info**: Go to "Site Settings" to change WhatsApp number

### Image Best Practices
- Use square images (1:1 ratio) for products
- Minimum size: 800x800 pixels
- Keep file sizes reasonable (under 2MB)
- JPEG or PNG format

### Order Management
- Check the admin panel daily for order status updates
- Use the "Notes" field for internal reminders
- Archive old orders by changing status to "Delivered" or "Cancelled"

## Need Help?

If you run into any issues:
1. Make sure your `.env.local` file has the correct Project ID
2. Try restarting the dev server
3. Check that you're logged into Sanity when accessing `/studio`
4. Clear your browser cache if the admin panel doesn't load

## What's Next?

After you're comfortable with the admin panel, we can add:
- Online ordering with a shopping cart
- Automated order notifications
- Customer accounts
- Instagram integration
- Email order confirmations

For now, enjoy the admin panel and let me know how it works for you!
