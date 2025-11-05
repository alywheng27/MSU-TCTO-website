# Mobile Quick Reference Card 🚀

## 📏 Responsive Class Patterns

### Typography (Mobile → Desktop)
```html
<!-- Headings -->
<h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
<h2 class="text-2xl sm:text-3xl md:text-4xl">
<h3 class="text-lg sm:text-xl md:text-2xl">

<!-- Body Text -->
<p class="text-sm sm:text-base md:text-lg">
<span class="text-xs sm:text-sm md:text-base">
```

### Spacing (Mobile → Desktop)
```html
<!-- Section Padding -->
<section class="py-12 sm:py-16 md:py-20">

<!-- Container Padding -->
<div class="px-4 sm:px-6">

<!-- Card Padding -->
<div class="p-4 sm:p-6 md:p-8">

<!-- Gap Between Elements -->
<div class="gap-4 sm:gap-6 md:gap-8">
```

### Buttons (Touch-Optimized)
```html
<!-- Primary Button -->
<button class="
    px-6 sm:px-8 
    py-4 
    text-sm sm:text-base 
    min-h-[48px] 
    touch-manipulation 
    active:scale-95 
    transition-all
">

<!-- Icon Button -->
<button class="
    p-3 sm:p-4 
    min-w-[48px] 
    min-h-[48px] 
    flex items-center justify-center 
    touch-manipulation 
    active:scale-95
">
```

### Grids (Mobile → Desktop)
```html
<!-- 1 → 2 → 3 Columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

<!-- 1 → 2 → 3 → 5 Columns (Faculty) -->
<div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

<!-- Span Multiple Columns on Tablet -->
<div class="sm:col-span-2 md:col-span-1">
```

### Flexbox Layouts
```html
<!-- Stack on Mobile, Row on Desktop -->
<div class="flex flex-col sm:flex-row gap-4">

<!-- Reverse on Mobile -->
<div class="flex flex-col-reverse lg:flex-row">

<!-- Center on Mobile, Start on Desktop -->
<div class="items-center sm:items-start">
```

### Images (Responsive)
```html
<!-- Profile Images -->
<img class="
    w-28 h-28 
    sm:w-32 sm:h-32 
    md:w-36 md:h-36 
    lg:w-40 lg:h-40 
    lazy-image
" loading="lazy">

<!-- Card Images -->
<div class="h-56 sm:h-64 md:h-80 lg:h-96">
    <img class="w-full h-full object-cover lazy-image" loading="lazy">
</div>
```

### Form Inputs (iOS-Safe)
```html
<input class="
    w-full 
    px-4 
    py-3 sm:py-4 
    text-sm sm:text-base 
    min-h-[48px] 
    touch-manipulation
    rounded-lg
    border border-gray-300
    focus:ring-2 focus:ring-msu-main-color
">

<select class="
    px-4 
    py-3 
    text-sm sm:text-base 
    min-h-[48px] 
    touch-manipulation
">

<textarea class="
    px-4 
    py-3 
    text-sm sm:text-base 
    min-h-[120px] 
    resize-y 
    touch-manipulation
">
```

---

## 🎯 Touch Target Sizes

```
Minimum Sizes (WCAG AAA):
├─ Buttons:      44 x 44 px
├─ Links:        44 x 44 px  
├─ Inputs:       48 x 48 px
├─ Selects:      48 x 48 px
└─ Submit:       52 x 48 px
```

### Implementation
```html
<!-- Standard Button -->
<button class="min-h-[48px] min-w-[44px]">

<!-- Icon Button -->  
<button class="w-12 h-12 min-w-[48px] min-h-[48px]">

<!-- Input Field -->
<input class="min-h-[48px]">

<!-- Submit Button -->
<button type="submit" class="min-h-[52px]">
```

---

## 🔧 Essential Mobile Classes

### Must-Have on Interactive Elements
```html
class="
    min-h-[44px]          /* Apple/Android guideline */
    touch-manipulation    /* Better touch response */
    active:scale-95       /* Visual feedback */
    transition-all        /* Smooth animation */
"
```

### iOS-Specific Classes
```html
<!-- Video (Autoplay) -->
<video autoplay muted loop playsinline>

<!-- Forms (No Zoom) -->
<input class="text-base" style="font-size: 16px;">
```

### Prevent Issues
```html
<!-- No Horizontal Scroll -->
<div class="overflow-x-hidden w-full">

<!-- No Text Overflow -->
<p class="break-words px-4">

<!-- No Select Highlight -->
<div class="select-none">
```

---

## 📱 Breakpoint Quick Reference

```css
/* Tailwind Default Breakpoints */
xs:  375px   (Custom - very small phones)
sm:  640px   (Large phones, small tablets)
md:  768px   (Tablets)
lg:  1024px  (Small desktops, large tablets)
xl:  1280px  (Desktops)
2xl: 1536px  (Large desktops)
```

### Common Patterns
```html
<!-- Hide on Mobile, Show on Desktop -->
<div class="hidden lg:block">

<!-- Show on Mobile, Hide on Desktop -->
<div class="block lg:hidden">

<!-- Different Sizes -->
<div class="w-full lg:w-1/2">
```

---

## 🎨 Common Component Patterns

### Card Component
```html
<div class="
    bg-white 
    rounded-xl 
    shadow-lg 
    overflow-hidden 
    transition-transform 
    duration-300 
    hover:-translate-y-2 
    active:scale-95 
    touch-manipulation
">
    <div class="p-4 sm:p-6">
        <h3 class="text-lg sm:text-xl font-bold mb-2">Title</h3>
        <p class="text-sm sm:text-base text-gray-600">Description</p>
        <button class="
            mt-4 
            px-4 py-3 
            min-h-[48px] 
            touch-manipulation 
            active:scale-95
        ">
            Action
        </button>
    </div>
</div>
```

