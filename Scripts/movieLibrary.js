const movies = [{
    name: "Leo",
    image_loc: "Leo.jpg",
    language: "Tamil, Telugu, Hindi, Kannada, Malayalam",
    format: "IMAX 2D, 2D",
    genre: "Action, Crime, Drama, Thriller"
},
{
    name: "Lucky Bhaskar",
    image_loc: "LuckyBhaskar.jpg",
    language: "Telugu, Malayalam, Tamil, Hindi",
    format: "2D",
    genre: "Crime, Drama, Thriller"
},
{
    name: "Transformer One",
    image_loc: "TransformerOne.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Animation, Action, Adventure, Fantasy, Sci-Fi"
},
{
    name: "Minecraft",
    image_loc: "Minecraft.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Animation, Adventure, Fantasy",
},
{
    name: "Pacific Rim",
    image_loc: "PacificRim.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Action, Adventure, Sci-Fi",
},
{
    name: "Amaran",
    image_loc: "Amaran.jpg",
    language: "Tamil",
    format: "2D",
    genre: "Action, Biography, Drama, War"
},
{
    name: "Interstellar",
    image_loc: "Interstellar.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 2D",
    genre: "Adventure, Drama, Sci-Fi"
},
{
    name: "Aavesham",
    image_loc: "Aavesham.jpg",
    language: "Malayalam",
    format: "2D",
    genre: "Action, Comedy"
},
{   name: "KGF Chapter 2", 
    image_loc: "KGFChapter2.jpg", 
    language: "Kannada, Tamil, Hindi, Telugu, Malayalam", 
    format: "2D", 
    genre: "Action, Drama" 
}, 
{   
    name: "Avengers Endgame",
    image_loc: "AvengersEndgame.jpg",
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Drama, Sci-Fi" 
}, 
{ 
    name: "Godzilla x Kong: The New Empire", 
    image_loc: "GodzillaxKong.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Sci-Fi" 
}, 
{ name: "Avatar: The Way of Water", 
    image_loc: "Avatar2.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Fantasy, Sci-Fi" 
}, 
{ 
    name: "Cars 3", 
    image_loc: "Cars3.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Animation, Adventure, Comedy, Sport" 
}, 
{ 
    name: "Mission Impossible", 
    image_loc: "MissionImpossible.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Thriller" 
}, 
{ 
    name: "The Wild Robot", 
    image_loc: "WildRobot.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Animation, Adventure, Sci-Fi" 
}, 
{ 
    name: "Mufasa: The Lion King", 
    image_loc: "Mufasa.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Animation, Adventure, Drama" 
}, 
{ 
    name: "Manjummel Boys", 
    image_loc: "ManjummelBoys.jpg", 
    language: "Malayalam", 
    format: "2D", 
    genre: "Comedy, Drama" 
}, 
{ 
    name: "Soorarai Potru", 
    image_loc: "SooraraiPotru.jpg", 
    language: "Tamil", 
    format: "2D", 
    genre: "Biography, Drama" 
}, 
{ 
    name: "Kingdom of the Planet of the Apes", 
    image_loc: "KingdomOfApes.jpg", 
    language: "English", 
    format: "IMAX 3D, 4DX, 2D", 
    genre: "Action, Adventure, Drama, Sci-Fi" 
}, 
{ 
    name: "Dune: Part Two", 
    image_loc: "Dune.jpg", 
    language: "English", 
    format: "IMAX 2D, 4DX, 2D", 
    genre: "Adventure, Drama, Sci-Fi" 
},
{
    name: "Alien: Romulus",
    image_loc: "AlienRomulus.jpg",
    language: "English",
    format: "IMAX 2D, 4DX, 2D",
    genre: "Horror, Sci-Fi, Thriller"
},
{
    name: "Wicked",
    image_loc: "Wicked.jpg",
    language: "English",
    format: "2D",
    genre: "Fantasy, Romance"
},
{
    name: "Ponniyin Selvan: Part Two",
    image_loc: "PS2.jpg",
    language: "Tamil, Hindi, Kannada, Telugu, Malayalam",
    format: "IMAX 2D, 2D",
    genre: "Action, Adevnture, History, Drama"
},
{
    name: "Bullet Train",
    image_loc: "BulletTrain.jpg",
    language: "English",
    format: "IMAX 3D",
    genre: "Action, Comedy, Thriller"
},
{
    name: "How to Train Your Dragon",
    image_loc: "Dragon.jpg",
    language: "English",
    format: "IMAX 3D, 4DX, 3D",
    genre: "Action, Adventure, Comedy, Drama, Fantasy"
},
{
    name: "Gladiador II",
    image_loc: "Gladiador.jpg",
    language: "English",
    format: "IMAX 2D, 4DX, 2D",
    genre: "Action, Adventure, Drama"
},
{
    name: "Oppenheimer",
    image_loc: "Oppenheimer.jpg",
    language: "English",
    format: "IMAX 2D, 4DX, 2D",
    genre: "Biography, Drama, History",
}
];

