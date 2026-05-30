# Sanity API Token Setup

To allow customers to place orders through the website, you need to create a Sanity API token with write permissions.

## Steps to Get Your Sanity API Token:

1. **Go to Sanity Management Console**
   - Visit: https://www.sanity.io/manage
   - Log in with your account

2. **Select Your Project**
   - Click on "healthy-bakes" (project ID: yd2edpff)

3. **Go to API Settings**
   - Click on "API" in the left sidebar
   - Scroll down to "Tokens"

4. **Create a New Token**
   - Click "Add API token"
   - Name it: "Website Orders"
   - Permissions: Select "Editor" (this allows read and write)
   - Click "Add token"

5. **Copy the Token**
   - **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
   - It looks like: `sk...` (a long string of characters)

6. **Add Token to .env.local**
   - Open `/Users/reda.saidi/healthy-bakes/.env.local`
   - Add this line at the end:
   ```
   SANITY_API_TOKEN=sk_your_actual_token_here
   ```
   - Replace `sk_your_actual_token_here` with the token you copied

7. **Restart the Dev Server**
   - Stop the current dev server (Ctrl+C)
   - Run: `npm run dev`

## How Orders Work Now:

**WITHOUT Token** (Current State):
- Customers can add items to cart
- Customers can fill out checkout form
- Customers can see payment instructions
- **BUT orders won't save to Sanity**

**WITH Token** (After Setup):
- ✅ Everything above PLUS:
- Orders automatically save to Sanity CMS
- You can view all orders at: http://localhost:3000/studio
- Click on "Orders" in the Sanity Studio sidebar
- Each order shows: customer info, items, payment method, delivery details
- NO WhatsApp popup (you check orders in the admin panel)

## Viewing Orders:

1. Go to: http://localhost:3000/studio
2. Click "Orders" in the sidebar
3. See all orders sorted by newest first
4. Click any order to see full details
5. Update order status (New → Payment Confirmed → Baking → Ready → Delivered)

## Security Note:

- **NEVER** commit `.env.local` to git (it's already in .gitignore)
- **NEVER** share your API token publicly
- The token allows full read/write access to your Sanity data

## Need Help?

If you have any issues:
1. Make sure the token starts with `sk`
2. Make sure there are no extra spaces in .env.local
3. Make sure you restarted the dev server after adding the token
