
/**
 *  Menu hamburger
 */

const buttonToggle =  document.querySelector(".header__button-toggle");
const nav =  document.querySelector(".nav");
// const buttonToggle = document.querySelector(".nav-wrapper__button-toggle");
buttonToggle.addEventListener("click", function () {
    buttonToggle.classList.toggle("header__js-show-nav"); 
    nav.classList.toggle("nav__js-show-nav"); 
});


/**
 * Menu du restaurant
 * 
 *  Chaque catégorie est assiociée avec un bouton
 *  Le fait d'ajouter une nouvelle catégoie dans le tableau(menuArr) crée
 *  automatiquement le bouton de la cétégorie en question
 */

//Les éléments du menu du restaurant
const menuArr = [
    {
        id: 1,
        title: "Le banquet, fraîcheur de la mer",
        price: "70 €",
        img: "public/images/dejeuner-1.jpg",
        category: "dejeuner",
        description: "Thundercats iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa vaporware  "
    },  
    {
        id: 2,
        title: "Thon mi-cuit aux sésames",
        price: "35 €",
        img: "public/images/dejeuner-2.jpg",
        category: "dejeuner",
        description: "Cras bibendum nisl nec ante rhoncus tristique. Cras consectetur dictum ultricies. Curabitur vulputate fermentum mauris quis posuere."
    },
    {
        id: 3,
        title: "Bar rôti et bazar de légumes",
        price: "50 €",
        img: "public/images/dejeuner-3.jpg",
        category: "dejeuner",
        description: "Cras bibendum nisl nec ante rhoncus tristique. Cras consectetur dictum ultricies. Curabitur vulputate fermentum mauris quis posuere. "
    },
    {
        id: 4,
        title: "Gourmet salade",
        price: "43 €",
        img: "public/images/dejeuner-4.jpg",
        category: "dejeuner",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
    {
        id: 5,
        title: "Gourmet vedette",
        price: "50 €",
        img: "public/images/dejeuner-5.jpg",
        category: "dejeuner",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
    {
        id: 6,
        title: "Filet de bifteck, sauce au vin",
        price: "50 €",
        img: "public/images/dejeuner-6.jpg",
        category: "dejeuner",
        description: "Est ante rhoncus nisi, vel tincidunt nulla massa in quam. Morbi consequat bibendum faucibus. Fusce et accumsan est."
    },
    {
        id: 7,
        title: "Délice de fruits",
        price: "15 €",
        img: "public/images/petit-dejeuner-1.jpg",
        category: "petit-dejeuner",
        description: "Curabitur ut velit sit amet turpis blandit iaculis non eget leo. Donec sollicitudin ligula mauris, vitae tempor tellus."
    },
    {
        id: 8,
        title: "Tartine fruité",
        price: "20 €",
        img: "public/images/petit-dejeuner-2.jpg",
        category: "petit-dejeuner",
        description: "Praesent sed justo justo. Nulla in sapien ut diam ultrices ornare eget nec lacus turpis blandit iaculis non egetnon eget."
    },
    {
        id: 9,
        title: "Céréales fruits",
        price: "15 €",
        img: "public/images/petit-dejeuner-3.jpg",
        category: "petit-dejeuner",
        description: "Maecenas varius arcu quis dolor auctor, vel lacinia ex ultricies. Morbi aliquet luctus dui, non gravida erat egestas vitae."
    },
    {
        id: 10,
        title: "Réveil du chef",
        price: "33 €",
        img: "public/images/petit-dejeuner-4.jpg",
        category: "petit-dejeuner",
        description: "Morbi at velit venenatis, imperdiet lacus elementum, facilisis urna. Nulla facilisi. Vivamus imperdiet commodo velit nec posuere."
    },
    {
        id: 11,
        title: "Pancake chantilly sirop d'érable",
        price: "45 €",
        img: "public/images/petit-dejeuner-5.jpg",
        category: "petit-dejeuner",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
   
    {
        id: 12,
        title: "Délice des galaxies",
        price: "15.5 €",
        img: "public/images/dessert-1.jpeg",
        category: "dessert",
        description: "Cras bibendum nisl nec ante rhoncus tristique. Cras consectetur dictum ultricies. Curabitur vulputate fermentum mauris quis posuere."
    },
    {
        id: 13,
        title: "Gâteaux aux noix et caramel",
        price: "8.5 €",
        img: "public/images/dessert-2.jpg",
        category: "dessert",
        description: "Est ante rhoncus nisi, vel tincidunt nulla massa in quam. Morbi consequat bibendum faucibus. Fusce et accumsan est."
    },
    {
        id: 14,
        title: "Macarons à la groseille",
        price: "18 €",
        img: "public/images/dessert-3.jpg",
        category: "dessert",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper."
    },
    {
        id: 15,
        title: "Macaron au chocolat fondant",
        price: "13 €",
        img: "public/images/dessert-4.jpg",
        category: "dessert",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
    {
        id: 16,
        title: "truffe aux divers champignons",
        price: "22 €",
        img: "public/images/dessert-5.jpg",
        category: "dessert",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condiment."
    },
    {
        id: 17,
        title: "Chocolat, clementine, safran",
        price: "20 €",
        img: "public/images/dessert-6.jpg",
        category: "dessert",
        description: "Nullam gravida neque eu leo porttitor sagittis. Sed est ligula, venenatis tincidunt pretium sit amet, scelerisque et tortor."
    },
    {
        id: 18,
        title: "Surprise glacée",
        price: "20 €",
        img: "public/images/dessert-7.png",
        category: "dessert",
        description: "Suspendisse accumsan, eros id dictum laoreet, nisl magna dapibus erat, suscipit tincidunt diam arcu ut lacus. Etiam lacinia mi."
    },
    {
        id: 19,
        title: "Hors-d'œuvre du chef",
        price: "50 €",
        img: "public/images/diner-1.jpg",
        category: "diner",
        description: "Morbi at tincidunt quam, ut rhoncus ligula. Donec libero turpis, eleifend id ultrices posuere, pretium eget quam. Proin nec tempus enim."
    },
    {
        id: 20,
        title: " Salade Rainbow",
        price: "50 €",
        img: "public/images/diner-2.jpg",
        category: "diner",
        description: "Nullam gravida neque eu leo porttitor sagittis. Sed est ligula, venenatis tincidunt pretium sit amet, scelerisque et tortor."
    },
    {
        id: 21,
        title: "Filet de boeuf échalotes confites",
        price: "30 €",
        img: "public/images/diner-3.jpg",
        category: "diner",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    },
    {
        id: 22,
        title: "Filet de boeuf aux légumes frais",
        price: "50 €",
        img: "public/images/diner-4.jpg",
        category: "diner",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    },
    {
        id: 23,
        title: "Côtelette d'agneau au pesto vert",
        price: "50 €",
        img: "public/images/diner-5.jpg",
        category: "diner",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    },
    // {
    //     id: 23,
    //     title: "mélange du chef",
    //     price: "10 €",
    //     img: "public/images/cocktail-1.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
    // {
    //     id: 24,
    //     title: "mojito aux baies",
    //     price: "8 €",
    //     img: "public/images/cocktail-2.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
    // {
    //     id: 25,
    //     title: "melon-cocktail",
    //     price: "5.5 €",
    //     img: "public/images/cocktail-3.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
    // {
    //     id: 26,
    //     title: "cocktail-fruit",
    //     price: "9 €",
    //     img: "public/images/cocktail-4.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
]

const menuContent = document.querySelector(".menu__content");
const menuBtns = document.querySelector(".menu__btn-container");

// Affiche tous les éléments au chargement de la page
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menuArr);
//   displayMenuBtns();
});

// Crée et intégre les éléments html du menu
function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
        return `<article class="menu__item">
                    <img class="menu__img" src=${item.img} alt=${item.title}>
                    <div>
                        <header class="menu__header">
                            <h4 class="menu__header-title">${item.title}</h4>
                            <span class="menu__price">${item.price}</span>
                        </header>
                        <p class="menu__text">${item.description}</p>
                    </div>
                </article>`
    });
    displayMenu = displayMenu.join("");//transforme le tableau (map) en chaine de caractères
    menuContent.innerHTML = displayMenu;
}


// Filtre les éléments du menu à afficher en fonction de la catégorie du bouton cliqué,
const filterBtns = document.querySelectorAll(".menu__filter-btn");
filterBtns.forEach(filterBtn => {
  filterBtn.addEventListener("click", function () {
    let filterBtnCategory = filterBtn.dataset.category;
    let menuCategory = menuArr.filter(function (menuArrItem) {
      if (filterBtnCategory === menuArrItem.category) {
        return menuArrItem;
      }
    
    });
    
    // active et désactive les boutons et appelle la fonction qui affihe les éléments
    filterBtns.forEach(element => {
      if (filterBtnCategory !== element.dataset.category) {
        filterBtn.classList.add("menu__js-active-filter-btn");
        element.classList.remove("menu__js-active-filter-btn");
        displayMenuItems (menuCategory);  
      }
      if (filterBtnCategory === "tout") {
        filterBtn.classList.add("menu__js-active-filter-btn");
        element.classList.remove("menu__js-active-filter-btn");
       displayMenuItems(menuArr);  
      }
    
    });
  });
});

