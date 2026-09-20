---
title: 'KSFOOD - Manufacturing ERP & E-commerce'
category: 'System Analysis'
year: '2025 - 2026'
role: 'System Analyst & Front-End Developer'
duration: 'Semester 3 – Semester 4'
summary: 'ERP and E-commerce prototype for a sauce manufacturer involving business process modeling, UML design, Next.js, and MySQL.'
techStack: ['UML', 'Figma', 'System Analysis', 'Next.js', 'MySQL']
image: '/assets/ksfood-thumbnail.png'
links:
  - label: 'E-Commerce UI'
    url: 'https://ks-food.vercel.app/'
    type: 'prototype'
  - label: 'ERP UI'
    url: 'https://ks-food.vercel.app/internal/login'
    type: 'prototype'
  - label: 'Presentation'
    url: 'https://raflimaulanayh.github.io/ks-food/presentation'
    type: 'document'
---

# KSFOOD — Manufacturing ERP & E-commerce

**Category:** System Analysis + Full-Stack Development  
**Duration:** Semester 3 – Semester 4 (2025–2026)  
**Role:** System Analyst & Front-End Developer

---

## Overview

KSFOOD is a comprehensive case study project based on a real sauce manufacturing factory. The project spanned two academic semesters, evolving from business process analysis and UML modeling in Semester 3 into full database architecture design and an operational ERP prototype in Semester 4.

The goal was to design a complete information system that manages the factory's production, inventory, purchasing, and e-commerce sales channels — all within a unified platform.

---

## System Scope

The KSFOOD system covers five major business domains:

| Domain | System Module |
|--------|--------------|
| Purchasing | Supplier management, Purchase Orders, Goods Receipt |
| Production | Raw material tracking, Production Orders, Output logging |
| Inventory | Stock management, Warehouse locations, Stock opname |
| Sales (B2C) | E-commerce storefront, Order management, Shipment tracking |
| Sales (B2B) | Wholesale client portal, Bulk order processing |

---

## Semester 3 — System Analysis & Front-End Prototype

### Business Process Modeling
Conducted an end-to-end analysis of the factory's operations, producing:
- **End-to-End Business Process Diagram** — full value chain from raw material procurement to customer delivery
- **UML Use Case Diagrams** — actor-system interactions for each module
- **UML Activity Diagrams** — step-by-step workflow for core processes
- **UML Sequence Diagrams** — system interactions and API calls
- **CRUD Matrix & RASCI Chart** — responsibility and data access mapping

### Front-End Prototype (Next.js)
Built an interactive web prototype with:
- E-commerce storefront with product catalog and cart
- ERP dashboard with production overview widgets
- Role-based navigation (Admin, Warehouse Staff, Sales)

---

## Semester 4 — Database Architecture

Designed the full **MySQL relational database** including:
- **Conceptual Data Model** — entity relationships at the business level
- **Logical Data Model** — normalized tables (3NF) with all foreign key relationships
- **Physical Data Model** — MySQL-specific implementation with indexes, constraints, and stored procedures

### Key Database Highlights
- 30+ tables spanning all business modules
- Composite keys and junction tables for many-to-many relationships (e.g., Product-Category, Order-Item)
- Trigger-based stock updates on goods receipt and production output
- Views for common reporting queries (monthly sales, low stock alerts)

---

## Project Documents

The documents are ordered from project definition and business discovery, through UML modeling, and finally the completed reports.

### Project Briefs

- 📄 [Project Brief: Data and Information (PDF)](/assets/projects/ksfood/briefs/Project%20Brief%20Data%20and%20Information.pdf)
- 📄 [Project Brief: Advanced IS Analysis & Design (PDF)](/assets/projects/ksfood/briefs/Project%20Brief%20-%20Adv%20IS%20Analysis%20%26%20Design.pdf)
- 📄 [Project Brief: Knowledge Management (PDF)](/assets/projects/ksfood/briefs/Project%20Brief%20-%20Knowledge%20Management.pdf)
- 📄 [Application Brief (MD)](/assets/projects/ksfood/reference/KSFOOD_brief-aplikasi-ksfood.md)
- 📄 [Menu Application Brief (MD)](/assets/projects/ksfood/reference/KSFOOD_brief-menu-aplikasi.md)
- 📄 [Flow Scenario Brief (MD)](/assets/projects/ksfood/reference/KSFOOD_brief-flow-skenario.md)

### Business, Problem Finding, and Company Context

