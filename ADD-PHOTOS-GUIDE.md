# How to Add Your Cake Photos to the Website

## Step 1: Copy Images to Project

I can see you have 5 beautiful bundt cake photos! Here's how to add them:

### Manual Method (Easiest):

1. **Open Finder** and navigate to your Desktop
2. **Find these 5 screenshots** (the cake photos you just took)
3. **Drag and drop** them into this folder:
   ```
   /Users/reda.saidi/healthy-bakes/public/
   ```
4. **Rename them** as follows:
   - Orange/Cranberry cake → `cake1.png`
   - Chocolate chip bundt (top view) → `cake2.png`
   - Chocolate chip bundt (angle) → `cake3.png`
   - Bundt on decorative plate → `cake4.png`
   - Chocolate chip with slice → `cake5.png`

### OR Use Terminal:

```bash
# Navigate to Desktop
cd ~/Desktop

# Copy each file (use your actual screenshot names)
cp "Screenshot*.png" /Users/reda.saidi/healthy-bakes/public/cake1.png
# Repeat for each image
```

## Step 2: I'll Update the Code

Once the images are in `/Users/reda.saidi/healthy-bakes/public/`, the website code will automatically display them in:
- Homepage hero section
- Product cards
- About page
- Products page gallery

## Image Tips for Best Results:

### Current Photos (What I See):
✅ Great lighting and detail
✅ Nice plate presentation
✅ Appetizing colors
✅ Shows texture well

### To Make Them Even Better:
1. **Crop** - Remove excess background, focus on cake
2. **Brighten** - Slightly increase brightness for web
3. **Consistent Style** - Try to shoot all on same background

### Quick Photo Editing (Optional):
- Mac Preview: Open > Tools > Adjust Color > Increase exposure slightly
- Or use Photos app > Edit > Light slider

## What Photos Work Best:

**Hero Image** (Homepage top):
- Use the most appetizing shot
- Ideally shows whole cake with nice styling
- **Recommendation**: Use cake #4 (decorative plate)

**Product Cards**:
- Top-down or 45-degree angle
- Clean background
- Shows texture and ingredients
- **Recommendation**: Use cakes #2, #3, #5

**About Page**:
- Personal touch - you in the kitchen (optional)
- Or warm, inviting product shot
- **Recommendation**: Use cake #1 or #4

## Once Photos Are Added:

The website will automatically:
- Optimize images for web (Next.js does this)
- Create responsive versions
- Lazy load for fast page speeds
- Display them beautifully in the design

---

**Quick Check**: After copying, refresh the website at http://localhost:3000 to see your beautiful cakes live!
