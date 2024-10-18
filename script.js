const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const songs = [
    {
        title: 'Nadaan Parinde',
        artist: 'Mohit Chauhan',
        src: 'Music/Nadaan Parinde.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b27354e544672baa16145d67612b'
    },
    {
        title: 'Apna Bana Le',
        artist: 'Arijit Singh',
        src: 'Music/Apna Bana Le.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b273b85b4e8fb6ba961aedfde386'
    },
    {
        title: 'Chal Diye Tum Kahan',
        artist: 'AUR',
        src: 'Music/Chal Diye Tum Kahan.mp3',
        cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2f/f3/9e/2ff39eda-e1bc-82ce-ba50-ecf81420b511/859792403090_cover.jpg/1200x1200bf-60.jpg'
    },
    {
        title: 'Tum Se',
        artist: 'Raghav Chaitanya',
        src: 'Music/Tum Se (From _Teri Baaton Mein Aisa Uljha Jiya_).mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b273b608e9bcf3845d082d1d559e'
    },
    {
        title: 'Mere Humsafar',
        artist: 'Yashal Shahid',
        src: 'Music/Mere Humsafar (Original Score) [Female Version].mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b27329fc8f5c12bdaeb322cbbd80'
    },
    {
        title: 'Pehle Bhi Main',
        artist: 'Vishal Mishra',
        src: 'Music/Pehle Bhi Main.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b2735f3ede47954a93aa03efe5f9'
    },
    {
        title: 'Mujhe Pyaar Hua Tha',
        artist: 'Kaifi Khalil',
        src: 'Music/Mujhe Pyaar Hua tha (Original Soundtrack).mp3',
        cover: 'https://i1.sndcdn.com/artworks-d6zvUfyzVTQlWw7j-RdrHxw-t500x500.jpg'
    },
    // {
    //     title: '',
    //     artist: '',
    //     src: 'Music/.mp3',
    //     cover: ''
    // },
    // {
    //     title: '',
    //     artist: '',
    //     src: 'Music/.mp3',
    //     cover: ''
    // }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;

    // Reset progress bar when new song is loaded
    progress.value = 0;
    progress.style.background = `linear-gradient(to right, white 0%, rgba(255, 255, 255, 0.1) 0%)`;
}

// Play song
function playSong() {
    audio.play();
    playBtn.innerText = '⏸';
}

// Pause song
function pauseSong() {
    audio.pause();
    playBtn.innerText = '▶️';
}

// Toggle between play and pause
function togglePlayPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

// Go to the previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Go to the next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Update the progress bar and its background
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    // Update the progress bar value
    progress.value = progressPercent;

    // Dynamically change the background of the progress bar
    progress.style.background = `linear-gradient(to right, white ${progressPercent}%, rgba(255, 255, 255, 0.1) ${progressPercent}%)`;
}

// Seek to a different part of the song
// Seek to a different part of the song
function setProgress(e) {
    const width = this.clientWidth; // Get the width of the progress bar
    let clickX;

    // Check if the event is a touch event or a mouse click
    if (e.type === 'touchstart') {
        const touch = e.touches[0]; // Get the first touch point
        clickX = touch.clientX - this.getBoundingClientRect().left; // Calculate the x position for touch
    } else {
        clickX = e.offsetX; // For click events, use the offsetX property
    }

    const duration = audio.duration; // Get the duration of the current song

    // Calculate the new current time based on the click/touch position
    const newCurrentTime = (clickX / width) * duration;
    audio.currentTime = newCurrentTime; // Set the new current time
}

// Event listeners
playBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);  // Update progress bar as the song plays

// Add both click and touchstart event listeners for seeking
progress.addEventListener('click', setProgress);
progress.addEventListener('touchstart', setProgress);  // Handle touch events for seeking on mobile

audio.addEventListener('ended', nextSong);  // Auto-play next song when the current song ends

// Initial load
loadSong(songs[songIndex]);

const logo = document.getElementById('logo');

// Add event listener to the logo to refresh the page on click
logo.addEventListener('click', () => {
    location.reload(); // This will refresh the page
});

// Get elements for time display
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Format time as mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update the progress bar and song time
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    // Update the progress bar value
    progress.value = progressPercent;

    // Dynamically change the background of the progress bar
    progress.style.background = `linear-gradient(to right, white ${progressPercent}%, rgba(255, 255, 255, 0.1) ${progressPercent}%)`;

    // Update the current time and duration
    currentTimeEl.innerText = formatTime(currentTime);

    // If duration is available, set it. This avoids showing NaN before the song starts playing
    if (duration) {
        durationEl.innerText = formatTime(duration);
    }
}

// Event listeners
audio.addEventListener('timeupdate', updateProgress);
