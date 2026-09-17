---
title: 'Universal Learning Management System'
category: 'Front-End'
year: '2026'
role: 'Front-End Developer (Solo)'
duration: '2+ months, Semester 4'
summary: 'A large-scale, multi-role LMS front-end template built using HTML, CSS, and JavaScript, adaptive for K-12 to university.'
techStack: ['HTML', 'CSS', 'JavaScript']
image: '/projects/universal-lms.png'
link: 'https://lms-russell.vercel.app/'
links:
  - label: 'Live Website'
    url: 'https://lms-russell.vercel.app/'
    type: 'live'
  - label: 'Guidebook & Readme'
    url: '#'
    type: 'document'
---

# Universal Learning Management System

**Category:** Front-End Development  
**Duration:** 2+ months, Semester 4 (2026) — Ongoing  
**Role:** Front-End Developer (Solo)  
**Live:** [lms-russell.vercel.app](https://lms-russell.vercel.app/)

---

## Overview

A large-scale Learning Management System (LMS) front-end template designed to be **universally adaptive** — capable of serving educational institutions from elementary school to university level. Built entirely with vanilla HTML, CSS, and JavaScript with zero framework dependencies, making it lightweight, highly portable, and easy to integrate with any backend.

---

## Design Philosophy

**"One codebase, every classroom."**

Most LMS platforms are built for a specific educational level, requiring institutions to purchase different products or heavily customize existing solutions. The Universal LMS challenges this by providing:
- A **flexible role system** adaptable to any institution's organizational structure
- **Configurable terminology** — "Students" vs "Pupils", "Courses" vs "Subjects", etc.
- **Modular page architecture** — institutions include only the modules they need
- **Theme customization** — easily rebrand with CSS variables

---

## User Roles & Dashboards

### Student Dashboard
- Personal course enrollment and progress tracking
- Assignment submission portal with file upload
- Grade book with detailed breakdowns
- Class schedule and calendar integration
- Announcement feed from teachers and administration

### Teacher Dashboard
- Course creation and content management
- Assignment creation with deadline management
- Student submission review and grading
- Attendance recording and reporting
- Performance analytics per student and per class

### Admin Dashboard
- User management (bulk import, role assignment)
- Institutional settings and branding
- Academic calendar and term management
- System-wide announcements
- Reports and export tools

---

## Pages & Modules

| Module | Description |
|--------|-------------|
| Dashboard | Role-based homepage with widgets and quick actions |
| Courses | Course catalog, enrollment, and content delivery |
| Assignments | Create, submit, review, and grade assignments |
| Grades | Grade book with letter grades and GPA calculation |
| Schedule | Timetable view (day/week/month) with class details |
| Attendance | Attendance marking and absence reports |
| Messages | Internal messaging between students and teachers |
| Announcements | Broadcast system for institutional communications |
| Profile | User profile editing and privacy settings |
| Settings | Institutional and personal preference management |

---

## Technical Highlights

### Architecture
- **Zero-dependency front-end** — pure HTML, CSS, JS with no npm packages
- **Component-based structure** — reusable HTML partials via JavaScript includes
- **CSS Custom Properties** — centralized design tokens for easy theming
- **LocalStorage** — client-side state management for demo functionality
- **Progressive Enhancement** — core functionality works without JavaScript

### Performance
- All assets under 200KB total uncompressed
- First Contentful Paint < 1 second on standard connections
- All images optimized and properly sized

### Accessibility
- Semantic HTML5 throughout (`<nav>`, `<main>`, `<aside>`, `<article>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1 (WCAG AA)

---

## Design Specifications

The LMS was designed using a detailed specification process — see the design planning documents:

- 📄 [Sentry Design Specification (MD)](/assets/projects/LMS-Russell_DESIGN-sentry.md)
- 📄 [Notion Design Reference (MD)](/assets/projects/LMS-Russell_notionDesign.md)
- 📄 [Lovable Design Reference (MD)](/assets/projects/LMS-Russell_lovableDesign.md)
- 📄 [Zapier Integration Design (MD)](/assets/projects/LMS-Russell_zapierDesign.md)

---

## Live Demo

👉 [lms-russell.vercel.app](https://lms-russell.vercel.app/)

---

## Tech Stack

`HTML5` `CSS3` `Vanilla JavaScript` `Vercel`
