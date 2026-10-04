document.addEventListener("DOMContentLoaded", function() {

    let imagens = document.querySelectorAll(".slider img");
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
