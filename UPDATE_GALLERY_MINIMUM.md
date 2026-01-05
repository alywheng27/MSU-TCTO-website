# Quick Guide: Set Minimum 5 Photos for Gallery

## ✅ Yes, it's possible! Here's how to update your existing gallery field:

---

## Method 1: Using Sanity Studio Web Interface (Easiest)

1. **Open Sanity Studio**
   - Go to your Sanity Studio URL
   - Log in

2. **Navigate to Schema**
   - Click on **Schema** or **Structure** in the left sidebar
   - Find and click on **Article** document type

3. **Edit Gallery Field**
   - Find the `gallery` field in your schema
   - Click on it to edit

4. **Add Validation**
   - Look for **Validation** or **Rules** section
   - Set **Minimum items:** `5`
   - Set **Error message:** `"Please upload at least 5 photos for the gallery"`
   - Save changes

5. **Test It**
   - Try to save an article with less than 5 photos
   - You should see the validation error
   - Add 5+ photos and it should save successfully

---

## Method 2: Using Schema Code (If You Have Local Studio)

If you have access to your schema files, add this validation rule:

### Find Your Gallery Field
Look for this in your schema file:
```javascript
{
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  // ... rest of config
}
```

### Add Validation
Add this line inside the gallery field definition:

```javascript
{
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery'),
  of: [
    // ... your image configuration
  ]
}
```

### Complete Example
```javascript
{
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  validation: (Rule) => Rule.min(5).error('Please upload at least 5 photos for the gallery'),
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
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  description: 'Upload at least 5 photos for the article gallery',
  options: {
    layout: 'grid',
  },
}
```

---

## Optional: Set Maximum Too

If you want to limit the maximum number of photos as well:

```javascript
validation: (Rule) => 
  Rule.min(5)
    .max(20) // Optional: maximum 20 photos
    .error('Please upload between 5 and 20 photos for the gallery')
```

---

## What Happens After Update?

✅ **Articles with 5+ photos:** Will save and publish normally
❌ **Articles with less than 5 photos:** Will show validation error and cannot be published
⚠️ **Existing articles with less than 5 photos:** Will show validation warnings but won't break

---

## Troubleshooting

### "I can't find the validation option"
- Make sure you're editing the field, not just viewing it
- Some Sanity Studio versions have validation in different places
- Try looking for "Rules", "Constraints", or "Validation Rules"

### "The validation isn't working"
- Make sure you saved the schema changes
- Refresh your browser
- Check that you're editing the correct field name (`gallery`)

### "I want to make it optional sometimes"
You can make it conditional:
```javascript
validation: (Rule) => Rule.custom((value) => {
  // Allow empty or require 5+
  if (!value || value.length === 0) return true;
  if (value.length < 5) return 'Please upload at least 5 photos';
  return true;
})
```

---

## Need Help?

- Check the main guide: `SANITY_GALLERY_SETUP.md`
- Sanity Docs: https://www.sanity.io/docs/validation
- The validation will work immediately after saving!

