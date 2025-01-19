console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let songProgress = document.getElementById('songProgress');
let masterSongName = document.getElementById('masterSongName');
let masterSongArtist = document.getElementById('masterSongArtist');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let masterSongImage = document.getElementById('masterSongImage');

// Scroll Buttons
let scrollLeft = document.getElementById('scrollLeft');
let scrollRight = document.getElementById('scrollRight');

// Updated songs array with artist information
let songs = [
    { songName: "Die with a Smile", songArtist: "Lady Gaga ft. Bruno Mars", filePath: "assets/songs/Diewithasmile.mp3", coverPath: "assets/images/covers/diewithasmile.png" },
    { songName: "Deja vu", songArtist: "Olivia Rodrigo Duterte", filePath: "assets/songs/dejavu.mp3", coverPath: "assets/images/covers/dejavu.jpg" },
    { songName: "We can't be friends", songArtist: "Ariana Grande", filePath: "assets/songs/Wecantbefriends.mp3", coverPath: "assets/images/covers/wecantbefriends.jpg" },
    { songName: "Cruel Summer", songArtist: "Taylor Swift", filePath: "assets/songs/Cruelsummer.mp3", coverPath: "assets/images/covers/cruelsummer.jpg" },
    { songName: "Angel Baby", songArtist: "Troye Sivan", filePath: "assets/songs/Angelbaby.mp3", coverPath: "assets/images/covers/angelbaby.jpg" },
    { songName: "Love You Like a Love Song", songArtist: "Selena Gomez", filePath: "assets/songs/Loveyoulikealovesong.mp3", coverPath: "assets/images/covers/loveyoulikealovesong.jpg" },
    { songName: "New Rules", songArtist: "Dua Lipa", filePath: "assets/songs/Newrules.mp3", coverPath: "assets/images/covers/newrules.png" },
    { songName: "Ere", songArtist: "Juan Karlos", filePath: "assets/songs/Ere.mp3", coverPath: "assets/images/covers/ere.jpg" },
    { songName: "Saan", songArtist: "Maki", filePath: "assets/songs/Saan.mp3", coverPath: "assets/images/covers/saan.jpg" },
    { songName: "Jealous", songArtist: "Nick Jonas", filePath: "assets/songs/Jealous.mp3", coverPath: "assets/images/covers/jealous.jpg" },
    { songName: "Blinding Lights", songArtist: "The Weeknd", filePath: "assets/songs/blindinglights.mp3", coverPath: "assets/images/covers/blindinglightsimg.png" },
    { songName: "Call Out My Name", songArtist: "The Weeknd", filePath: "assets/songs/calloutmyname.mp3", coverPath: "assets/images/covers/calloutmynameimg.png" },
    { songName: "Die For You", songArtist: "The Weeknd", filePath: "assets/songs/dieforyou.mp3", coverPath: "assets/images/covers/dieforyouimg.png" },
    { songName: "Starboy", songArtist: "The Weeknd", filePath: "assets/songs/starboy.mp3", coverPath: "assets/images/covers/starboyimg.png" },
    { songName: "Let Me Love You", songArtist: "Justin Bieber", filePath: "assets/songs/letmeloveyou.mp3", coverPath: "assets/images/covers/letmeloveyouimg.png" },
    { songName: "Horsepower", songArtist: "Daniel Caesar", filePath: "assets/songs/horsepower.mp3", coverPath: "assets/images/covers/horsepowercover.jpg" },
    { songName: "BMF", songArtist: "SZA", filePath: "assets/songs/bmf.mp3", coverPath: "assets/images/covers/bmfcover.jpg" },
];

// Function to format time in minutes:seconds
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Update the song list
songItems.forEach((element, i) => {
    let songItem = document.getElementsByClassName('songitem')[i];
    songItem.getElementsByTagName("img")[0].src = songs[i].coverPath;
    songItem.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    songItem.getElementsByClassName("songArtist")[0].innerText = songs[i].songArtist;
});

// Remove play button and attach play functionality to the container
songItems.forEach((element, i) => {
    element.addEventListener('click', () => {
        songIndex = i;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        masterSongArtist.innerText = songs[songIndex].songArtist;
        updateSongImage();
        audioElement.currentTime = 0;
        updateSongLabels();
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Handle play/pause click on the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// Update the progress bar and time labels
audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    songProgress.value = progress;

    // Update current time label
    let currentTimeLabel = document.getElementById('currentTimeLabel');
    currentTimeLabel.innerText = formatTime(audioElement.currentTime);

    // Update duration label (only if duration is known)
    let durationLabel = document.getElementById('durationLabel');
    if (!isNaN(audioElement.duration)) {
        durationLabel.innerText = formatTime(audioElement.duration);
    }
});

// Seek song based on progress bar
songProgress.addEventListener('input', () => {
    // Calculate the time based on the progress bar value
    let seekTime = (songProgress.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Play next song when the current song ends
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongArtist.innerText = songs[songIndex].songArtist;
    updateSongImage();
    updateSongLabels();
    audioElement.play();
});

// Play the next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongArtist.innerText = songs[songIndex].songArtist;
    updateSongImage();
    audioElement.currentTime = 0;
    updateSongLabels();
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Play the previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongArtist.innerText = songs[songIndex].songArtist;
    updateSongImage();
    audioElement.currentTime = 0;
    updateSongLabels();
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Update the master song image
function updateSongImage() {
    masterSongImage.src = songs[songIndex].coverPath;
}

// Ensure labels reset and update when a new song is selected
function updateSongLabels() {
    let currentTimeLabel = document.getElementById('currentTimeLabel');
    let durationLabel = document.getElementById('durationLabel');

    currentTimeLabel.innerText = "0:00"; // Reset current time label
    if (!isNaN(audioElement.duration)) {
        durationLabel.innerText = formatTime(audioElement.duration);
    } else {
        durationLabel.innerText = "0:00"; // Reset duration label if duration is unknown
    }
}

// Scroll functionality for song list
scrollLeft.addEventListener('click', () => {
    document.querySelector('.songlist').scrollBy({ left: -200, behavior: 'smooth' });
});

scrollRight.addEventListener('click', () => {
    document.querySelector('.songlist').scrollBy({ left: 200, behavior: 'smooth' });
});
