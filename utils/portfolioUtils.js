import fs from 'fs';
import path from 'path';

// Base directory for portfolio content
const PORTFOLIO_DIR = path.join(process.cwd(), 'public', 'portfolio');

/**
 * Gets all portfolio categories by scanning the portfolio directory
 * Each subfolder with a portfolio-topic.json file is considered a category
 */
export function getPortfolioCategories() {
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
      category: jsonData.category || 'Uncategorized'
    };
  });
}

/**
 * Gets all images for a specific category
 */
export function getImagesForCategory(category) {
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
 */
export function getProjectData(slug) {
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
 */
export function getAllProjectSlugs() {
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