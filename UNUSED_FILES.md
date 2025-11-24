# Unused Files in IEEE Frontend Project

This document lists files that are currently not being used in the website. These files can potentially be removed to reduce codebase size and maintenance overhead.

**Note:** Before deleting any files, please verify they are not used in:
- Future planned features
- Development/testing environments
- External references or documentation

---

## Components (UI)

### 1. `src/components/ui/CardSwap.jsx` and `src/components/ui/CardSwap.css`
- **Status:** Not imported anywhere
- **Description:** Card swap animation component
- **Action:** Safe to remove if not needed for future features

### 2. `src/components/ui/what-we-do.jsx`
- **Status:** Not imported anywhere
- **Description:** "What We Do" section component
- **Action:** Safe to remove if not needed for future features

### 3. `src/components/ui/auth-modal.jsx`
- **Status:** Not imported anywhere
- **Description:** Authentication modal component
- **Note:** Authentication is handled directly in signin/signup pages, not via modal
- **Action:** Safe to remove if modal-based auth is not planned

### 4. `src/components/ui/tabs.tsx`
- **Status:** Not imported anywhere
- **Description:** Tabs component from Aceternity UI
- **Action:** Safe to remove if tabs functionality is not needed

### 5. `src/components/ui/ProfileCard.jsx` and `src/components/ui/ProfileCard.css`
- **Status:** Not imported anywhere (only imports its own CSS)
- **Description:** Profile card component
- **Action:** Safe to remove if profile cards are not used

### 6. `src/components/ui/achievements-section.jsx`
- **Status:** Not imported anywhere
- **Description:** Achievements section component
- **Note:** The achievements page (`achievements-page.jsx`) uses `achievementsData` directly instead
- **Action:** Safe to remove if not needed for future features

### 7. `src/components/ui/Robot3D.jsx`
- **Status:** Not imported anywhere
- **Description:** 3D robot model component using React Three Fiber
- **Action:** Safe to remove if 3D robot visualization is not needed

---

## Library Files

### 8. `src/lib/theme.js`
- **Status:** Not imported anywhere
- **Description:** Theme configuration with colors, spacing, typography, etc.
- **Note:** The project uses Tailwind CSS classes directly instead of this theme system
- **Action:** Safe to remove if theme system is not planned for future use

---

## Archive/Backup Files

### 9. `src/app.zip`
- **Status:** Archive file in source directory
- **Description:** ZIP archive file (likely a backup)
- **Action:** Should be removed from source code. If needed, store in a separate backup location outside the repository

---

## Summary

**Total Unused Files:** 9 files (plus associated CSS files)

**Breakdown:**
- Components: 7 files
- Library files: 1 file
- Archive files: 1 file

**Estimated Space Savings:** 
- Component files: ~50-100 KB
- Archive file: Varies (check file size)

---

## Files That ARE Being Used (For Reference)

These files are actively used and should **NOT** be removed:

### Components in Use:
- ✅ `animated-shader-hero.jsx` - Used in `page.js`
- ✅ `Beams.jsx` - Used in `animated-shader-hero.jsx`
- ✅ `DomeGallery.jsx` - Used in `page.js`
- ✅ `Lanyard.jsx` - Used in `page.js`
- ✅ `events-section.jsx` - Used in `page.js`
- ✅ `past-events-timeline.jsx` - Used in `page.js`
- ✅ `timeline.tsx` - Used by `past-events-timeline.jsx`
- ✅ `container-scroll-animation.tsx` - Used in `page.js`
- ✅ `splite.tsx` - Used in `chapters/ras/page.js`
- ✅ `about-page.jsx` - Used in `about/page.js`
- ✅ `contact-page.jsx` - Used in `contact/page.js`
- ✅ `events-page.jsx` - Used in `events/page.js`
- ✅ `achievements-page.jsx` - Used in `achievements/page.js`
- ✅ `team-page.jsx` - Used in `team/page.js`
- ✅ `ChromaGrid.jsx` - Used by `team-page.jsx`
- ✅ `PillNav.jsx` - Used across all pages
- ✅ `Footer.jsx` - Used in `page.js`

### Data Files in Use:
- ✅ `team-data.js` - Used by `team-page.jsx` and `team/[slug]/page.js`
- ✅ `achievements-data.js` - Used by `achievements-page.jsx`
- ✅ `pictures.json` - Used in `page.js` for gallery

### Library Files in Use:
- ✅ `auth.js` - Used in `admin/page.js`, `dashboard/page.js`, `signin/page.js`, `signup/page.js`
- ✅ `utils.ts` - Used by various components (cn function)

---

## Recommendations

1. **Before deletion:**
   - Review each file to ensure it's not needed for future features
   - Check if any external documentation references these files
   - Consider moving to an archive branch instead of deleting

2. **Safe deletions (high confidence):**
   - `app.zip` - Should definitely be removed from source
   - `theme.js` - Not used anywhere
   - `CardSwap.jsx` and CSS - Not imported
   - `what-we-do.jsx` - Not imported
   - `tabs.tsx` - Not imported

3. **Review before deletion:**
   - `auth-modal.jsx` - Might be useful for future modal-based auth
   - `ProfileCard.jsx` - Might be useful for future profile features
   - `achievements-section.jsx` - Might be useful if achievements need to be displayed elsewhere
   - `Robot3D.jsx` - Might be useful for future 3D visualizations

---

## How to Remove Files

If you decide to remove these files, you can use:

```bash
# Remove individual files
rm src/components/ui/CardSwap.jsx
rm src/components/ui/CardSwap.css
rm src/components/ui/what-we-do.jsx
# ... etc

# Or remove all at once (be careful!)
rm src/components/ui/CardSwap.*
rm src/components/ui/what-we-do.jsx
rm src/components/ui/auth-modal.jsx
rm src/components/ui/tabs.tsx
rm src/components/ui/ProfileCard.*
rm src/components/ui/achievements-section.jsx
rm src/components/ui/Robot3D.jsx
rm src/lib/theme.js
rm src/app.zip
```

**Remember to commit the changes after removal!**

---

*Last updated: Generated automatically based on codebase analysis*

