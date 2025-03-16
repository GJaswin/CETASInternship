document.addEventListener('DOMContentLoaded', () => {

    function setHeroBg() {
        if (window.innerWidth < 992) {
            document.querySelector("#hero .img-container").style.backgroundImage = "url('./assets/hero-mobile.jpg')";
        } else {
            document.querySelector("#hero .img-container").style.backgroundImage = "url('./assets/hero.jpg')";
        }
    }
    setHeroBg();

    window.onscroll = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("navbar").style.backgroundColor = "white";
        } else {
            document.getElementById("navbar").style.backgroundColor = "transparent";
        }
    }

    window.onresize = () => {
        setHeroBg();
    }


    // Hide cart buttons on navbar expand


    let shopDropdownToggle = document.getElementById("shop-dropdown-toggle");
    let shopDropdown = document.getElementById("shop-dropdown");
    shopDropdownToggle.addEventListener("click", () => {
        // if (window.innerWidth < 768) return;
        if (shopDropdown.classList.contains("d-none")) {
            shopDropdown.classList.add("d-block");
            shopDropdown.classList.remove("d-none");
            document.getElementById("navbar").style.backgroundColor = "white";
        } else {
            shopDropdown.classList.add("d-none");
            shopDropdown.classList.remove("d-block");
        }

    });

    let navbarToggler = document.getElementById("navbar-toggler");
    navbarToggler.addEventListener("click", () => {
        if (shopDropdown.classList.contains("d-none")) {
            shopDropdown.classList.add("d-block");
            shopDropdown.classList.remove("d-none");
            document.getElementById("navbar").style.backgroundColor = "white";
        } else {
            shopDropdown.classList.add("d-none");
            shopDropdown.classList.remove("d-block");
        }
    });

    let addToCart = document.getElementsByClassName("add-to-cart");


    Array.from(addToCart).forEach(btn => {
        console.log(btn);
    })

    Array.from(addToCart).forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("trending").innerHTML = `
<div class="cart-item mb-3 d-flex justify-content-center align-items-center border border-black">
                    <div class="img-container">
                        <img src="./assets/add-suggestion1.webp" class="img-fluid" alt="">
                    </div>
                    <div class="text-start p-3">
                        <h4 class="item-name">Toothpaste Bits Fluoride - Free</h5>
                            <p class="desc">Toothbrush</p>
                            <p class="desc">Delivery every 4 months</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="item-qty d-flex justify-content-between align-items-center rounded-2">
                                    <p><a class="remove btn" onclick="qtyMinus()">-</a> 1 <a class="add btn" onclick="qtyPlus()">+</a></p>
                                </div>
                                <div>
                                    <p class="price">$5.00</p>
                                    <p class="price price-strikethrough"><s>$6.00 </s></p>
                                </div>
                            </div>
                            <a href="#" class="text-decoration-underline">Remove</a>
                    </div>
                </div>
            `
        });
    });
});