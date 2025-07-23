# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster development)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

## Project Architecture

This is a Next.js 15 application built with the App Router architecture, TypeScript, and Tailwind CSS. The project serves as a temporary email service frontend that integrates with the Juhe API.

### Key Directories

- `app/` - Next.js App Router structure
  - `api/temp-mail/` - API routes for temp mail functionality
  - `components/` - Reusable React components organized by category
  - `contexts/` - React context providers
  - `(local)/(default)/tempmail/` - Main temp mail page
  - `(legal)/` - Legal pages (privacy policy, terms of service)

### API Integration

The application integrates with the Juhe temporary email API through three main endpoints:

- **Generate Email** (`POST /api/temp-mail/generate`) - Creates new temporary email addresses
- **Fetch Messages** (`POST /api/temp-mail/messages`) - Retrieves messages for a given email
- **Get Domains** (`GET /api/temp-mail/domains`) - Lists available email domains

All API routes are located in `app/api/temp-mail/` and follow a consistent error handling pattern with JSON responses containing `success` boolean and appropriate HTTP status codes.

### Homepage Route

The `/tempmail` functionality has been moved to the homepage route (`/`). The main temporary email interface is now accessible directly at the root URL.

### Styling & Responsive Design

- **Font & Background**: Matches JuheAPI design system with `font-sans` and `bg-[#f8fafc]` 
- **Mobile-First**: Fully responsive design optimized for mobile devices
- **Gradient Hero**: Purple gradient hero section consistent with JuheAPI branding
- **Glass Cards**: Semi-transparent cards with backdrop blur effects
- **Component Scaling**: All components scale appropriately across breakpoints (`sm:`, `md:`, `lg:`)

### Environment Configuration

Environment variables are managed through `.env.example` template:
- `TEMP_MAIL_API_URL` - Juhe API base URL (defaults to https://hub.juheapi.com)
- `TEMP_MAIL_API_KEY` - Juhe API authentication key
- `NEXT_PUBLIC_BASE_URL` - Frontend base URL for client-side usage

### Component Architecture

Components are organized in three main categories:
- `ui/` - Reusable UI components (buttons, cards, forms, etc.)
- `layout/` - Layout components (Navbar, Footer)
- `sections/` - Page-specific sections (HeroSection, FAQ, etc.)

The project uses Tailwind CSS for styling and includes a comprehensive design system with consistent spacing, colors, and typography patterns.

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- Path aliases configured (`@/*` maps to project root)
- Next.js plugin integration
- ES2017 target for broader browser compatibility