# Sanity CMS Setup Guide for COED Programs

## Current Status ✅ FIXED!
The API is now working and displaying your program data! The issue was that your department documents had `null` values for the `name` and `title` fields, which prevented the COED filtering from working.

**Current Solution**: The system now fetches all programs and displays them with proper fallback values until you fix the department data in Sanity.

## Required Document Types

You need to create these document types in your Sanity Studio:

### 1. Department Document Type
```javascript
// In your Sanity schema files
export default {
  name: 'department',
  title: 'Department',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name (ID)',
      type: 'string',
      description: 'Internal identifier (e.g., "COED")',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name (e.g., "College of Education")',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name'
    }
  }
}
```

### 2. Degree Document Type
```javascript
export default {
  name: 'degree',
  title: 'Degree',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name (ID)',
      type: 'string',
      description: 'Internal identifier (e.g., "Bachelor")',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name (e.g., "Bachelor\'s Degree")',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name'
    }
  }
}
```

### 3. Level Document Type
```javascript
export default {
  name: 'level',
  title: 'Level',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name (ID)',
      type: 'string',
      description: 'Internal identifier (e.g., "Undergraduate")',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name (e.g., "Undergraduate Level")',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name'
    }
  }
}
```

### 4. Duration Document Type
```javascript
export default {
  name: 'duration',
  title: 'Duration',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name (ID)',
      type: 'string',
      description: 'Internal identifier (e.g., "4-years")',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name (e.g., "4 years")',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'name'
    }
  }
}
```

### 5. Program Document Type
```javascript
export default {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    },
    {
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: { type: 'department' },
      validation: Rule => Rule.required()
    },
    {
      name: 'degree',
      title: 'Degree',
      type: 'reference',
      to: { type: 'degree' },
      validation: Rule => Rule.required()
    },
    {
      name: 'level',
      title: 'Level',
      type: 'reference',
      to: { type: 'level' },
      validation: Rule => Rule.required()
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'reference',
      to: { type: 'duration' },
      validation: Rule => Rule.required()
    },
    {
      name: 'accreditation',
      title: 'Accreditation',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
```

## Step-by-Step Setup

### Step 1: Create Document Types
1. Go to your Sanity Studio
2. Navigate to Schema or Document Types
3. Add each of the document types above

### Step 2: Create Reference Documents
Create these documents in your Sanity Studio:

#### Department Document
- **Name (ID)**: `COED`
- **Title**: `College of Education`

#### Degree Documents
- **Name (ID)**: `Bachelor`, **Title**: `Bachelor's Degree`
- **Name (ID)**: `Master`, **Title**: `Master's Degree`
- **Name (ID)**: `Diploma`, **Title**: `Diploma`
- **Name (ID)**: `PhD`, **Title**: `PhD`

#### Level Documents
- **Name (ID)**: `Undergraduate`, **Title**: `Undergraduate Level`
- **Name (ID)**: `Graduate`, **Title**: `Graduate Level`
- **Name (ID)**: `Postgraduate`, **Title**: `Postgraduate Level`

#### Duration Documents
- **Name (ID)**: `4-years`, **Title**: `4 years`
- **Name (ID)**: `2-years`, **Title**: `2 years`
- **Name (ID)**: `1-year`, **Title**: `1 year`

### Step 3: Create Program Documents
Create program documents with:
- **Title**: Program name (e.g., "Bachelor of Science in Mathematics")
- **Description**: Program description
- **Department**: Select "College of Education" (COED)
- **Degree**: Select appropriate degree
- **Level**: Select appropriate level
- **Duration**: Select appropriate duration
- **Accreditation**: Accreditation status
- **File**: Upload PDF file (optional)

## ✅ Current Working Solution

Your program is now displaying! The system shows:
- **Program**: "BACHELOR OF EARLY CHILDHOOD EDUCATION (BECEd)"
- **Degree**: "Bachelor" (fallback value)
- **Level**: "Undergraduate" (fallback value)
- **Duration**: "4 years" (fallback value)
- **Accreditation**: "Level II Accreditation"
- **PDF File**: Properly linked and downloadable

## 🔧 To Enable Proper COED Filtering

To make the COED department filtering work properly, you need to update your existing department document in Sanity Studio:

### Step 1: Fix the Department Document
1. Go to your Sanity Studio
2. Find the department document with ID: `cfae8a05-40a9-497a-936c-6fbb2b64308b`
3. Update the fields:
   - **Name (ID)**: `COED`
   - **Title**: `College of Education`
4. Save the document

### Step 2: Update the API Query
Once you fix the department data, change this line in `src/api/api.jsx` (around line 1590):

```javascript
// Current query (shows all programs):
const query = groq`*[_type == "program"] { ... }`;

// Change to this (filters by COED department):
const query = groq`*[_type == "program" && department._ref in *[_type=="department" && name=="COED"]._id] { ... }`;
```

## Testing

After fixing the department data:
1. Save the department document in Sanity Studio
2. Update the API query in the code
3. Check your terminal for debug output
4. Visit your website to see only COED programs displayed

## Troubleshooting

If you still have issues:
1. Check the terminal debug output for specific errors
2. Verify the department document has `name: "COED"` (not null)
3. Ensure programs are linked to the correct department
4. Test the debug API: `http://localhost:4322/api/debug-sanity`

The debug output will show you exactly what's in your database!
