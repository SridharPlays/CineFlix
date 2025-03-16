

const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get('movie');
const movieLanguage = urlParams.get('lang');
const moviePrice = urlParams.get('price');
const movieSeats = urlParams.get('seats');
const movieTime = urlParams.get('time');
const movieDay = urlParams.get('day');
const movieYear = new Date().getFullYear();
let movieImageLoc;
let movieGenre;
const movieDays = movieDay.split(',');

movies.forEach(movie => {
    if (movie.name.toLowerCase() === movieName.toLowerCase()) {
        movieImageLoc = movie.image_loc;
        let movieGenres = movie.genre;
        movieGenre = movieGenres.split(",");
        movieGenre = movieGenre.join(" • ");
    }
})

const ticket = document.getElementById('ticket');
const randomNo = Math.round(Math.random() * 100000000);
const randomScreen = Math.round(Math.random() * 20);

const ticketHTML = `
    <div class="left">
        <div class="image" id="image">
            <div class="ticket-number">
                <p>
                    #${randomNo}
                </p>
            </div>
        </div>
        <div class="ticket-info">
            <p class="date">
                <span>${movieDays[0]}</span>
                <span class="date-info">${movieDays[1]}</span>
                <span>${movieYear}</span>
            </p>
            <div class="show-name">
                <h1>${movieName} • ${movieLanguage}</h1>
                <p>${movieGenre}</p>
            </div>
            <div class="time main-time">
                <p>TIME<span>: </span> ${movieTime}</p>
                <p>SEAT NO<span>: </span> ${movieSeats}</p>
                <p>SCREEN <span>: </span> ${randomScreen}</p>
            </div>
            <p class="location"><span>Cineflix Director's Cuts</span>
                <span class="separator"><i class="far fa-smile"></i></span><span>Bannerghatta Road, Bengaluru</span>    
            </p>
        </div>
    </div>
    <div class="right">
        <div class="right-info-container">
            <p class="cineflix">
                <span>CINEFLIX CINEMAS</span>
                <span>CINEFLIX CINEMAS</span>
                <span>CINEFLIX CINEMAS</span>
                <span>CINEFLIX CINEMAS</span>
            </p>
            <div class="show-name">
                <h1>IMAX 2D</h1>
            </div>
            <div class="time">
                <p>Price<span>: </span> ₹${moviePrice}</p>
                <p>SCAN THE QR FOR SHOW INFO</p>
            </div>
            <div class="barcode">
                <img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code">
            </div>
            <p class="ticket-number">
                #${randomNo}
            </p>
        </div>
    </div>
	`;
ticket.innerHTML = ticketHTML;


const element = document.getElementById('image');
element.style.backgroundImage = `url('./MovieBanner/${movieImageLoc}')`;



// const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname; 
// window.history.replaceState({}, '', newUrl);

const canvas = document.getElementById('ticketCanvas');
const ctx = canvas.getContext('2d');
const downloadButton = document.getElementById('downloadButton');

canvas.width = 800;
canvas.height = 400;

const renderTicket = () => {
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Image Section
    const img = new Image();
    img.src = `./MovieBanner/${movieImageLoc}`;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 250, canvas.height);

        // Text Details
        ctx.fillStyle = '#000';
        ctx.font = '24px Poppins';
        ctx.fillText('Cineflix Cinemas', 280, 50);
        ctx.fillText(`#${randomNo}`, 600, 50);
        ctx.fillText(`Movie: ${movieName}`, 280, 100);
        ctx.fillText(`Seat: ${movieSeats}`, 280, 150);
        ctx.fillText(`Price: ${moviePrice}`, 280, 200);
        ctx.fillText(`Screen: ${randomScreen}`, 280, 250);
        ctx.fillText(`Time: ${movieTime}`, 280, 300);
        ctx.fillText(`Date: ${movieDay}`, 280, 350);
    };
};

renderTicket();

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'movie_ticket.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});