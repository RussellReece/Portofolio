Russell ReeceSystems analyst, front-end developer

## The idea

Redline — a portfolio identity

A systems analyst's native language is notation: swimlanes, entity boxes, actors, cardinality, and the red pen that marks up a spec before it ships. This identity borrows that vocabulary instead of borrowing a SaaS landing page.

Three commitments hold it together. The diagram is the hero, not a placeholder image. Colour is a key, never a mood — each hue names a discipline and means the same thing on every screen. And the left margin carries a redline note in your own voice, so a reader always knows why a decision was made, not just what was built.

## Colour

Six values total. If a colour doesn't encode something, it isn't in the palette.

**Sheet #F1F3F2**Page base. Cool paper, not cream.

**Panel #E3E8E6**Diagram plates, title blocks.

**Ink #101C1F**Body text and diagram strokes.

**Analysis #1D4E5A**System analysis work.

**Redline #A32D22**Front-end work, links, margin notes.

**Stamp #2E6244**Full-stack work and results.

Dark mode inverts to ink #0E1618 and lifts the three discipline hues to #7FC3D1, #F08A72 and #7FC79C so they stay legible without changing meaning.

## Type

Archivo + Spectral

Archivo 800\
−0.045em\
clamp 2.4–4rem

Business processes, drawn

Archivo 700\
title block

KSFOOD — manufacturing ERP

Archivo 600\
15px, rail headings

System scope

Spectral 400\
17px / 1.62 / 66ch

Prose sits in Spectral because a serif reads as written argument rather than interface chrome. Line length is capped at 66 characters and the rail keeps it there.

Spectral italic\
redline note

Chose Google Sheets as the database deliberately — zero server cost was a hard constraint from the owner.

No all-caps labels, no tracked-out eyebrows, no single accented word in a headline. A heading earns attention through size and weight alone.

## Grid

The rail is the title block from a drawing sheet, rotated into the margin.

```
┌──────────┬──────────────────────────────────────┐
│ 186px    │  main column, max 66ch               │
│ heading  │                                      │
│ + note   │  prose, tables, diagrams, evidence   │
└──────────┴──────────────────────────────────────┘
   ▲ collapses above content below 880px
```

Section headings live in the rail, not above the text. That frees the main column to open with content, and it gives margin notes somewhere to sit without interrupting the reading line.

## Rules of the system

What the template refuses to do

- Every detail page opens with a real diagram, a real screenshot, or a real table. Never a placeholder.
- Each project states one outcome figure above the fold.
- Documents are grouped by phase and each one says what it is for.
- A discipline colour appears on the title block edge and nowhere decorative.
- No title repeated twice on the same page.
- No two buttons with the same label.
- No credentials, no internal filenames, no "duplicate export".
- No card for an item that doesn't deserve one — weak entries go in a single line of text.

# Business processes, drawn then built

I map how a business actually runs, then write the front-end that runs it. Five systems delivered across manufacturing, laundry services, education and community work.

Open to internships from June 2026 · Bandung

Coverage

Discover

Model

Design

Build

Ship

Where each project sat in the delivery lifecycle. Fill colour marks the discipline I worked in.

## Selected work

Three that show range. The rest are indexed below, not carded.

- System analysis
- Full-stack
- 2 semesters

### KSFOOD — manufacturing ERP and storefront

A real sauce factory running purchasing, production, inventory and two sales channels on paper. I modelled the end-to-end value chain, then designed a 30-table MySQL schema and an operational prototype against it.

[Read the case study](#project)

- System analysis
- Semester 2

### ClevaGO — field service division

Seven business processes for a cleaning and pest-control division, from dispatch through on-site payment to quarterly KPI review. Activity diagrams, a class model, and a CRUD matrix covering four roles.

[Read the case study](#project)

- Front-end
- Client work

### Empact — community profile site

Seven pages converted from a Figma system into React and shipped in one month for a live client. I owned the home, about and partners pages plus the deployment pipeline.

[Read the case study](#project)

## Also built

Indexed, not carded

| Project | What it is | Stack |
| --- | --- | --- |
| UrbanFresh | Self-service laundry ordering with an Apps Script order pipeline and WhatsApp status updates | JS, Apps Script, Sheets |
| Universal LMS | Multi-role learning platform template, zero dependencies, adaptive from primary school to university | HTML, CSS, JS |

## Recognition

Three semi-finals carry real weight. Four participations get one line, because that is what they are worth.

#### Semi-finalist, BPC Logicodix

Agilis — gamified health app with a partner-funded reward loop

Nov 2025

#### Semi-finalist, Business Plan Competition GEM

Eatventory — demand forecasting for restaurant inventory

Feb 2025

#### Semi-finalist, Business Case Competition DIGICOFEST

Brand awareness strategy for CIS PDAM Surabaya

Nov 2024

Also entered NBPC 2 (2026), PKM-KC (2025 and 2026) and ICT Recursion 2025.

Template demonstration. Swap in your own copy, links and diagrams.

← All work

# KSFOOD — manufacturing ERP and storefront

A sauce factory ran purchasing, production and two sales channels on paper and spreadsheets. Over two semesters I modelled the whole value chain, then designed the database and prototype that replaces it.

**Role**Systems analyst, front-end

**Span**Sem 3 – Sem 4, 2025–26

**Client**Real sauce manufacturer

**Output**Schema + prototype

Fig 1 — System map, five domains on one schemaSem 4, 2026

Hover or tab through a module to see what it does.

**5**business domains on a single schema

**30+**normalised tables, 3NF

**2**semesters, analysis through build

**4**roles with distinct access paths

## The problem

Stock counts lived in one spreadsheet, production batches in another, and wholesale orders in a WhatsApp thread. Nobody could answer "how much chilli paste do we have right now" without walking to the warehouse. Reorder decisions were made from memory.

The brief was not "build an app". It was to find out where the information actually breaks down, and only then decide what software could hold it.

## Scope

B2B was almost cut. Kept it once interviews showed wholesale was over half of revenue.

| Domain | Modules |
| --- | --- |
| Purchasing | Supplier records, purchase orders, goods receipt |
| Production | Raw material draw-down, production orders, output logging |
| Inventory | Stock levels, warehouse locations, stock opname |
| Sales B2C | Storefront catalogue, order management, shipment tracking |
| Sales B2B | Wholesale client portal, bulk order processing, tiered pricing |

## Decisions

And what they cost

### Composite keys over surrogate IDs for junction tables

Product-category and order-item relationships are genuinely many-to-many and never referenced from outside. Composite keys keep the constraint honest at the database level instead of relying on application code.

### Triggers for stock movement, views for reporting

Stock updates fire on goods receipt and production output, so the count is never a derived guess. Monthly sales and low-stock alerts are views rather than scheduled jobs — the factory has no server to schedule anything on.

### Role-based navigation, not role-based pages

Admin, warehouse staff and sales see the same pages with different actions available. One template to maintain, and permissions stay in one place.

## Evidence

Twenty-three documents exist. These are the four worth your time — the rest are indexed by phase.

- [Physical data model](#)The 30-table schema with indexes and constraints
- [End-to-end business process](#)Raw material procurement through customer delivery
- [CRUD matrix and RASCI chart](#)Who may touch which data, and who signs off
- [Front-end prototype](#)Live Next.js storefront and ERP dashboard

Discover 6 documents

- [Company profile analysis](#)Factory structure and current operations
- [Owner and staff interviews](#)Three rounds, weeks 1–6
- [Knowledge audit and mapping](#)Where operational knowledge is held today

Model 9 documents

- [Use case diagrams](#)Actor interactions per module
- [Activity diagrams](#)Step-by-step workflow, core processes
- [Sequence diagrams](#)System interactions and API calls

Build 5 documents

- [Conceptual and logical data models](#)Entity relationships, normalised to 3NF
- [Prototype walkthrough](#)Screens with role-based navigation

Report 3 documents

- [Final presentation](#)Delivered to the factory owner, Sem 4
- [Business process and solution proposal](#)Recommended rollout sequence

## Next

[ClevaGO — field service division](#project) — seven processes, four roles, one dispatch engine.

← All recognition

Semi-finalist

# Agilis at BPC Logicodix 2025

Most health apps lose their users inside a month. We built a business model where staying active pays for itself, and took it to the semi-final against university teams from across Indonesia.

**Team**Pioneering Strategists

**Entry**Agilis, gamified health app

**Stage reached**Semi-final

**My part**Market research, BMC, financials

Fig 1 — The reward loop we pitchedLogicodix 2025

Hover a step in the loop.

## The problem

This number came from our own survey of 84 students, not a market report.

Fitness apps are downloaded in January and abandoned by February. Streak badges and confetti animations are cheap to build, and users see through them quickly, because nothing outside the app changes when you hit a goal.

Our argument was that adherence needs a stake that is real. Points had to buy something a person actually wanted.

## The model

| Layer | How it earns |
| --- | --- |
| Free tier | Core gamification, community feeds, accountability groups |
| Premium | Adaptive training plans, nutrition guidance, advanced analytics |
| Partner revenue | Gyms and F&B brands sponsor challenges and pay per redemption |

The third line is the one that decides whether the first two survive. We modelled partner acquisition cost against redemption rate to show the loop funds itself at roughly 4,000 monthly active users.

## My part

Four people, three months

I ran the competitor teardown across six Indonesian and regional fitness apps, built the Business Model Canvas, and wrote the three-year financial projection the judges questioned us on. I also rehearsed the objection handling for the partner-revenue assumption, which is where the panel pushed hardest.

- [Business plan proposal](#)Full submission document
- [Business Model Canvas](#)One page, the version we defended
- [Pitch deck](#)Semi-final presentation

## What I'd change

Worth writing down. A team that can name its own gap reads stronger than one that can't.

We validated demand from users but never signed a letter of intent from a single partner brand. The judges asked for one and we had nothing. In the GEM competition four months later we opened with three signed expressions of interest instead.

← All experience

# Cutting a week of manual outreach to one afternoon

The campus promotion team followed up with hundreds of prospective students by typing WhatsApp messages one at a time. I built the tool that stopped that.

**Role**Promotional strategist, implementer

**Team**Campus Promotion, Satu University

**From**Oct 2025, ongoing

**Built with**Apps Script, Sheets, WhatsApp API

Fig 1 — The follow-up pipeline, before and afterThree intake batches

Hover a stage of the pipeline.

**\~100**students contacted per campaign

**hours → minutes**time to complete one batch

**3**intake batches run on it so far

**\~0**name and number typos since

## What was wrong

Marketing handed over an Excel file of high-school contacts each intake. A promotion staffer opened it, read a name, typed a greeting into WhatsApp, pasted a phone number, sent, then scrolled down one row. Repeat a hundred times. Names got misspelled, numbers got transposed, and nobody could say with confidence who had already been contacted.

## How it works

Deliberately no send API. A human still presses send, which keeps the message personal and keeps us inside WhatsApp's terms.

The spreadsheet stays the database. Apps Script reads each row, normalises the phone number to country format, drops the student's real name into the message template, and builds a wa.me link. The dashboard lists every prospect with a button and a checkbox — click to open the chat pre-filled, tick when done, and the state writes straight back to the sheet.

```
function generateWhatsAppLinks(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const rows  = sheet.getDataRange().getValues().slice(1);   // skip header

  return rows
    .filter(([name, phone]) => name && phone)
    .map(([name, phone]) => {
      const number  = '62' + String(phone).replace(/^0/, '');
      const message = `Halo ${name}, kami dari Tim Promosi Satu University `
                    + `ingin mengundangmu ke acara Open House minggu depan.`;
      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    });
}
```

Around forty lines of Apps Script, no server, no hosting cost, and the team can edit the message template themselves without touching code.

## Beyond the tool

Content and coordination

I also appear in and help produce the team's Instagram content — six reels across the 2025–26 intake covering campus life, internship pathways and student Q&A. The automation handles the people who already raised their hand; the content is what makes them raise it.

- [Follow-up dashboard, batch 3](#)Live tool, most recent intake
- [Instagram campaign](#)Six reels, Satu University official