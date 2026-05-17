# EduHub 2.0 — Testing & Quality Assurance Protocol

This document outlines the comprehensive manual and automated testing suite executed to verify the stability, performance, visual integrity, and security of the EduHub 2.0 platform across both local and production environment tiers.

---

## 🧪 Test Suite Overview

| Test Suite ID | Domain Under Test | Methodology | Focus Areas | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TS-01** | Public Platform UX/UI | Manual Visual / Regression | Styling, Navbar, Active routes, Spacing, Layout Symmetry | **PASSED** |
| **TS-02** | Search & Filtering Engines | Functional / Interactive | Full-text query parsing, Category tags, Real-time state filters | **PASSED** |
| **TS-03** | Admin CMS Slide-Over CRUD | Integration / State Management | JWT Sessions, Mongoose DB CRUD, Slide-over sheet animation | **PASSED** |
| **TS-04** | Scroll & Animation Physics | UX Performance | Lenis inertia smooth scroll, framer-motion route transitions | **PASSED** |
| **TS-05** | Cloud Database Migration | DB Integrity | MongoDB Atlas clusters, secure salt hashing, seed scripts | **PASSED** |
| **TS-06** | DevOps Container Packaging | standalone Docker Engine | deps resolution, peer dependency conflicts, env variables baking | **PASSED** |

---

## 📋 Detailed Test Cases

### TS-01: Public Platform UX/UI & Layout Symmetry

#### TC-UX-01: Landing Page Section Spacing
*   **Objective**: Verify that the vertical gap between Landing page sections (Hero, Featured Skills, and Featured Resources) looks perfectly unified and professional.
*   **Steps**:
    1. Open `http://localhost:3000` or production URL in browser.
    2. Scroll vertically down from Hero section.
    3. Measure the space between the bottom of Hero and top of Skills card list.
*   **Expected Result**: Margin is exactly `5rem` (80px), eliminating the massive unaligned `160px` gap and providing a balanced, premium page layout.
*   **Status**: **PASS**

#### TC-UX-02: Navbar Home Active Route Styling
*   **Objective**: Verify that the "Home" nav link matches the standard transparent aesthetic of other links on initial page load (fresh reload or `url/`).
*   **Steps**:
    1. Close all tabs and open a fresh session to the root `http://localhost:3000` or production IP.
    2. Check the active blue background block on the "Home" navigation link.
*   **Expected Result**: The "Home" link does not light up with a blue background by default on initial page load. It renders cleanly as a standard transparent block with standard gray text, lighting up only when explicitly clicked.
*   **Status**: **PASS**

#### TC-UX-03: ResourceCard.tsx Clean Aesthetics
*   **Objective**: Confirm that mock views counters and obsolete Lucide icons are removed from the resource card footer for a minimalist card style.
*   **Steps**:
    1. Navigate to any Skill category showing resource items.
    2. Observe the bottom footer of any Resource Card.
*   **Expected Result**: Obsolete Lucide `Eye` icon and random counter numbers are absent. The card shows a clean layout with just the Level badge, resource Type, and action link.
*   **Status**: **PASS**

---

### TS-02: Search & Filtering Engines

#### TC-SEA-01: Multi-Directional Active Focus Border Glow
*   **Objective**: Verify that when the Navbar Search box is active (focused), the blue focus shadow and ring are rendered continuously on all 4 sides.
*   **Steps**:
    1. Locate the top search input box inside the Navbar Header.
    2. Click inside the search input to trigger the `:focus` state.
    3. Look closely at all 4 borders of the search box.
*   **Expected Result**: The input border shows a seamless, beautiful blue focus ring glowing continuously around all 4 corners, without being cut off on the right or adjacent admin buttons.
*   **Status**: **PASS**

#### TC-SEA-02: Search Input Icon Relocation
*   **Objective**: Verify that the search magnifier icon resides at the end of the text input rather than the beginning.
*   **Steps**:
    1. Observe the search box in the Navbar Header and the central Hero Search box.
    2. Check the position of the search magnifier icon.
*   **Expected Result**: The search icon is aligned perfectly at the far right of the inputs (after the text placeholder area), allowing a clean and professional typing experience.
*   **Status**: **PASS**

