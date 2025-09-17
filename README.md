# Sanskriti Hamburg - Monorepo

This is the monorepo for Sanskriti Hamburg's web applications and services.

## Repository Structure

```
snskrti.github.io/
├── apps/               # Applications
│   └── webapp/         # User-facing web application
│
├── packages/           # Shared libraries and utilities
│   └── types/          # Shared TypeScript type definitions
│
├── netlify/            # Netlify serverless functions
│
└── public/             # Static assets (images, robots.txt, etc.)
```

## Getting Started

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

### Development

Before running the webapp, you need to build the shared packages:

```bash
# Build the types package
npm run build --workspace=packages/types

# Start the web application
npm run start --workspace=apps/webapp

# Run Netlify development server
npm run netlify:dev
```

### Building

```bash
# Build the types package first
npm run build --workspace=packages/types

# Build the webapp
npm run build --workspace=apps/webapp

# Build everything (alternative)
npm run build
```

## Adding New Apps or Packages

To add a new application:

1. Create a new directory in the `apps` folder
2. Initialize it with a `package.json` file
3. Add it to the workspaces in the root `package.json`

To add a new shared package:

1. Create a new directory in the `packages` folder
2. Initialize it with a `package.json` file
3. Add it to the workspaces in the root `package.json`

## Working with TypeScript Types

Shared types are located in the `packages/types` directory. When adding or modifying types:

1. Make your changes in the appropriate file in `packages/types/src/`
2. Rebuild the types package with `npm run build --workspace=packages/types`
3. Import types in application code using the path alias: `import { TypeName } from '@types/filename'`

## Troubleshooting

### Module Resolution Issues

If you encounter module resolution issues with TypeScript:

1. Make sure your `tsconfig.json` includes the correct path mappings
2. Ensure you've built the types package before building any apps that depend on it
3. Check that imports use the correct path format: `import { Type } from '@types/filename'`

## Deployment

The application is deployed to Netlify. The `deploy.sh` script handles the build process for all packages and applications. See the `PRODUCTION_DEPLOYMENT.md` file for more details on the deployment process.
