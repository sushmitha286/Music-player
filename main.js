let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Dynamite",
    artist: "BTS",
    image: "https://wallpaper.dog/large/20462658.jpg",
    path: "https://www.soloplay.ng/wp-content/uploads/2020/08/BTS_-_Dynamite_Soloplay.ng.mp3"
},
  {
    name: "Tis The Damn Season",
    artist: "Taylor Swift",
    image: "https://t2.genius.com/unsafe/812x0/https%3A%2F%2Fimages.genius.com%2F960edcb36156c3aed9cb70ede250780a.1000x1000x1.jpg",
    path: "https://db.soloplay.com.ng/wp-content/uploads/2021/12/Taylor_Swift_-_Tis_The_Damn_Season_Soloplay.ng.mp3 "
  },

  {
    name: "Her",
    artist: "Taylor Swift",
    image: "https://i0.wp.com/www.soloplay.ng/wp-content/uploads/2021/10/Taylor-Swift-E28093-Her-Mp3-Download.jpg?resize=300%2C300&ssl=1",
    path: "https://db.soloplay.com.ng/wp-content/uploads/2021/10/Taylor_Swift_-_Her_Soloplay.ng.mp3",
  },
  {
    name: "Dusk till dawn",
    artist: " Zayn Malik",
    image: "https://i0.wp.com/www.soloplay.ng/wp-content/uploads/2020/08/dusk-2Btill-2Bdown.jpg?resize=500%2C204&ssl=1",
    path: "https://www.soloplay.ng/wp-content/uploads/2020/08/Zayn_Ft_Sia_-_Dusk_Till_Dawn_Soloplay.ng.mp3 "
  }
];

function random_bg_color() {
     // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 75;
  let green = Math.floor(Math.random() * 256) + 75;
  let blue = Math.floor(Math.random() * 256) + 75;



 
  // Construct a color withe the given values
  let random_bg_color= "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background =random_bg_color;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
