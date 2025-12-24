
// img_search_engine.js
const ACCESS_KEY = '*****';

// DOM Elements
// Get references to the necessary DOM elements
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResults = document.getElementById('search-result');
const showMoreButton = document.getElementById('show-more-btnx');

// State Variables
let keyword = '';
let page = 1;


// Function to search images from Unsplash API
async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = '';
    }

    const results = data.results;


// If it's the first page, clear previous results
    results.map((result) => { 
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(image);
        searchResults.appendChild(imageLink);
    })
    showMoreButton.style.display = 'block';

}


// Event Listeners
// Handle form submission for searching images
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

// Handle "Show More" button click to load more images
showMoreButton.addEventListener('click', () => {
    page++;
    searchImages();
});