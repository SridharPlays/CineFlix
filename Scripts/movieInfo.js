const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id'); 

if (!movieId) {
    window.location.href = 'movieLibrary.html';
}

const moviesInfoDiv = document.getElementById('card');

async function fetchMovieDetails() {
    try {
        const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
            method: "GET"
        });

        const movie = await response.json();
        if (movie.success) {
            loadMovieDetails(movie.data);
        } else {
            console.error("Movie not found:", movie.message);
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}
fetchMovieDetails();

function loadMovieDetails(movie) {
    if (!movie) {
        console.error("Movie not found.");
        return;
    }

    let length = movie.Length;
    let [hours, minutes] = length.split(":").map(n => parseInt(n, 10));
    let formattedLength = `${hours}h ${minutes}m`;
    document.title = `${movie.Title} - ${movie.AgeRating}`;

    let abbrMeaning = {
        'U/A': "Unrestricted Public Exhibition - Parental Discretion",
        'U': "Universal",
        'A': "Adult Only"
    }[movie.AgeRating] || "Unknown";

    let musicElement = '';
    if ('music' in movie) {
        musicElement = `
            <audio id="bgm" controls autoplay loop>
                <source src="${movie.music}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <button title="Mute Song" class="mute-button" id="muteBtn">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        `;
    }

    moviesInfoDiv.innerHTML = `
        <button id="previous-button" type="button"><i class="fa-solid fa-arrow-left"></i></button>
        <header>
            <h2>${movie.Title} - <abbr title="${abbrMeaning}">${movie.AgeRating}</abbr></h2>
        </header>
        <div class="wrapper">
            <div class="image-container">
                <img src="${movie.PosterURL}" alt="${movie.Title}">
            </div>
            <div class="content">
                <p id="languageValue">Languages: ${movie.Language}</p>
                <p>${formattedLength} | ${movie.Genre}</p>
                <p>Rating: ${movie.Rating}</p>
                <p class='story'>Story: ${movie.Description}</p>
                <p>Director: ${movie.Director}</p>
                <p>Writer: ${movie.Writer}</p>
                <p>Stars: ${movie.Stars}</p>
                <button class="book-now">Book Now!</button>
            </div>
        </div>
        ${musicElement}
    `;

    setupEventListeners(movie);
}

// Function to Set Up Event Listeners
function setupEventListeners(movie) {
    const previous = document.getElementById('previous-button');
    previous.addEventListener('click', () => {
        window.location.href = './movieLibrary.html';
    });

    // Book Now Event
    document.querySelector('.book-now').addEventListener('click', () => {
        const movieLanguages = movie.Language;
        const dialog = document.getElementById('languageDialog');
        const languageCheckboxes = document.getElementById('languageCheckboxes');
        languageCheckboxes.innerHTML = '';

        movieLanguages.split(',').forEach(language => {
            const radioContainer = document.createElement('div');
            radioContainer.classList.add('radio-container');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'language';
            radio.id = language.trim();
            radio.value = language.trim();

            const label = document.createElement('label');
            label.setAttribute('for', language.trim());
            label.innerText = language.trim();

            radioContainer.appendChild(radio);
            radioContainer.appendChild(label);
            languageCheckboxes.appendChild(radioContainer);
        });

        dialog.style.display = 'flex';

        document.getElementById('dialogCloseButton').onclick = () => {
            dialog.style.display = 'none';
        };
    });

    document.getElementById('dialogBookButton').onclick = () => {
        const selectedLanguage = document.querySelector('input[name="language"]:checked');
        if (selectedLanguage) {
            window.location.href = `screenLoader.html?movie=${encodeURIComponent(movie.name)}&lang=${encodeURIComponent(selectedLanguage.value)}`;
        }
        document.getElementById('languageDialog').style.display = 'none';
    };

    // Image Click for Trailer
    document.querySelector(".image-container").addEventListener("click", () => {
        const trailerContainer = document.getElementById('trailerContainer');
        trailerContainer.innerHTML = `
            <div class="trailer">
                <h2>${movie.Title} Trailer</h2>
                <iframe width="854" height="480" src="${movie.TrailerURL}&autoplay=1&fs=1&controls=0" frameborder="0" allowfullscreen></iframe>
                <button id="close-trailer"><ion-icon name="close-outline"></ion-icon></button>
            </div>
        `;
        trailerContainer.style.display = 'flex';

        document.getElementById('close-trailer').addEventListener('click', () => {
            trailerContainer.style.display = 'none';
            trailerContainer.innerHTML = '';
        });
    });

    // Mute Button Handling
    try {
        const audio = document.getElementById('bgm');
        const muteButton = document.getElementById('muteBtn');
        audio.volume = 0.2;

        muteButton.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                muteButton.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
            } else {
                audio.muted = true;
                muteButton.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
            }
        });
    } catch (error) {}

    // Keyboard Shortcut for Mute
    document.body.addEventListener("keydown", (e) => {
        if (e.key === 'MediaPlayPause') {
            const audio = document.getElementById('bgm');
            const muteButton = document.getElementById('muteBtn');
            if (audio) {
                audio.muted = !audio.muted;
                muteButton.innerHTML = audio.muted ? `<i class="fa-solid fa-volume-xmark"></i>` : `<i class="fa-solid fa-volume-high"></i>`;
            }
        }
    });
}

loadMovieDetails();