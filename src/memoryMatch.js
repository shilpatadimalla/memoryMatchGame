//global variables
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;
var clickedArray = [];

//function execution
setup();

//function defenitions
function randomAnswers() {
  var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  answers.sort(function(item) {
    return 0.5 - Math.random();
  });
  return answers;
}

function startTimer() {
  if (started == false) {
    interval = setInterval(function() {
      time++;
      started = true;
      document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
    }, 1000);
  }
}

function hide(cell) {
  cell.style.backgroundColor = "blue";
  cell.innerHTML = "";
  cell.clicked = false;
}

function complete(cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.backgroundColor = "purple";
}

function reveal(cell) {
  cell.style.backgroundColor = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

function setup() {
  var grid = document.getElementsByTagName("td");
  var answers = randomAnswers();

  for (var i = 0; i < grid.length; i++) {
    var cell = grid[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];

    cell.addEventListener("mouseenter", function() {
      if (this.completed == false && this.clicked == false)
        this.style.background = "orange";
    });
    cell.addEventListener("mouseleave", function() {
      if (this.completed == false && this.clicked == false)
        this.style.background = "blue";
    });
    cell.addEventListener("click", function() {
      if (ready == false) return;
      startTimer();
      if (this.clicked == false && this.completed == false) {
        clickedArray.push(this);
        reveal(this);
      }
      if (clickedArray.length == 2) {
        if (clickedArray[0].value == clickedArray[1].value) {
          //if matching pair is found
          complete(clickedArray[0]);
          complete(clickedArray[1]);
          clickedArray = [];
          if (numCompleted == 16) {
            alert("You finished in " + time + " seconds!");
            clearInterval(interval);
          }
        } else {
          //if a matching pair not found
          ready = false;
          document.getElementById("gridTable").style.border = "5px solid red";
          setTimeout(function() {
            hide(clickedArray[0]);
            hide(clickedArray[1]);
            clickedArray = [];
            ready = true;
            document.getElementById(
              ("gridTable".style.border = "5px solid black")
            );
          }, 500);
        }
      }
    });
  }
  document.getElementById("restart").addEventListener("click", function() {
    location.reload();
  });
}
