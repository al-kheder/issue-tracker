# Issue Tracker 🐛

A modern, full-stack issue tracking application built with Next.js 14, TypeScript, and Prisma. Track bugs, manage tasks, and organize your development workflow with style!

![Issue Tracker](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma)
![Radix UI](https://img.shields.io/badge/Radix%20UI-Latest-purple?logo=radixui)

## ✨ Features

### 🎯 Core Functionality

- **Create Issues** - Add new bugs, features, or tasks
- **Edit Issues** - Update title, description, and status
- **Delete Issues** - Remove issues with confirmation dialog
- **Status Management** - Track issues as OPEN, IN_PROGRESS, or CLOSED
- **Issue Details** - View comprehensive issue information

### 🎨 User Experience

- **Responsive Design** - Works perfectly on desktop and mobile
- **Beautiful UI** - Modern design with Radix UI components
- **Loading States** - Smooth skeleton loaders and progress indicators
- **Error Handling** - Graceful error boundaries and user feedback
- **Confirmation Dialogs** - Prevent accidental deletions

### 🔧 Developer Experience

- **TypeScript** - Full type safety throughout the application
- **Server Components** - Optimized performance with Next.js 14
- **Database ORM** - Type-safe database operations with Prisma
- **Form Validation** - Client and server-side validation with Zod
- **Single Responsibility** - Clean, maintainable code architecture

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Database (MySQL, PostgreSQL, or SQLite)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/al-kheder/issue-tracker.git
   cd issue-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your `.env.local`:

   ```env
   # Database
   DATABASE_URL="your-database-connection-string"

   # Next.js
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
issue-tracker/
├── app/                        # Next.js 14 App Router
│   ├── api/                    # API Routes
│   │   └── issues/
│   │       ├── route.ts        # GET /api/issues, POST /api/issues
│   │       └── [id]/
│   │           └── route.ts    # GET, PATCH, DELETE /api/issues/[id]
│   ├── components/             # Reusable UI Components
│   │   ├── ActionButton.tsx    # Unified action button component
│   │   ├── DeleteButton.tsx    # Delete confirmation component
│   │   ├── DateDisplay.tsx     # Date formatting component
│   │   ├── IssueActions.tsx    # Issue action buttons
│   │   ├── IssueDescription.tsx # Issue description display
│   │   ├── IssueHeroSection.tsx # Issue header section
│   │   ├── IssueMetadata.tsx   # Issue metadata display
│   │   ├── IssueStatusBadge.tsx # Status badge component
│   │   └── index.ts            # Component exports
│   ├── issues/                 # Issues pages
│   │   ├── page.tsx            # Issues list page
│   │   ├── loading.tsx         # Issues list loading UI
│   │   ├── new/
│   │   │   └── page.tsx        # Create new issue page
│   │   └── [id]/
│   │       ├── page.tsx        # Issue details page
│   │       ├── loading.tsx     # Issue details loading UI
│   │       └── edit/
│   │           └── page.tsx    # Edit issue page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── loading.tsx             # Global loading UI
├── lib/                        # Utility libraries
│   ├── data/
│   │   └── issues.ts           # Data access layer
│   ├── utils/
│   │   ├── issueStatus.ts      # Status configuration
│   │   └── dateUtils.ts        # Date formatting utilities
│   └── validations.ts          # Zod validation schemas
├── prisma/                     # Database
│   ├── schema.prisma           # Database schema
│   └── client.ts               # Prisma client
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```

## 🛠️ Technology Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Full-stack framework
- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Database

- **[MySQL](https://www.mysql.com/)** / **[PostgreSQL](https://www.postgresql.org/)** / **[SQLite](https://www.sqlite.org/)** - Relational database

## 📊 Database Schema

```prisma
model Issue {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  description String?  @db.Text
  status      Status   @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Status {
  OPEN
  IN_PROGRESS
  CLOSED
}
```

## 🔌 API Endpoints

### Issues

- `GET /api/issues` - Get all issues
- `POST /api/issues` - Create a new issue
- `GET /api/issues/[id]` - Get specific issue
- `PATCH /api/issues/[id]` - Update specific issue
- `DELETE /api/issues/[id]` - Delete specific issue

### Request/Response Examples

**Create Issue:**

```bash
POST /api/issues
Content-Type: application/json

{
  "title": "Fix login bug",
  "description": "Users can't log in with special characters in password",
  "status": "OPEN"
}
```

**Update Issue:**

```bash
PATCH /api/issues/1
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

## 🎨 Components

### ActionButton

A unified button component for all issue actions:

```tsx
import { ActionButton } from '@/app/components';

// Create new issue
<ActionButton action="new" />

// Edit existing issue
<ActionButton action="edit" issueId={123} />

// Delete issue with confirmation
<ActionButton action="delete" issueId={123} />
```

### Status Management

```tsx
import { getStatusConfig } from "@/lib/utils/issueStatus";

const config = getStatusConfig("OPEN");
// Returns: { color: 'red', icon: <Icon />, label: 'Open' }
```

### Date Formatting

```tsx
import { formatDate } from "@/lib/utils/dateUtils";

formatDate.created(new Date()); // "January 15, 2024 at 2:30 PM"
formatDate.updated(new Date()); // "Jan 15, 2024 at 2:30 PM"
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Database Operations

```bash
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema to database
npx prisma db pull      # Pull schema from database
npx prisma studio       # Open Prisma Studio
npx prisma migrate dev  # Create and apply migration
```

## 🏗️ Architecture Principles

### Single Responsibility Principle (SRP)

Each component and function has a single, well-defined responsibility:

- **Data Layer** (`lib/data/`) - Database operations only
- **Business Logic** (`lib/utils/`) - Pure business logic functions
- **UI Components** (`app/components/`) - Focused, reusable UI pieces
- **Pages** (`app/`) - Coordinate components and handle routing

### Component Structure

```tsx
// ✅ Good: Single responsibility
function IssueStatusBadge({ status }) {
  const config = getStatusConfig(status);
  return <Badge color={config.color}>{config.label}</Badge>;
}

// ❌ Bad: Multiple responsibilities
function IssueComponent({ issue }) {
  // Data fetching + UI rendering + business logic
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm start
```

### Environment Variables

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 📝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow Single Responsibility Principle
- Write descriptive component and function names
- Add JSDoc comments for complex functions
- Use Prettier for code formatting

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**

```bash
Error: Can't reach database server
```

Solution: Check your `DATABASE_URL` in `.env.local`

**Prisma Schema Sync Issues**

```bash
npx prisma generate
npx prisma db push
```

**Type Errors**

```bash
npm run type-check
```

**Build Errors**

```bash
rm -rf .next
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - Amazing React framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Prisma](https://www.prisma.io/)** - Excellent database toolkit
- **[Vercel](https://vercel.com/)** - Seamless deployment platform

## 📞 Support

If you have any questions or need help:

1. **Check the [Issues](https://github.com/al-kheder/issue-tracker/issues)** for existing solutions
2. **Create a new issue** if you found a bug
3. **Start a discussion** for questions and ideas

---

**Made with ❤️ by [Ali](https://github.com/al-kheder)**

_Happy issue tracking! 🐛✨_
