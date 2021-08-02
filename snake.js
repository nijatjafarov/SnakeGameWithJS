var frame = document.querySelector(".frame")
var size = frame.offsetWidth/20;


for(var i = 0; i < 20; i++){
  var row = document.createElement("DIV");
  row.style.width = frame.offsetWidth + "px";
  row.style.height = size + "px";
  row.style.display = "flex";
  row.className = "rows";
  frame.appendChild(row);
  for(var j = 0; j < 20; j++){
    var column = document.createElement("DIV");
    column.style.width = size + "px";
    column.style.height = row.offsetHeight + "px";
    column.style.backgroundColor = "#52d952";
    column.className = "columns";
    row.appendChild(column);
  }
}

var rows = frame.querySelectorAll(".rows");

var snake = [rows[Math.floor(Math.random() * 20)].children[Math.floor(Math.random() * 20)]];
snake[0].style.backgroundColor = "#0a0aa8";

var food = rows[Math.floor(Math.random() * 20)].children[Math.floor(Math.random() * 20)];
food.style.backgroundColor = "red";

function go(event) {
  var row = snake[0].parentElement;
  var index;
  for(var i = 0; i < row.children.length; i++){
    if(row.children[i] == snake[0]){
      index = i;
      break;
    }
  }
  
  if (event.key == "ArrowUp") {
      row = row.previousElementSibling;
      direction(row.children[index]);
  }
  else if (event.key == "ArrowDown") {
    if(row.nextElementSibling){
      direction(row.nextElementSibling.children[index]);
    }else {
      window.alert("Game over!");
      start();
    }
  }
  else if (event.key == "ArrowLeft") {
    direction(row.children[index-1]);
  }
  else if (event.key == "ArrowRight") {
    direction(row.children[index+1]);
  }
}


var score = document.getElementsByTagName("span")[0];

function move(newPos) {
  if(snake[1] != newPos){
    for(var i = snake.length-1; i > 0; i--){
      snake[i] = snake[i-1];
    }
    snake[0] = newPos;
    snake[0].style.backgroundColor = "#0a0aa8";
  }
}

function direction(newHead) {
  if(typeof newHead != 'undefined'){
    var tail = snake[snake.length-1];
    move(newHead);
    checkCrossOver();
    checkTail(tail);
  }else {
    window.alert("Game over!");
    start();
  }
}

function checkTail(part) {
  if(eatFood()){
    snake.push(part);
  }else if(part == food){
    part = food;
    part.style.backgroundColor = "red";
  }else if(!snake.includes(part)){
    part.style.backgroundColor = "#52d952";
  }
}

function eatFood() {
  if (snake[0] == food) {
    while(snake.includes(food)){
    food = rows[Math.floor(Math.random() * 20)].children[Math.floor(Math.random() * 20)];
    }
    score.innerHTML = String(parseInt(score.innerHTML) + 10);
    food.style.backgroundColor = "red";
    return true;
  }
}

function start() {
  var columns = document.querySelectorAll(".columns");
  for(var i = 0; i < columns.length; i++){
    columns[i].style.backgroundColor = "#52d952";
  }
  snake = [rows[Math.floor(Math.random() * 20)].children[Math.floor(Math.random() * 20)]];
  snake[0].style.backgroundColor = "#0a0aa8";

  food = rows[Math.floor(Math.random() * 20)].children[Math.floor(Math.random() * 20)];
  food.style.backgroundColor = "red";

  score.innerHTML = "0";
}

function checkCrossOver() {
  for(var i = 1; i < snake.length; i++){
    if(snake[0] == snake[i]){
      window.alert("Game over!");
      start();
      break;
    }
  }
}