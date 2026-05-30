# Email Notification System Setup

Your website now has a complete email notification system for order confirmations and tracking!

## Overview

When a customer places an order, the system automatically sends:
1. **Customer Confirmation Email** - Sent to the customer with their order details
2. **Owner Notification Email(s)** - Sent to your business email(s) alerting you of the new order

## Setup Steps

### 1. Create a Resend Account (FREE)

1. Go to https://resend.com/signup
2. Sign up for a free account
   - **Free Tier**: 3,000 emails/month, 100 emails/day
   - No credit card required
   - More than enough for a small bakery business

### 2. Get Your Resend API Key

1. Log in to your Resend account
2. Go to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Zizou's Healthy Bakes - Production")
5. Copy the API key (starts with `re_`)

### 3. Add API Key to Your Environment

**For Local Development:**
1. Open `/Users/reda.saidi/healthy-bakes/.env.local`
2. Find the line: `RESEND_API_KEY=`
3. Add your API key after the equals sign:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
4. Save the file

**For Production (Vercel):**
```bash
npx vercel env add RESEND_API_KEY production --value re_your_actual_api_key_here --yes
```

Then redeploy:
```bash
git push origin main
```

### 4. Verify Your Domain (Recommended)

By default, Resend sends emails from `onboarding@resend.dev`. To use your own domain (e.g., `orders@zizoubakes.com`):

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `zizoubakes.com`
4. Follow the DNS setup instructions (add TXT and MX records)
5. Wait for verification (usually 5-10 minutes)

**If you skip this step**: Emails will still work, but they'll come from `onboarding@resend.dev` instead of your custom email.

### 5. Configure Email Settings in Sanity Studio

1. Go to https://www.zizoubakes.com/studio
2. Click on **Site Settings**
3. Scroll down to the email settings section
4. Configure:
   - **Business Email**: `orders@zizoubakes.com` (or keep default if domain not verified)
   - **Order Notification Emails**: Add your email(s) - you can add multiple!
     - Example: `reda@example.com`, `zizou@example.com`
   - **Enable Email Notifications**: Toggle ON
   - **Business Name (for emails)**: Should be "Zizou's Healthy Bakes"

5. Click **Publish**

## How It Works

### When a Customer Places an Order:

1. Order is saved to Sanity CMS
2. Customer receives a confirmation email with:
   - Order number
   - All items ordered
   - Total amount
   - Payment method
   - Delivery/pickup details
   - Preferred day & time
   - Contact information

3. You receive a notification email with:
   - Customer name and email
   - Order number
   - All order details
   - Link to view the order in Studio

### Customer Order Tracking:

Customers can track their orders at: **https://www.zizoubakes.com/track-order**

They enter:
- Order number (e.g., `ORD-1779826234712`)
- Email address

They'll see:
- Current order status
- Status timeline (Order Placed → Payment Confirmed → Baking → Ready → Delivered)
- Order items and total
- Delivery information

## Email Templates

### Customer Confirmation Email

**Subject**: Order Confirmation #ORD-123 - Zizou's Healthy Bakes

**Contents**:
- Thank you message
- Order number
- Items ordered with quantities and prices
- Total amount
- Payment method
- Delivery/pickup details
- Contact information

### Owner Notification Email

**Subject**: 🔔 New Order #ORD-123 from Jane Smith

**Contents**:
- Alert banner
- Customer name and email
- Order number
- Items ordered
- Total amount
- Payment method
- Delivery details
- Link to view in Studio

## Managing Email Notifications

### Turn Off Notifications Temporarily

1. Go to https://www.zizoubakes.com/studio
2. Click **Site Settings**
3. Find **Enable Email Notifications**
4. Toggle OFF
5. Click **Publish**

Orders will still be saved, but no emails will be sent.

### Add/Remove Notification Emails

1. Go to https://www.zizoubakes.com/studio
2. Click **Site Settings**
3. Find **Order Notification Emails**
4. Add or remove email addresses
5. Click **Publish**

## Testing the System

### Test Locally:

1. Make sure `RESEND_API_KEY` is set in `.env.local`
2. Start the dev server: `npm run dev`
3. Place a test order on http://localhost:3000
4. Check the console for email sending logs
5. Check your email inbox

### Test in Production:

1. Make sure `RESEND_API_KEY` is set in Vercel
2. Configure email settings in Studio
3. Place a test order on https://www.zizoubakes.com
4. Check your email inbox

## Troubleshooting

### Emails Not Sending

1. **Check Resend API Key**:
   - Make sure `RESEND_API_KEY` is set in environment variables
   - Verify the key starts with `re_`
   - Check Resend dashboard for API key validity

2. **Check Email Notifications Setting**:
   - Go to Studio → Site Settings
   - Make sure **Enable Email Notifications** is ON
   - Make sure **Order Notification Emails** has at least one email

3. **Check Resend Dashboard**:
   - Go to https://resend.com/emails
   - See if emails are being sent but bouncing
   - Check for error messages

4. **Check Server Logs**:
   - Look for errors in the console
   - Common errors:
     - "RESEND_API_KEY is not configured"
     - "Email service not configured"
     - "Invalid API key"

### Emails Going to Spam

1. **Verify Your Domain**: Follow Step 4 above
2. **Check SPF/DKIM Records**: Resend provides these automatically when domain is verified
3. **Send from Verified Domain**: Use `orders@zizoubakes.com` instead of `onboarding@resend.dev`

### Domain Verification Failing

1. Make sure you added the DNS records to your domain registrar (GoDaddy, Namecheap, etc.)
2. Wait 5-10 minutes for DNS propagation
3. Use online DNS checkers to verify records are active
4. Contact Resend support if issues persist

## Future Enhancements

You can extend this system to:
- Send status update emails when you change order status
- Send reminder emails for pickup/delivery
- Send thank you emails after delivery
- Send promotional emails for new products
- Send weekly order summaries to yourself

## Cost Analysis

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day

**Your Usage:**
- 2 emails per order (customer + owner)
- 50 orders/month = 100 emails/month
- **Cost: $0/month** ✅

**If you grow beyond free tier:**
- Paid plan: $20/month for 50,000 emails
- More than enough for a growing business

## Support

### Resend Documentation
- https://resend.com/docs

### Resend Support
- https://resend.com/support
- Email: support@resend.com

### Domain Verification Help
- https://resend.com/docs/dashboard/domains/introduction

## Security

- **Never commit `.env.local` to git** (it's already in `.gitignore`)
- **Never share your Resend API key** publicly
- **Use separate API keys** for development and production
- **Rotate API keys periodically** for security

---

## Quick Reference

### Environment Variables:
```bash
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_SITE_URL=https://www.zizoubakes.com
```

### Important URLs:
- Order Tracking: https://www.zizoubakes.com/track-order
- Sanity Studio: https://www.zizoubakes.com/studio
- Resend Dashboard: https://resend.com

### Customer Support:
- WhatsApp: +1-757-277-1735
- Track Order: Share link to /track-order page

---

**Questions?** Check the Resend documentation or reach out to their support team. They're very responsive!
