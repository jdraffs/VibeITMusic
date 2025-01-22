console.log("Welcome to VibeIT");

// Initialize states for shuffle, repeat, and mute
let isShuffling = false;
let repeatMode = 0; // 0: No repeat, 1: Repeat current, 2: Repeat all
let previousVolume = 1; // Stores volume level before mute

// Shuffle and Repeat buttons
let shuffleButton = document.getElementById('shuffle');
let repeatButton = document.getElementById('repeat');
let volumeControl = document.getElementById('volumeControl');
let muteButton = document.getElementById('muteButton');

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let songProgress = document.getElementById('songProgress');
let masterSongName = document.getElementById('masterSongName');
let masterSongArtist = document.getElementById('masterSongArtist');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let masterSongImage = document.getElementById('masterSongImage');

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

// Update the progress bar and time labels in real time
    audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100 || 0;
    songProgress.value = progress;

    // Dynamically update the background gradient
    songProgress.style.background = `linear-gradient(to right, rgb(255, 98, 174) ${progress}%, rgb(29, 29, 29) ${progress}%)`;

    // Update current time label
    let currentTimeLabel = document.getElementById('currentTimeLabel');
    currentTimeLabel.innerText = formatTime(audioElement.currentTime);

    // Update duration label (only if duration is known)
    let durationLabel = document.getElementById('durationLabel');
    if (!isNaN(audioElement.duration)) {
        durationLabel.innerText = formatTime(audioElement.duration);
    }
});

// Sync background gradient on input for a smooth drag effect
    songProgress.addEventListener('input', () => {
    let progress = songProgress.value;
    songProgress.style.background = `linear-gradient(to right, rgb(255, 98, 174) ${progress}%, rgb(29, 29, 29) ${progress}%)`;

    // Update playback position
    let seekTime = (progress / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
}); 

// Make the progress bar draggable 
    songProgress.addEventListener('input', () => {
    // When the user drags the glider, calculate the new time
    let seekTime = (songProgress.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime; // Update the playback position
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



// Mute/Unmute functionality
muteButton.addEventListener('click', () => {
    if (audioElement.volume > 0) {
        previousVolume = audioElement.volume; // Save current volume
        audioElement.volume = 0;
        volumeControl.value = 0; // Update slider
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Update icon
    } else {
        audioElement.volume = previousVolume; // Restore volume
        volumeControl.value = previousVolume * 100; // Restore slider position
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Update icon
    }
});

// Volume control slider
volumeControl.addEventListener('input', () => {
    let volume = volumeControl.value; // Get the volume value (0-100)
    volumeControl.style.background = `linear-gradient(to right, rgb(255, 98, 174) ${volume}%, rgb(29, 29, 29) ${volume}%)`;

    // Update the audio element's volume
    audioElement.volume = volume / 100;

    // Update the mute button icon based on volume level
    if (volume == 0) {
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Mute icon
    } else {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Unmute icon
    }
});

// Initialize the slider with the correct background gradient on page load
document.addEventListener('DOMContentLoaded', () => {
    let volume = volumeControl.value; // Initial volume value (0-100)
    volumeControl.style.background = `linear-gradient(to right, rgb(255, 98, 174) ${volume}%, rgb(29, 29, 29) ${volume}%)`;
});

// Toggle Shuffle Mode
shuffleButton.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle('active', isShuffling); // Highlight active state
});

// Toggle Repeat Mode with distinct visual cues
repeatButton.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3; // Cycle between 0 (No Repeat), 1 (Repeat Current), 2 (Repeat All)

    // Reset styles
    repeatButton.classList.remove('repeat-all', 'repeat-current', 'no-repeat');

    if (repeatMode === 1) {
        repeatButton.classList.add('repeat-current'); // Green for Repeat Current Song
        repeatButton.title = 'Repeat Current Song';
    } else if (repeatMode === 2) {
        repeatButton.classList.add('repeat-all'); // Blue for Repeat All Songs
        repeatButton.title = 'Repeat All Songs';
    } else {
        repeatButton.classList.add('no-repeat'); // Gray for No Repeat
        repeatButton.title = 'No Repeat';
    }
});

function redirectToPodcast1() {
    window.location.href = './podcast.html';
}

function redirectToPodcast2() {
    window.location.href = './podcast1.html';
}

function redirectToPodcast3() {
    window.location.href = './podcast2.html';
}

function redirectToPodcast4() {
    window.location.href = './podcast3.html';
}

function redirectToPodcast5() {
    window.location.href = './podcast4.html';
}

function redirectToPodcast6() {
    window.location.href = './podcast5.html';
}

function redirectToPodcast7() {
    window.location.href = './podcast6.html';
}
