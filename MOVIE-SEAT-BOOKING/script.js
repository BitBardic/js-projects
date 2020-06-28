const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let movieScreen = document.getElementById('screen');

populateUI();

let ticketPrice = +movieSelect.value;
let movieId = movieSelect.options[movieSelect.selectedIndex].id;
updateScreenPhoto();

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into arr
  // Map through array
  // return a new array indexes

  const seatsIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Update Screen photo
function updateScreenPhoto() {
  if (!movieId) return;

  if (movieId === 'avengers') {
    movieScreen.className = 'screen avengers';
  } else if (movieId === 'joker') {
    movieScreen.className = 'screen joker';
  } else if (movieId === 'toystory') {
    movieScreen.className = 'screen toystory';
  } else if (movieId === 'lionking') {
    movieScreen.className = 'screen lionking';
  }
}

// Save Selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMovePrice', moviePrice);
}

// Get date from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  movieId = e.target.options[e.target.selectedIndex].id;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
  updateScreenPhoto();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
