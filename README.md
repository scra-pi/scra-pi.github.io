# Scraπ

Site do projeto Scraπ: Scratch e Matemática no 2.º ciclo do Ensino Básico.

Endereço: https://scra-pi.github.io

O site é publicado pelo GitHub Pages. Cada alteração enviada para o ramo `main` fica online passado cerca de um minuto.

## Ficheiros

| Ficheiro | O que é |
| --- | --- |
| `index.html` | Página inicial (com o slider) |
| `sobre.html`, `formacao.html`, `financiamento.html`, `noticias.html` | Restantes páginas |
| `aviso-legal.html` | Direitos de autor, privacidade e cookies (ligada no rodapé) |
| `404.html` | Página mostrada quando um endereço não existe |
| `style.css` | Cores, tamanhos e aspeto em telemóvel |
| `script.js` | Menu do telemóvel e slider |
| `imagem1.webp`, `imagem2.webp` | Banners do slider (2400×699) |
| `partilha.jpg` | Imagem que aparece quando o link é partilhado (1200×630) |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` | Ícone do separador do navegador |
| `sitemap.xml`, `robots.txt` | Ajudam o Google a encontrar as páginas |

## Alterações frequentes

- **Texto de uma página:** editar o que está dentro de `<section class="conteudo">` no ficheiro dessa página.
- **Contactos e menu:** estão repetidos em todas as páginas, por isso têm de ser alterados nos 6 ficheiros `.html`.
- **Nova imagem no slider:** guardar a imagem com 2400×699 píxeis e acrescentar uma linha `<img>` dentro de `<div class="slider">` no `index.html`. Os pontos do slider são criados sozinhos.
- **Link da plataforma da formação:** no `formacao.html` há um bloco comentado (`<!-- ... -->`). Basta pôr o link no lugar de `COLOCAR-O-LINK-AQUI` e apagar as marcas de comentário.
- **Depois de alterar o `style.css` ou o `script.js`:** aumentar o número em `style.css?v=5` / `script.js?v=5` em todas as páginas (por exemplo para `v=6`). Assim os visitantes recebem logo a versão nova, em vez da que o navegador guardou.
