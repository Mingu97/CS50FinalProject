import Cookies from "js-cookie";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(API_BASE_URL)

// Function to fetch products from the API
export const fetchProducts = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}api/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products. HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return ['false'];
  }
};

// Function to calculate page indices
export function calculatePageIndices(currentPage, filteredProducts) {
  const pageSize = 12;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const itemsForCurrentPage = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return { totalPages, endIndex, itemsForCurrentPage };
}

// Function to filter items based on a case-insensitive search query
export function customSearchFilter(items, searchQuery, config) {
  return items.filter((item) => {
    // Combine relevant fields for search
    const combinedFields = config.fields
      .map((field) => item[field] && item[field].toString().toLowerCase())
      .join(' ');
    console.log(combinedFields);
    return combinedFields && combinedFields.includes(searchQuery.toLowerCase());
  });
}


// Example function to get the authentication token
export const getAuthToken = () => {
  return Cookies.get('myAppCookie') ? JSON.parse(Cookies.get('myAppCookie')).token : null;
};
