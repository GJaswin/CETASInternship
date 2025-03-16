const form = document.forms.applnForm;
const formElement = document.getElementById("applnForm");

const users = [];
const tbody = document.querySelector("#details tbody");

// Lock while editing data
let editLock = false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submit();
});

const submitButton = document.getElementById("submit");
submitButton.addEventListener('click', e => {
    e.preventDefault();
    submit();
});

const editButton = document.getElementById("edit");
editButton.addEventListener('click', e => {
    e.preventDefault();
    editVals();
})

let workprefs = new Map([
    ["frontend", "Front - End Developer"],
    ["backend", "Back - End Developer"],
    ["fullstack", "Full Stack Developer"],
    [null, null],
]);


function validateData(sno, data) {
    let errorFlag = false;

    const userData = {
        name: data.get("name"),
        dob: data.get("dob"),
        gender: data.get("gender"),
        phone: data.get("phone"),
        email: data.get("email"),
        workexp: data.get("workexp"),
        portfolio: data.get("portfolio")
    }

    if (userData.name && userData.dob && userData.gender && userData.phone && userData.email && userData.workexp && userData.portfolio) {

        let emailRegex = /(^[^@]+@[^@]+\.[^@]+$)/gi;

        if (userData.phone.length < 10) {
            alert("Phone number is too short (Minimum 10 digits)");
            document.getElementById("phone").style.backgroundColor = "red";
            errorFlag = true;
        } else {
            document.getElementById("phone").style.backgroundColor = "#5d9eb2";
        }

        if (!emailRegex.test(userData.email)) {
            alert("Invalid Email");
            document.getElementById("email").style.backgroundColor = "red";
            errorFlag = true;
        } else {
            document.getElementById("email").style.backgroundColor = "#5d9eb2";
        }

        if (!errorFlag && editLock == false) {
            users.forEach((user) => {
                if (user.sno == userData.sno) {
                    return;
                }

                if (userData.phone == user.phone) {
                    alert("Phone number already exists")
                    errorFlag = true;
                }
                if (userData.email == user.email) {
                    alert("Email already exists");
                    errorFlag = true;
                }
            });

        } else if (!errorFlag && editLock == true) {

            for (let user of users) {
                if (sno == user.sno) {
                    console.log("Current User: ", user, "same as edit");
                    continue;
                }
                else {
                    console.log("Checking User: ", user);
                    if (userData.phone == user.phone) {
                        alert("Phone number already exists")
                        errorFlag = true;
                    }
                    if (userData.email == user.email) {
                        alert("Email already exists");
                        errorFlag = true;
                    }
                }
            }

        }

        return !errorFlag;

    } else {
        alert("Fields cannot be empty");
        return false;
    }
}

function submit() {

    if (formElement.hasAttribute("data-userIndex")) {
        formElement.removeAttribute("data-userIndex");
    }

    // Get data from form
    const data = new FormData(form);

    if (!validateData(users.length + 1, data))
        return;

    const userData = {
        sno: users.length + 1,
        name: data.get("name"),
        dob: data.get("dob"),
        gender: data.get("gender"),
        phone: data.get("phone"),
        email: data.get("email"),
        workexp: data.get("workexp"),
        workpref: [workprefs.get(data.get("work1")), workprefs.get(data.get("work2")), workprefs.get(data.get("work3"))].filter(n => n),
        workpref_bool: [data.get("work1") != null, data.get("work2") != null, data.get("work3") != null],
        portfolio: data.get("portfolio")
    }

    users.push(userData);

    let trow = document.createElement("tr");

    Object.keys(userData).forEach((key) => {
        if (key == "workpref_bool")
            return;
        let tdata = document.createElement("td");
        tdata.textContent = userData[key];
        trow.appendChild(tdata);
    });

    createOptions(trow, userData.sno)

    trow.setAttribute("data-sno", userData.sno)
    tbody.appendChild(trow);
    formElement.reset();
    showWorkExp();

    if (users.length > 0) {
        document.getElementById("details").style.display = "block";
    }

    console.log(users);
}

// Delete Entries
function deleteRow(trow, sno) {
    if (editLock == false) {

        let index = users.findIndex((user) => user.sno == sno);

        console.log("Removed: ", users.splice(index, 1));
        trow.remove();

        console.log(users);
        updateTable();
    } else {
        console.log("Cannot delete while editing data");
        alert("Cannot delete while editing data");
    }
}


