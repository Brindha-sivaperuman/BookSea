# BookSea — Smart Digital Library for College Students

> **Discover • Read • Learn**

BookSea is a modern, responsive, and interactive smart digital library web application designed specifically for college students and academic researchers. It allows students to discover, search, explore, save, and comfortably read academic textbooks, research papers, and educational resources in one unified platform.

---

## 🎨 Brand Identity

Implemented strictly according to the BookSea Brand Book:

- **Primary Ocean Teal**: `#0F4C81` — Brand emblems, navigation highlights, primary identity
- **Secondary Royal Blue**: `#2563EB` — Primary interactive buttons and focused actions
- **Accent Tropical Teal**: `#14B8A6` — Progress highlights, accents, and success states
- **Background Chalk White**: `#F0F9FF` — Clean, soft reading canvas
- **Primary Text Obsidian Black**: `#0F172A` — High-contrast, accessible typography
- **Typography**: Poppins (Display/Headings) & Inter (Body & UI text)
- **Emblem**: Open book combined with flowing ocean currents and digital learning geometry

---

## ✨ Features

1. **Homepage Experience**:
   - Hero section with exact copy: *"Your Next Great Read Starts Here."* and *"Explore a world of knowledge, discover books that inspire you, and make every reading moment count with BookSea."*
   - Real-time search bar with fast navigation.
   - Genuine high-resolution generated student library photography.
   - **Featured Reads**: Responsive 4-column academic book cards with ratings, categories, and direct action triggers.
   - **Browse Categories**: 8 college subjects with instant filtering.
   - **Popular Among Students**: Trending course readings.
   - **Continue Learning**: Reading progress and resume cards, with authentic empty state when no books have been opened.
   - **Call to Action**: *"Make Knowledge Your Daily Habit."*

2. **Dedicated Book Discovery (Explore)**:
   - Full search across book titles, authors, categories, keywords, and ISBNs.
   - Live results count.
   - Subject filters for all 8 academic categories.
   - Secondary filters by Course Level (*Undergraduate, Introductory, Advanced*) and Material Type (*Digital Textbook, Open Research, Course Reader*).
   - Multi-option sorting (*Relevance, Highest Rated, Newest Editions, Title A–Z*).
   - Clear filters action and search empty states with helpful reset suggestions.

3. **Academic Categories View**:
   - Deep-dive subject explorer for Computer Science, AI, Data Science, Web Development, Engineering, Business, Literature, and Academic Research.
   - Department previews with sample book lists and 1-click catalog filtering.

4. **Book Details View & Modal**:
   - High-fidelity book covers with custom fallback styling.
   - Bibliographic metadata: Publisher, ISBN-13, Pages, Publication Year, Academic Level, Digital Access Availability.
   - Quick **Save to My Library** action.
   - **Reading List** status assigner (*Want to Read*, *Currently Reading*, *Finished*).
   - Chapter Table of Contents preview with estimated reading times.
   - Related textbooks within the same academic discipline.

5. **Digital Reading Experience (Reader)**:
   - Immersive distraction-free reading interface.
   - Table of contents drawer to jump between chapters.
   - Real academic and educational sample chapters.
   - Adjustable font sizes: `sm`, `md`, `lg`, and `xl`.
   - Font family switcher: Modern Sans vs. Academic Serif.
   - 3 reading themes: **Light** (`#F0F9FF`), **Sepia** (`#FDF6E2`), and **Dark** (`#0F172A`).
   - Chapter progress bar (% completed) automatically persisted in `localStorage`.
   - Previous and Next chapter controls with completion recognition.

6. **My Library & Reading List**:
   - Saved books collection.
   - Reading queue organized by status (*Want to Read*, *Currently Reading*, *Finished*).
   - Reading history with last active timestamps and resume buttons.
   - Persistent across browser sessions via `localStorage`.

7. **Sign In & Scholar Profile**:
   - Sign In and Create Account interfaces with input validation, password toggle, and college student fields.
   - Clearly labeled client-side demo mode.
   - 1-click test student profiles (*Alex - CS Junior*, *Samantha - Data Science Senior*).
   - Scholar profile modal with reading stats and theme preferences.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (version 18 or later)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd booksea

# Install dependencies
npm install

# Start the Vite development server (runs on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
```
This compiles optimized static assets into the `dist/` directory, ready to deploy to any modern hosting platform (Google Cloud Run, Vercel, Netlify, Cloudflare Pages, etc.).

---

## 🛡️ License
Apache-2.0. Built for Google AI Studio.
