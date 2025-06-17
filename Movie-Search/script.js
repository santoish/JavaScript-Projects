// https://imdb.iamidiotareyoutoo.com/search?q=Avengers
// https://imdb.iamidiotareyoutoo.com/search?q=${name}

const movieSearchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('.search-list');
const resultGrid = document.querySelector('.result-grid');

async function loadMovies(searchTerm) {
    try {
        const URL = `https://imdb.iamidiotareyoutoo.com/search?q=${searchTerm}`;
        const response = await fetch(`${URL}`);
        const data = await response.json();
        // console.log(data.description);
        if (data.ok === true) displayMovieList(data.description);

    }
    catch (error) {
        console.log(error);
    }
}
/* loadMovies('avengers'); */

function findMovies() {
    let searchValue = (movieSearchBox.value).trim();
    console.log(searchValue);
    if (searchValue.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchValue);
    }
    else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let index = 0; index < movies.length; index++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[index]['#IMDB_ID'];
        let moviePoster = movies[index]['IMG_POSTER'];
        // movieListItem.dataset.id= movies[index]['#IMG_POSTER'];
        // console.log(movieListItem);

        movieListItem.classList.add('search-list-item');
        if (movies[index]['#IMG_POSTER'] !== 'N/A') {
            moviePoster = movies[index]['#IMG_POSTER'];
        }
        else {
            moviePoster = 'image_not_found.png';
        }
        movieListItem.innerHTML = `<div class = "search-item-thumbnail">
                            <img src = "${moviePoster}">
                        </div>
                        <div class = "search-item-info">
                            <h3>${movies[index]['#TITLE']}</h3>
                            <p>${movies[index]['#YEAR']}</p>
                        </div>`;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${movie.dataset.id}`);
            const movieDetails = await result.json();
            console.log(movieDetails);
            displayMovieDetails(movieDetails.description);
        });
    });
}

function displayMovieDetails(details) {
    const movieInfo = details[0];
    console.log(movieInfo);
    
    resultGrid.innerHTML = `
        <div class = "movie-poster">
            <img src = ${movieInfo['#IMG_POSTER']} alt = "movie poster">
        </div>
        <div class = "movie-info">
            <h3 class = "movie-title">${movieInfo['#TITLE']}</h3>
            <ul class = "movie-misc-info">
                <li class = "year">Year: ${movieInfo['#YEAR']}</li>
            </ul>
            
            <p class = "actors"><b>Actors: </b>${movieInfo['#ACTORS']}</p>
            
        </div>
    `;
    // console.log(`Details: ${details.title}`);
    
}