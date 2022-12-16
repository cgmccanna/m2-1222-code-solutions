var images = ['images/025.png', 'images/001.png', 'images/004.png', 'images/007.png', 'images/039.png'];

var $slide = document.querySelector('img');
var $dot = document.querySelectorAll('.dot');
var $alldots = document.querySelector('.progress-dots');
var counter = 1;
var timerID = setInterval(cycleForward, 3000);

function cycleForward() {
  if (counter < images.length) {
    $slide.src = images[counter];
    $dot[counter].className = 'dot filled';
    $dot[(counter - 1)].className = 'dot';
    counter++;
  } else if (counter >= images.length) {
    counter = 0;
    $slide.src = images[counter];
    $dot[counter].className = 'dot filled';
    $dot[4].className = 'dot';
    counter++;
  }
}

var $next = document.querySelector('.fa-chevron-right');
$next.addEventListener('click', function () {
  cycleForward();
  clearInterval(timerID);
  timerID = setInterval(cycleForward, 3000);
});

var $back = document.querySelector('.fa-chevron-left');
$back.addEventListener('click', function () {
  if (counter > 1) {
    counter -= 2;
    $slide.src = images[counter];
    $dot[counter].className = 'dot filled';
    $dot[(counter + 1)].className = 'dot';
    counter++;
    clearInterval(timerID);
    timerID = setInterval(cycleForward, 3000);
  } else {
    counter = 5;
    $slide.src = images[counter - 1];
    $dot[counter - 1].className = 'dot filled';
    $dot[0].className = 'dot';
    clearInterval(timerID);
    timerID = setInterval(cycleForward, 3000);
  }
});

$alldots.addEventListener('click', function (event) {
  var clickedDot = event.target;
  for (var i = 0; i < $dot.length; i++) {
    if (clickedDot.id === $dot[i].id) {
      $dot[i].className = 'dot filled';
      clearInterval(timerID);
      timerID = setInterval(cycleForward, 3000);
    } else {
      $dot[i].className = 'dot';
    }
  }
  counter = Number(clickedDot.id);
  $slide.src = images[counter];
  counter++;
});
