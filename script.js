document.addEventListener("DOMContentLoaded", function() {

    // menu do telemóvel
    let menuToggle = document.getElementById("mobile-menu");
    let nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function() {
            let aberto = nav.classList.toggle("show");
            menuToggle.setAttribute("aria-expanded", aberto);
        });
    }

    // slider (só existe na página inicial)
    let imagens = document.querySelectorAll(".slider img");
    if (imagens.length === 0) return;

    let index = 0;

    function mostrarImagem(i) {
        imagens.forEach(img => img.classList.remove("active"));
        imagens[i].classList.add("active");
    }

    // botão NEXT
    document.querySelector(".next").addEventListener("click", function() {
        index = (index + 1) % imagens.length;
        mostrarImagem(index);
    });

    // botão PREV
    document.querySelector(".prev").addEventListener("click", function() {
        index = (index - 1 + imagens.length) % imagens.length;
        mostrarImagem(index);
    });

    // auto slide
    setInterval(() => {
        index = (index + 1) % imagens.length;
        mostrarImagem(index);
    }, 4000);

});
