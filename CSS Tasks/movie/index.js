var seats = ["available", "booked"]

function randomSeat() {
    return Math.floor(Math.random() * 2);
}

for (let i = 0; i < 7; i++) {
    var col1 = document.querySelector("#col1 .rows");
    col1.innerHTML += `
    <div class="row-${i}">
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
    </div>

    `;

    var col2 = document.querySelector("#col2 .rows");
    col2.innerHTML += `
    <div class="row-${i}">
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
<i class = "${seats[randomSeat()]} ri-armchair-fill"></i>
    </div>

    `;

}

var availseats = document.querySelectorAll(".available");

availseats.forEach((seat) => {
    seat.addEventListener("click", (event) => {

        if (event.target.classList.contains("available")) {
            event.target.classList.add("selected");
            event.target.classList.remove("available");
        } else {
            event.target.classList.add("available");
            event.target.classList.remove("selected");
        }

    });

});
