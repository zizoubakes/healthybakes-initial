# Quick Start Guide for Your Wife's Bakery Website

## What You Have

A fully functional, professional bakery website with:
- ✅ Beautiful homepage with hero section
- ✅ Product catalog with 8 sample products
- ✅ About page ready for your story
- ✅ Contact form for orders
- ✅ Mobile-responsive design
- ✅ Professional color scheme (organic greens, terracotta, cream)
- ✅ SEO optimized for local search

**Location**: `/Users/reda.saidi/healthy-bakes`

## View the Website

```bash
cd /Users/reda.saidi/healthy-bakes
npm run dev
```

Then open **http://localhost:3000** in your browser

## Immediate Next Steps

### 1. Customize the Content (15 minutes)

**Update Brand Name:**
- Open VS Code or any text editor
- Search for "NourishBakes" across all files
- Replace with your actual business name

**Update Contact Info:**
- File: `/app/components/Footer.tsx`
- Change: Email, phone number, social media links

**Add Your Story:**
- File: `/app/about/page.tsx`
- Replace `[Your Name]` with your wife's name
- Update the story paragraphs with her real story

### 2. Add Photos (30 minutes)

Take high-quality photos:
- Natural lighting (near window)
- White or light wood background
- Show texture and detail
- Both product and lifestyle shots

Save photos in `/public/images/` folder, then update image paths in:
- `/app/page.tsx` (homepage)
- `/app/products/page.tsx` (product cards)
- `/app/about/page.tsx` (personal photo)

### 3. Update Products (10 minutes)

File: `/app/products/page.tsx`

Edit the `products` array with your actual products, prices, and descriptions.

### 4. Deploy to Internet (30 minutes)

**Recommended: Vercel (Free)**

1. Create GitHub account (if needed): https://github.com
2. Install GitHub Desktop or use command line:
   ```bash
   cd /Users/reda.saidi/healthy-bakes
   git init
   git add .
   git commit -m "Initial website"
   gh repo create healthy-bakes --public --source=. --remote=origin --push
   ```

3. Go to https://vercel.com and sign in with GitHub
4. Click "Import Project"
5. Select your repository
6. Click "Deploy" (takes 2 minutes)
7. Get your live URL: `your-site.vercel.app`

### 5. Get a Custom Domain (optional, $12/year)

Buy domain from:
- Namecheap.com
- GoDaddy.com
- Google Domains

Common name ideas:
- [YourName]Bakes.com
- NourishBakes.com
- HealthyTreats[YourCity].com

Connect domain in Vercel dashboard → Settings → Domains

## For Your Wife: Easy Content Management

### Option 1: Manual Updates (She edits code files)
- Show her how to edit `/app/products/page.tsx`
- She updates products array
- Save file
- Deploy updates via Vercel (automatic from GitHub)

### Option 2: Sanity CMS (Recommended - No Code Required)

**Setup (you do this once):**

```bash
cd /Users/reda.saidi/healthy-bakes
npm install -g @sanity/cli
npx sanity init
```

Follow prompts:
- Create project
- Choose dataset name: "production"
- Choose template: "Clean project"

Then she can:
1. Go to https://your-project.sanity.studio
2. Log in with Google/GitHub
3. Add products via point-and-click interface
4. Upload photos by dragging
5. Changes appear instantly on website

## Connect Contact Form

**Easiest Option: Web3Forms (Free)**

1. Go to https://web3forms.com
2. Sign up free
3. Get your Access Key
4. Add to `/app/contact/page.tsx`:
   ```typescript
   const res = await fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     body: JSON.stringify({
       access_key: 'YOUR_KEY_HERE',
       ...formData
     })
   });
   ```

Submissions will go to your email!

## Common Questions

**Q: How do I update the website?**
A: Edit files → Save → Push to GitHub → Vercel auto-deploys (2 min)

**Q: Can my wife update it without coding?**
A: Yes! Set up Sanity CMS (step 5 above) for visual editing

**Q: How much does hosting cost?**
A: $0 on Vercel for small sites. Domain is ~$12/year.

**Q: What if something breaks?**
A: Git keeps all versions. You can always roll back in Vercel dashboard.

**Q: How do I add payments?**
A: Integrate Stripe or PayPal (or start with form → manual invoicing)

## File Reference

Key files you'll edit most:
- `/app/products/page.tsx` - Product catalog
- `/app/about/page.tsx` - About/story page
- `/app/components/Footer.tsx` - Contact info
- `/app/globals.css` - Colors and styling
- `/app/page.tsx` - Homepage content

## Support

If you need help:
1. Check README.md for detailed instructions
2. Search Stack Overflow
3. Ask ChatGPT/Claude specific questions
4. Next.js docs: https://nextjs.org/docs

## Design Colors

Current palette (change in `/app/globals.css`):
- **Sage Green** (#8FA88F) - Main buttons
- **Terracotta** (#D4816F) - Accents
- **Cream** (#FDFBF7) - Background
- **Olive** (#5C6B5A) - Text/headers

## Success Checklist

- [ ] Updated business name throughout
- [ ] Added real photos
- [ ] Updated contact information
- [ ] Customized about page with wife's story
- [ ] Added real products and prices
- [ ] Tested contact form
- [ ] Deployed to Vercel
- [ ] (Optional) Connected custom domain
- [ ] (Optional) Set up Sanity CMS

---

**You're ready to launch!** 🚀

The website is professional, mobile-friendly, and ready for customers. Focus on getting great product photos - they'll make the biggest difference in attracting customers.
