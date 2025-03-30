const API_KEY = 'your_tmdb_api_key';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        moviesList.appendChild(movieElement);
    });
}

const searchBox = document.getElementById('search-box');
searchBox.addEventListener('input', () => {
    const query = searchBox.value.toLowerCase();
    const movies = document.querySelectorAll('.movie');
    movies.forEach(movie => {
        const title = movie.querySelector('p').textContent.toLowerCase();
        movie.style.display = title.includes(query) ? 'block' : 'none';
    });
});
