const fs = require('fs');
const jsonFilePath = 'movies.json'; 
const textFilePath = 'movies.txt'; 

function createFile() {
    fs.writeFile(textFilePath, '', (err) => {
        if (err) throw err;
        console.log('File created successfully!');
    });
}

function readJSONFile(callback) {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        try {
            const movies = JSON.parse(data);
            callback(movies);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
}

function writeFile(movieData) {
    fs.appendFile(textFilePath, movieData + '\n', (err) => {
        if (err) throw err;
        console.log('Movie data written successfully!');
    });
}

function openFile() {
    fs.readFile(textFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('File Content:\n', data || 'No data available.');
        }
    });
}

function closeFile() {
    console.log('File operations completed. No explicit close required in FS.');
}

createFile();

setTimeout(() => {
    readJSONFile((movies) => {
        movies.forEach((movie) => {
            const movieInfo = `Movie: ${movie.name} | Genre: ${movie.genre} | Year: ${movie.director}`;
            writeFile(movieInfo);
        });
    });
}, 1000);

setTimeout(() => openFile(), 3000);
setTimeout(() => closeFile(), 4000);