### Modal Component
```html
<div id="modal" class="fixed inset-0 z-50 hidden">
    <div class="
        max-w-4xl            /* Desktop width */
        max-w-full sm:max-w-4xl  /* Full width mobile */
        max-h-screen         /* Don't exceed viewport */
        overflow-y-auto      /* Scrollable content */
        mx-4 sm:mx-auto      /* Side margins */
    ">
        <!-- Modal content -->
    </div>
</div>
```

### Navigation Tabs
```html
<nav class="flex flex-row justify-around sm:justify-start space-x-2">
    <button class="
        flex-1 sm:flex-initial
        py-3 px-3 sm:px-6
        text-xs sm:text-sm md:text-base
        min-h-[44px]
        touch-manipulation
    ">
        Tab
    </button>
</nav>
```

---

## ⚡ Performance Tips

### Image Optimization
```html
<!-- Always Use -->
<img 
    loading="lazy"
    class="lazy-image"
    width="400"
    height="300"
    alt="Description"
>
```

### Video Optimization
```html
<!-- Mobile-Friendly Video -->
<video 
    autoplay 
    muted 
    loop 
    playsinline          /* iOS requirement */
    class="object-cover"
>
```

### CSS Animation
```css
/* Use transform + opacity (GPU) */
.animate {
    transition: transform 0.3s, opacity 0.3s;
}

/* Avoid (CPU intensive) */
.bad-animate {
    transition: width 0.3s, height 0.3s;
}
```

---

## 🐛 Troubleshooting Guide

### Issue: Horizontal Scroll on Mobile
**Solution:**
```css
html, body {
    overflow-x: hidden;
    width: 100%;
}
```

### Issue: iOS Input Zoom
**Solution:**
```css
input, select, textarea {
    font-size: 16px !important;
}
```

### Issue: Touch Not Responsive
**Solution:**
```html
<button class="touch-manipulation min-h-[48px]">
```

### Issue: Modal Too Small on Mobile
**Solution:**
```html
<div class="max-w-full sm:max-w-4xl mx-4 sm:mx-auto">
```

### Issue: Text Overflow
**Solution:**
```html
<p class="break-words px-4 leading-relaxed">
```

---

## 🎯 Copy-Paste Ready Components

### Responsive Button
```html
<button class="
    bg-gradient-to-r from-msu-main-color to-msu-deep-ocean
    hover:from-msu-deep-ocean hover:to-msu-main-color
    active:scale-95
    text-white font-bold
    py-4 px-8 sm:px-10
    rounded-full
    transition-all duration-300
    min-h-[48px]
    touch-manipulation
    text-sm sm:text-base
">
    Button Text
</button>
```

### Responsive Card
```html
<div class="
    bg-white rounded-xl shadow-lg
    p-4 sm:p-6
    transition-transform duration-300
    hover:-translate-y-2
    active:scale-95
    touch-manipulation
">
    <h3 class="text-lg sm:text-xl font-bold mb-2">Title</h3>
    <p class="text-sm sm:text-base text-gray-600">Content</p>
</div>
```

### Responsive Grid
```html
<div class="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3 
    gap-4 sm:gap-6
">
    <!-- Grid items -->
</div>
```

### Responsive Input
```html
<input class="
    w-full
    px-4 py-3 sm:py-4
    text-sm sm:text-base
    min-h-[48px]
    touch-manipulation
    rounded-lg
    border border-gray-300
    focus:ring-2 focus:ring-msu-main-color
" type="text">
```

---

## 📊 Responsive Utility Classes Quick Lookup

| Need | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| Hide | `hidden` | `sm:block` | - |
| Show | `block` | - | - |
| Stack | `flex-col` | `sm:flex-row` | - |
| Full Width | `w-full` | `sm:w-auto` | - |
| Center | `mx-auto` | - | - |
| Text Center | `text-center` | `sm:text-left` | - |

---

## 🎨 Color Classes Used

```html
<!-- MSU Brand Colors -->
bg-msu-main-color     /* Primary blue: #03045e */
bg-msu-deep-ocean     /* Deep blue: #1e3a8a */
bg-msu-bgc-color      /* Accent: #61063B */

text-msu-main-color   /* Text blue */
text-msu-deep-ocean   /* Deep text */
text-msu-bgc-color    /* Accent text */

border-msu-deep-ocean /* Borders */
```

---

## ✅ Pre-Deployment Checklist

- [ ] Build completes without errors: `npm run build`
- [ ] No console errors on mobile
- [ ] All touch targets 44x44px minimum
- [ ] No horizontal scroll
- [ ] Forms work (no zoom on iOS)
- [ ] Images load correctly
- [ ] Modals work on mobile
- [ ] Dark mode works
- [ ] Performance: Lighthouse > 90

---

**Quick Start Testing:**
```bash
# Development
npm run dev

# Production Build
npm run build
npm run preview

# Access from mobile device
# Use your local IP: http://192.168.X.X:4321/programs/col
```

**Mobile DevTools:**
- Chrome: `Ctrl+Shift+M` (Toggle Device Mode)
- Firefox: `Ctrl+Shift+M` (Responsive Design Mode)

---

Last Updated: October 9, 2025
Version: 1.0
Status: Production Ready ✅






















