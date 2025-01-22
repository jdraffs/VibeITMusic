// JavaScript to toggle dropdown visibility
document.addEventListener("DOMContentLoaded", function () {
    const profileButton = document.querySelector(".profile-button");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    profileButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from propagating to document
      dropdownMenu.classList.toggle("show");
    });

// Close dropdown if clicking outside
    document.addEventListener("click", function () {
      dropdownMenu.classList.remove("show");
    });

});

// Scroll functionality for song list
scrollLeft.addEventListener('click', () => {
  document.querySelector('.songlist').scrollBy({ left: -200, behavior: 'smooth' });
});

scrollRight.addEventListener('click', () => {
  document.querySelector('.songlist').scrollBy({ left: 200, behavior: 'smooth' });
});

document.addEventListener("DOMContentLoaded", () => {
  // Assign specific links to each button
  const playlistButton = document.querySelector(".librarybtn-playlist");
  const songsButton = document.querySelector(".librarybtn-songs");
  const albumsButton = document.querySelector(".librarybtn-albums");
  const artistButton = document.querySelector(".librarybtn-artist");
  const podcastButton = document.querySelector(".librarybtn-podcast");

  // Add click event listeners to each button
  if (playlistButton) {
      playlistButton.addEventListener("click", () => {
          window.location.href = "playlist.html";
      });
  }

  if (songsButton) {
      songsButton.addEventListener("click", () => {
          window.location.href = "songs.html";
      });
  }

  if (albumsButton) {
      albumsButton.addEventListener("click", () => {
          window.location.href = "albums.html";
      });
  }

  if (artistButton) {
      artistButton.addEventListener("click", () => {
          window.location.href = "artist.html";
      });
  }

  if (podcastButton) {
      podcastButton.addEventListener("click", () => {
          window.location.href = "podcast.html";
      });
  }

  // Optional: Add pointer cursor to buttons
  document.querySelectorAll(".library-container > div").forEach(button => {
      button.style.cursor = "pointer";
  });
});


let songData = [];

// Fetch song data from the JSON file
async function fetchSongs() {
    try {
        const response = await fetch('assets/data/songs.json');
        songData = await response.json();
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

// Search songs based on input
function searchSongs(query) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ""; // Clear previous results

    if (query.trim() === "") {
        searchResults.style.display = "none"; // Hide the dropdown if input is empty
        return;
    }

    searchResults.style.display = "block"; // Show the dropdown

    const filteredSongs = songData.filter(song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSongs.length === 0) {
        searchResults.innerHTML = "<div>No results found</div>";
        return;
    }

    // Display filtered songs
    filteredSongs.forEach(song => {
        const resultItem = document.createElement('div');
        resultItem.textContent = `${song.name} - ${song.artist}`;
        resultItem.onclick = () => {
            alert(`You selected: ${song.name} by ${song.artist}`);
            searchResults.style.display = "none"; // Hide dropdown on selection
        };
        searchResults.appendChild(resultItem);
    });
}


// Initialize the song data when the page loads
document.addEventListener('DOMContentLoaded', fetchSongs);

// Search songs based on input
function searchSongs(query) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ""; // Clear previous results

    if (query.trim() === "") {
        searchResults.style.display = "none"; // Hide the dropdown if input is empty
        return;
    }

    searchResults.style.display = "block"; // Show the dropdown

    const filteredSongs = songData.filter(song =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSongs.length === 0) {
        searchResults.innerHTML = "<div>No results found</div>";
        return;
    }

    // Display filtered songs
    filteredSongs.forEach((song, index) => {
        const resultItem = document.createElement('div');
        resultItem.textContent = `${song.name} - ${song.artist}`;
        resultItem.onclick = () => {
            // Set the song index and update audio source
            songIndex = index;
            audioElement.src = song.filePath;
            masterSongName.innerText = song.name;
            masterSongArtist.innerText = song.artist;
            updateSongImage();
            audioElement.currentTime = 0; // Reset the song time
            updateSongLabels();
            audioElement.play(); // Play the selected song
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            searchResults.style.display = "none"; // Hide dropdown on selection
        };
        searchResults.appendChild(resultItem);
    });
}
