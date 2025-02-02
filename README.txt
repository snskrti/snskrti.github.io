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

- `_layouts/`: HTML templates for the site.
- `_includes/`: Reusable components for the site.
- `_posts/`: Blog posts written in Markdown.
- `assets/`: CSS, JavaScript, and image files.
- `public/images/`: Image files used in the site. Vite copies everything from the `public` directory to the root of the build output directory

## Adding Content

To add a new blog post, create a new Markdown file in the `_posts/` directory with the following format: