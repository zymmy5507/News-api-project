document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f3c9bbc123f34bb29ce05a9e439ec7cf';
    const cardContainer = document.querySelector('.card-container');
    const searchInput = document.getElementById('search-news');
    const searchButton = document.getElementById('search-button');

    if (!cardContainer || !searchInput || !searchButton) {
        console.error('Error: Missing essential DOM elements.');
        return;
    }

    // Function to fetch random news
    async function fetchRandomNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.articles) {
                displayNews(data.articles);
            } else {
                cardContainer.innerHTML = `<p>No news articles found.</p>`;
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            cardContainer.innerHTML = `<p>Failed to fetch news. Please try again later.</p>`;
        }
    }

    // Function to display news in cards
    function displayNews(articles) {
        cardContainer.innerHTML = ''; // Clear existing cards
        if (articles.length === 0) {
            cardContainer.innerHTML = `<p>No news articles available.</p>`;
            return;
        }
        articles.forEach((article) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="News Image">
                <h3>${article.title || 'Untitled'}</h3>
                <p>${article.description || 'No description available.'}</p>
            `;
            card.addEventListener('click', () => {
                if (article.url) {
                    window.open(article.url, '_blank'); // Open the news in a new tab
                } else {
                    alert('URL not available for this article.');
                }
            });
            cardContainer.appendChild(card);
        });
    }

    // Function to search news by query
    async function searchNews(query) {
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.articles) {
                displayNews(data.articles);
            } else {
                cardContainer.innerHTML = `<p>No articles found for "${query}".</p>`;
            }
        } catch (error) {
            console.error('Error searching news:', error);
            cardContainer.innerHTML = `<p>Failed to search news. Please try again later.</p>`;
        }
    }

    // Event listener for search button
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchNews(query);
        } else {
            alert('Please enter a search term.');
        }
    });

    // Fetch random news on page load
    fetchRandomNews();
});
