const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
//alert(seats);
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

//Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count

function updateSelectedCount() {
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  let x = [...selectedSeats];
  console.log(x, "this is type o x", typeof x);
  console.log("this is selected seats", selectedSeats, typeof selectedSeats);
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  console.log("index", seatsIndex);

  //Local Storage

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  //console.log(selecedSeatsCount);
  count.innerText = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI

function populateUI() {
  let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  let selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  console.log(
    "this is target Index",
    e.target.selectedIndex,
    "this is target Value",
    e.target.value
  );
  //console.log("ticket price on select", ticketPrice);
  updateSelectedCount();
});

//seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total set

updateSelectedCount();
