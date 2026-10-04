document.addEventListener("DOMContentLoaded", function() {

    // ano atual no rodapé
    let ano = document.getElementById("ano");
    if (ano) ano.textContent = new Date().getFullYear();

    // menu do telemóvel
    let menuToggle = document.getElementById("mobile-menu");
    let nav = document.querySelector("nav");

    function abrirMenu(aberto) {
        nav.classList.toggle("show", aberto);
        menuToggle.setAttribute("aria-expanded", aberto);
        menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function() {
            abrirMenu(!nav.classList.contains("show"));
        });

        // tecla Esc fecha o menu
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && nav.classList.contains("show")) {
                abrirMenu(false);
                menuToggle.focus();
            }
        });
    }

    // slider (só existe na página inicial)
    let area = document.querySelector(".images-area");
    let imagens = document.querySelectorAll(".slider img");
    if (!area || imagens.length === 0) return;

    let index = 0;
    let temporizador = null;
    let menosAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // um ponto por imagem
    let caixaPontos = area.querySelector(".dots");
    let pontos = [];
    imagens.forEach(function(img, i) {
        let ponto = document.createElement("button");
        ponto.type = "button";
        ponto.setAttribute("aria-label", "Mostrar imagem " + (i + 1));
        ponto.addEventListener("click", function() {
            mostrarImagem(i);
            reiniciar();
        });
        caixaPontos.appendChild(ponto);
        pontos.push(ponto);
    });

    function mostrarImagem(i) {
        index = (i + imagens.length) % imagens.length;
        imagens.forEach((img, n) => img.classList.toggle("active", n === index));
        pontos.forEach((p, n) => {
            p.classList.toggle("active", n === index);
            p.setAttribute("aria-current", n === index);
        });
    }

    // auto slide (não corre para quem pediu menos animações no sistema)
    function iniciar() {
        if (menosAnimacao || temporizador) return;
        temporizador = setInterval(() => mostrarImagem(index + 1), 5000);
    }

    function parar() {
        clearInterval(temporizador);
        temporizador = null;
    }

    // depois de um clique, conta o tempo outra vez do zero
    function reiniciar() {
        parar();
        iniciar();
    }

    // botões NEXT e PREV
    area.querySelector(".next").addEventListener("click", function() {
        mostrarImagem(index + 1);
        reiniciar();
    });

    area.querySelector(".prev").addEventListener("click", function() {
        mostrarImagem(index - 1);
        reiniciar();
    });

    // pausa enquanto o rato está por cima ou o teclado está no slider
    area.addEventListener("mouseenter", parar);
    area.addEventListener("mouseleave", iniciar);
    area.addEventListener("focusin", parar);
    area.addEventListener("focusout", iniciar);

    // deslizar com o dedo no telemóvel
    let inicioX = null;
    area.addEventListener("touchstart", function(e) {
        inicioX = e.touches[0].clientX;
    }, { passive: true });

    area.addEventListener("touchend", function(e) {
        if (inicioX === null) return;
        let distancia = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(distancia) > 40) {
            mostrarImagem(distancia < 0 ? index + 1 : index - 1);
            reiniciar();
        }
        inicioX = null;
    });

    mostrarImagem(0);
    iniciar();

});
