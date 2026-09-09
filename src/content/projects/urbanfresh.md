---
title: 'UrbanFresh - Automated Laundry Web App'
category: 'Full-Stack'
year: '2025'
summary: 'A self-service laundry ordering platform built with HTML, CSS, JavaScript, Google Sheets backend, and Apps Script automation.'
techStack: ['HTML', 'CSS', 'JavaScript', 'Google Apps Script', 'Google Spreadsheet']
image: '/projects/urbanfresh.png'
link: 'https://urbanfresh-laundry.vercel.app/'
---

# UrbanFresh — Automated Laundry Web App

**Category:** Full-Stack Development  
**Duration:** 2 months, end of Semester 3 (2025)  
**Role:** Full-Stack Developer  
**Live:** [urbanfresh-laundry.vercel.app](https://urbanfresh-laundry.vercel.app/)

---

## Overview

UrbanFresh is my **first complete web development project** — a fully functional self-service laundry ordering platform that operates without requiring an active administrator. Built for both individual (B2C) and corporate (B2B) clients, the platform automates the entire order lifecycle from placement to status updates using Google Sheets as a backend database and Google Apps Script for automation.

---

## Business Problem

Traditional laundry services require customers to physically visit the outlet or call to place orders, check status, or request pickup. This creates friction for busy customers and operational overhead for service owners. UrbanFresh eliminates these pain points by providing:
- 24/7 self-service ordering
- Automated status notifications via WhatsApp
- A fully automated admin workflow requiring zero manual intervention for routine orders

---

## Features

### Customer-Facing
| Feature | Description |
|---------|-------------|
| Service Selection | Choose from Wash & Fold, Dry Clean, Shoe Care with pricing |
| B2C Ordering | Individual order form with item count and pickup scheduling |
| B2B Ordering | Corporate/bulk order form with special pricing tier |
| Order Tracking | Real-time status tracking via order ID |
| WhatsApp Integration | Customers receive order confirmation and status updates via WA |

### Admin-Facing (Automated)
| Feature | Description |
|---------|-------------|
| Google Sheets Database | All orders stored with auto-generated order IDs |
| Apps Script Automation | Triggers on form submission to update status and notify customers |
| Order Status Pipeline | New → Processing → Ready → Delivered |
| Revenue Dashboard | Auto-calculated revenue summary in the spreadsheet |

---

## Technical Architecture

```
Browser (HTML/CSS/JS)
    ↓ Form Submission
Google Apps Script (Web App)
    ↓ Writes to
Google Sheets (Database)
    ↓ Triggers
Apps Script (Automation)
    ↓ WhatsApp API
Customer Notification
```

### Why Google Sheets as a Backend?
This was a deliberate constraint — the goal was to build a **production-ready system with zero server costs**. Google Sheets provides:
- Free, persistent data storage
- Built-in access control
- Spreadsheet-based admin UI (no dashboard to build)
- Native Apps Script triggers for automation

---

## System Design Documents

The project began with a thorough system analysis before any code was written:

- 📄 [Software Requirements Specification — SRS UrbanFresh (PDF)](/assets/projects/UrbanFreshLaundry_SRS%20UrbanFresh.pdf)
- 📄 [Business Process Flow (PDF)](/assets/projects/UrbanFreshLaundry_Alur%20Proses%20Bisnis%20ClevaGo%20Home%20Cleaning%20%26%20ClevaGo%20Pest%20Control.pdf)
- 📄 [Final Project Report (DOCX)](/assets/projects/UrbanFreshLaundry_Tugas%20Minggu%2012%20Final%20project%20report%20submission%20.docx)

---

## Key Technical Decisions

1. **Vanilla JavaScript over frameworks** — keeping dependencies zero for maximum load performance
2. **Apps Script over server-side code** — eliminating hosting costs and server maintenance
3. **Single-page architecture** — smooth UX without page reloads using JavaScript DOM manipulation
4. **WhatsApp over email** — higher open rates for Indonesian users, better engagement

---

## Tech Stack

`HTML5` `CSS3` `Vanilla JavaScript` `Google Apps Script` `Google Sheets` `Vercel`
