/// <reference path="./jquery/jquery-3.7.1.js" />

// Sidebar
let sidebarExpanded = true;
let sidebarWidth;
let editButton = $(".edit button");
let profileData;
var currentProfile = 0;



function sidebarCollapse() {
    $(".sidebar").animate({
        width: "66px",
    }, 200, "linear");
    $(".sidebar a>span").fadeToggle(200, "linear");
    $(".menu-icon i").css("transform", "rotate(0deg)")
    $(".main").animate(
        {
            left: `-=15rem`
        }
    );
    sidebarExpanded = false;
}

function sidebarExpand() {
    $(".sidebar").animate({
        width: sidebarWidth,
    }, 200, "linear");

    $(".sidebar a>span").fadeToggle(200, "linear");
    $(".menu-icon i").css("transform", "rotate(180deg)");
    $(".main").animate(
        {
            left: `+=15rem`,
        }
    );
    sidebarExpanded = true;
}


$(".menu-icon").on("click", () => {
    if ($(window).width() < 600) {
        sidebarWidth = "30rem"

    } else {
        sidebarWidth = "20rem";
    }


    if (sidebarExpanded) {

        sidebarCollapse();

    } else {
        sidebarExpand();
    }

});

// Edit Button

editButton.on("click", () => {
    let input = $("input");
    let textarea = $("textarea")
    input.prop("readonly", !input.prop("readonly"));
    textarea.prop("readonly", !textarea.prop("readonly"));
    if (editButton.text() == "Edit ") {
        editButton.text("Save ");
        editButton.append(`<i class="ri-save-3-line"></i>`)
        editButton.css("background-color", "#d15151");
    }
    else {
        editButton.text("Edit ");
        editButton.append(`<i class="ri-edit-box-line"></i>`)
        editButton.css("background-color", "#06aa4d");
    }
});

$(".sidebar a").on("click", () => {
    if (sidebarExpanded) {
        sidebarCollapse();
    }
});

function loadData(profileData) {
    let profiles = Object.keys(profileData);
    $("#entrynum").text(`${currentProfile + 1}/${profiles.length}`);

    let profile = profileData[profiles[currentProfile]];

    Object.keys(profile).forEach(field => {
        if (field == "education") {
            $("#education .details").empty();
            let edEntry = 1;
            profile[field].forEach((entry) => {
                $("#education .details").append(`
            <tr>
            <td>
            ${edEntry++}
            </td>

            <td>
            <input value="${entry.institute}" readonly>
            </td>

            <td>
            <input value="${entry.degree}" readonly>
            </td>

            <td>
            <input value="${entry.marks}" readonly>
            </td>

            </tr>
            `);
            });
        } else if (field == "skills") {
            $("#skill-list").empty();
            profile[field].forEach((entry) => {
                $("#skill-list").append(`
               <li>
               <input type="text" readonly value="${entry}">
               </li> 
                `)
            });
        } else if (field == "certifications") {
            $("#cert-list").empty();
            profile[field].forEach((entry) => {
                $("#cert-list").append(`
               <li>
               <input type="text" readonly value="${entry}">
               </li> 
                `)
            });
        } else if (field == "address") {
            $("#address-l1").val(`${profile.address.l1}`);
            $("#address-l2").val(`${profile.address.l2}`);
            $("#address-l3").val(`${profile.address.l3}`);
            $("#pincode").val(`${profile.address.pincode}`);
        }

        else

            $(`#${field} `).val(profile[field]);
    });

}

$(() => {
    if ($(window).width < 600)
        sidebarCollapse();

    $.getJSON("/profiles.json", (data) => {
        profileData = data;
        loadData(profileData);

        $("#nextdata").on("click", () => {
            if (currentProfile < Object.keys(profileData).length - 1) {
                currentProfile++;
                loadData(profileData);
            } else {
                return;
            }
        });

        $("#prevdata").on("click", () => {
            if (currentProfile > 0) {
                currentProfile--;
                loadData(profileData);
            } else {
                return;
            }
        });

    });


});