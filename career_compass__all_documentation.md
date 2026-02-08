# Career Compass 

## Project Description
Generate comprehensive technical documentation for my Career Guidance and Counselling System project.

PROJECT OVERVIEW:
A web-based platform that helps university students discover suitable career paths through aptitude testing, personalized recommendations, and career exploration tools.

TECHNOLOGY STACK:
- Frontend: React
- Backend: Next.js
- Styling: Tailwind CSS,ShadCN
- Database: Supabase
- Deployment: Vercel

KEY FEATURES IMPLEMENTED:
1. Holland Code (RIASEC) aptitude test with 18 questions
2. Automated scoring and personality type calculation
3. Personalized career recommendations based on test results
4. Career database with 12-15 careers (descriptions, skills, education, salary)
5. Career explorer with search/filter functionality
6. Responsive design for mobile and desktop

DOCUMENTATION TO GENERATE:

1. PROJECT README
Include:
- Project title and description
- Features list
- Technology stack
- Installation instructions
- How to run locally
- Folder structure explanation
- Screenshots section (I'll add images later)
- Future enhancements
- Contributors

2. API DOCUMENTATION (if applicable)
For each endpoint:
- Route path
- HTTP method
- Request parameters
- Response format
- Example requests/responses
- Error handling

3. COMPONENT DOCUMENTATION
For each major component:
- Purpose and functionality
- Props/parameters
- State management
- Usage examples
- Dependencies

4. CODE ARCHITECTURE
- Project structure overview
- File organization explanation
- Data flow diagrams (describe in text)
- How different modules interact

5. USER GUIDE
- How to navigate the application
- Step-by-step guide for taking the test
- How to interpret results
- How to explore careers

6. DEVELOPER GUIDE
- How to add new careers to the database
- How to modify test questions
- How to customize the recommendation algorithm
- Coding standards used

7. TESTING DOCUMENTATION
- Test cases covered
- How to run tests
- Known issues and bugs

8. DEPLOYMENT GUIDE
- Build process
- Environment variables needed
- Deployment steps
- Hosting recommendations

FORMAT:
Generate in Markdown format, well-structured with proper headings, code blocks, tables where appropriate, and clear sections. Make it GitHub-ready.

## Product Requirements Document
# Product Requirements Document (PRD): Career Compass

**Document Version:** 1.0
**Date:** October 26, 2023
**Author:** [Your Name/Team Name]

## 1. Introduction

### 1.1 Project Overview

Career Compass is a web-based career guidance and counselling platform designed specifically for university students (ages 18-24). The primary goal is to alleviate decision fatigue and anxiety surrounding career choices by providing structured aptitude testing, personalized career recommendations, and accessible exploration tools. The platform aims to guide students from self-discovery to informed decision-making regarding their academic and professional pathways.

### 1.2 Goals & Objectives

*   **Primary Goal:** Enable university students to identify 3-5 highly suitable career paths based on validated aptitude assessment.
*   **Secondary Goal:** Provide students with comprehensive, actionable data (skills, education, salary) for shortlisted careers.
*   **User Experience Goal:** Deliver a fast (< 2s load time), mobile-first, and trustworthy experience for anxiety-prone decision-making.

### 1.3 Target Audience

**Primary User:** Sarah Chen (2nd Year Undergraduate, Undecided Major). Anxious about choice overload, seeks self-knowledge, needs practical information, uses mobile heavily (60%).

**Key Pain Points Addressed:** Overwhelming choices, lack of self-knowledge, fear of making the wrong major choice, limited access to timely counseling.

## 2. Features and Functionality

This section details the mandatory features for the Minimum Viable Product (MVP).

| Feature ID | Feature Name | Description | Priority | User Flow Impacted |
| :--- | :--- | :--- | :--- | :--- |
| F001 | User Authentication | Signup, Login, Logout using Supabase Auth for persistent data storage. | Mandatory | All authenticated features |
| F002 | Holland Code Aptitude Test | 18-question assessment covering the six RIASEC dimensions. | Mandatory | Initial user interaction |
| F003 | Automated Scoring | Calculation of percentage scores (0-100%) for R, I, A, S, E, C types based on test input. | Mandatory | Test completion |
| F004 | Personalized Recommendations | Displaying top 3-5 matching careers based on the user's dominant RIASEC profile. | Mandatory | Results viewing |
| F005 | Career Database | Centralized repository of 12-15 careers, including mandatory metadata fields. | Mandatory | Career exploration |
| F006 | Career Explorer View | Searchable and filterable list view of the entire career database. | Mandatory | Information gathering |
| F007 | Career Detail View | Detailed page for a single career, showing description, skills, education, and salary. | Mandatory | Information gathering |
| F008 | Data Persistence | Saving test results, RIASEC profile, and bookmarked careers to Supabase. | Mandatory | Returning users |
| F009 | Responsive Design | Full functionality and aesthetic adherence across mobile (60% target) and desktop views. | Mandatory | All views |
| F010 | Career Data Generation | Backend mechanism (Next.js API Route) to programmatically generate/cache initial career data via Gemini API. | Mandatory | Initial setup/Admin |

## 3. Technical Specifications

### 3.1 Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| Frontend | React, Next.js (App Router) | Primary user interface and rendering |
| Styling | Tailwind CSS, ShadCN Components | Utility-first styling and reusable, accessible components |
| Backend/API | Next.js API Routes | Serverless functions for authentication and data management |
| Database | Supabase (PostgreSQL) | User data, test results, and persistent storage |
| Deployment | Vercel | Hosting for Frontend and Serverless Functions |

### 3.2 Data Model (Supabase Schema Outline)

1.  **`profiles`**: Stores user metadata (linked via `auth.users.id`).
2.  **`test_results`**: Stores historical RIASEC scores (`riasec_scores: jsonb`), linked to `user_id` and `created_at`.
3.  **`careers`**: Static/Cached career data. (Populated initially via Gemini API generation).
    *   Fields: `id`, `title`, `primary_riasec`, `description`, `required_skills`, `education`, `salary_range`, etc.
4.  **`saved_careers`**: Junction table linking `user_id` to `career_id`.

### 3.3 API Endpoints (Next.js API Routes)

| Method | Route Path | Purpose | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | /api/auth/signup | Register user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/auth/logout | Logout user | Yes |
| GET | /api/careers | Get all careers (cached) | No |
| GET | /api/careers/[id] | Get single career detail | No |
| POST | /api/careers/generate | Generate/Refresh all careers (Admin use) | Yes (Service Role/Admin Check) |
| POST | /api/results/save | Save new test results | Yes |
| GET | /api/results | Get user test history | Yes |
| POST | /api/saved-careers | Bookmark/Unbookmark a career | Yes |
| GET | /api/saved-careers | Get user's bookmarked careers | Yes |
| PUT | /api/profile | Update user profile details | Yes |

## 4. Career Data Generation Logic

### 4.1 Data Source

Career data is programmatically generated using the **Google Gemini API**.

### 4.2 Initial Setup

1.  A server-side function (e.g., `/api/careers/generate`) will execute a structured prompt against the Gemini API.
2.  The prompt strictly enforces the required JSON structure (ID, Title, RIASEC codes, Description, Skills, Education, Salary Range, Outlook, Environment).
3.  The successful response data (for the 12-15 defined careers) will be stored statically in a local JSON file (e.g., `data/careers.json`) to serve as the cache for the MVP.
4.  The API Key (`GEMINI_API_KEY`) must be securely managed as a server-side environment variable.

## 5. Career Recommendation Algorithm (F003)

The system relies on mapping the user's RIASEC profile to career metadata.

### 5.1 RIASEC Scoring

For the 18-question test:
1.  Questions map directly to one of the six RIASEC dimensions (e.g., 3 questions per dimension).
2.  Score for a dimension = (Sum of scores for its 3 questions) / 15 (Max possible sum).
3.  **Output:** A vector of 6 percentages (e.g., [R: 80%, I: 93%, A: 53%, S: 87%, E: 47%, C: 67%]).

### 5.2 Matching Logic

1.  Identify the user's **Top 2 dominant RIASEC types** (e.g., I and S).
2.  The primary matching is based on the career's `primary_riasec` field, preferring careers whose primary type matches the user's highest score.
3.  **Recommendation Set:** The system filters the `careers` database table to return careers where:
    *   Career's `primary_riasec` is one of the user's Top 2 types.
    *   *Fallback:* If fewer than 3 careers are returned, include careers where the user's secondary RIASEC type matches the career's `primary_riasec`.
4.  **Ordering:** Results are sorted primarily by the alignment score (how closely the career's RIASEC profile matches the user's overall profile).

## 6. Performance and Scalability

### 6.1 Performance Targets

| Metric | Target | Rationale |
| :--- | :--- | :--- |
| LCP (Initial Load) | < 2.0 seconds | Essential for student engagement; platform feels snappy. |
| API Response Time | < 300ms (Average) | Ensures smooth UI transitions and data fetching. |
| Career Query/Filter | < 500ms | Users must explore the database instantly. Supabase indexing is crucial here. |
| Concurrency | Support 100 simultaneous users | Sufficient for expected university class demonstrations. |

### 6.2 Scalability Measures

*   **Frontend:** Leverages Vercel's global CDN for static assets and edge caching.
*   **Data Caching:** Initial 15 careers are cached locally (JSON/DB) after initial Gemini generation, minimizing frequent API calls.
*   **Database:** Supabase PostgreSQL optimized with appropriate indexes (GIN for JSONB arrays, B-Tree for foreign keys) to handle lookups efficiently within the free tier constraints.

## 7. Design and User Experience (UX)

### 7.1 Design Philosophy

The aesthetic must be **Clean, Modern, Trustworthy, and Student-Friendly**. It must avoid being overly corporate or too simplistic.

### 7.2 Branding Elements

*   **Primary Color:** Blue (`#2563EB`) for trust and professionalism.
*   **Accent Color:** Green (`#10B981`) for growth and positive feedback.
*   **Typography:** Inter font family.
*   **Components:** Rounded corners (0.5-1rem), soft shadows, smooth 200ms transitions.
*   **Accessibility:** WCAG AA contrast compliance; focus visible states guaranteed via Tailwind/ShadCN implementation.

### 7.3 Mobile Requirement

The design must be mobile-first. All core flows (Test taking, Viewing results, Exploring careers) must function flawlessly on screens down to 360px width.

## 8. Testing and Validation

Testing will prioritize manual end-to-end user workflows due to timeline constraints.

### 8.1 Manual E2E Test Scenarios (Mandatory)

| Test ID | User Action Flow | Expected Result | Status (Manual Verification) |
| :--- | :--- | :--- | :--- |
| E2E-001 | New User Signup -> Login -> Take Full Test -> View Results Page. | Successful registration; RIASEC profile displayed; Top 3 careers shown. | |
| E2E-002 | Authenticated User -> Take Second Test -> Compare results history. | Second result saved; History page shows both results; New recommendations based on the latest test. | |
| E2E-003 | Browse Career Explorer -> Filter by "Social" primary type -> Click detailed view. | Filtered list shows only S-dominant careers; Detail view loads all mandatory metadata correctly. | |
| E2E-004 | View Recommendation -> Save Career -> Logout -> Login -> Check Saved Careers page. | Career is bookmarked; Upon re-login, the career persists and appears on the Saved Careers page. | |

### 8.2 Unit Testing (Recommended)

*   Unit tests must cover the core logic of the **F003: Automated Scoring** function to ensure accurate conversion of raw question inputs into RIASEC percentage vectors.

## 9. Deployment and Environment

### 9.1 Deployment Targets

*   **Frontend & API Routes:** Vercel (Leveraging Next.js Serverless Functions).
*   **Database:** Supabase Cloud.

### 9.2 Environment Variables (Required)

| Variable Name | Scope | Usage | Security Note |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Supabase connection URL | Public (Prefixed) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | Supabase anonymous access key | Public (Prefixed) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | Admin/Bypass RLS operations | **Secret - NEVER expose to client** |
| `GEMINI_API_KEY` | Server Only | Career data generation | **Secret - NEVER expose to client** |

## 10. Future Enhancements (Out of Scope for MVP)

These features are prioritized for post-MVP development based on high user value.

| Feature ID | Feature Name | Priority Level | Description Summary |
| :--- | :--- | :--- | :--- |
| FE-001 | AI-Powered Career Counselor Chatbot | High (P1) | Conversational guidance via Gemini API integration. |
| FE-002 | Live Job Market Integration | Medium (P2) | Real-time job listings, salary trends, and skills gap analysis using external APIs. |
| FE-003 | Career Pathway Planner | Medium (P2) | Step-by-step roadmap generation from current status to target job. |
| FE-004 | Automated E2E Testing | Low (P3) | Implementation of Cypress or Playwright for regression testing. |

## Technology Stack
# Technology Stack: Career Compass

## 1. Project Overview

Career Compass is a web-based platform designed to assist university students in career discovery through aptitude testing (Holland Code RIASEC), personalized recommendations, and interactive career exploration tools.

## 2. Core Technology Stack

| Category | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | React (via Next.js) | Industry standard for building fast, scalable, and dynamic user interfaces. Leveraged for component reusability and server-side rendering (SSR)/Static Site Generation (SSG) capabilities of Next.js. |
| **Backend/Full Stack** | Next.js | Unified framework handling both frontend rendering and API routes (serverless functions), simplifying deployment via Vercel. Excellent for performance optimization (SSG/ISR). |
| **Styling & UI** | Tailwind CSS | Utility-first CSS framework for rapid, responsive styling adhering to the custom design system (primary blue: `#2563EB`, accent green: `#10B981`). |
| **Component Library** | ShadCN UI | Implements accessible, customizable components built on top of Radix UI and Tailwind CSS, fitting the clean, modern aesthetic requirements. |
| **Database & Auth** | Supabase (PostgreSQL) | Offers a managed PostgreSQL database, integrated authentication (Supabase Auth), and real-time capabilities, ideal for handling user profiles, test results, and career metadata efficiently. |
| **Deployment** | Vercel | Optimized hosting platform for Next.js applications, providing automatic CDN, serverless function support for API routes, and seamless CI/CD integration. |

## 3. Key Features & Technology Mapping

| Feature | Primary Technology Component |
| :--- | :--- |
| Holland Code Aptitude Test (18 Qs) | React Components, Next.js State Management |
| Automated Scoring Logic | JavaScript/TypeScript (Executed within Next.js or API Routes for complex calculations) |
| Personalized Recommendations | Backend Logic (Next.js API Route or Database Query filtering based on RIASEC scores) |
| Career Database Management | Supabase (PostgreSQL Tables) |
| Career Explorer (Search/Filter) | React (UI), Supabase (Efficient querying using indexes) |
| Responsive Design | Tailwind CSS Utility Classes (Mobile-first approach) |
| Career Data Sourcing | Gemini API Integration (Programmatic generation, cached in Supabase/JSON initially) |

## 4. Data Persistence and Environment Variables

### Data Persistence Strategy
A hybrid approach is used:
1. **Authenticated Mode (Primary):** User data (profiles, test results, saved careers) persists permanently in the Supabase PostgreSQL database, requiring Supabase Auth.
2. **Guest Mode (Temporary):** Anonymous results stored locally using `localStorage` for session continuity, though core functionality relies on authentication.

### Required Environment Variables

These variables are critical for connecting the application to the backend services. They are managed via `.env.local` locally and configured in the Vercel dashboard for production.

| Variable Name | Scope | Purpose | Security Note |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Supabase Project URL. | Publicly exposed (prefixed with NEXT_PUBLIC). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | Supabase Public/Anon Key for RLS-protected operations. | Publicly exposed (prefixed with NEXT_PUBLIC). |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | Full administrative access to the database (e.g., for generating initial career data). | **MUST NOT** be exposed to the client side. |
| `GEMINI_API_KEY` (Optional/Future) | Server Only | Key for calling Google Gemini API for dynamic content generation. | Secret key, server-side use only. |

## 5. Career Data Sourcing

Career data (descriptions, skills, salary, etc., for 12-15 careers) is generated programmatically:

1.  **Initial Data Generation:** Career data is dynamically fetched from the **Gemini API** using structured prompts during the initial setup phase.
2.  **Storage:** The resulting JSON structure is initially stored locally (e.g., in a static `careers.json` file bundled for the MVP) or directly populated into the Supabase `careers` table.
3.  **Runtime:** The application primarily reads from the stable Supabase database. The Gemini API is reserved for future dynamic updates or on-demand information retrieval.

## 6. Design and Branding System Notes

The design focuses on **Trustworthy, Professional, and Approachable** aesthetics targeted at students (18-24).

*   **Color Palette:** Primary Blue (`#2563EB`) for trust; Accent Green (`#10B981`) for growth. RIASEC types may utilize subtle color accents derived from a larger palette for visual differentiation in results.
*   **Typography:** Inter font family, ensuring responsive scaling.
*   **Component Style:** Components utilize soft shadows, rounded corners (0.5rem to 1rem), and smooth 200ms transitions, built using Tailwind CSS and ShadCN components for consistency.
*   **Accessibility:** Adherence to WCAG AA standards for contrast and focus states.
*   **Responsiveness:** Mobile-first approach built into the Tailwind structure, ensuring optimal viewing on both mobile (60% usage) and desktop platforms.

## Project Structure
# PROJECT STRUCTURE DOCUMENTATION: Career Compass

This document details the file and folder organization for the Career Compass project, utilizing a Next.js frontend/backend architecture with Tailwind CSS, ShadCN components, and Supabase for data persistence.

## 1. Project Structure Overview

The repository follows a standard Next.js structure, enhanced with directories for reusable UI components (`components`), custom hooks (`hooks`), and utility functions (`lib`).

```
career-compass/
├── .next/                     # Next.js build output (ignored by Git)
├── node_modules/              # Installed dependencies (ignored by Git)
├── public/                    # Static assets (images, fonts)
│   ├── favicon.ico
│   └── logos/
├── src/                       # Primary source code directory
│   ├── app/                   # Next.js App Router structure
│   │   ├── (auth)/            # Authentication related routes
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/       # Authenticated user routes
│   │   │   ├── career-explorer/
│   │   │   ├── profile/
│   │   │   └── results/
│   │   ├── api/               # Next.js API Routes (Backend logic)
│   │   │   ├── auth/
│   │   │   ├── careers/
│   │   │   ├── profile/
│   │   │   └── results/
│   │   ├── layout.tsx         # Root layout (Providers, global styling)
│   │   └── page.tsx           # Home/Landing Page
│   ├── components/            # Reusable UI Components (React/ShadCN)
│   │   ├── ui/                # Primitive ShadCN components (re-exported)
│   │   ├── common/            # Global components (Header, Footer, Nav)
│   │   ├── forms/             # Form elements (TestQuestionForm, LoginForm)
│   │   └── results/           # Components specific to test results display
│   ├── constants/             # Static configuration data
│   │   ├── riasec.ts          # RIASEC definitions and color mappings
│   │   └── careers_mock.json  # Initial static career data cache (if not using AI generation immediately)
│   ├── hooks/                 # Custom React Hooks
│   │   └── useSupabase.ts
│   ├── lib/                   # Backend/Utility functions
│   │   ├── database.ts        # Supabase client initialization
│   │   ├── hooks/             # Server/Client data fetching hooks
│   │   ├── prompts/          # Gemini prompt templates
│   │   └── utils.ts           # General utility functions
│   └── types/                 # TypeScript type definitions
│       └── index.d.ts
├── .env.local                 # Environment variables (ignored by Git)
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 2. File Organization Explanation

| Directory/File | Purpose | Key Content Examples |
| :--- | :--- | :--- |
| `src/app/` | **Next.js App Router Root**. Contains all routing structure, layouts, and pages. | `page.tsx` (Landing), `layout.tsx` (Providers) |
| `src/app/(auth)/` | **Route Group** for all authentication flows (login, signup). Keeps the main route structure clean. | `login/page.tsx`, `signup/page.tsx` |
| `src/app/(dashboard)/` | **Route Group** for authenticated features. | `career-explorer/page.tsx`, `results/page.tsx` |
| `src/app/api/` | **Next.js API Routes**. Serverless functions handling backend logic (Supabase interaction, AI calls). | `/api/careers/index.ts`, `/api/results/save.ts` |
| `src/components/` | **Reusable React Components**. Divided into subfolders for clarity. | `forms/TestQuestionForm.tsx`, `common/Header.tsx` |
| `src/components/ui/` | **ShadCN Primitives**. Direct imports of components generated by `shadcn-ui init`. | `Button.tsx`, `Card.tsx` |
| `src/constants/` | **Static Configuration**. Data that defines core aspects of the platform. | `riasec.ts` (Defines R, I, A, S, E, C definitions, descriptions, and RIASEC colors matching the branding guide). |
| `src/hooks/` | **Custom React Hooks**. Logic that manages state or interacts with external services specific to the frontend. | `useSupabase.ts` (Client-side hook wrapping Supabase interaction). |
| `src/lib/` | **Core Business Logic & Server Utilities**. Code executed server-side or pure utility functions. | `database.ts` (Supabase Client initialization), `prompts/geminiPrompts.ts` (Text defining AI requests). |
| `src/types/` | **TypeScript Definitions**. Global type declarations. | `index.d.ts` (Interfaces for Career, UserProfile, TestResult). |
| `.env.local` | **Environment Variables**. Stores secret keys (Supabase Service Role Key, Gemini API Key). | `SUPABASE_SERVICE_ROLE_KEY=...` |
| `tailwind.config.ts` | **Styling Configuration**. Defines custom colors (Primary Blue: `#2563EB`, Accent Green: `#10B981`), fonts (Inter), and component configurations inherited from ShadCN. | Configures custom theme colors matching the design philosophy. |

## 3. Data Flow Diagrams (Text Description)

**A. Career Test Flow (User Action to Result)**

1.  **User Interaction (Client - React):** User interacts with `TestQuestionForm` components (under `src/app/(dashboard)/test/page.tsx`). State is managed locally via React Context or component state.
2.  **Submission (Client -> Server):** Upon completion, the client sends a POST request to `/api/results/save` containing the 18 answers.
3.  **Server Processing (Next.js API Route - Server):**
    *   The API route uses the `SUPABASE_SERVICE_ROLE_KEY` (from environment) to interact with Supabase securely.
    *   The raw answers are passed to the **Scoring Algorithm Logic** (located in `src/lib/scoring.ts` - *Implied location*).
    *   The algorithm calculates the RIASEC percentages according to the specified logic.
    *   The final results (RIASEC profile) are saved to the `test_results` table in Supabase linked to the user's ID.
4.  **Recommendation Generation (Server):** The API route queries the `careers` table (which was pre-populated via Gemini, stored in Supabase).
5.  **Response (Server -> Client):** The API returns the calculated RIASEC profile and the list of top matching careers (based on RIASEC similarity matching logic) to the client.
6.  **Display (Client - React):** The data is consumed by components in `src/app/(dashboard)/results/page.tsx` to render the comprehensive results summary, adhering to the custom branding defined in `tailwind.config.ts`.

**B. Career Data Retrieval Flow**

1.  **Initial Load/Query (Client):** User navigates to the Career Explorer (`/career-explorer`). A request is made to `/api/careers`.
2.  **Data Fetch (Server):** The API route checks the cache (if implemented, otherwise queries Supabase directly).
3.  **Supabase Query:** Fetches data from the `careers` table. This table holds the comprehensive data generated initially via the Gemini API integration (as described in `career_data_source`).
4.  **Filtering/Search (Server):** If search parameters are present, filtering is applied server-side (e.g., filtering by Primary RIASEC type or keywords).
5.  **Response:** The JSON data is returned to the client for display using components like `CareerCard` (`src/components/results/CareerCard.tsx`).

## 4. Module Interaction Summary

*   **Frontend (React/TypeScript):** Responsible for UI rendering, user input handling, and presentation logic. Communicates exclusively with the `/api` routes for data operations. Utilizes components styled by Tailwind/ShadCN.
*   **Next.js API Routes (Serverless Functions):** Act as the secure middleware. They handle authentication checks (using Supabase Auth context), execute core business logic (scoring, data aggregation), and communicate directly with the Supabase database using the secure `SUPABASE_SERVICE_ROLE_KEY`.
*   **Supabase (Database/Auth):** Persists user credentials, test results, and the career database cache. Manages RLS (Row Level Security) for user data isolation.
*   **Gemini API (External):** Used programmatically during initial setup (or admin trigger) to populate the `careers` table with rich, detailed descriptions, skills, and salary data based on structured prompts defined in `src/lib/prompts/`.

## Database Schema Design
# SCHEMADESIGN: Career Compass Database Structure

This document outlines the database schema design for the Career Compass application, implemented using **Supabase (PostgreSQL)**. The structure is optimized for storing user authentication data, test results, career information (sourced programmatically via Gemini API), and user-saved preferences.

## 1. Database Overview and Technology

**Database:** PostgreSQL (managed by Supabase)
**Authentication:** Supabase Auth (handles `auth.users` table)
**Data Storage:** Custom tables for application-specific data.

## 2. Core Database Tables

The following tables define the structure for application data beyond standard authentication.

### 2.1. `profiles` Table

Stores supplementary, non-sensitive user profile information. Linked to Supabase's built-in `auth.users`.

| Column Name | Data Type | Constraints / Notes | Description |
|---|---|---|---|
| `id` | `uuid` | PRIMARY KEY, References `auth.users(id)` | Foreign Key linking to the user's Auth ID. |
| `username` | `text` | UNIQUE, NOT NULL | User-chosen display name. |
| `created_at` | `timestamptz` | DEFAULT NOW() | Record creation timestamp. |
| `full_name` | `text` | | User's preferred full name. |
| `current_major` | `text` | | User's current university major (optional). |

**Row Level Security (RLS):** Enabled. Users can only READ/UPDATE their own profile (`auth.uid() = id`).

### 2.2. `career_tests` Table

Stores the aggregated results of each Holland Code (RIASEC) test taken by a user.

| Column Name | Data Type | Constraints / Notes | Description |
|---|---|---|---|
| `id` | `bigint` | PRIMARY KEY, auto-increment | Unique ID for the test result entry. |
| `user_id` | `uuid` | NOT NULL, References `profiles(id)` | The user who took the test. |
| `created_at` | `timestamptz` | DEFAULT NOW() | Timestamp of test completion. |
| `r_score` | `numeric(5,2)` | NOT NULL, Range (0.00 to 100.00) | Realistic score percentage. |
| `i_score` | `numeric(5,2)` | NOT NULL, Range (0.00 to 100.00) | Investigative score percentage. |
| `a_score` | `numeric(5,2)` | NOT NULL, Range (0.00 to 100.00) | Artistic score percentage. |
| `s_score` | `numeric(5,2)` | NOT NULL, Range (0.00 to 100.00) | Social score percentage. |
| `e_score` | `numeric(5,2)` | NOT NULL, Range (0.00 to 100.00) | Enterprising score percentage. |
| `c_score` | `numeric(5,2)` | NOT NULL, Range (0.00 to 100.00) | Conventional score percentage. |
| `primary_type` | `text` | NOT NULL (e.g., 'I') | The highest scoring RIASEC type. |
| `secondary_type` | `text` | | The second highest scoring RIASEC type (optional). |

**Indexing:** Index on `user_id` and `created_at` for fast retrieval of user test history.

### 2.3. `careers` Table

This table stores the static career data, initially generated programmatically via the Gemini API and stored locally (as per the data persistence strategy).

| Column Name | Data Type | Constraints / Notes | Description |
|---|---|---|---|
| `id` | `bigint` | PRIMARY KEY, auto-increment | Unique career ID. |
| `title` | `text` | UNIQUE, NOT NULL | Name of the career (e.g., "Data Scientist"). |
| `riasec_code` | `text` | NOT NULL (e.g., "IRC") | Dominant RIASEC code for matching. |
| `description` | `text` | | Detailed job overview. |
| `required_skills` | `text[]` | Array of strings (PostgreSQL native type) | Key skills needed. |
| `education` | `text` | | Minimum required education level. |
| `salary_range` | `text` | | Estimated salary bracket. |
| `growth_outlook` | `text` | | Job market trend (e.g., "High Growth"). |
| `work_environment` | `text` | | Typical work setting. |

**Indexing:** GIN Index on `riasec_code` (if searching/filtering is required based on multiple codes, otherwise standard B-Tree index if only filtering by the primary code).

### 2.4. `saved_careers` Table

A join table to track which careers a user has bookmarked for later review.

| Column Name | Data Type | Constraints / Notes | Description |
|---|---|---|---|
| `id` | `bigint` | PRIMARY KEY, auto-increment | Unique bookmark ID. |
| `user_id` | `uuid` | NOT NULL, References `profiles(id)` | The user who saved the career. |
| `career_id` | `bigint` | NOT NULL, References `careers(id)` | The career being saved. |
| `saved_at` | `timestamptz` | DEFAULT NOW() | Timestamp of when the career was saved. |

**Constraints:** Composite UNIQUE constraint on (`user_id`, `career_id`) to prevent duplicate saves.

## 3. Data Relationships and Integrity

1.  **One-to-One (Implicit):** `auth.users` to `profiles` (via `id`).
2.  **One-to-Many:** `profiles` to `career_tests` (A user can have many test results).
3.  **One-to-Many:** `profiles` to `saved_careers` (A user can save many careers).
4.  **One-to-Many:** `careers` to `saved_careers` (A career can be saved by many users).

Foreign Key constraints are established using the `References` keyword to maintain relational integrity across linked tables.

## 4. Supabase RLS Policies Summary

| Table | Policy | Condition | Access Level |
|---|---|---|---|
| `profiles` | Select, Update | `auth.uid() = id` | User owns/is viewing their profile. |
| `career_tests` | Select, Insert | `auth.uid() = user_id` (Select); `auth.uid() = new.user_id` (Insert) | Users can only see/add their own results. |
| `careers` | Select | `true` | Publicly readable (since data is static/generated). |
| `saved_careers`| Select, Insert, Delete | `auth.uid() = user_id` | Users can only manage their own bookmarks. |

## 5. API Interaction Schema Mapping

The database schema directly supports the documented API endpoints:

| API Endpoint | Primary Table(s) Involved | Required Operations |
|---|---|---|
| `POST /api/results/save` | `career_tests` | INSERT |
| `GET /api/results` | `career_tests` | SELECT based on `user_id` |
| `GET /api/careers` | `careers` | SELECT * |
| `GET /api/saved-careers` | `saved_careers`, `careers` | SELECT joined data based on `user_id` |
| `POST /api/saved-careers` | `saved_careers` | INSERT |
| `DELETE /api/saved-careers/[id]` | `saved_careers` | DELETE based on `id` and ownership check |

## 6. Indexes for Performance (Non-Auth Tables)

To meet the performance expectations (especially career queries < 500ms):

1.  **`career_tests`**: B-Tree index on `user_id` (for history retrieval).
2.  **`careers`**: B-Tree index on `riasec_code` (essential for recommendation matching).
3.  **`saved_careers`**: Composite index on (`user_id`, `career_id`) for fast checking of existing bookmarks.

## User Flow
# USERFLOW DOCUMENTATION: CAREER COMPASS

This document details the critical user journeys (User Flows) for the Career Compass platform, outlining step-by-step interactions, system responses, and visual expectations based on the documented design philosophy (clean, trustworthy, student-friendly, utilizing primary blue and accent green).

## 1. High-Level User Journey Overview

The application supports three primary flows:

1.  **Onboarding & Discovery (Guest/New User):** Landing $ightarrow$ Test $ightarrow$ Results $ightarrow$ Career Exploration.
2.  **Authenticated User Management:** Sign Up/Login $ightarrow$ Dashboard $ightarrow$ Test $ightarrow$ Save Results $ightarrow$ Explore/Bookmark Careers.
3.  **Career Exploration & Refinement:** Search/Filter $ightarrow$ View Details $ightarrow$ Save Career.

---

## 2. User Flow 1: Onboarding & Initial Aptitude Testing (Critical Path)

**Target Persona:** Sarah Chen (Undecided Student, prioritizing immediate guidance).

| Step | User Action | System Response / Screen State | Wireframe Notes / Interaction Patterns |
| :--- | :--- | :--- | :--- |
| 1. **Landing** | Navigates to the homepage (`/`). | Displays introductory pitch, CTA buttons: "Take the Test Now" (Primary Blue), "Login/Sign Up". | Clean, 1280px max-width container. Emphasis on trust and simplicity. Mobile-first stacking of CTAs. |
| 2. **Start Test** | Clicks "Take the Test Now". | Transitions to the Assessment Screen. | Smooth, non-jarring transition (200ms fade/slide). |
| 3. **Test Engagement** | Answers Question 1 (e.g., Likert scale or multiple choice related to R, I, A, S, E, or C domain). | Progress bar updates (e.g., 1/18). Question text updates instantly. | Use rounded inputs/sliders consistent with design system. Focus state visible for accessibility. |
| 4. **Test Completion** | Answers the final (18th) question and clicks "Submit Results". | Loading spinner overlay (using accent green for vibrancy) with message: "Calculating your unique profile...". | Instant feedback on submission. Loading time target < 1 second (for local scoring logic). |
| 5. **Results Display** | Landing on the Results Dashboard (`/results/[id]`). | Displays the user's calculated RIASEC profile (e.g., Bar chart or radar chart). Shows primary codes (e.g., IS A). | **Key Visual:** RIASEC codes are color-coded per design system (e.g., I=Blue, S=Green). Prominent display of percentages. CTA: "View Recommended Careers". |
| 6. **Recommendation View** | Clicks "View Recommended Careers". | Displays a curated list of recommended careers (based on highest RIASEC match from `careers.json`). | Card layout for careers. Each card shows Title, Primary RIASEC match, and an "Explore" button. |
| 7. **Exploration** | Clicks "Explore" on a recommended career card (e.g., Data Scientist). | Navigates to the detailed Career Profile Page (`/careers/[slug]`). | Detailed view shows description, required skills (using tags), salary range, and education path. Supports mobile scrolling. |
| 8. **Decision Point** | User is satisfied but wants to save progress. | System prompts: "Create an account to save your personalized path!". CTA: "Sign Up". | If the user opts out, results remain in local storage until browser cache is cleared (Guest Mode). |

---

## 3. User Flow 2: Authenticated User Journey & Data Persistence

**Goal:** Save test results and bookmark potential careers for future review.

| Step | User Action | System Response / Screen State | Wireframe Notes / Interaction Patterns |
| :--- | :--- | :--- | :--- |
| 1. **Authentication** | Clicks "Login" on the Nav Bar and inputs credentials. | Success confirmation, user redirected to Dashboard (`/dashboard`). Navbar updates to show "Profile" and "Logout". | Uses Supabase Auth integration. Smooth transition (no page reload, instant state update). |
| 2. **Dashboard Access** | Navigates to `/dashboard`. | Displays user welcome message. Shows history of past test results (Date, Primary Type). CTA to "Take New Test". | Clean list view, showing historical data retrieved via `GET /api/results`. |
| 3. **Saving Results** | Takes the test (Flow 1) and lands on results page. Clicks "Save Profile & Return to Dashboard". | API call POST `/api/results/save`. Success toast notification appears (Accent Green). | User's score is now persisted in Supabase, linked to `user_id`. |
| 4. **Bookmarking Career** | On a detailed Career Profile Page (e.g., UX Designer), clicks the "Save Career" icon (e.g., a bookmark icon). | Icon state changes (filled primary blue). API call POST `/api/saved-careers`. Toast confirmation. | Quick, immediate feedback on the icon change. |
| 5. **Review Bookmarks** | Navigates to "Saved Careers" view (`/saved`). | Displays all bookmarked careers in a list/card format, retrieved via `GET /api/saved-careers`. | Allows Sarah to review choices without re-taking the test or navigating the main database. |
| 6. **Removing Bookmark** | Clicks the "Remove" (X) icon on a saved career card. | API call DELETE `/api/saved-careers/[id]`. Card fades out of the list view. | Immediate UI update upon successful deletion. |

---

## 4. User Flow 3: Career Database Exploration & Filtering

**Target Persona:** A user looking for specific requirements (e.g., "Careers needing only a Bachelor's degree").

| Step | User Action | System Response / Screen State | Wireframe Notes / Interaction Patterns |
| :--- | :--- | :--- | :--- |
| 1. **Access Explorer** | Clicks "Career Explorer" link in the navigation. | Loads the Career Listing Page (`/explore`). Displays all 12-15 careers retrieved via `GET /api/careers`. | Default view shows cards sorted by Title or RIASEC similarity score (if logged in). Default filter set to 'All'. |
| 2. **Search Interaction** | Types "Analyst" into the search bar. | Results dynamically filter to show careers containing "Analyst" in the title or description (client-side filtering after initial API fetch). | Search responsiveness target: < 100ms latency for text input display. |
| 3. **Filtering by RIASEC** | Selects "Investigative (I)" and "Artistic (A)" from the filter dropdowns. | The list updates to show only careers where the primary or secondary code matches I or A. | Filter logic must be robust, checking both `primary_riasec` and `secondary_riasec` fields efficiently. |
| 4. **Filtering by Education** | Applies a filter for "Education Level: Bachelor's Degree Only". | List updates to hide careers requiring Master's or Ph.D. | This uses structured data fields provided by the Gemini generation prompt. |
| 5. **Detail View Check** | Clicks on a filtered result, e.g., "Market Researcher". | Navigates to the detail page. User reviews `required_skills` and checks `growth_outlook`. | Focus on presenting structured data clearly using icons and color contrast (Primary Blue for headings). |

---

## 5. Interaction Patterns & Design Notes

1.  **Responsiveness (Mobile-First):** All flows must maintain usability on mobile. Card layouts collapse into vertical stacks. Navigation moves to a bottom tab bar or hamburger menu depending on screen size.
2.  **Visual Feedback:** Use soft shadows and rounded corners (0.5rem to 1rem) throughout. Transitions should be smooth (200ms). Primary action buttons use solid Primary Blue (`#2563EB`). Success/Growth indicators use Accent Green (`#10B981`).
3.  **Data Presentation:** Structured data (skills, education) must use clear tag/pill components styled with Tailwind CSS for high readability.
4.  **Error Handling (Implicit):** If the connection to Supabase fails during login, a non-intrusive, temporary error toast appears at the bottom of the screen, reminding the user to check connectivity or retry.

## Styling Guidelines
# Career Compass: Styling Guidelines Document

## 1. Introduction

This document outlines the Styling Guidelines for the Career Compass platform. It serves as the single source of truth for visual design, ensuring consistency, accessibility, and alignment with the project's design philosophy: professional yet approachable, trustworthy, and student-friendly.

**Design Philosophy:** Clean, modern, trustworthy, and student-friendly. Balanced professionalism that feels supportive and accessible for university students (ages 18-24).

**Technology Stack Used for Styling:**
*   **Framework:** Tailwind CSS (Utility-first styling)
*   **Component Library:** ShadCN UI (Accessible, customizable React components built on Radix UI and Tailwind CSS)
*   **Icons:** Lucide React

## 2. Color Palette

The color palette is curated to instill trust, highlight critical information, and provide visual segmentation based on the RIASEC model.

### Primary Colors

| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Blue (Trust/Professionalism)** | `#2563EB` (Blue-600) | Primary CTA buttons, main navigation active states, strong headings. |
| **Accent Green (Growth/Success)** | `#10B981` (Emerald-500) | Success indicators, positive feedback, "Next Step" buttons. |
| **Background Light** | `#FFFFFF` / `gray-50` | Main application background, card backgrounds. |
| **Text Primary** | `#1F2937` (Gray-800) | Body copy, primary labels. |
| **Text Secondary** | `#6B7280` (Gray-500) | Helper text, secondary labels, disabled states. |

### Feedback & Status Colors

| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Error/Danger** | `#EF4444` (Red-500) | Form validation errors, deletion confirmations. |
| **Warning** | `#F59E0B` (Amber-500) | Alerts needing user attention. |

### RIASEC Type Colors (For Visualization)

These colors will be used consistently when visualizing test results, career profiles, and personalized dashboards to map results back to the Holland Code types.

| Type | Color Name | Hex Code |
| :--- | :--- | :--- |
| **R** (Realistic) | Blue | `#3B82F6` (Blue-500) |
| **I** (Investigative) | Indigo | `#6366F1` (Indigo-500) |
| **A** (Artistic) | Violet | `#A855F7` (Violet-500) |
| **S** (Social) | Teal | `#2DD4BF` (Teal-400) |
| **E** (Enterprising) | Orange | `#F97316` (Orange-500) |
| **C** (Conventional) | Green | `#22C55E` (Green-500) |

## 3. Typography

We utilize the **Inter** font family for its excellent readability across digital interfaces and high legibility for screen reading.

**Base Configuration (Tailwind Defaults often map to this):**
*   **Base Font Size:** 16px (equivalent to `text-base`)
*   **Font Family:** Inter (ensured via configuration or global CSS import)

| Element | Tailwind Class Example | Size (Approx.) | Weight | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Page Title (H1)** | `text-4xl font-bold` | 36px | Bold | Used sparingly for main page headers. |
| **Section Heading (H2)** | `text-3xl font-semibold` | 30px | Semi-Bold | Primary documentation/dashboard headers. |
| **Card Title (H3)** | `text-xl font-semibold` | 20px | Semi-Bold | Titles for career cards or modules. |
| **Body Copy** | `text-base` | 16px | Normal | Standard paragraph text. |
| **Labels/Metadata** | `text-sm` | 14px | Normal | Helper text, input labels. |
| **Small Print** | `text-xs` | 12px | Normal | Footnotes, copyright. |

**Responsive Type:** Utilizing Tailwind's responsive prefixes (e.g., `sm:text-lg`) to ensure type scales appropriately for mobile-first design, adhering to the 16px base.

## 4. Layout and Spacing

**Layout Container:**
*   Content should generally be constrained within a responsive maximum width container to prevent line length issues on large screens.
    *   Tailwind Class: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Spacing Units (Based on Tailwind's default scale):**
*   Spacing should follow the 4-unit grid system (`p-4`, `m-8`, etc.).
*   **Small Gaps (e.g., between buttons):** `space-x-2`, `space-y-2`
*   **Medium Gaps (e.g., between section elements):** `gap-6`, `my-6`
*   **Large Gaps (e.g., section padding):** `py-12`, `px-8`

## 5. Component Styling Principles (ShadCN Integration)

All interactive UI elements leverage ShadCN components, which enforce high standards for accessibility and maintainability.

### General Component Attributes:

1.  **Border Radius:** All primary components (buttons, cards, inputs) utilize a subtle rounding for approachability.
    *   Tailwind Class: `rounded-lg` or `rounded-xl` (Radius of 0.5rem to 1rem).
2.  **Shadows:** Soft, subtle elevation is preferred over harsh borders to convey depth.
    *   ShadCN default shadows are typically used (e.g., `shadow-md` or `shadow-lg`).
3.  **Transitions:** Interactive states (hover, focus) should use smooth, fast transitions (approx. 200ms) to feel responsive.
    *   Example Tailwind: `transition-colors duration-200 ease-in-out`
4.  **Focus States:** Crucial for accessibility. Focus rings must be clearly visible, contrasting against the background, and typically use the **Primary Blue (`#2563EB`)**.
    *   ShadCN components handle this via configuration, ensuring focus rings are present via utility classes like `focus-visible:ring-2 focus-visible:ring-blue-500`.

### Buttons

*   **Primary Button:** Solid fill using **Primary Blue (`#2563EB`)**. White text. Hover state darkens the blue slightly.
*   **Secondary Button:** Outline style or subtle gray background.
*   **Disabled State:** Reduced opacity (e.g., `opacity-50`) and pointer events disabled.

### Cards (e.g., Career Cards)

*   Use a clean white background (`bg-white`) with soft borders (`border border-gray-200`).
*   Use internal padding of `p-6`.
*   RIASEC visualization elements within cards must strictly adhere to the RIASEC Color Table (Section 2).

## 6. Responsiveness and Accessibility (A11Y)

### Mobile-First Approach

All styling must be developed mobile-first, using Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) to scale up layouts.

*   **Navigation:** Must collapse into a hamburger menu on smaller screens.
*   **Career Cards:** Should stack vertically on mobile devices and transition to a grid layout (2 or 3 columns) on tablets/desktops.

### Accessibility Requirements (WCAG AA Compliance Focus)

1.  **Contrast:** Ensure all text elements meet minimum WCAG AA contrast ratios against their backgrounds. (Primary Blue passes against white background).
2.  **Touch Targets:** All interactive elements (buttons, links, radio buttons) must maintain a minimum touch target size of **44x44px** (equivalent to `min-h-11` and `min-w-11` in Tailwind spacing units).
3.  **Keyboard Navigation:** Ensure all components have meaningful, visible focus states (`:focus-visible`) for keyboard-only users.
4.  **ARIA Attributes:** Components inherited from ShadCN/Radix should already implement necessary ARIA roles; custom components must include appropriate ARIA labels for screen readers.
