# Serampore Subdivision Utsav

## Project info

Welcome to this project, created with [Lovable](https://lovable.dev).

This project is a full-stack TypeScript application built with:

- [Tanstack Start](https://tanstack.com/start/latest) — FUll-stack React framework
- [TanStack Router](https://tanstack.com/router/latest) - Type-safe routing
- [TanStack Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Vite](https://vitejs.dev) - Build tool and dev server
- [Talilwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI component library

## Development

### Prerequisites

- Bun >= 1.0

### Install dependencies

```bash
bun install
```

### Start development server

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Build for production

```bash
bun run build
```

### Analyze bundle size

```bash
bun run build: analyze
```

### Run tests

```bash
bun run test
```

## Learning TanStack Start

If you're new to TanStack Start or this template, check out the [TanStack Router docs](https://tanstack.com/router/latest/docs/framework/react/examples/start-basic) on how this works under-the-hood.

## Routing

This project uses file-based routing with TanStack Router. Routes are defined as files in `src/routes`. The routing configuration is automatically generated based on the file structure.

## Data Loading

TanStack Query is integrated for server-state management. Routes can load data using loaders, and components can access this data using hooks like `useSuspenseQuery`.

## Directory Structure

- `src/routes/* - File-based route definitions
- `src/components/` - UI components
- `src/lib/` - Utilities and shared code
- `src/styles.css` - Global styles and design tokens

## Import Aliases

This project uses the @ alias to refer to the src directory.

For example:

```typescript
import { Button } from "@/components/ui/button";
```

## Adding Components

Add shadcn/ui components using these pretrictured commands:

```bash
# Add a component
pnpmx shadcn@latest add [package-name]

# Example: add a dialog component
pnpmx shadcn@latest add dialog

# Initialize shadcn/ui (only needed once)
pnpmx shadcn@latest init
```

## Other

- [Shadcn UK Docs](https://ui.shadcn.com/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Tanstack Router Docs](https://tanstack.com/router/latest)
