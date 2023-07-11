console.log('Welcome to javascript');

// initialize the varibles
let songIndex = 0;
let audioElement = new Audio('forSpotify/high hopes - joji.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
  {songName:"High Hopes - joji", filePath:"forSpotify/high hopes - joji.mp3" , coverPath:"forcover/1.jpg"},
  {songName:"Afterthought - joji", filePath:"forSpotify/afterthought - joji.mp3" , coverPath:"forcover/2.jpg"},
  {songName:"Midsummer madness - 88rising", filePath:"forSpotify/midsummer madness.mp3" , coverPath:"forcover/3.jpg"},
  {songName:"Off my mind - Hazel", filePath:"forSpotify/off my mind - hazel.mp3" , coverPath:"forcover/4.jpg"},
  {songName:"On my way out - getter", filePath:"forSpotify/on my way out - getter.mp3" , coverPath:"forcover/5.jpg"},
  {songName:"Tokyo drift - teriyaki boys", filePath:"forSpotify/tokyo drift - teriyaki boys.mp3" , coverPath:"forcover/6.jpg"},
  {songName:"The basement - lunar vacation", filePath:"forSpotify/the basement - lunar vacation .mp3" , coverPath:"forcover/7.jpg"},
  {songName:"Too late colin - lunar vacation", filePath:"forSpotify/too late colin - lunar vaction.mp3" , coverPath:"forcover/8.jpg"},
  {songName:"You such charlie - joji", filePath:"forSpotify/you such charlie - joji.mp3" , coverPath:"forcover/9.jpg"},
  {songName:"Rice balls", filePath:"forSpotify/rice balls.mp3" , coverPath:"forcover/10.jpg"}
]

masterSongName.innerText = songs[0].songName;

songItems.forEach((element,i)=>{
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle master play pause
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    //changing play pause form curr
    let curr = document.getElementById(songIndex);
    curr.classList.add('fa-circle-pause');
    curr.classList.remove('fa-circle-play');
  }else{
    audioElement.pause();
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    gif.style.opacity = 0;

    //changing play pause form curr
    let curr = document.getElementById(songIndex);
    curr.classList.remove('fa-circle-pause');
    curr.classList.add('fa-circle-play');
  }
});


// makes of songItemPlay in play 
const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
};

// making play pause button on each song interactive
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    
    audioElement.src = `${songs[songIndex].filePath}`;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  })
});


// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
  // update seekbar
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 1000);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 1000;
});


// next and previous button
document.getElementById('next').addEventListener('click', ()=>{
  //changing play pause form curr
  let curr = document.getElementById(songIndex);
  curr.classList.remove('fa-circle-pause');
  curr.classList.add('fa-circle-play');

  // changing index
  if(songIndex >= 9){
    songIndex = 0;
  }else{
    songIndex++;
  }
  //changing play pause from next
  let nxt = document.getElementById(songIndex);
  nxt.classList.add('fa-circle-pause');
  nxt.classList.remove('fa-circle-play');

  // changing audio element
  audioElement.src = `${songs[songIndex].filePath}`;
  audioElement.currentTime = 0;
  audioElement.play();
  
  masterSongName.innerText = songs[songIndex].songName;
  //changing play pause form masterPlay
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', ()=>{
  //changing play pause form curr
  let curr = document.getElementById(songIndex);
  curr.classList.remove('fa-circle-pause');
  curr.classList.add('fa-circle-play');

  // changing index
  if(songIndex <= 0){
    songIndex = 9;
  }else{
    songIndex--;
  }

  //changing play pause form prev
  let prv = document.getElementById(songIndex);
  prv.classList.add('fa-circle-pause');
  prv.classList.remove('fa-circle-play');

  // changing audio element
  audioElement.src = `${songs[songIndex].filePath}`;
  audioElement.currentTime = 0;
  audioElement.play();

  masterSongName.innerText = songs[songIndex].songName;
  //changing play pause form masterPlay
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');
});



