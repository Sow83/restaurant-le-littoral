// piéger le focus à l'intérieur(navigation principale et modal)
function trapFocusInside(focusableElements, firstFocusableElement, lastFocusableElement) {       
    focusableElements.forEach((focusableElement) => {
      if (focusableElement.addEventListener) {
        focusableElement.addEventListener('keydown', (e) => {
          const tab = e.key === "Tab";
         
          if (!tab) {
            return;
          }
  
          if (e.shiftKey) {
            if (e.target === firstFocusableElement) { // shift + tab
              e.preventDefault();
  
              lastFocusableElement.focus();
            }
          }
          else if (e.target === lastFocusableElement) { // tab
            e.preventDefault();
  
            firstFocusableElement.focus();
          }
        });
      }
    });
}

// L'appuit sur la touche "Echappe" ferme la nav principale ou le modal
document.addEventListener("keyup", (e) => {
    // menu de navigation principale
    if (buttonToggle.classList.contains("header__js-show-nav")) {
        if (e.key == "Escape") {
            closeNave();
        } 
    }   
    // modal
    if (modalOverlay.classList.contains("open-modal")) {
        if (e.key == "Escape") {
            closeModal();
        } 
    }
});

/**
 *  Menu hamburger
 */
const buttonToggle =  document.querySelector(".header__buttons-toggle");
const headerElement = document.querySelector(".header");
const navElement =  document.querySelector(".nav");

const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

function openNav() {
    buttonToggle.classList.add("header__js-show-nav"); 
    navElement.classList.add("nav__js-show-nav");
    buttonToggle.setAttribute("aria-expanded", "true");  
    let focusableNavElements = headerElement.querySelectorAll(focusableElementsArray); 
    // const nodesList = [].slice.call(focusableElements, 0, -1); //supprime le dernier élément de la liste de noeud "slice(0, -1)": le bouton

    // focusableElements = nodesList;
    const firstFocusableNavElement = focusableNavElements[0];
    const lastFocusableNavElement = focusableNavElements[focusableNavElements.length - 2];
    trapFocusInside(focusableNavElements, firstFocusableNavElement, lastFocusableNavElement);    

    links.forEach(link => {
        link.addEventListener("click",() => {
            closeNave();
        })
    });
}

function closeNave() {
    buttonToggle.classList.remove("header__js-show-nav"); 
    navElement.classList.remove("nav__js-show-nav");
    buttonToggle.setAttribute("aria-expanded", "false");
    buttonToggle.focus();  
}

buttonToggle.addEventListener("click", function () {
    if (!buttonToggle.classList.contains("header__js-show-nav")) {
        openNav();
    }
    else{
        closeNave();
    }
});





/**
 * Modal
 */
//Les éléments requis
const modalBtns = document.querySelectorAll(".modal-btn-js");
const modalOverlay = document.querySelector(".modal__overlay-body");
const modalElement = document.querySelector(".modal__inner")
const btnCloseModal = document.querySelector(".modal__btn-close");
const body = document.querySelector("body");

//Ouverture du modal(deux boutons d'ouverture de modal)
function openModal() {
    modalOverlay.classList.add("open-modal");
    modalElement.classList.add("animation-modal");
    body.classList.add("modal__js-body-no-scrool");
    inputName = document.getElementById("nom");
    inputName.focus();        
    let focusableModalElements = modalElement.querySelectorAll(focusableElementsArray); 
    const firstFocusableModalElement = focusableModalElements[0];
    const lastFocusableModalElement = focusableModalElements[focusableModalElements.length - 1];
    trapFocusInside(focusableModalElements, firstFocusableModalElement, lastFocusableModalElement);       
//    console.log(this);
}
let currentBtnModal;
modalBtns.forEach(modalBtn => {
    modalBtn.addEventListener("click", function () {
        openModal();
        currentBtnModal = this;
    } ) 
});



