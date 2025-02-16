# SANSKRITI GitHub Pages

Welcome to the SANSKRITI GitHub Pages repository. This project is designed to host a static website using GitHub Pages.

## Getting Started

To get started with building and running this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/snskrti.github.io.git
   cd snskrti.github.io
   ```

2. **Install dependencies:**
   This project uses npm for managing dependencies. Make sure you have Node.js and npm installed, then run:

   ```sh
   npm install
   ```

3. **Build the site:**
   Build the site using the following command:

   ```sh
   npm run build
   ```

4. **Run the site locally:**
   Start the local server to serve the site:
   ```sh
   npm start
   ```
   Open your browser and navigate to `http://localhost:4000` to see the site.

## Project Structure

- `.github/`: Github specific runtime / CI info.
- `build/`: Build result for the website.
- `node_modules/`: NodeJS modules.
- `public/`: Public files (images, redirect instructions, index files) to be picked up for build from src.
- `src/`: Contains the source files

## Adding Content

- To add a new page:
- - create a new React component under `/src/pages/`, and follow the pattern of content writing from the existing pages.
- - add the route and the path to your page inside the Routes definitions in `/src/App.tsx`
