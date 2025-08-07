# Overview

Autonomic Edge is a modern web application for showcasing self-optimizing network agents designed for mission-critical environments. The application is a sophisticated marketing and demonstration platform for eBPF-powered edge networking technology that uses AI to autonomously optimize network performance in real-time. It features a landing page with live demos, technical documentation, use cases, and a pilot program signup form.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript in a modern single-page application (SPA) architecture. It uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable components. Styling is handled through Tailwind CSS with a comprehensive design system including custom CSS variables for theming.

The application follows a component-based architecture with clear separation between UI components, page layouts, and business logic. Animations are implemented using Framer Motion to create engaging user interactions throughout the landing page sections.

## Backend Architecture
The server-side implementation uses Express.js with TypeScript, following a modular route-based architecture. The server handles API requests for pilot program signups and provides development-time features like Vite integration for hot reloading. The backend implements a RESTful API design pattern with proper error handling middleware and request logging.

For development efficiency, the server includes Vite middleware integration that allows seamless frontend development with server-side API routes, eliminating the need for separate development servers.

## Data Storage
The application implements a flexible storage layer with an interface-based design allowing for multiple storage backends. Currently, it uses an in-memory storage implementation for development, but includes Drizzle ORM configuration for PostgreSQL production deployments. The schema defines entities for users and pilot requests with proper TypeScript type generation.

Database migrations are managed through Drizzle Kit, providing version-controlled schema changes. The storage layer abstracts database operations through a clean interface, making it easy to switch between storage implementations.

## State Management
Client-side state management leverages TanStack Query (React Query) for server state management, providing caching, background updates, and optimistic updates. Form state is handled through React Hook Form with Zod validation, ensuring type safety and runtime validation consistency between client and server.

## Routing and Navigation
The application uses Wouter for client-side routing, providing a lightweight alternative to React Router. The routing structure is simple with a home page and 404 fallback, reflecting the single-page marketing site nature of the application.

# External Dependencies

## UI and Design System
- **Radix UI**: Provides unstyled, accessible UI primitives for complex components like dialogs, dropdowns, and form controls
- **Tailwind CSS**: Utility-first CSS framework for styling with comprehensive design tokens
- **shadcn/ui**: Pre-built component library combining Radix UI with Tailwind CSS
- **Framer Motion**: Animation library for smooth, interactive animations throughout the landing page
- **Lucide React**: Icon library providing consistent iconography

## Development Tools
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Type safety across the entire application stack
- **Replit Plugins**: Development environment integration for error handling and debugging

## Data and Validation
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL with migration support
- **Zod**: Schema validation library ensuring type safety between client and server
- **TanStack Query**: Server state management with caching and background synchronization

## Database
- **PostgreSQL**: Production database system
- **Neon Database**: Serverless PostgreSQL provider for cloud deployment

## Server Framework
- **Express.js**: Web application framework for the Node.js backend
- **React Hook Form**: Form state management with validation integration

## Fonts and Assets
- **Google Fonts**: Inter font family for typography
- **Unsplash**: Image hosting for demo content and visual assets