const languageList = [
    "All",
    "English",
    "Tamil",
    "Telugu",
    "Hindi",
    "Kannada",
    "Malayalam",
    "Japanese",
    "Korean",
];

const formatList = [
    "All",
    "2D",
    "3D",
    "IMAX 2D",
    "IMAX 3D",
    "4DX"
];

const genreList = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "History",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller"
];

let movies = []; // Stores fetched movies

// Loading all the Movies Dynamically
let moviesDiv = document.getElementById("movies");

function loadMovie(movie) {
    let format = movie.Format.split(",").join(" • ");
    let div = document.createElement("div");
    div.className = "movie";
    div.setAttribute("data-id", movie.MovieNo);
    div.innerHTML = `
        <img src="${movie.PosterURL}" loading="lazy">
        <h1>${movie.Title}</h1> 
        <p>${movie.Language}</p> 
        <p>${format}</p>
    `;
    moviesDiv.appendChild(div);
}

// Fetch Movies from API
async function fetchMovies() {
    try {
        const response = await fetch("http://localhost:5000/api/movies/");
        const data = await response.json();
        if (data.success) {
            movies = data.data; // Store movies globally
            movies.forEach(loadMovie);
        } else {
            console.error("Error fetching movies:", data.message);
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
}

fetchMovies();

// Utility function to dynamically create filter options
function createFilterOptions(containerId, list, type) {
    let container = document.getElementById(containerId);
    list.forEach((item, index) => {
        let div = document.createElement("div");
        div.className = "option";
        div.innerHTML = `
            <input id="${type}${index}" name="${type}" class="${type}-btn" value="${index === 0 ? '' : item}" type="radio" ${index === 0 ? 'checked' : ''}>
            <label for="${type}${index}">${item}</label>
        `;
        container.appendChild(div);
    });
}

// Loading filter options dynamically
createFilterOptions("languageOptions", languageList, "language");
createFilterOptions("formatOptions", formatList, "format");
createFilterOptions("genreOptions", genreList, "genre");

// Filtering Function
function filterMovies() {
    const selectedLanguage = document.querySelector(".language-btn:checked")?.value || "";
    const selectedFormat = document.querySelector(".format-btn:checked")?.value || "";
    const selectedGenre = document.querySelector(".genre-btn:checked")?.value || "";

    moviesDiv.innerHTML = "";
    let movieFound = false;

    movies.forEach((movie) => {
        const languageMatch = selectedLanguage === "" || movie.Language.includes(selectedLanguage);
        const formatMatch = selectedFormat === "" || movie.Format.includes(selectedFormat);
        const genreMatch = selectedGenre === "" || movie.Genre.includes(selectedGenre);

        if (languageMatch && formatMatch && genreMatch) {
            loadMovie(movie);
            movieFound = true;
        }
    });

    showToast(movieFound ? "success" : "error");
}

// Attach event listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".language-btn").forEach((btn) => btn.addEventListener("change", filterMovies));
    document.querySelectorAll(".format-btn").forEach((btn) => btn.addEventListener("change", filterMovies));
    document.querySelectorAll(".genre-btn").forEach((btn) => btn.addEventListener("change", filterMovies));

    // Reset Button
    document.getElementById("reset").addEventListener("click", () => {
        document.getElementById("language0").checked = true;
        document.getElementById("genre0").checked = true;
        document.getElementById("format0").checked = true;
        filterMovies();
    });

    // Search Functionality
    let searchButton = document.getElementById("search-query");
    searchButton.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            let searchQuery = searchButton.value.toLowerCase();
            let movieFound = false;

            if (searchQuery.length !== 0) {
                moviesDiv.innerHTML = "";
                movies.forEach((movie) => {
                    if (movie.Title.toLowerCase().includes(searchQuery)) {
                        loadMovie(movie);
                        movieFound = true;
                    }
                });
            }

            showToast(movieFound ? "success" : "error");
        }
    });

    // Search Cancel Button
    searchButton.addEventListener("input", function () {
        if (this.value === "") {
            filterMovies();
        }
    });

    // Movie Info Sender
    moviesDiv.addEventListener("click", (event) => {
        const movieElement = event.target.closest(".movie");
        if (movieElement) {
            let movieId = movieElement.getAttribute("data-id"); // Get movie ID
            window.location.href = `movieInfo.html?id=${encodeURIComponent(movieId)}`;
        }
    });    

    // Toast Close Buttons
    document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("toast").classList.remove("show");
    });

    document.querySelector(".error__close").addEventListener("click", () => {
        document.getElementById("error-toast").classList.remove("show");
    });
});

// Toast Functionality
function showToast(type) {
    let toast = type === "success" ? document.getElementById("toast") : document.getElementById("error-toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}
