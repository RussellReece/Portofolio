# Project Context: Master Portfolio Website

## 1. Project Overview
Develop a high-performance, comprehensive master portfolio website for a System Analyst and Front-End Developer. The website must act as a digital resume, showcasing past organizational leadership, business process analysis projects, and front-end development works.

## 2. Tech Stack & Architecture
*   **Framework:** Next.js (App Router).
*   **Styling:** Tailwind CSS.
    *   *Styling Rule:* Apply inline CSS for unique, single-use styles to keep the markup localized. Abstract highly reusable styles (e.g., project cards, global buttons) into internal CSS or reusable Tailwind component classes to maintain clean code architecture.
*   **Rendering:** Static Site Generation (SSG) for zero-latency page loads.
*   **Image Optimization:** Use Next.js `<Image />` component exclusively (WebP/AVIF format preferred).

## 3. Content Architecture (Sitemap)
*   **Hero Section:** High-impact headline, Call-to-Action buttons (View Projects, Download CV).
*   **About Section:** Professional summary and a visual representation of the tech stack (Next.js, React, HTML, CSS, JavaScript, MySQL, Figma, Google Apps Script).
*   **Projects Gallery:** 
    *   Must include a dynamic filtering system (e.g., All, Front-End, System Analysis, Full-Stack).
    *   Clickable project cards leading to detailed case studies.
*   **Experience & Leadership:** Timeline or grid layout detailing organizational experiences (e.g., HIMASIF, Onelish Club, International Benchmarking MC).
*   **Contact:** Social links (LinkedIn, GitHub) and a functional minimal contact method.

## 4. Data Management (Backend Approach)
*   **Implementation Strategy:** Local Markdown (.md / .mdx files).
*   **Data Structure:** Each project is stored as a single Markdown file in a dedicated folder (e.g., `/content/projects/`). The Markdown files must use YAML frontmatter to store metadata.
    *   *Frontmatter Schema:* `Title`, `Category`, `Summary`, `Tech Stack (Array)`, `Image URL`, `Live/GitHub Link`.
    *   *Body Content:* The detailed description and case study of the project.
*   **Data Fetching:** Use Node.js `fs` (File System) and `gray-matter` or `next-mdx-remote` to parse and render the Markdown content statically at build time.

## 5. Data Management & MDX Architecture
*   **Implementation Strategy:** Local MDX (.mdx files) using `next-mdx-remote` or `@next/mdx` to allow rich media embedding (like videos and iframes) alongside standard markdown.
*   **Data Structure:** Each project is stored in `/content/projects/`.
    *   *Frontmatter Schema:* `Title`, `Category`, `Summary`, `Tech Stack (Array)`, `Image URL`, `Live/GitHub Link`, and an optional `VideoUrl` (for hero video backgrounds or top-level embeds).
    *   *Body Content:* The detailed case study written in MDX.
*   **Custom MDX Components:**
    *   The AI Agent MUST create a custom `<VideoEmbed />` or `<YouTubeEmbed />` React component.
    *   Map this component in the MDX provider so the user can easily call `<VideoEmbed src="..." />` directly within the markdown body content.

## 6. Development Directives for AI Agent
*   Prioritize responsive design (Mobile-first approach).
*   Implement lazy loading for assets below the fold.
*   Ensure the routing is clean and semantic.
*   Write modular, DRY (Don't Repeat Yourself) components for the UI.