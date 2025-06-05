// For server-side only imports
let path;
let fs;

// Only require these modules on the server side
if (typeof window === 'undefined') {
  path = require('path');
  fs = require('fs');
}

// Base directory for portfolio content
const getPortfolioDir = () => {
  if (typeof window !== 'undefined') return '';
  return path.join(process.cwd(), 'public', 'portfolio');
};

/**
 * Gets all portfolio categories by scanning the portfolio directory
 * Server-side only function
 */
export function getPortfolioCategories() {
  // Ensure we're on the server
  if (typeof window !== 'undefined') {
    return [];
  }

  const PORTFOLIO_DIR = getPortfolioDir();
  
  // Ensure the portfolio directory exists
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    return [];
  }

  // Read all directories in the portfolio folder
  const directories = fs.readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Filter directories that contain a portfolio-topic.json file
  const categories = directories.filter(dir => {
    const jsonPath = path.join(PORTFOLIO_DIR, dir, 'portfolio-topic.json');
    return fs.existsSync(jsonPath);
  });

  // Map each category to an object with its data
  return categories.map(category => {
    const jsonPath = path.join(PORTFOLIO_DIR, category, 'portfolio-topic.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Get first image to use as thumbnail
    const images = getImagesForCategory(category);
    const thumbnailImage = images.length > 0 ? images[0] : '/images/placeholder.jpg';
    
    return {
      id: category,
      title: jsonData.title || category,
      description: jsonData.description || '',
      imageUrl: thumbnailImage,
      slug: category,
      category: jsonData.category || 'Uncategorized',
      featured: jsonData.featured || false
    };
  });
}

/**
 * Gets all images for a specific category
 * Server-side only function
 */
export function getImagesForCategory(category) {
  // Ensure we're on the server
  if (typeof window !== 'undefined') {
    return [];
  }

  const PORTFOLIO_DIR = getPortfolioDir();
  const categoryDir = path.join(PORTFOLIO_DIR, category);
  
  // Ensure the directory exists
  if (!fs.existsSync(categoryDir)) {
    return [];
  }
  
  // Get all files in the directory
  const files = fs.readdirSync(categoryDir);
  
  // Filter image files (jpg, jpeg, png, etc)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const images = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
  
  // Return the public URLs for the images
  return images.map(image => `/portfolio/${category}/${image}`);
}

/**
 * Gets the detailed data for a specific project
 * Server-side only function
 */
export function getProjectData(slug) {
  // Ensure we're on the server
  if (typeof window !== 'undefined') {
    return null;
  }

  const PORTFOLIO_DIR = getPortfolioDir();
  const jsonPath = path.join(PORTFOLIO_DIR, slug, 'portfolio-topic.json');
  
  // Check if the project exists
  if (!fs.existsSync(jsonPath)) {
    return null;
  }
  
  // Read and parse the JSON data
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  // Get all images for this project
  const images = getImagesForCategory(slug);
  
  // Return the combined data
  return {
    ...jsonData,
    images,
    slug
  };
}

/**
 * Gets all project slugs for static path generation
 * Server-side only function
 */
export function getAllProjectSlugs() {
  // Ensure we're on the server
  if (typeof window !== 'undefined') {
    return [];
  }

  const PORTFOLIO_DIR = getPortfolioDir();
  
  // Ensure the portfolio directory exists
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    return [];
  }

  // Read all directories in the portfolio folder
  const directories = fs.readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Filter directories that contain a portfolio-topic.json file
  return directories.filter(dir => {
    const jsonPath = path.join(PORTFOLIO_DIR, dir, 'portfolio-topic.json');
    return fs.existsSync(jsonPath);
  }).map(slug => ({ params: { projectSlug: slug } }));
}

/**
 * Gets featured projects only
 * Server-side only function
 */
export function getFeaturedProjects() {
  // Get all projects
  const allProjects = getPortfolioCategories();
  
  // Filter to only featured projects
  return allProjects.filter(project => project.featured === true);
}