#### TC-SEA-03: Dynamic Filter Matching
*   **Objective**: Test filtering system on resources by Level (Beginner/Intermediate/Advanced) and Type (YouTube/Docs).
*   **Steps**:
    1. Open a Skill category.
    2. Click on the "YouTube" filter tag.
    3. Click on the "Beginner" level tag.
*   **Expected Result**: The card collection is instantly filtered in real-time, showing only beginner-friendly YouTube tutorials matching both criteria.
*   **Status**: **PASS**

---

### TS-03: Admin CMS & Slide-Over CRUD Integration

#### TC-CMS-01: Secure Login Page & Route Protection
*   **Objective**: Confirm that unauthorized users are strictly blocked from loading the CMS dashboard and that admin users are securely verified.
*   **Steps**:
    1. Attempt to bypass and navigate directly to `http://localhost:3000/admin`.
    2. Navigate to `http://localhost:3000/admin/login` and input invalid credentials.
    3. Input the secure Admin email and password synchronized from `.env.local`.
*   **Expected Result**:
    * Direct bypass attempts redirect back to `/admin/login`.
    * Invalid logins prompt an authentication error.
    * Valid logins trigger JWT token generation and transition smoothly into `/admin`.
*   **Status**: **PASS**

#### TC-CMS-02: AI Tools & Blogs Slide-Over CMS Forms
*   **Objective**: Test Full CRUD operations for AI Tools and Blogs sections inside the Admin Dashboard.
*   **Steps**:
    1. Navigate to `/admin` and click on **AI Tools** tab.
    2. Click "Add Tool" to trigger the slide-over sheet. Complete the fields and submit.
    3. Click the edit icon on an existing Blog, modify the title, and save.
    4. Click the delete icon on a test entry.
*   **Expected Result**:
    * Form inputs validate correctly.
    * Submissions write directly to MongoDB Atlas.
    * Slide-over sheet slide out and in with Framer Motion animations.
    * Deletions purge the records from MongoDB Atlas instantly.
*   **Status**: **PASS**

---

### TS-04: Scroll & Animation Physics

#### TC-SCR-01: Lenis Smooth Scroll Fluidity
*   **Objective**: Ensure that inertia scrolling is active and fluid across all long-form pages.
*   **Steps**:
    1. Open `/` or `/blogs`.
    2. Perform quick scrolls with a mouse wheel or trackpad.
*   **Expected Result**: Scrolling does not jump abruptly. It flows with a premium, physics-backed deceleration curves managed by Lenis.
*   **Status**: **PASS**

#### TC-SCR-02: Flash-Free Route Transitions
*   **Objective**: Ensure that clicking links inside the Navbar instantly loads the pages without triggering flash/fade flashes.
*   **Steps**:
    1. Navigate from `Home` → `AI Tools` → `Blogs`.
    2. Observe the page viewport during transition.
*   **Expected Result**: Pages load instantly. The template transition behaves as a standard children pass-through without fade opacity remount flashes.
*   **Status**: **PASS**

---

### TS-05: Cloud Database Migration & Sync

#### TC-DB-01: Dynamic Environment Variable Seeding
*   **Objective**: Verify that executing the db seed script parses secure credentials dynamically and migrates collections cleanly to MongoDB Atlas.
*   **Steps**:
    1. Update `.env.local` with secure Admin email/password and MONGODB_URI connection string.
    2. Execute `npm run seed`.
*   **Expected Result**:
    * The script connects to the remote MongoDB Atlas cluster.
    * Clears all old local test entries.
    * Encrypts the admin password with a 12-round `bcrypt` hash and seeds the account.
    * Seeds 8 AI Tools and 6 Tech Blogs successfully.
*   **Status**: **PASS**

---

### TS-06: DevOps Standalone Container Packaging

#### TC-DEV-01: Standalone Output Directory Compilation
*   **Objective**: Confirm that running the Dockerfile compiles the Next.js app in standalone output mode and correctly packages nested subfolders.
*   **Steps**:
    1. Run `docker build -t test-image .`.
    2. Launch container: `docker run -p 3000:3000 test-image`.
*   **Expected Result**: The build finishes successfully. Static files are nested in both `/app/.next/static` and `/app/app/.next/static` and served seamlessly without 404 unstyled visual rendering errors.
*   **Status**: **PASS**
