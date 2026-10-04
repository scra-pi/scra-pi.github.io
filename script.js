// AVISO DE COOKIES
// A escolha fica guardada no navegador durante 6 meses.
let CHAVE_COOKIES = "scrapi-cookies";
let SEIS_MESES = 182 * 24 * 60 * 60 * 1000;

function lerEscolhaCookies() {
    try {
        let guardado = JSON.parse(localStorage.getItem(CHAVE_COOKIES));
        if (guardado && Date.now() - guardado.data < SEIS_MESES) return guardado.escolha;
    } catch (e) {}
    return null;
}

// usar antes de carregar qualquer serviço com cookies (ex.: estatísticas)
function cookiesAceites() {
    return lerEscolhaCookies() === "aceite";
}

function mostrarAvisoCookies() {
    if (document.querySelector(".aviso-cookies")) return;

    let aviso = document.createElement("div");
    aviso.className = "aviso-cookies";
    aviso.setAttribute("role", "dialog");
    aviso.setAttribute("aria-labelledby", "aviso-cookies-titulo");
    aviso.innerHTML =
        '<h2 id="aviso-cookies-titulo">A sua privacidade</h2>' +
        '<p>Usamos apenas o armazenamento necessário para o site funcionar e para guardar a sua escolha. ' +
        'Não usamos cookies de publicidade. Saiba mais em ' +
        '<a href="aviso-legal.html#privacidade">Privacidade e cookies</a>.</p>' +
        '<div class="aviso-cookies-botoes">' +
        '<button type="button" class="cookies-recusar">Recusar</button>' +
        '<button type="button" class="cookies-aceitar">Aceitar</button>' +
        '</div>';

    function escolher(escolha) {
        try {
            localStorage.setItem(CHAVE_COOKIES, JSON.stringify({ escolha: escolha, data: Date.now() }));
        } catch (e) {}
        aviso.remove();
    }

    aviso.querySelector(".cookies-aceitar").addEventListener("click", () => escolher("aceite"));
    aviso.querySelector(".cookies-recusar").addEventListener("click", () => escolher("recusado"));
    document.body.appendChild(aviso);
}

document.addEventListener("DOMContentLoaded", function() {

    // aviso de cookies na primeira visita, e link "Gerir cookies" no rodapé
    if (lerEscolhaCookies() === null) mostrarAvisoCookies();
    document.querySelectorAll(".gerir-cookies").forEach(function(botao) {
        botao.addEventListener("click", mostrarAvisoCookies);
    });

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

    // sombra no cabeçalho e botão "voltar ao topo" quando se desce na página
    let topo = document.querySelector(".topo");
    let voltarTopo = document.querySelector(".voltar-topo");

    function aoDeslizar() {
        let y = window.scrollY;
        if (topo) topo.classList.toggle("com-sombra", y > 10);
        if (voltarTopo) voltarTopo.classList.toggle("visivel", y > 600);
    }

    window.addEventListener("scroll", aoDeslizar, { passive: true });
    aoDeslizar();

    if (voltarTopo) {
        voltarTopo.addEventListener("click", function() {
            window.scrollTo({ top: 0 });
        });
    }

    // cartões aparecem suavemente ao chegar ao ecrã
    let menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let elementos = document.querySelectorAll(".aparecer");

    if (!menosMovimento && "IntersectionObserver" in window && elementos.length) {
        document.body.classList.add("animar");
        let observador = new IntersectionObserver(function(entradas) {
            entradas.forEach(function(entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15 });
        elementos.forEach(el => observador.observe(el));
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
