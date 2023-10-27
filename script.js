//Find Bluefish game
// 21/10/23 
// Made by Jacob May

document.addEventListener("DOMContentLoaded", function () {

    let playButton = document.getElementById("play1");
    let circle = document.getElementById("circle");
    let bluefish = document.getElementById("bluefish");
    let bluefish1 = document.getElementById("headerbluefish");
    let octopus = document.getElementById("octopus");
    let win = document.getElementById("win");
    let isGameStarted = false; // Track if the game has started
    let startTime, timerInterval; // Variables to store the start time and the interval ID for the clock
    let followCursor = false; // Track if circle should follow the cursor
    const winAudio = document.getElementById("winAudio");
    const backgroundAudio = document.getElementById("waterSound");
const restartMessage = document.getElementById("restartMessage");

    // Play button click. Add a click event listener
    playButton.addEventListener("click", function () {
      if (!isGameStarted) {
        isGameStarted = true;
        followCursor = true;  // Set the flag to true when the circle should follow the cursor
        startTime = Date.now(); // Get the start time in milliseconds
        timerInterval = setInterval(updateClock, 1); // Update the clock every millisecond
      }

      backgroundAudio.play();

      playButton.style.visibility = "hidden";
      circle.style.opacity = 1;
      bluefish.style.opacity = 1;
      bluefish.style.visibility = "visible";
      restartMessage.style.opacity = 1;
      document.getElementById("clock").style.color = 'white';

    });

    // Update the clock
    function updateClock() {
      let currentTime = Date.now(); // Get the current time in milliseconds
      let elapsedTime = (currentTime - startTime) / 1000; // Calculate the elapsed time in seconds
      let seconds = Math.floor(elapsedTime);
      let milliseconds = Math.floor((elapsedTime - seconds) * 1000);
      let formattedTime = seconds.toString().padStart(3, '0') + '.' + milliseconds.toString().padStart(3, '0');
      document.getElementById("clock").textContent = formattedTime;
  }

  // mousemove event listner
  document.addEventListener("mousemove", function (event) {
    if (followCursor) {
        moveCircle(event.clientX, event.clientY);
    }
});

// touchmove event listener
document.addEventListener("touchmove", function (event) {
  if (followCursor) {
      let touch = event.touches[0];
      let rect = circle.getBoundingClientRect();
      let isInCircle = (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
      );
      if (isInCircle) {
          event.preventDefault(); // Prevent the page from scrolling
          moveCircle(touch.clientX, touch.clientY), { passive: false }
      }
  }
});

// Function to calculate the new position of the circle based on the cursor or touch position
function moveCircle(clientX, clientY) {
    let x = clientX - circle.clientWidth / 1.5;
    let y = clientY - circle.clientHeight / 1.1;

    // Set the circle's position using CSS
    circle.style.left = x + "px";
    circle.style.top = y + "px";
}

// add event listner. click bluefish
bluefish.addEventListener("click", function() {
  winAudio.play();
  bluefish.style.animationDuration = "7.5s";
  bluefish.style.opacity = 0;
  bluefish.style.visibility = "hidden";
    win.style.visibility = 'visible';
    win.style.opacity = 1;
    win.style.scale = 1;
    circle.style.height = '5000vh';
    circle.style.width = '5000vh';
    clearInterval(timerInterval); // Stop the clock when bluefish is clicked
    document.getElementById("clock").style.scale = 1.5;
    document.getElementById("nameForLeaderboard").style.visibility = "visible";
    document.getElementById("nameForLeaderboard").style.opacity = 1;
    restartMessage.style.opacity = 1;
})

//header bluefish click and double click to change opacity
// add event listner to bluefish1
bluefish1.addEventListener("click", function() {
    bluefish1.style.opacity = 0.1;
})
// double click to change headerbluefish opacity back to 1
bluefish1.addEventListener("dblclick", function(){
    bluefish1.style.opacity = 1;
})

// octopus
 // Function to set octopus in a random position
 function setRandomPosition() {
    let maxX = window.innerWidth - octopus.clientWidth;
    let maxY = window.innerHeight - octopus.clientHeight;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    octopus.style.position = "absolute";
    octopus.style.left = randomX + "px";
    octopus.style.top = randomY + "px";
  }

  // Call the function to set the initial random position
  setRandomPosition();

  // Function to move the octopus every 15 seconds
  setInterval(function () {
    setRandomPosition();
  }, 15000);

  //Click the Octopus to play again 
octopus.addEventListener("click", function() { 
  if (isGameStarted) { 
    bluefish.style.opacity = 0;
  bluefish.style.visibility = "hidden";
    bluefish.style.animationDuration = "14s";
      win.style.visibility = 'hidden'; 
      win.style.opacity = 0; 
      win.style.scale = 0; 
      circle.style.opacity = 0;
      circle.style.height = '25vh'; 
      circle.style.width = '25vh'; 
      document.getElementById("clock").style.scale = 1; 
      playButton.style.visibility = "visible"; 
      document.getElementById("clock").style.color = '#00181e'; 
      startTime = Date.now(); // Reset the start time 
      clearInterval(timerInterval); // Clear the interval 
      updateClock(); 
      document.getElementById("nameForLeaderboard").style.visibility = "hidden"; 
      document.getElementById("nameForLeaderboard").style.opacity = 0; 
      restartMessage.style.opacity = 0;
      isGameStarted = false; // Reset the flag to false 
  } 
});

  //fish
// Function to set fish in a random position
function setRandomFishPosition() {
  let fish = document.querySelectorAll("#fish");
  fish.forEach((singleFish) => {
    let maxY = window.innerHeight - singleFish.clientHeight;
    let randomY = Math.floor(Math.random() * maxY);
    singleFish.style.position = "absolute";
    singleFish.style.top = randomY + "px";
    singleFish.style.left = Math.random() * 80 + 'vw'; // Adjust this to fit your layout
  });
}

// Call the function to set the initial random position
setRandomFishPosition();

// Function to move the fish every 15 seconds
setInterval(function () {
  setRandomFishPosition();
}, 15000);

// bluefish
// Function to set Bluefish in a random position
function setRandombluefishPosition() {
  let bluefish = document.querySelectorAll("#bluefish");
  bluefish.forEach((singlebluefish) => {
    let maxY = window.innerHeight - singlebluefish.clientHeight;
    let randomY = Math.floor(Math.random() * maxY);
    singlebluefish.style.position = "absolute";
    singlebluefish.style.top = randomY + "px";
    singlebluefish.style.left = Math.random() * 80 + 'vw'; // Adjust this to fit your layout
  });
}

// Call the function to set the initial random position
setRandombluefishPosition();

// Function to move the fish every 14 seconds
setInterval(function () {
  setRandombluefishPosition();
}, 14000);

// Leaderboard

document.getElementById("nameForLeaderboard").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the value entered in the input field and the finish time
  const playerName = document.getElementById("playerName").value;
  const finishTime = document.getElementById("clock").textContent;

  // Create a new list item with the player name and finish time
  const li = document.createElement("li");
  li.textContent = `${playerName} - ${finishTime}`;

  // Get all the list items in the leaderboard
  const leaderboardList = document.getElementById("leaderboard-list");
  const listItems = leaderboardList.getElementsByTagName("li");

  // Convert the list of list items into an array to use array methods
  const listArray = Array.from(listItems);

  // Add the new item to the array
  listArray.push(li);

  // Sort the array based on the finish time
  listArray.sort((a, b) => {
      const timeA = parseFloat(a.textContent.split(' - ')[1]);
      const timeB = parseFloat(b.textContent.split(' - ')[1]);
      return timeA - timeB;
  });

  // Clear the leaderboard list
  leaderboardList.innerHTML = '';

  // Append the sorted list items back to the leaderboard
  listArray.forEach(item => {
      leaderboardList.appendChild(item);
  });

  // Append the sorted list items back to the leaderboard
  listArray.forEach((item, index) => {
    leaderboardList.appendChild(item);
    if (index === 0) {
        item.style.backgroundColor = 'gold';
    } else if (index === 1) {
        item.style.backgroundColor = 'silver';
    } else if (index === 2) {
        item.style.backgroundColor = '#cd7f32'; // Bronze colour
    } else {
    item.style.backgroundColor = ''; // Set the background colour to default
}
});

  // Clear the input field after submitting
  document.getElementById("playerName").value = '';

});

 //clear submit button
 submit.addEventListener("click", function() { 
    document.getElementById("nameForLeaderboard").style.visibility = "hidden";
    document.getElementById("nameForLeaderboard").style.opacity = 0;
});

});
