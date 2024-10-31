const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/f1.mp3',
        displayName: 'Happy Birthday, Adien!!',
        cover: 'assets/f1.png',
        artist: 'Lets Start, Shall We??',
        bg: 'assets/bg1.jpg',
    },
    {
        path: 'assets/f2.mp3',
        displayName: 'pwetty eyes!',
        cover: 'assets/f2.png',
        artist: 'my favorite pair of eyes in the whole world!',
        bg: 'assets/f2.jpg',
    },
    {
        path: 'assets/f4.mp3',
        displayName: 'My experience was so mysterious',
        cover: 'assets/f4.png',
        artist: 'till i met you, that is!',
        bg: 'assets/f4.jpg',
    },
    {
        path: 'assets/f3.mp3',
        displayName: 'You can do things that you like',
        cover: 'assets/f3.png',
        artist: 'and you dont need a reason to for it!',
        bg: 'assets/f3.jpg',
    },
    {
        path: 'assets/f6.mp3',
        displayName: 'To die by your side',
        cover: 'assets/f6.png',
        artist: 'Is such a heavenly way to die',
        bg: 'assets/f6.jpg',
    },
    {
        path: 'assets/f5.mp3',
        displayName: 'I will keep on fighting ',
        cover: 'assets/f5.png',
        artist: 'Til i no longer can',
        bg: 'assets/f5.jpg',
    },
    {
        path: 'assets/f8.mp3',
        displayName: 'Dont change a thing',
        cover: 'assets/f8.png',
        artist: 'because you are alr amazing!',
        bg: 'assets/f8.jpg',
    },
    {
        path: 'assets/f7.mp3',
        displayName: 'Everything shine so bright',
        cover: 'assets/f7.png',
        artist: 'when im with you!',
        bg: 'assets/f7.jpg',
    },
{
        path: 'assets/f10.mp3',
        displayName: 'Be strong, girl',
        cover: 'assets/f9.png',
        artist: 'Yet its okay to take break once in a while..',
        bg: 'assets/f9.jpg',
    },
    {
        path: 'assets/f9.mp3',
        displayName: 'I want you',
        cover: 'assets/f10.png',
        artist: 'more than any blue sky!',
        bg: 'assets/f10.jpg',
    },

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.bg;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);