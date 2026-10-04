# Scraπ

Site do projeto Scraπ: Scratch e Matemática no 2.º ciclo do Ensino Básico.

Endereço: https://scra-pi.github.io

O site é publicado pelo GitHub Pages. Cada alteração enviada para o ramo `main` fica online passado cerca de um minuto.

## Ficheiros

| Ficheiro | O que é |
| --- | --- |
| `index.html` | Página inicial |
| `sobre.html`, `formacao.html`, `financiamento.html`, `noticias.html` | Restantes páginas |
| `aviso-legal.html` | Direitos de autor, privacidade e cookies (ligada no rodapé) |
| `404.html` | Página mostrada quando um endereço não existe |
| `style.css` | Cores, tamanhos e aspeto em telemóvel |
| `script.js` | Menu do telemóvel, aviso de cookies e animações |
| `imagem1.webp`, `imagem2.webp` | Banners do projeto e da FCT (2400×699); o da FCT aparece no Financiamento |
| `blocos-scratch.webp` | Imagem dos blocos do Scratch na apresentação da página inicial |
| `logo1.png`, `logo-branco.png` | Logótipo (cabeçalho) e versão branca (rodapé) |
| `fontes/` | Letras Inter e Plus Jakarta Sans (licença SIL OFL), alojadas no site |
| `partilha.jpg` | Imagem que aparece quando o link é partilhado (1200×630) |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` | Ícone do separador do navegador |
| `sitemap.xml`, `robots.txt` | Ajudam o Google a encontrar as páginas |

## Alterações frequentes

- **Texto de uma página:** editar o texto dentro de `<main>` no ficheiro dessa página.
- **Contactos, menu e rodapé:** estão repetidos em todas as páginas, por isso têm de ser alterados nos 7 ficheiros `.html`.
- **Link da plataforma da formação:** no `formacao.html` há um bloco comentado (`<!-- ... -->`). Basta pôr o link no lugar de `COLOCAR-O-LINK-AQUI` e apagar as marcas de comentário.
- **Depois de alterar o `style.css` ou o `script.js`:** aumentar o número em `style.css?v=8` / `script.js?v=8` em todas as páginas (por exemplo para `v=9`). Assim os visitantes recebem logo a versão nova, em vez da que o navegador guardou.
- **Aviso de cookies:** é criado pelo `script.js`. A escolha do visitante fica em `localStorage` (`scrapi-cookies`: `aceite` ou `recusado`). Se um dia for acrescentado Google Analytics ou outro serviço com cookies, só deve ser carregado quando a escolha for `aceite`, usando a função `cookiesAceites()`.
