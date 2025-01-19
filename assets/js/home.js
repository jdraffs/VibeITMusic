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

// Updated songs array with artist information
let songs = [
    { songName: "Blinding Lights", songArtist: "The Weeknd", filePath: "assets/songs/blindinglights.mp3", coverPath: "assets/images/covers/blindinglightsimg.png" },
    { songName: "Call Out My Name", songArtist: "The Weeknd", filePath: "assets/songs/calloutmyname.mp3", coverPath: "assets/images/covers/calloutmynameimg.png" },
    { songName: "Die For You", songArtist: "The Weeknd", filePath: "assets/songs/dieforyou.mp3", coverPath: "assets/images/covers/dieforyouimg.png" },
    { songName: "Starboy", songArtist: "The Weeknd", filePath: "assets/songs/starboy.mp3", coverPath: "assets/images/covers/starboyimg.png" },
    { songName: "Let Me Love You", songArtist: "Justin Bieber", filePath: "assets/songs/letmeloveyou.mp3", coverPath: "assets/images/covers/letmeloveyouimg.png" },
    { songName: "Horsepower", songArtist: "Daniel Caesar", filePath: "assets/songs/horsepower.mp3", coverPath: "assets/images/covers/horsepowercover.jpg"},
    { songName: "BMF", songArtist: "SZA", filePath: "assets/songs/bmf.mp3", coverPath: "assets/images/covers/bmfcover.jpg" },
];

// Set up the song list
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
        masterSongArtist.innerText = songs[songIndex].songArtist; // Set artist name in the song bar
        updateSongImage();
        audioElement.currentTime = 0;
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

// Update the progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    songProgress.value = progress;
});

// Seek song based on progress bar
songProgress.addEventListener('input', () => {
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
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Update the master song image
function updateSongImage() {
    masterSongImage.src = songs[songIndex].coverPath;
}

//for scrolling songs
function scrollSongList(direction) {
    const songlist = document.querySelector('.songlist');
    const scrollAmount = 300; // Adjust the scroll amount as needed
    const currentScroll = songlist.scrollLeft;
    songlist.scrollTo({
        left: currentScroll + direction * scrollAmount,
        behavior: 'smooth'
    });
}
 