const languageList = [
    " ",
    "English",
    "Tamil",
    "Telugu",
    "Hindi",
    "Kannada",
    "Malayalam",
    "Japanese",
    "Korean",
]

const formatList = [
    " ",
    "2D",
    "3D",
    "IMAX 2D",
    "IMAX 3D",
    "4DX"
]

const genreList = [
    " ",
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

// Loading all the Movies Dynamically
let moviesDiv = document.getElementById('movies');
movies.forEach(element => {
    let div = document.createElement('div');
    div.className = 'movie';
    div.innerHTML = `
        <img src="MovieBanner/${element.image_loc}">
        <h1>${element.name}</h1> 
        <p>${element.language}</p> 
        <p>${element.format}</p>
        `;
    moviesDiv.appendChild(div);
});

// Loading Languages Options
let i = 0;
let languageDiv = document.getElementById('languageOptions');
languageList.forEach((language)=> {
    languageHTML = document.createElement('div');
    languageHTML.className = "option";
    if(i === 0 ) {
    languageChecked = 'checked';
    languageValue = 'All';
}
    languageHTML.innerHTML = `
        <input id="language${i}" name="language" class="language-btn" value="${i === 0 ? '' : language}" type="radio" ${i === 0 ? 'checked' : ''}>
        <label for="language${i}">${i === 0 ? 'All' : language}</label>
        `;

    languageDiv.appendChild(languageHTML);
    i++;
})

// Loading Various Format Options 
i = 0;
let formatDiv = document.getElementById('formatOptions');
formatList.forEach((format)=> {
    formatHTML = document.createElement('div');
    formatHTML.className = "option";
    if(i === 0 ) {
    formatChecked = 'checked';
    formatValue = 'All';
}
    formatHTML.innerHTML = `
        <input id="format${i}" name="format" class="format-btn" value="${i === 0 ? '' : format}" type="radio" ${i === 0 ? 'checked' : ''}>
        <label for="format${i}">${i === 0 ? 'All' : format}</label>
        `;

    formatDiv.appendChild(formatHTML);
    i++;
})

// Loading Genre Button Dynamically
i = 0;
let genreDiv = document.getElementById('genreOptions');
genreList.forEach((genre)=> {
    genreHTML = document.createElement('div');
    genreHTML.className = "option";
    let genreChecked, genreValue = '';
    if(i === 0 ) {
    genreChecked = 'checked';
    genreValue = 'All';
}
    genreHTML.innerHTML = `
        <input id="genre${i}" name="genre" class="genre-btn" value="${i === 0 ? '' : genre}" type="radio" ${i === 0 ? 'checked' : ''}>
        <label for="genre${i}">${i === 0 ? 'All' : genre}</label>
        `;

    genreDiv.appendChild(genreHTML);
    i++;
})

let languageButton = document.querySelectorAll('.language-btn');
let formatButtons = document.querySelectorAll('.format-btn');
let genreButtons = document.querySelectorAll('.genre-btn');

// Sorter
function filterMovies() {
    const selectedLanguage = document.querySelector('.language-btn:checked')?.value || '';
    const selectedFormat = document.querySelector('.format-btn:checked')?.value || '';
    const selectedGenre = document.querySelector('.genre-btn:checked')?.value || '';

    moviesDiv.innerHTML = '';
    let movieFound = false;

    movies.forEach((movie) => {
        const languageMatch = selectedLanguage === '' || movie.language.includes(selectedLanguage);
        const formatMatch = selectedFormat === '' || movie.format.includes(selectedFormat);
        const genreMatch = selectedGenre === '' || movie.genre.includes(selectedGenre);

        if (languageMatch && formatMatch && genreMatch) {
            const div = document.createElement('div');
            let format = movie.format.split(",");
            div.className = 'movie';
            div.innerHTML = `
                <img src="MovieBanner/${movie.image_loc}" alt="${movie.name} Poster">
                <h1>${movie.name}</h1>
                <p>${movie.language}</p>
                <p>${format[0]} ${format[1] ? `• ${format[1]}` : ""} ${format[2] ? `• ${format[2]}` : ""}  ${format[3] ? `• ${format[3]}` : ""}  ${format[4] ? `• ${format[4]}` : ""}  ${format[5] ? `• ${format[5]}` : ""}</p>
                <p>${movie.genre}</p>`
            moviesDiv.appendChild(div);
            movieFound = true;
        }
    });
    if(movieFound) {
        showToast('success')
    } else {
        showToast('error');
    }
}



// Sorter Caller !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
languageButton.forEach((btn) => btn.addEventListener('change', filterMovies));
formatButtons.forEach((btn) => btn.addEventListener('change', filterMovies));
genreButtons.forEach((btn) => btn.addEventListener('change', filterMovies));

// Movie Info Sender
let selectedMovieName = '';
let selectedMovieLang = '';
moviesDiv.addEventListener('click', (event) => {
    const movieElement = event.target.closest('.movie');
    if (movieElement) {
        selectedMovieName = movieElement.querySelector('h1').innerText;
        window.location.href = `movieInfo.html?movie=${encodeURIComponent(selectedMovieName)}`;
    }
});


let resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    document.getElementById('language0').checked = true;
    document.getElementById('genre0').checked = true;
    document.getElementById('format0').checked = true;
    filterMovies();
});

