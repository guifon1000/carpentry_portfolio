# Carpentry Portfolio Website

A professional portfolio website for a carpentry business, built with Next.js.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at http://localhost:3000

### Building for Production

```bash
npm run build
```

### Static Export

For static hosting (to upload to a web server's public_html folder):

```bash
# On Windows
set EXPORT=true && npm run build

# On Linux/Mac
EXPORT=true npm run build
```

This will create an `out` directory with static HTML files that can be uploaded to any web hosting service.

## Project Structure

- **`pages/`**: Contains all website pages
- **`components/`**: Reusable React components
- **`public/`**: Static assets and portfolio content
  - **`portfolio/`**: Project data and images
  - **`images/`**: Site images and logo
  - **`locales/`**: Translation files
- **`styles/`**: CSS files
- **`utils/`**: Utility functions

## Portfolio Management

Add new projects by creating a folder in `public/portfolio/` with:

1. A `portfolio-topic.json` file containing project details
2. Image files (jpg, jpeg, png) to be displayed in the gallery

Example portfolio-topic.json:
```json
{
  "title": "Project Title",
  "description": "Brief description",
  "fullDescription": "Detailed project description",
  "category": "Category name",
  "client": "Client name",
  "completionDate": "Date completed",
  "location": "Project location"
}
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Email Setup

See [EMAIL_SETUP.md](EMAIL_SETUP.md) for instructions on setting up the contact form email functionality.