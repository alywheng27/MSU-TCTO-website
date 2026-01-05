# How to Setup Multiple Photo Gallery in Sanity CMS

This guide will help you add a gallery field to your Article schema in Sanity CMS to support multiple photo uploads.

## 🚀 Quick Update: Set Minimum 5 Photos Requirement

**If you already have the gallery field set up**, here's how to add the minimum 5 photos requirement:

### Option A: In Sanity Studio Web Interface
1. Go to your Sanity Studio → Schema → Article
2. Find the `gallery` field
3. Click to edit it
4. In **Validation** section, set:
   - **Minimum items:** `5`
   - **Error message:** "Please upload at least 5 photos for the gallery"
5. Save changes

### Option B: In Schema File
Add this validation line to your existing gallery field:

```javascript
validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery')
```

**Complete example:**
```javascript
{
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery'),
  of: [
    {
      type: 'image',
      // ... rest of your image configuration
    }
  ]
}
```

---

## Option 1: Using Sanity Studio Web Interface (Recommended for Quick Setup)

### Step 1: Access Sanity Studio
1. Go to your Sanity Studio (usually at `https://your-project.sanity.studio` or your custom domain)
2. Log in with your credentials
3. Navigate to **Schema** or **Structure** in the left sidebar

### Step 2: Find and Edit Article Schema
1. Look for the **Article** schema/document type
2. Click on it to edit
3. You'll see the schema definition

### Step 3: Add Gallery Field
Add a new field called `gallery` with the following configuration:

**Field Name:** `gallery`
**Field Type:** `Array`
**Array of:** `Image`
**Options:**
- **Title:** "Photo Gallery"
- **Description:** "Upload multiple photos for the article gallery (minimum 5 photos required)"
- **Validation:** 
  - **Minimum:** 5 (require at least 5 photos)
  - **Maximum:** Unlimited (or set a max if needed)

**For each image in the array, enable:**
- ✅ **Crop & Hotspot** (for responsive images)
- ✅ **Alt Text** (for accessibility)
- ✅ **Caption** (optional text description)

### Step 4: Save and Deploy
1. Save your schema changes
2. The changes will be automatically deployed to your dataset

---

## Option 2: Using Schema Files (If You Have Local Sanity Studio)

If you have a local Sanity Studio setup, you can add the gallery field directly in your schema file.

### Step 1: Locate Article Schema File
Find your article schema file (usually in `schemas/article.js` or `schemas/article.ts`)

### Step 2: Add Gallery Field
Add this field to your article schema:

```javascript
{
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true, // Enable crop and hotspot
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption for the image',
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Important for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  description: 'Upload multiple photos for the article gallery (minimum 5 photos required)',
  validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery'),
  options: {
    layout: 'grid', // Display images in a grid in the studio
  },
}
```

### Step 3: Complete Article Schema Example
Here's how your complete article schema might look:

```javascript
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    // NEW GALLERY FIELD
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image',
              options: {
                isHighlighted: true,
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for accessibility and SEO',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: 'Upload multiple photos for the article gallery (minimum 5 photos required)',
      validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery'),
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    // ... other fields
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
```

---

## Step 3: Update API Query to Fetch Gallery Images

Update your `getArticle()` function in `src/api/api.jsx` to include the gallery field:

```javascript
export async function getArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt desc){
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
      caption,
    },
    // ADD GALLERY FIELD
    gallery[]{
      asset->,
      crop,
      hotspot,
      caption,
      alt,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const articles = await useSanityClient().fetch(query);
  return articles;
}
```

**Important:** Update ALL article query functions that you use, including:
- `getArticle()`
- `getSingleLatestArticle()`
- `getSearchArticle()`
- `getRelatedArticles()`
- Any other article queries

---

## Step 4: Update Frontend Code to Use Gallery Field

Update `src/pages/[...slug].astro` to use the new gallery field:

### Replace the gallery extraction code:

```javascript
// Extract all images for gallery (mainImage + gallery array + images from body)
const galleryImages: Array<{url: string, caption?: string, alt?: string}> = [];
const seenImageUrls = new Set<string>();

// Add main image first
if (mainImage?.asset?.url) {
  const mainImageUrl = urlForImage(mainImage.asset.url).width(1600).quality(90).url();
  if (!seenImageUrls.has(mainImageUrl)) {
    seenImageUrls.add(mainImageUrl);
    galleryImages.push({
      url: mainImageUrl,
      caption: mainImage.caption || title,
      alt: title
    });
  }
}

// Add gallery images (if gallery field exists)
if (article.gallery && Array.isArray(article.gallery)) {
  article.gallery.forEach((galleryImage: any) => {
    if (galleryImage?.asset?.url) {
      const imageUrl = urlForImage(galleryImage.asset.url).width(1600).quality(90).url();
      if (!seenImageUrls.has(imageUrl)) {
        seenImageUrls.add(imageUrl);
        galleryImages.push({
          url: imageUrl,
          caption: galleryImage.caption || '',
          alt: galleryImage.alt || title
        });
      }
    }
  });
}

// Extract images from body content blocks (optional - if you want to include body images)
body.forEach((block: any) => {
  if (block.asset?.url) {
    const imageUrl = urlForImage(block.asset.url).width(1600).quality(90).url();
    if (!seenImageUrls.has(imageUrl)) {
      seenImageUrls.add(imageUrl);
      galleryImages.push({
        url: imageUrl,
        caption: block.caption || '',
        alt: title
      });
    }
  }
});
```

### Update the destructuring at the top:

```javascript
const { title, author, publishedAt, articleSubject, college, topic, mainImage, body, gallery } = article;
```

---

## Step 5: Setting Minimum Photo Requirement (5 Photos)

### For Existing Gallery Field - Update Validation

If you already have the gallery field set up, you need to add validation to require at least 5 photos:

**In Schema Files:**
Add this validation rule to your existing gallery field:

```javascript
validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery')
```

**In Sanity Studio Web Interface:**
1. Go to your Article schema
2. Find the `gallery` field
3. Click on it to edit
4. Look for **Validation** settings
5. Set **Minimum items:** `5`
6. Add custom error message: "Please upload at least 5 photos for the gallery"
7. Save the changes

### Alternative: Set Maximum Too (Optional)

If you also want to limit the maximum number of photos:

```javascript
validation: (Rule) => 
  Rule.min(5)
    .max(20) // Optional: set maximum
    .error('Please upload between 5 and 20 photos for the gallery')
```

---

## Step 6: Using the Gallery in Sanity Studio

After setting up the schema:

1. **Create or Edit an Article:**
   - Go to your Sanity Studio
   - Create a new article or edit an existing one
   - Scroll to the "Photo Gallery" field

2. **Upload Multiple Photos (Minimum 5 Required):**
   - Click "Add item" in the gallery field
   - Upload an image
   - Add a caption (optional)
   - Add alt text (recommended for accessibility)
   - Repeat until you have at least 5 photos
   - **Note:** You'll see a validation error if you have fewer than 5 photos

3. **Reorder Photos:**
   - Drag and drop images to reorder them
   - The order in the studio will be the order in the gallery

4. **Remove Photos:**
   - Click the delete/trash icon on any image to remove it
   - **Note:** You cannot save the article if you have fewer than 5 photos

---

## Benefits of Using a Dedicated Gallery Field

✅ **Better Organization:** Gallery images are separate from body content images
✅ **Easier Management:** Content editors can easily manage gallery photos
✅ **Better Performance:** You can optimize gallery images separately
✅ **Flexible Ordering:** Easy to reorder images in the studio
✅ **Metadata:** Each image can have its own caption and alt text

---

## Troubleshooting

### Gallery field doesn't appear in Studio
- Make sure you saved the schema changes
- Refresh your browser
- Check if you're looking at the correct document type

### Validation error: "Please upload at least 5 photos"
- This is expected behavior when you have fewer than 5 photos
- Add more photos until you reach the minimum of 5
- The article cannot be published until the requirement is met

### Images not showing on frontend
- Verify the API query includes the gallery field
- Check browser console for errors
- Ensure `urlForImage()` is working correctly
- Verify image URLs are being generated properly

### Gallery is empty
- Make sure you've uploaded at least 5 images to the gallery field in Sanity Studio
- Check that the API query is fetching the gallery array
- Verify the gallery field name matches in schema and query

### Cannot save article with less than 5 photos
- This is by design - the validation requires at least 5 photos
- If you need to temporarily save a draft, you can:
  1. Upload placeholder images temporarily
  2. Or modify the validation to be less strict during development

---

## Next Steps

1. ✅ Add gallery field to Sanity schema
2. ✅ Update API queries to fetch gallery
3. ✅ Update frontend to display gallery
4. ✅ Test with sample images
5. ✅ Train content editors on using the gallery field

---

## Support

If you encounter any issues:
1. Check Sanity documentation: https://www.sanity.io/docs
2. Verify your schema matches the examples above
3. Check browser console for JavaScript errors
4. Verify API responses in Network tab

