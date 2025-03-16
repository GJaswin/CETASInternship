let dataPopup = document.querySelector(".data-popup");
let dataPopupDetails = document.querySelector(".data-popup .details");
let bodyOverlay = document.querySelector(".body-overlay");
let settingsToggle = document.querySelector(".settings-toggle");
let settingsPopup = document.querySelector(".settings-popup");
let dataTable = document.getElementById("data-table");
let dataMobile = document.getElementById("data-mobile");

function closePopup() {
    dataPopup.style.display = "none";
    settingsPopup.style.display = "none";
    bodyOverlay.style.display = "none";
}

settingsToggle.onclick = () => {
    settingsPopup.style.display = "block";
    settingsPopup.style.opacity = "1";
    bodyOverlay.style.display = "block";

}

document.addEventListener("DOMContentLoaded", () => {

    fetch('./employees.json', { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            Object.keys(data).forEach(id => {
                let trow = document.createElement("tr");
                trow.innerHTML =
                    `
                <tr>
                    <td><span>${id}</span></td>
                    <td>
                    <div class="d-flex align-items-center gap-3">
                    <img src="./assets/user.jpg" class="img-fluid" alt="">
                    <div>
                    <p class="fw-bold">${data[id].name}</p>
                    <p>${data[id].desig}</p>
                    </div>
                    </div>
                    </td>
                    <td><span>${data[id].date}</span></td>
                    <td><span>${data[id].shift}</span></td>
                    <td><span>${data[id].work_status}</span></td>
                    <td><span>${data[id].clock_in}</span></td>
                    <td><span>${data[id].clock_out}</span></td>
                    <td><span>${data[id].overtime}</span></td>
                    <td><span><i class="ri-map-pin-line"></i> View on Map</span></td>
                <tr>
                `
                document.querySelector("#data-table tbody").append(trow);

                let dataCard = document.createElement("div");
                dataCard.classList.add("data-card", "p-3", "mb-3");
                dataCard.setAttribute("data-empid", id);
                dataCard.innerHTML = `
                <p class="user-id">${id}</p>
                            <div class="d-block d-sm-flex gap-2 align-items-center">
                                <div class="d-flex user-profile gap-2 align-items-center">
                                    <div class="img-container overflow-hidden">
                                        <img src="./assets/user.jpg" class="img-fluid" alt="">
                                    </div>
                                    <div class="user-desig">
                                        <h6>${data[id].name}</h6>
                                        <p>${data[id].desig}</p>
                                    </div>
                                </div>
                                <div
                                    class="w-100 d-flex flex-column flex-wrap align-items-start align-items-sm-end mt-3 mt-sm-0">
                                    <div class="d-flex flex-wrap  gap-3">
                                        <span class="shift">${data[id].shift}</span>
                                        <span class="work-status">${data[id].work_status}</span>
                                    </div>
                                    <a href="#" class="fw-bold mt-3"><i class="ri-map-pin-line"></i> View on Map</a>
                                </div>
                            </div>
                            <div class="d-flex flex-wrap gap-3 timings mt-3 justify-content-start">
                                <p><i class="ri-calendar-line"></i> ${data[id].date}</p>
                                <p><i class="ri-time-line"></i> ${data[id].clock_in}</p>
                                <p><i class="ri-history-line"></i> ${data[id].clock_out}</p>
                                <p><i class="ri-timer-flash-fill"></i> ${data[id].overtime}</p>
                            </div>
                `;

                dataMobile.append(dataCard);


            });

            let exportSettings = document.createElement("div");
            exportSettings.innerHTML = `
            <div class="d-flex gap-3 table-options flex-wrap justify-content-center">
                            <a href="#"><i class="ri-import-line"></i> Import</a>
                            <a href="#"><i class="ri-export-line"></i> Export</a>
                        </div>
            `;
            dataMobile.append(exportSettings);

            let dataCards = document.querySelectorAll(".data-mobile .data-card");
            dataCards.forEach(dataCard => {
                dataCard.onclick = () => {
                    let empId = dataCard.getAttribute("data-empid");
                    dataPopup.style.display = "block";
                    bodyOverlay.style.display = "block";
                    dataPopup.innerHTML = `
            <div class="data-card p-3 mb-3">
                <p class="user-id px-3">${empId}</p>
                <div class="d-flex p-3 user-profile gap-2 align-items-center">
                    <div class="img-container overflow-hidden">
                        <img src="./assets/user.jpg" class="img-fluid" alt="">
                    </div>
                    <div class="user-desig">
                        <h3>${data[empId].name}</h3>
                        <p>${data[empId].desig}</p>
                    </div>
                </div>
                <div class="details p-3">
                    <div>
                        <h4>Date</h4>
                        <p>${data[empId].date}</p>
                    </div>
                    <div>
                        <h4>Shift</h4>
                        <p>${data[empId].shift}</p>
                    </div>
                    <div>
                        <h4>Status</h4>
                        <p>${data[empId].work_status}</p>
                    </div>
                    <div>
                        <h4>Clock In</h4>
                        <p>${data[empId].clock_in}</p>
                        <h4>Clock Out</h4>
                        <p>${data[empId].clock_out}</p>
                        <h4>Overtime</h4>
                        <p>${data[empId].overtime}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="close" onclick="closePopup()"><i class="ri-close-line"></i> Close</>
                </div>
            </div>
                    `;
                }

            });
            function closePopup() {
                dataPopup.style.display = "none";
                settingsPopup.style.display = "none";
                bodyOverlay.style.display = "none";
            }

            settingsToggle.onclick = () => {
                settingsPopup.style.display = "block";
                settingsPopup.style.opacity = "1";
                bodyOverlay.style.display = "block";

            }
        });


});