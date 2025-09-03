# Sanskriti Hamburg Monorepo

This repository contains the codebase for the Sanskriti Hamburg website and admin panel.

## Project Structure

This is a monorepo containing multiple packages:

- `packages/webapp`: The main public-facing website
- `packages/adminapp`: The admin panel for managing content (coming soon)
- `packages/shared`: Shared code and types used by both applications
- `netlify/functions`: Serverless functions for backend functionality

## Development

### Prerequisites

- Node.js 16 or higher
- npm 7 or higher (for workspaces support)

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the applications

#### Web App

```
npm run start:webapp
```

#### Admin App

```
npm run start:adminapp
```

### Building for production

```
npm run build
```

This will build both the webapp and adminapp packages.

## Deployment

The project is deployed to Netlify. The `netlify.toml` file contains the configuration for deployment.

## Environment Variables

Each package has its own environment variables. Check the `.env.example` files in each package for the required variables.
