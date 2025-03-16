// Dropdown on hover

const dropdowns = document.getElementsByClassName("dropdown");


for (let i = 0; i < dropdowns.length; i++) {

    dropdowns[i].addEventListener("mouseenter", () => {
        var dropdownmenu = dropdowns[i].querySelector('.dropdown-menu');
        dropdownmenu.classList.add("show")
    });

    dropdowns[i].addEventListener("mouseleave", () => {
        var dropdownmenu = dropdowns[i].querySelector('.dropdown-menu');
        dropdownmenu.classList.remove("show")
    });



}

// Mobile Navbar

function mobileNavToggle() {
    var classes = document.querySelector(".mobile-nav ul").classList;
    if (classes.contains("d-show")) {
        classes.remove("d-show");
        classes.add("d-none");
    } else {
        classes.add("d-show");
        classes.remove("d-none");
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        var classes = document.querySelector(".mobile-nav ul").classList;
        classes.remove("d-show");
        classes.add("d-md-none");
    }
})

//Offset Carousel from the Navbar

document.addEventListener("DOMContentLoaded", () => {
    var navHeight = document.getElementById("navbar").offsetHeight;
    document.getElementById("carousel").style.paddingTop = navHeight;
})

// Scroll to Top
window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.document.Element.scrollTop > 20) {
        document.getElementById("scroll-to-top").style.display = "block";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


