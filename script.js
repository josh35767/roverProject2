
var myRover = {
  label: "Rover One",
  position: [1,1],
  direction: 'S'
};


var roverTwo = {
  label: "Rover Two",
  position: [10,10],
  direction: 'N'
};


var obstacles = {
  position: [ [3, 5], [7, 2], [9, 8], [5, 9]]
};

var objectCollided = false;
var roverCollided = false;
var isObstacle;

function isCollided(rover, obstacle) {
  for (var i = 0; i < obstacles.position.length; i++) {
    if (rover.position[0] === obstacle.position[i][0] && rover.position[1] === obstacle.position[i][1]) {
      objectCollided = true;
      alert("Obstacle at (" + obstacle.position[i][0] + "," + obstacle.position[i][1] + ")");
      return;
    }
    else {
      objectCollided = false;
    }
  }
}

function roverCollision(rover, otherRover) {
    if (rover.position[0] === otherRover.position[0] && rover.position[1] === otherRover.position[1]) {
      roverCollided = true;
      alert(otherRover.label + " at (" + otherRover.position[0] + "," + otherRover.position[1] + ")");
      return;
    }
    else {
      roverCollided = false;
    }
}

function wrapAround(rover) {
  switch(rover.position[0]) {
    case 11:
      rover.position[0] = 1;
      break;
    case 0:
      rover.position[0] = 10;
      break;
  }
  switch(rover.position[1]) {
    case 11:
      rover.position[1] = 1;
      break;
    case 0:
      rover.position[1] = 10;
      break;
    }
}

function goForward(rover){
  switch(rover.direction) {
    case 'S':
      rover.position[1]++;
      wrapAround(rover);
      break;
    case 'E':
      rover.position[0]++;
      wrapAround(rover);
      break;
    case 'N':
      rover.position[1]--;
      wrapAround(rover);
      break;
    case 'W':
      rover.position[0]--;
      wrapAround(rover);
      break;
  }
}

function goBackward(rover) {
  switch(rover.direction) {
    case 'S':
      rover.position[1]--;
      wrapAround(rover);
      break;
    case 'E':
      rover.position[0]--;
      wrapAround(rover);
      break;
    case 'N':
      rover.position[1]++;
      wrapAround(rover);
      break;
    case 'W':
      rover.position[0]++;
      wrapAround(rover);
      break;
  }
}


function turnLeft(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = "W";
      break;
    case 'E':
      rover.direction = "N";
      break;
    case 'S':
      rover.direction = "E";
      break;
    case 'W':
      rover.direction = "S";
      break;
  }
}

function turnRight(rover) {
  switch(rover.direction) {
    case 'N':
      rover.direction = "E";
      break;
    case 'E':
      rover.direction = "S";
      break;
    case 'S':
      rover.direction = "W";
      break;
    case 'W':
      rover.direction = "N";
      break;
  }
}
function imageDirection(rover, id) {
  switch (rover.direction) {
    case 'N':
      document.getElementById('roverImage'+id).style.transform = "rotate(180deg)";
      break;
    case 'E':
      document.getElementById('roverImage'+id).style.transform = "rotate(270deg)";
      break;
    case 'S':
      break;
    case 'W':
      document.getElementById('roverImage'+id).style.transform = "rotate(90deg)";
      break;
  }
}

function obstacleCoord() {
  for (var i = 0; i < obstacles.position.length; i++) {
    if (x === obstacles.position[i][0] && y === obstacles.position[i][1]) {
      isObstacle = true;
      break;
    }
    else {
      isObstacle = false;
    }
  }
}

function displayPic() {
  var roverX = myRover.position[0];
  var roverY = myRover.position[1];
  var rover2X = roverTwo.position[0];
  var rover2Y = roverTwo.position[1];

  document.getElementById("imageGrid").innerHTML = "";
  document.getElementById("coordinates").innerHTML = "";
  document.getElementById("verticalCoords").innerHTML = "";

  for (a = 1; a < 11; a++) {
  document.getElementById("coordinates").innerHTML += a+" ";
  document.getElementById("verticalCoords").innerHTML += a+'<br>';
}
  for (y = 1; y < 11; y++) {
    for (x = 1; x < 11; x++) {
      obstacleCoord();
      if (isObstacle) {
        document.getElementById("imageGrid").innerHTML += '<img src="marsRock.jpg">';
      }
      else if (x === 10 && y === roverY && x === roverX) {
        document.getElementById("imageGrid").innerHTML += '<img src="roverImage.jpeg" id="roverImage1"> <br>';
      }
      else if (x === 10 & y === rover2Y && x === rover2X) {
        document.getElementById("imageGrid").innerHTML += '<img src="rover2.jpeg" id="roverImage2"> <br>';
      }
      else if (x === 10) {
        document.getElementById("imageGrid").innerHTML += '<img src="marsground.jpeg"> <br>';
      }
      else if (y === rover2Y && x === rover2X) {
        document.getElementById("imageGrid").innerHTML += '<img src="rover2.jpeg" id="roverImage2">';
      }
      else if (y === roverY && x === roverX) {
        document.getElementById("imageGrid").innerHTML += '<img src="roverImage.jpeg" id="roverImage1">';
      }
      else {
        document.getElementById("imageGrid").innerHTML += '<img src="marsground.jpeg">';

      }
    }
  }
  imageDirection(myRover, 1);
  imageDirection(roverTwo, 2);
}

function moveRover(rover, otherRover) {
  var command =  document.controlForm.controls.value;
  var directions = command.split("");

  for (var i = 0; i < directions.length; i++) {
    switch(directions[i]) {
      case 'f':
        goForward(rover);
        isCollided(rover, obstacles);
        roverCollision(rover, otherRover);
        if (objectCollided || roverCollided) {
          goBackward(rover);
        }
        break;
      case 'b':
        goBackward(rover);
        isCollided(rover, obstacles);
        roverCollision(rover, otherRover);
        if (objectCollided || roverCollided) {
          goForward(rover);
        }
        break;
      case 'l':
        turnLeft(rover);
        isCollided(rover, obstacles);
        roverCollision(rover, otherRover);
        break;
      case 'r':
        turnRight(rover);
        isCollided(rover, obstacles);
        roverCollision(rover, otherRover);
        break;
    }
    if (objectCollided || roverCollided) {
      break;
    }
  }
  displayPic();
}


function selectRover() {
  var greenRover = document.getElementById('greenRadio').checked;
  var blueRover = document.getElementById('blueRadio').checked;
  if (greenRover) {
    moveRover(myRover, roverTwo);
  }
  else if (blueRover) {
    moveRover(roverTwo, myRover);
  }
  else {
    alert("No rover selected!");
  }

}

window.onload = function() {
  document.getElementById('greenRadio').checked = true;
  displayPic();
};
