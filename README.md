<div align="center"><strong>Next.js 15 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://next-admin-dash.vercel.app/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)

- Secure shareable links for event/venue reservations
- Granular control for administrators (activation/deactivation, user blocking, role management)
- Easy booking process for registered users
- Comprehensive monitoring and basic administration features

## Features

- User authentication and authorization
- Event and location management with secure shareable links
- Booking system with calendar integration
- Admin dashboard with user management and analytics
- Role-based access control
- Responsive design

## Tech Stack

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Better Auth](https://better-auth.com)
- Database - [Postgres](https://vercel.com/postgres)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)
- Drizzle ORM [Drizzle](https://orm.drizzle.team)
- Next Intl [Next Intl](https://next-intl.dev)
- React Hook Form [React Hook Form](https://react-hook-form.com)
- Zod [Zod](https://zod.dev)

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file with your environment variables
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Then, uncomment `app/api/seed.ts` and hit `http://localhost:3000/api/seed` to seed the database with products.

Next, copy the `.env.example` file to `.env` and update the values. Follow the instructions in the `.env.example` file to set up your GitHub OAuth application.

```bash
npm i -g vercel
vercel link
vercel env pull
```

Finally, run the following commands to start the development server:

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.