// Search Functionality
let searchButton = document.getElementById('search-query');
searchButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let MovieName = searchButton.value.toLowerCase();
        let movieFound = false;
        if(MovieName.length !== 0) {
        movies.forEach((movie) => {
            if (MovieName === movie.name.toLowerCase() || movie.name.toLowerCase().includes(MovieName) && MovieName.length > 1) {
                moviesDiv.innerHTML = '';
                let div = document.createElement('div');
                div.className = 'movie';
                div.innerHTML = `
                    <img src="MovieBanner/${movie.image_loc}" alt="${movie.name}">
                    <h1>${movie.name}</h1>
                    <p>${movie.language}</p>
                    <p>${movie.format}</p>
                `;
                moviesDiv.appendChild(div);
                movieFound = true;
                showToast('success')
            }
        });
        if (!movieFound) {
            showToast('error');
        }
    };
    }
});

// Search Cancel Button
searchInput.addEventListener('input', function(e) {
    if (this.value === '') {
        filterMovies();
    }
});

function showToast(type) {
    var toast;
    if (type === 'success') {
        toast = document.getElementById("toast");
    } else if (type === 'error') {
        toast = document.getElementById("error-toast");
    }
    toast.className = "toast show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

document.getElementById('close-btn').addEventListener("click", () => {
    var toast = document.getElementById("toast");
    toast.className = toast.className.replace("show", "");
});

document.querySelector('.error__close').addEventListener("click", () => {
    var toast = document.getElementById("error-toast");
    toast.className = toast.className.replace("show", "");
});



filterMovies();