- 📄 [Company Profile Analysis (PDF)](/assets/projects/ksfood/source-materials/analysis/Adv_ISAD_Company_Profile.pdf)
- 📄 [Business Process and Solution Proposal (PDF)](/assets/projects/ksfood/source-materials/analysis/Adv_ISAD_Propose_of_Business_Process_and_Solution.pdf)
- 📄 [Flow Scenario (PDF)](/assets/projects/ksfood/deliverables/KSFOOD_flow-skenario.pdf)
- 📄 [Interview Questions (PDF)](/assets/projects/ksfood/source-materials/analysis/Pertanyaan%20Wawancara.pdf)
- 📄 [Interview Questions 1 (PDF)](/assets/projects/ksfood/source-materials/analysis/Pertanyaan%20Wawancara%201.pdf)
- 📄 [Interview Questions Week 2-4 (PDF)](/assets/projects/ksfood/source-materials/analysis/Pertanyaan%20Wawancara%20Week%202%20-%204.pdf)
- 📄 [Interview Questions Week 5-6 (PDF)](/assets/projects/ksfood/source-materials/analysis/Pertanyaan%20Wawancara%20Week%205%20%26%206.pdf)
- 📄 [Knowledge Audit & Mapping (PDF)](/assets/projects/ksfood/source-materials/analysis/KM%20Knowledge%20Audit%20%26%20Mapping.pdf)
- 📄 [Knowledge Needs Analysis (PDF)](/assets/projects/ksfood/source-materials/analysis/KM%20Knowledge%20Needs%20Analysis.pdf)
- 📄 [Knowledge Audit & Mapping Duplicate Export (PDF)](/assets/projects/ksfood/source-materials/analysis/KM_Knowledge_Audit__Mapping.pdf)
- 📄 [Knowledge Needs Analysis Duplicate Export (PDF)](/assets/projects/ksfood/source-materials/analysis/KM_Knowledge_Needs_Analysis.pdf)
- 📄 [Knowledge Management Strategy Proposal (PDF)](/assets/projects/ksfood/source-materials/analysis/KM_Strategy_Proposal.pdf)
- 📄 [Network Diagram (JPEG)](/assets/projects/ksfood/source-materials/analysis/network%20diagram.jpeg)
- 📄 [Internal Planning Notes (MD)](/assets/projects/ksfood/reference/KSFOOD_planning-internal.md)
- 📄 [Project Planning (MD)](/assets/projects/ksfood/reference/KSFOOD_project-planning.md)
- 📄 [KSFOOD Notes (MD)](/assets/projects/ksfood/reference/KSFOOD_notes.md)
- 📄 [Project README (MD)](/assets/projects/ksfood/reference/KSFOOD_README.md)

### UML: End-to-End, Activity, Use Case, and Description

- 📄 [End-to-End UML Diagram (PDF)](/assets/projects/ksfood/deliverables/KSFOOD_KS%20Food%20-%20UML-End-to-End%20Diagram.drawio.pdf)
- 📄 [UML End-to-End Diagram Source (PDF)](/assets/projects/ksfood/source-materials/analysis/KS%20Food%20-%20UML-End-to-End%20Diagram.drawio.pdf)
- 📄 [Activity Diagram (PDF)](/assets/projects/ksfood/source-materials/analysis/UML%20-%20KS%20FOOD-Activity%20Diagram.pdf)
- 📄 [UML Use Case Diagram (PDF)](/assets/projects/ksfood/source-materials/analysis/KS%20Food%20-%20UML-Use%20Case%20Diagram.drawio.pdf)
- 📊 [Use Case Description (XLSX)](/assets/projects/ksfood/source-materials/analysis/Use%20Case%20Description.xlsx)

### UML: Class, First Cut, Communication, and Sequence

- 📄 [UML Domain Class Diagram (PDF)](/assets/projects/ksfood/source-materials/analysis/KS%20Food%20-%20UML-Domain%20-%20Class%20Diagram.drawio.pdf)
- 📄 [UML First Cut Class Diagram (PDF)](/assets/projects/ksfood/source-materials/analysis/KS%20Food%20-%20UML-First%20Cut%20-%20Class%20Diagram.drawio.pdf)
- 📄 [UML Communication Diagram (PDF)](/assets/projects/ksfood/source-materials/analysis/KS%20Food%20-%20UML-Communication%20Diagram.drawio.pdf)
- 📄 [Communication Diagram PlantUML (PDF)](/assets/projects/ksfood/source-materials/analysis/Communication_Diagram%20plantuml.pdf)
- 📄 [First Cut Sequence Diagram (PDF)](/assets/projects/ksfood/source-materials/analysis/KS%20Food%20-%20UML-First%20Cut%20Sequence%20Diagram.drawio%20%281%29.pdf)
- 📄 [First Cut Sequence Diagram PlantUML (PDF)](/assets/projects/ksfood/source-materials/analysis/First_Cut_Sequence_Diagram%20plantuml.pdf)
- 📄 [Physical Database Design (PDF)](/assets/projects/ksfood/deliverables/KSFOOD_KSFOOD%20Phisical%20Database.pdf)

### Supporting Source Files

- 📄 [Presentation Invitation (PDF)](/assets/projects/ksfood/source-materials/107%20Surat%20Undangan%20Presentasi%20Proyek%20Mahasiswa%20-%20CV%20Kertasari%20Sejahtera.pdf)
- 📄 [Asset Notes (TXT)](/assets/projects/ksfood/source-materials/ASSETS%20-%20KS%20FOOD.txt)
- 📄 [Design Style Guide (PDF)](/assets/projects/ksfood/source-materials/Design%20-%20Style%20Guide.pdf)
- 🔗 [Internal System Prototype](/assets/projects/ksfood/source-materials/Internal%20System%20Prototype.url)
- 🔗 [Operations System Prototype](/assets/projects/ksfood/source-materials/Operation%20System%20Prototype.url)
- 🔗 [Public System Prototype](/assets/projects/ksfood/source-materials/Public%20System%20Prototype.url)
- 🗄️ [KSFOOD Database Source (SQL)](/assets/projects/ksfood/source-materials/ksfood.sql)
- 📄 [Collected Analysis Documents (PDF)](/assets/projects/ksfood/source-materials/analysis/Dokumen%20yang%20dikumpulkan.pdf)

### Final Reports

- 📄 [Collected Submission Documents (PDF)](/assets/projects/ksfood/deliverables/KSFOOD_Dokumen%20yang%20dikumpulkan.pdf)
- 📄 [Advanced IS Analysis & Design Final Report (PDF)](/assets/projects/ksfood/source-materials/Laporan%20Akhir%20Advanced%20IS%20Analysis%20%26%20Design.pdf)
- 📄 [Full Project Report (PDF)](/assets/projects/ksfood/deliverables/KSFOOD_KS%20FOOD.pdf)

---

## Tech Stack

`UML` `Draw.io` `Figma` `Next.js` `React` `MySQL` `Tailwind CSS`