//Fermeture du modal avec le bouton btnCloseModal
function closeModal() {
    modalOverlay.classList.remove("open-modal");
    modalElement.classList.remove("animation-modal");
    body.classList.remove("modal__js-body-no-scrool");

    // le focus est rendu au bouton qui a ouvert le modal
    currentBtnModal.focus();
}
btnCloseModal.addEventListener("click", closeModal);


//Fermeture du modal quand on clic n'importe ou sur la fenetre
window.addEventListener("click", function (e) {
    if (e.target === modalOverlay ) {
        modalOverlay.classList.remove("open-modal");  
        modalElement.classList.remove("animation-modal");
        body.classList.remove("modal__js-body-no-scrool");
    }
});
/*Fin du modal*/



/**
 *  État actif des liens de la barre de navigation lors du défilement
 */
const sections = document.querySelectorAll("section");
const links    = document.querySelectorAll(".nav__link");
window.addEventListener("scroll", function () {
    let attributeCurrentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;  
        const gap = 200; //c'est pour diminuer l'écart des débuts de section quand on scroll
        if (scrollY >= sectionTop - gap) {
            attributeCurrentSection = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        if (link.getAttribute("href")  === `#${attributeCurrentSection}`) {
            link.classList.add("nav__link-active");
        }
        else{
            link.classList.remove("nav__link-active");
        }
    });
})


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
        img_srcset: "public/images/menu/dejeuner-1-192x146.jpg 192w, public/images/menu/dejeuner-1-320x200.jpg 320w",      
        img_src: "public/images/menu/dejeuner-1-320x200.jpg",
        category: "dejeuner",
        description: "Thundercats iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa vaporware  "
    },  
    {
        id: 2,
        title: "Thon mi-cuit aux sésames",
        price: "35 €",
        img_srcset: "public/images/menu/dejeuner-2-192x146.jpg 192w, public/images/menu/dejeuner-2-320x200.jpg 320w",      
        img_src: "public/images/menu/dejeuner-2-320x200.jpg",
        category: "dejeuner",
        description: "Cras bibendum nisl nec ante rhoncus tristique. Cras consectetur dictum ultricies. Curabitur vulputate fermentum mauris quis posuere."
    },
    {
        id: 3,
        title: "Bar rôti et bazar de légumes",
        price: "50 €",
        img_srcset: "public/images/menu/dejeuner-3-192x146.jpg 192w, public/images/menu/dejeuner-3-320x200.jpg 320w",      
        img_src: "public/images/menu/dejeuner-3-320x200.jpg",
        category: "dejeuner",
        description: "Cras bibendum nisl nec ante rhoncus tristique. Cras consectetur dictum ultricies. Curabitur vulputate fermentum mauris quis posuere. "
    },
    {
        id: 4,
        title: "Gourmet salade",
        price: "43 €",
        img_srcset: "public/images/menu/dejeuner-4-192x146.jpg 192w, public/images/menu/dejeuner-4-320x200.jpg 320w",      
        img_src: "public/images/menu/dejeuner-4-320x200.jpg",
        category: "dejeuner",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
    {
        id: 5,
        title: "Gourmet vedette",
        price: "50 €",
        img_srcset: "public/images/menu/dejeuner-5-192x146.jpg 192w, public/images/menu/dejeuner-5-320x200.jpg 320w",      
        img_src: "public/images/menu/dejeuner-5-320x200.jpg",
        category: "dejeuner",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
    {
        id: 6,
        title: "Filet de bifteck, sauce au vin",
        price: "50 €",
        img_srcset: "public/images/menu/dejeuner-6-192x146.jpg 192w, public/images/menu/dejeuner-6-320x200.jpg 320w",      
        img_src: "public/images/menu/dejeuner-6-320x200.jpg",
        category: "dejeuner",
        description: "Est ante rhoncus nisi, vel tincidunt nulla massa in quam. Morbi consequat bibendum faucibus. Fusce et accumsan est."
    },
    {
        id: 7,
        title: "Délice de fruits",
        price: "15 €",
        img_srcset: "public/images/menu/petit-dejeuner-1-192x146.jpg 192w, public/images/menu/petit-dejeuner-1-320x200.jpg 320w",      
        img_src: "public/images/menu/petit-dejeuner-1-320x200.jpg",
        category: "petit-dejeuner",
        description: "Curabitur ut velit sit amet turpis blandit iaculis non eget leo. Donec sollicitudin ligula mauris, vitae tempor tellus."
    },
    {
        id: 8,
        title: "Tartine fruité",
        price: "20 €",
        img_srcset: "public/images/menu/petit-dejeuner-2-192x146.jpg 192w, public/images/menu/petit-dejeuner-2-320x200.jpg 320w",      
        img_src: "public/images/menu/petit-dejeuner-2-320x200.jpg",
        category: "petit-dejeuner",
        description: "Praesent sed justo justo. Nulla in sapien ut diam ultrices ornare eget nec lacus turpis blandit iaculis non egetnon eget."
    },
    {
        id: 9,
        title: "Céréales fruits",
        price: "15 €",
        img_srcset: "public/images/menu/petit-dejeuner-3-192x146.jpg 192w, public/images/menu/petit-dejeuner-3-320x200.jpg 320w",      
        img_src: "public/images/menu/petit-dejeuner-3-320x200.jpg",
        category: "petit-dejeuner",
        description: "Maecenas varius arcu quis dolor auctor, vel lacinia ex ultricies. Morbi aliquet luctus dui, non gravida erat egestas vitae."
    },
    {
        id: 10,
        title: "Réveil du chef",
        price: "33 €",
        img_srcset: "public/images/menu/petit-dejeuner-4-192x146.jpg 192w, public/images/menu/petit-dejeuner-4-320x200.jpg 320w",      
        img_src: "public/images/menu/petit-dejeuner-4-320x200.jpg",
        category: "petit-dejeuner",
        description: "Morbi at velit venenatis, imperdiet lacus elementum, facilisis urna. Nulla facilisi. Vivamus imperdiet commodo velit nec posuere."
    },
    {
        id: 11,
        title: "Pancake chantilly sirop d'érable",
        price: "45 €",
        img_srcset: "public/images/menu/petit-dejeuner-5-192x146.jpg 192w, public/images/menu/petit-dejeuner-5-320x200.jpg 320w",      
        img_src: "public/images/menu/petit-dejeuner-5-320x200.jpg",
        category: "petit-dejeuner",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
   
    {
        id: 12,
        title: "Délice des galaxies",
        price: "15.5 €",
        img_srcset: "public/images/menu/dessert-1-192x146.jpeg 192w, public/images/menu/dessert-1-320x200.jpeg 320w",      
        img_src: "public/images/menu/dessert-1-320x200.jpeg",
        category: "dessert",
        description: "Cras bibendum nisl nec ante rhoncus tristique. Cras consectetur dictum ultricies. Curabitur vulputate fermentum mauris quis posuere."
    },
    {
        id: 13,
        title: "Gâteaux aux noix et caramel",
        price: "8.5 €",
        img_srcset: "public/images/menu/dessert-2-192x146.jpg 192w, public/images/menu/dessert-2-320x200.jpg 320w",      
        img_src: "public/images/menu/dessert-2-320x200.jpg",
        category: "dessert",
        description: "Est ante rhoncus nisi, vel tincidunt nulla massa in quam. Morbi consequat bibendum faucibus. Fusce et accumsan est."
    },
    {
        id: 14,
        title: "Macarons à la groseille",
        price: "18 €",
        img_srcset: "public/images/menu/dessert-3-192x146.jpg 192w, public/images/menu/dessert-3-320x200.jpg 320w",      
        img_src: "public/images/menu/dessert-3-320x200.jpg",
        category: "dessert",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper."
    },
    {
        id: 15,
        title: "Macaron au chocolat fondant",
        price: "13 €",
        img_srcset: "public/images/menu/dessert-4-192x146.jpg 192w, public/images/menu/dessert-4-320x200.jpg 320w",      
        img_src: "public/images/menu/dessert-4-320x200.jpg",
        category: "dessert",
        description: "Vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats"
    },
    {
        id: 16,
        title: "truffe aux divers champignons",
        price: "22 €",
        img_srcset: "public/images/menu/dessert-5-192x146.jpg 192w, public/images/menu/dessert-5-320x200.jpg 320w",      
        img_src: "public/images/menu/dessert-5-320x200.jpg",
        category: "dessert",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condiment."
    },
    {
        id: 17,
        title: "Chocolat, clementine, safran",
        price: "20 €",
        img_srcset: "public/images/menu/dessert-6-192x146.jpg 192w, public/images/menu/dessert-6-320x200.jpg 320w",      
        img_src: "public/images/menu/dessert-6-320x200.jpg",
        category: "dessert",
        description: "Nullam gravida neque eu leo porttitor sagittis. Sed est ligula, venenatis tincidunt pretium sit amet, scelerisque et tortor."
    },
    {
        id: 18,
        title: "Surprise glacée",
        price: "20 €",
        img_srcset: "public/images/menu/dessert-7-192x146.jpg 192w, public/images/menu/dessert-7-320x200.jpg 320w",      
        img_src: "public/images/menu/dessert-7-320x200.jpg",
        category: "dessert",
        description: "Suspendisse accumsan, eros id dictum laoreet, nisl magna dapibus erat, suscipit tincidunt diam arcu ut lacus. Etiam lacinia mi."
    },
    {
        id: 19,
        title: "Hors-d'œuvre du chef",
        price: "50 €",
        img_srcset: "public/images/menu/diner-1-192x146.jpg 192w, public/images/menu/diner-1-320x200.jpg 320w",      
        img_src: "public/images/menu/diner-1-320x200.jpg",
        category: "diner",
        description: "Morbi at tincidunt quam, ut rhoncus ligula. Donec libero turpis, eleifend id ultrices posuere, pretium eget quam. Proin nec tempus enim."
    },
    {
        id: 20,
        title: " Salade Rainbow",
        price: "50 €",
        img_srcset: "public/images/menu/diner-2-192x146.jpg 192w, public/images/menu/diner-2-320x200.jpg 320w",      
        img_src: "public/images/menu/diner-2-320x200.jpg",
        category: "diner",
        description: "Nullam gravida neque eu leo porttitor sagittis. Sed est ligula, venenatis tincidunt pretium sit amet, scelerisque et tortor."
    },
    {
        id: 21,
        title: "Filet de boeuf échalotes confites",
        price: "30 €",
        img_srcset: "public/images/menu/diner-3-192x146.jpg 192w, public/images/menu/diner-3-320x200.jpg 320w",      
        img_src: "public/images/menu/diner-3-320x200.jpg",
        category: "diner",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    },
    {
        id: 22,
        title: "Filet de boeuf aux légumes frais",
        price: "50 €",
        img_srcset: "public/images/menu/diner-4-192x146.jpg 192w, public/images/menu/diner-4-320x200.jpg 320w",      
        img_src: "public/images/menu/diner-4-320x200.jpg",
        category: "diner",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    },
    {
        id: 23,
        title: "Côtelette d'agneau au pesto vert",
        price: "50 €",
        img_srcset: "public/images/menu/diner-5-192x146.jpg 192w, public/images/menu/diner-5-320x200.jpg 320w",      
        img_src: "public/images/menu/diner-5-320x200.jpg",
        category: "diner",
        description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    },
    // {
    //     id: 23,
    //     title: "mélange du chef",
    //     price: "10 €",
    //     img_srcset: "public/images/menu/cocktail-1-192x146.jpg 192w, public/images/menu/cocktail-1-320x200.jpg 320w",      
    //     img_src: "public/images/menu/cocktail-1-320x200.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
    // {
    //     id: 24,
    //     title: "mojito aux baies",
    //     price: "8 €",
    //     img_srcset: "public/images/menu/cocktail-2-192x146.jpg 192w, public/images/menu/cocktail-2-320x200.jpg 320w",      
    //     img_src: "public/images/menu/cocktail-2-320x200.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
    // {
    //     id: 25,
    //     title: "melon-cocktail",
    //     img_srcset: "public/images/menu/cocktail-3-192x146.jpg 192w, public/images/menu/cocktail-3-320x200.jpg 320w",      
    //     price: "5.5 €",
    //     img_src: "public/images/menu/cocktail-3-320x200.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
    // {
    //     id: 26,
    //     title: "cocktail-fruit",
    //     price: "9 €",
    //     img_srcset: "public/images/menu/cocktail-4-192x146.jpg 192w, public/images/menu/cocktail-4-320x200.jpg 320w",      
    //     img_src: "public/images/menu/cocktail-4-320x200.jpg",
    //     category: "cocktail",
    //     description: "Morbi ornare elit et tristique semper. Quisque ultrices vehicula mi, vitae consectetur ante semper at. In ullamcorper condimentum."
    // },
]


// Crée et intégre les éléments html du menu
function displayMenuItems(menuItems) {
    const menuContent = document.querySelector(".menu__content");
    let displayMenu = menuItems.map(function (item) {
        return `<article class="menu__item" data-aos="zoom-in">
                    <img class="menu__img"  srcset="${item.img_srcset}"
                                            sizes="(min-width: 40em) 192px, 320px"  
                                            src="${item.img_src}" 
                                            alt="${item.title}"
                                            loading="lazy">
                    <div>
                        <div class="menu__header">
                            <h3  class="menu__header-title">${item.title}</h3>
                            <span class="menu__price">${item.price}</span>
                        </div>
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

// Affiche tous les éléments au chargement de la page
window.addEventListener("DOMContentLoaded", function () {
    displayMenuItems(menuArr);
  //   displayMenuBtns();
});


/**
 *  Animate On Scroll Library
 */
 AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    delay: "50",
    once: "true",

 });
  
/**
 *  Validation de toutes les formulaires
 */
 
const forms = document.querySelectorAll("form");

forms.forEach(form => {
    form.addEventListener("submit", function (e) {
        // Message général(couleur rouge ou verte selon qu'il ya erreur ou pas lors de la soumission du formulaire)
        const responseMessage = form.querySelector(".form__response-message");

        // Différentes erreurs qu'on peut avoir pour chaque input 
        let error;
        
        // Validation input text (nom)
        const regexText = /^[a-zA-Z-\s]+$/;       
        const inputText = form.querySelector("[type = text]");
        const inputTextError = form.querySelector(".form__error-messageText");
        // Si input text existe et que sa valeur ne correspond pas aux conditions de regexText
        if (inputText && regexText.test(inputText.value) == false) {
            error = "Ce champs accepte que les lettres majuscules, minuscules et tiret.";
            inputTextError.textContent = error;
            inputText.setAttribute("aria-invalid", "true");
            inputText.focus();
        }
        // Si input text existe et que sa valeur correspond aux conditions de regexText
        // NB: On ne peut pas mettre "else" à la place de ce "if" parce que les autres
        // formulaires  qui n'ont pas de champs "text" auront une erreur.
        if (inputText && regexText.test(inputText.value) == true) {
            inputTextError.textContent = "";  
            inputText.removeAttribute("aria-invalid");

        }

        // Validation input email
        const regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const inputEmail = form.querySelector("[type = email]");
        const inputEmailError =  form.querySelector(".form__error-messageEmail");
        if (inputEmail && regexEmail.test(inputEmail.value) == false) {
            error = "Adresse email incorrect";
            inputEmailError.textContent = error;
            inputEmail.setAttribute("aria-invalid", "true");
            inputEmail.focus();
        }
        if (inputEmail && regexEmail.test(inputEmail.value) == true) {
            inputEmailError.textContent = "";   
            inputEmail.removeAttribute("aria-invalid");
        }

        // Validation input telephone
        const regexTel = /^\(?\+?([0-9]{1,4})?\)?[-\. ]?(\d{10})$/;
        const inputTel = form.querySelector("[type = tel]");
        const inputTelError = form.querySelector(".form__error-messageTel");
        if (inputTel  && regexTel.test(inputTel.value) == false) {
            error = "Numéro de téléphone incorrect";
            inputTelError.textContent = error;
            inputTel.setAttribute("aria-invalid", "true");
            inputTel.focus();
        }
        if (inputTel && regexTel.test(inputTel.value) == true) {
            inputTelError.textContent = "";    
            inputTel.removeAttribute("aria-invalid");      
        }
       

        // S'il y'a erreur lors de la soumission du formulaire
        if (error) {    
            if (form.dataset.id === "1") {
              responseMessage.textContent ="Un ou plusieurs champs contiennent une erreur. Veuillez vérifier et essayer à nouveau.";
              responseMessage.style.border = "2px solid red"; 
            }                                     
            e.preventDefault();
            return false;
        }
        // S'il n'y a pas d'erreur lors de la soumission du formulaire
        else{
            // Les formulaires ayant les champs: text, email, téléphone ect..
            responseMessage.style.border = "2px solid green";
             if (form.dataset.id === "1") {
                responseMessage.textContent = "Votre message a été envoyé avec succès";
            }
            // formulaire avec un seul champs email(formulaire de souscription newsletter)
            else  {
                responseMessage.textContent = "Votre souscription a bien été envoyé"; 
            }
            form.reset();
            e.preventDefault();          
        }
    });   
});

 /**
 *  Formatage de la date du formulaire de réservation
 */
// Ce code est remplacé par lafonction dateToHtml
//   function dateToHtml(date) {
//     let month = date.getMonth() + 1;
//     if (month <= 9) {
//       month = "0" + month ;
//     }
//     let day = date.getDate();
//     if (day <= 9) {
//       day = '0' + day;
//    }
//      return date.getFullYear() + '-' + month + '-' + day;
//   }
function dateToHtml(date) {
    const  month = date.getMonth() + 1;
    const monthStr = month.toString().padStart(2,'0'); 
    const day = date.getDate();
    const dayStr = day.toString().padStart(2,'0');  
    return date.getFullYear() + '-' + monthStr + '-' + dayStr;
  }

  function setInputDate() {
    const inputReservationDate = document.getElementById("reservationDate");
  
    const today = new Date();
    const maxDate = new Date();
    const strMinDate = dateToHtml(today); 
    maxDate.setMonth(maxDate.getMonth() + 1);
    const strMaxDate = dateToHtml(maxDate);
    inputReservationDate.setAttribute("value", strMinDate);
    inputReservationDate.setAttribute("min", strMinDate);
    inputReservationDate.setAttribute("max", strMaxDate);
  }
  
  setInputDate();

/**   Accessibilité des icones réseaux sociaux au clavier 
 *   Si le focus est sur l'icone chef-link (icone réseaux sociaux)
 *   chefs__social-icons(la div des icones de réeaux socianx) sera mise en évidence,
 *   il par défaut en opacity = 0 
 */
let chefsSocialIcons = document.querySelectorAll(".chefs__social-icons")
chefsSocialIcons.forEach(chefsSocialIcon => {
    chefLinks = chefsSocialIcon.querySelectorAll(".chefs__link-js");
    chefLinks.forEach(chefLink => {
        chefLink.addEventListener("focus", function () {
            chefsSocialIcon.style.opacity = 1;
        });
    }); 
});


