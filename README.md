# 📝 Todos App

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.10-764ABC?logo=redux)](https://redux-toolkit.js.org/)

---

## ✨ Features

### 🎯 Core Functionality
- ✅ **CRUD Operations** - Create, Read, Update todos
- ✅ **Real-time Updates** - Optimistic updates dengan RTK Query
- ✅ **Search & Filter** - Filter todos by status, search by title
- ✅ **Pagination** - Navigate through todos efficiently
- ✅ **Dynamic Stats** - Real-time completed/pending counts

### 🎨 UI/UX
- ✅ **Dark/Light Mode** - Theme toggle with persistence
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Smooth Animations** - Tailwind transitions

### ♿ Accessibility
- ✅ **WCAG 2.1 AA Compliant** - Full accessibility support
- ✅ **Keyboard Navigation** - All features keyboard accessible
- ✅ **Screen Reader Support** - ARIA labels and live regions
- ✅ **Focus Management** - Visible focus indicators

### 🏗️ Architecture
- ✅ **Feature-Based Structure** - Scalable and maintainable
- ✅ **Type-Safe** - Full TypeScript coverage
- ✅ **Reusable Components** - Design system with tokens
- ✅ **Centralized State** - Redux Toolkit Query
- ✅ **Code Splitting** - Optimized bundle size

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+ (recommended) or npm/yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd todos-ezv

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles + design tokens
│
├── core/                   # Core setup
│   ├── api/
│   │   └── client.ts       # Base RTK Query client
│   └── store/
│       ├── store.ts        # Redux store config
│       └── provider.tsx    # Redux Provider
│
├── features/               # Feature modules
│   ├── todos/
│   │   ├── api/            # Todos API endpoints
│   │   ├── components/     # Todo components
│   │   └── types/          # Todo types
│   └── theme/
│       ├── components/     # Theme toggle
│       ├── hooks/          # useTheme hook
│       └── provider/       # Theme provider
│
└── shared/                 # Shared resources
    ├── components/
    │   ├── ui/             # Base UI components
    │   └── ...             # Composite components
    └── lib/
        └── utils.ts        # Utility functions
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5 (Strict mode)
- **Styling:** Tailwind CSS v4 + CSS Custom Properties
- **Icons:** Lucide React

### State Management
- **Library:** Redux Toolkit 2.10
- **Data Fetching:** RTK Query
- **Caching:** Automatic with RTK Query
- **Optimistic Updates:** Built-in support

### Developer Experience
- **Type Safety:** Full TypeScript coverage
- **Code Quality:** ESLint + Next.js config
- **Build Tool:** Next.js webpack
- **Package Manager:** pnpm (lockfile v9)

---

## 📚 Documentation
### Key Concepts

#### Feature-Based Architecture
Each feature is self-contained with its own:
- API endpoints
- Components
- Types
- Hooks (if needed)

**Benefits:**
- Easy to scale
- Clear ownership
- Independent testing
- Parallel development

#### RTK Query Pattern
```typescript
// Base API client
export const baseApi = createApi({...});

// Feature endpoint injection
export const todosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({...}),
    createTodo: build.mutation({...}),
  }),
});
```

#### Design Tokens
```css
:root {
  --color-primary: 217 91% 60%;
  --spacing-md: 1rem;
  --radius-lg: 0.75rem;
}
```

---

## 🎨 Component Library

### Base Components (`shared/components/ui/`)

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

#### Button
```tsx
import { Button } from '@/shared/components/ui/button';

<Button variant="primary" size="md">
  Click me
</Button>

// Variants: primary, secondary, ghost
// Sizes: sm, md, lg
```

#### Input
```tsx
import { Input } from '@/shared/components/ui/input';

<Input
  placeholder="Enter text..."
  aria-label="Input field"
/>
```

### Composite Components

#### StatCard
```tsx
import { StatCard } from '@/shared/components/stat-card';
import { CheckCircle2 } from 'lucide-react';

<StatCard
  title="Completed"
  value={42}
  icon={CheckCircle2}
  color="green"
/>
```

#### Pagination
```tsx
import Pagination from '@/shared/components/pagination';

<Pagination
  currentPage={1}
  totalPages={20}
  onPageChange={setPage}
/>
```

---

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start dev server (localhost:3000)

# Production
pnpm build        # Create production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

### Adding New Features

1. **Create feature folder**
   ```
   src/features/my-feature/
   ├── api/
   ├── components/
   └── types/
   ```

2. **Add API endpoints**
   ```typescript
   // src/features/my-feature/api/my-feature.api.ts
   export const myFeatureApi = baseApi.injectEndpoints({
     endpoints: (build) => ({...}),
   });
   ```

3. **Create components**
   ```typescript
   // src/features/my-feature/components/my-component.tsx
   export function MyComponent() {...}
   ```

4. **Use in pages**
   ```typescript
   // src/app/page.tsx
   import MyComponent from '@/features/my-feature/components/my-component';
   ```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
```

---

### Optimization Techniques
- ✅ RTK Query caching
- ✅ Optimistic updates
- ✅ Code splitting (automatic)
- ✅ Image optimization (Next.js)
- ✅ Font optimization (next/font)

---

## 🙏 Acknowledgments

- **Next.js** - The React Framework
- **Tailwind CSS** - Utility-first CSS
- **Redux Toolkit** - State management
- **Lucide React** - Icon library
- **JSONPlaceholder** - Free REST API

---
**Built with ❤️ using Next.js 16, React 19, and TypeScript**
