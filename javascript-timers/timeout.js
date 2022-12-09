var heading = document.querySelector('.message');

function updateHeading() {
  heading.textContent = 'Hello There';
}

setTimeout(updateHeading, 2000);
