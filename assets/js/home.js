console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let songProgress = document.getElementById('songProgress');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songlistplay'));
let masterSongImage = document.getElementById('masterSongImage');

let songs = [
    { songName: "Blinding Lights - The Weeknd", filePath: "assets/songs/blindinglights.mp3", coverPath: "assets/images/covers/blindinglightsimg.png" },
    { songName: "Call Out My Name - The Weeknd", filePath: "assets/songs/calloutmyname.mp3", coverPath: "assets/images/covers/calloutmynameimg.png" },
    { songName: "Die For You - The Weeknd", filePath: "assets/songs/dieforyou.mp3", coverPath: "assets/images/covers/dieforyouimg.png" },
    { songName: "Starboy - The Weeknd", filePath: "assets/songs/starboy.mp3", coverPath: "assets/images/covers/starboyimg.png" },
    { songName: "Let Me Love You - Justin Bieber", filePath: "assets/songs/letmeloveyou.mp3", coverPath: "assets/images/covers/letmeloveyouimg.png" },
];

songItems.forEach((element, i) => {
    let songItem = document.getElementsByClassName('songitem')[i]; // para makuha ang songitem
    songItem.getElementsByTagName("img")[0].src = songs[i].coverPath;
    songItem.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click on the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updateSongImage();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Update ng progress bar sa kanta
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    songProgress.value = progress;
});

//para magnext song automatic
audioElement.addEventListener('ended', () => {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    updateSongImage();
    audioElement.play();
});

//para magrepeat pag nag end ung song pero supposedly next song na **gawin kong repeat button to**
//audioElement.addEventListener('ended', () => {
//    audioElement.currentTime = 0;
//    audioElement.play();
//}); 

// time to progress value
songProgress.addEventListener('change', () => {
    audioElement.currentTime = songProgress.value * audioElement.duration / 100;
});

songItems.forEach((element) => {
    element.addEventListener('click', (ksis) => {
        let songID = parseInt(ksis.target.id);
        songIndex = songID;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        updateSongImage();
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    updateSongImage();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    updateSongImage();
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});

function updateSongImage() {
    masterSongImage.src = songs[songIndex].coverPath;
}