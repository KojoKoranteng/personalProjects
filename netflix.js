
// Call the main functions the page is loaded
window.onload=()=> {
    getOriginals();
    getTrendingNow();
    getTopRated();
}

// ** Helper function that makes dynamic API calls **
function fetchMovies(url, dom_element, path_type) {
    fetch(url).then(response => {
        if (response.ok) {
        return response.json();
        } else {
            throw new Error('Something went wrong')
        }
    }).then(data => showMovies(data,dom_element,path_type))
    .catch(console.error())
}

//  ** Function that displays the movies to the DOM **

showMovies = (movies, dom_element, path_type) => {
  
//     // Create a variable that grabs id or class
    let moviesElement = document.querySelector(dom_element);
    console.log(moviesElement)
//   // Loop through object and find the item that you seek in the object
    for (let movie of movies.results) {
      // Within loop create an img element
        let imgElement = document.createElement("img");
      // Set attribute
        imgElement.setAttribute("data-id", movie.id);
      // Set source
        imgElement.src = `https://tmdb.org/t/p/original${movie[path_type]}`;
      // Append the imageElement to the dom_element selected
        moviesElement.appendChild(imgElement)
    }

}

// ** Function that fetches Netflix Originals **
function getOriginals() {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  //Call fetchMovies()
    fetchMovies(url, ".original__movies",'poster_path');
}

// ** Function that fetches Trending Movies **
function getTrendingNow() {
    let url='https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  //Call fetchMovies()
    fetchMovies(url, "#trending", "backdrop_path");
}

// ** Function that fetches Top Rated Movies **
function getTopRated() {
    let url='https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'

    //Call fetchMovies()
    fetchMovies(url, "#top_rated", "backdrop_path");
}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
    //URL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`

}

// ** Function that adds movie data to the DOM
const setTrailer=trailers=> {
    // Set up iframe variable to hold id of the movieTrailer Element
    const iframe=''
    // Set up variable to select .movieNotFound element
    const movieNotFound=''

    // If there is a trailer add the src for it
    if (trailers.length > 0) {
        // add d-none class to movieNotFound and remove it from iframe

        // add youtube link with trailers key to iframe.src
    }

    else {
        // Else remove d-none class to movieNotfound and ADD it to iframe

    }
}