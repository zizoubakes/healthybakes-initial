# NourishBakes Website

A beautiful, professional website for a healthy bakery business specializing in organic treats for new mothers and growing children.

## ✨ Features

- **Modern, Clean Design**: Warm color palette with organic aesthetic (sage green, terracotta, cream)
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Easy Content Management**: Ready for Sanity CMS - your wife can update products without coding
- **Product Catalog**: Filterable products by category (New Moms, Kids, Everyone)
- **Contact Form**: Built-in order/inquiry form
- **SEO Optimized**: Built with Next.js for great performance and search rankings

## 📄 Pages

1. **Home** (`/`) - Hero section, benefits, featured products, call-to-action
2. **Products** (`/products`) - Full product catalog with category filtering
3. **About** (`/about`) - Your story, values, and mission
4. **Contact** (`/contact`) - Order form and contact information

## 🎨 Design Philosophy

The design was inspired by top bakery websites (Forma Bakery, Morpho Bakery, Bread Alone) with:
- **Playfair Display** serif font for headers (elegant, professional)
- **Inter** sans-serif for body text (modern, readable)
- Natural color palette inspired by organic ingredients
- Ample white space and clean layouts
- High-quality imagery placeholders for your photos

## 🚀 Getting Started

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🎯 Next Steps

### 1. Add Your Photos

Replace the placeholder images with high-quality photos of your baked goods:
- Take photos with natural lighting
- Use consistent backgrounds (white or light wood)
- Show texture and details
- Include lifestyle shots (kids eating, moms enjoying)

Place images in the `/public` folder and update the image paths in the code.

### 2. Customize Content

Update the following files with your information:
- `/app/page.tsx` - Edit hero text and product descriptions
- `/app/about/page.tsx` - Add your personal story and name
- `/app/components/Footer.tsx` - Update contact email and phone
- `/app/components/Navigation.tsx` - Update brand name
- Brand name "NourishBakes" - Search and replace with your chosen name

### 3. Set Up Sanity CMS (Recommended for Easy Content Management)

For your wife to manage content easily without coding:

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create Sanity project
cd /Users/reda.saidi/healthy-bakes
npx sanity init

# Follow prompts to set up your project
# Start Sanity Studio
cd sanity
npm run dev
```

This creates an admin panel where she can:
- ✅ Add/edit products
- ✅ Upload photos
- ✅ Update prices and descriptions
- ✅ Publish blog posts
- ✅ All without touching code!

The schema is already created in `/sanity-studio/schema.ts` with fields for products, blog posts, and about page.

### 4. Connect Contact Form

Currently, the form logs to console. To make it functional:

**Option 1: Web3Forms (Easiest, Free)**
```bash
# Sign up at web3forms.com for free
# Get your access key
# Add to environment variables
```

**Option 2: EmailJS (Easy, Free tier)**
```bash
npm install @emailjs/browser
```
Then follow EmailJS docs to send form submissions to your email.

**Option 3: Formspree**
Update the form in `/app/contact/page.tsx` to use Formspree endpoint.

### 5. Deploy to Production

**Recommended: Vercel (Free, Made by Next.js creators)**

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!
5. Get a custom domain (e.g., nourishbakes.com)

Vercel offers:
- ✅ Free hosting for small sites
- ✅ Automatic deployments on every push
- ✅ Built-in SSL/HTTPS
- ✅ Global CDN for fast loading worldwide

**Alternatives**: Netlify, Railway, or DigitalOcean

## 🎨 Color Palette

```css
--cream: #FDFBF7         /* Main backgrounds */
--sage: #8FA88F           /* Primary buttons, CTAs */
--sage-light: #B8CBB8     /* Accents, highlights */
--terracotta: #D4816F     /* Secondary accents */
--warm-beige: #E8DCC8     /* Secondary backgrounds */
--olive: #5C6B5A          /* Text, headers */
--soft-white: #FFFEF9     /* Pure white alternative */
```

To change colors, edit `/app/globals.css` and update the CSS variables in `:root`.

## 🛠 Tech Stack

- **Next.js 16** - React framework for production
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling for rapid development
- **Sanity CMS** - Headless CMS for content management (optional)
- **React** - UI library

## 📁 File Structure

```
healthy-bakes/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Navigation.tsx   # Top navigation bar
│   │   └── Footer.tsx       # Footer with links
│   ├── about/              # About page
│   │   └── page.tsx
│   ├── products/           # Products page
│   │   └── page.tsx
│   ├── contact/            # Contact page
│   │   └── page.tsx
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles & colors
├── sanity-studio/          # CMS configuration
│   └── schema.ts           # Content schema
├── public/                 # Static files (add images here)
├── package.json
└── README.md
```

## 📝 Common Tasks

### Adding New Products

Edit `/app/products/page.tsx` and add to the `products` array:

```typescript
{
  id: 9,
  name: 'Your New Product',
  category: 'new-moms', // or 'kids' or 'all'
  description: 'Short description...',
  ingredients: 'List ingredients here',
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  price: '$24.99'
}
```

### Updating Brand Name

Search for "NourishBakes" across all files and replace with your chosen name.

### Changing Colors

Edit `/app/globals.css` and modify the color variables in the `:root` section.

### Adding SEO Meta Tags

Edit `/app/layout.tsx` to add:
```typescript
export const metadata = {
  title: 'Your Bakery Name',
  description: 'Your description here',
}
```

## 💡 Tips for Your Wife (Once Sanity is Set Up)

1. **Log in**: Go to `yourdomain.com/studio` (or `localhost:3333` locally)
2. **Add Products**:
   - Click "Products" in sidebar
   - Click "Create" button
   - Fill in product name, description, price
   - Upload photo by dragging and dropping
   - Click "Publish"
3. **Changes are instant**: Once published, they appear on the website immediately
4. **No coding needed**: Everything is point-and-click!

## 🔒 Security Notes

- Never commit API keys or secrets to GitHub
- Use environment variables for sensitive data
- Add `.env.local` to `.gitignore`

## 📈 Analytics & SEO (Optional Next Steps)

1. **Google Analytics**: Add tracking code to measure visitors
2. **Google Search Console**: Submit sitemap for better SEO
3. **Social Media Tags**: Add Open Graph tags for better sharing
4. **Performance**: Images are already optimized by Next.js

## ❓ Questions or Issues?

Common issues:
- **Port already in use**: Change port with `npm run dev -- -p 3001`
- **Module not found**: Run `npm install` again
- **Build errors**: Check the error message and fix syntax issues

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sanity CMS Guide](https://www.sanity.io/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

Built with ❤️ for families who care about health and nutrition.

**Current Status**: ✅ Website is ready to customize and deploy!