// Edit Mode
function editMode(sno) {
    // Enable edit lock to prevent deletion
    editLock = true;

    // Display editing alert
    let editingAlert = document.getElementById("editing-alert");
    editingAlert.style.display = "block";
    editingAlert.innerHTML = `
    <h3>Editing User ${sno} </h3>
    `;

    // Enable edit button
    submitButton.disabled = true;
    editButton.disabled = false;
    editButton.style.display = "block";
    submitButton.style.display = "none";

    var user = users.find((user) => user.sno == sno);
    console.log("Editing User:", user);
    formElement.setAttribute("data-userIndex", sno - 1);

    // Retrieve data and populate form fields
    Object.keys(user).forEach((key) => {
        if (key == "sno" || key == "workpref")
            return;
        else if (key == "workpref_bool") {
            let workprefCheckboxes = document.querySelectorAll("input[type=checkbox]");

            for (i in user[key]) {
                workprefCheckboxes[i].checked = user[key][i]
            }

        } else {
            var field = document.getElementById(key);
            field.value = user[key];
        }
    });
    showWorkExp();

}

// On clicking "Edit"
function editVals() {
    var data = new FormData(form);

    const userIndex = parseInt(formElement.getAttribute("data-userIndex"));
    if (!validateData(userIndex + 1, data))
        return;


    // Fetching and storing user data from form
    const userData = {
        sno: userIndex + 1,
        name: data.get("name"),
        dob: data.get("dob"),
        gender: data.get("gender"),
        phone: data.get("phone"),
        email: data.get("email"),
        workexp: data.get("workexp"),
        workpref: [workprefs.get(data.get("work1")), workprefs.get(data.get("work2")), workprefs.get(data.get("work3"))].filter(n => n),
        workpref_bool: [data.get("work1") != null, data.get("work2") != null, data.get("work3") != null],
        portfolio: data.get("portfolio")
    }

    users[userIndex] = userData;
    updateRow(userData);

    document.getElementById("editing-alert").style.display = "none";

    // Disable edit button and enable submit button
    editButton.style.display = "none";
    submitButton.style.display = "block";
    editButton.disabled = true;
    submitButton.disabled = false;

    formElement.reset();
    showWorkExp();

    //Disable edit lock
    editLock = false;

    // Showing edit status
    document.getElementById("edit-status").style.display = "block";
    console.log(users);
    setTimeout(() => {
        document.getElementById("edit-status").style.display = "none";
    }, 3000);


}

function updateRow(userData) {

    let selector = `tr[data-sno="` + userData.sno.toString() + `"]`;

    let trow = document.querySelector(selector);

    while (trow.firstChild) {
        trow.removeChild(trow.firstChild);
    }

    // Populating user row data
    Object.keys(userData).forEach((key) => {
        if (key == "workpref_bool")
            return;
        let tdata = document.createElement("td");
        tdata.textContent = userData[key];
        trow.appendChild(tdata);
    });

    // Adding edit and delete options
    createOptions(trow, userData.sno)

    trow.setAttribute("data-sno", userData.sno)

    console.log(users);


}

function updateTable() {

    // Remove existing rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if (users.length > 0) {
        document.getElementById("details").style.display = "block";
    } else {

        document.getElementById("details").style.display = "none";
        return;
    }

    // Create and append new rows
    for (let i in users) {
        let userData = users[i];
        userData.sno = ++i;
        console.log(userData.sno)

        let trow = document.createElement("tr");

        Object.keys(userData).forEach((key) => {
            if (key == "workpref_bool")
                return;
            let tdata = document.createElement("td");
            tdata.textContent = userData[key];
            trow.appendChild(tdata);
        });

        // Adding edit and delete options
        createOptions(trow, userData.sno);

        trow.setAttribute("data-sno", userData.sno)
        tbody.appendChild(trow);
        console.log(users);

    }

}

function createOptions(trow, sno) {
    let options = document.createElement("td");

    options.innerHTML = `
    <div class="options"> 
    </div>
    `;

    let editbtn = document.createElement("i");
    editbtn.classList.add("ri-pencil-fill");
    editbtn.onclick = () => { editMode(sno) };

    let deletebtn = document.createElement("i");
    deletebtn.classList.add("userDeleteBtn", "ri-delete-bin-fill");
    deletebtn.onclick = () => { deleteRow(trow, sno) };

    options.getElementsByTagName("div")[0].append(editbtn, deletebtn)

    trow.appendChild(options);
}

document.addEventListener("DOMContentLoaded", () => {
    if (users.length == 0) {
        document.getElementById("details").style.display = "none";
    }
    editButton.style.display = "none";
    showWorkExp();
}
);

function showWorkExp() {
    let workexp = document.getElementById("workexp");
    document.getElementById("workexp-val").textContent = `${workexp.value} Years`
}