Semântica
=============================
_________

Semântica em HTML se refere ao uso de elementos HTML que carregam significado sobre o tipo de conteúdo que eles envolvem, tanto para o navegador quanto para o desenvolvedor.

Em outras palavras, é sobre usar a tag correta para o conteúdo certo.

Exemplo de HTML não semântico:

```html
<div id="header">
    <div class="titulo-grande">Meu Site Incrível</div>
</div>
<div id="nav">
    <div class="link">Home</div>
    <div class="link">Sobre</div>
</div>
<div id="conteudo-principal">
    <div class="artigo">
        <div class="titulo">Título do Artigo</div>
        <div class="paragrafo">Este é um parágrafo <span class="negrito">muito importante</span>.</div>
    </div>
</div>
<div id="rodape">
    <div class="texto">Copyright 2024</div>
</div>
```

Para o navegador, tudo é apenas uma div. Ele não sabe o que é um cabeçalho, uma seção de navegação ou o artigo principal. Leitores de tela para pessoas com deficiência visual terão dificuldade em navegar. Motores de busca (Google) não entendem a estrutura e a importância do conteúdo.

Exemplo de HTML semântico (mesmo conteúdo):

```html
<header>
    <h1>Meu Site Incrível</h1>
</header>
<nav>
    <a href="/">Home</a>
    <a href="/sobre">Sobre</a>
</nav>
<main>
    <article>
        <h2>Título do Artigo</h2>
        <p>Este é um parágrafo <strong>muito importante</strong>.</p>
    </article>
</main>
<footer>
    <p>Copyright 2024</p>
</footer>
```

Agora leitores de tela podem identificar: "Aqui é o cabeçalho principal", "Aqui começa o menu de navegação", "Aqui é o conteúdo principal", "Aqui é um artigo". Isso permite que usuários naveguem pelo site de forma eficiente.

Os mecanismos de busca dão mais peso ao conteúdo dentro de tags como `<h1>`, `<article>`, e `<main>`. Eles entendem a estrutura hierárquica e a relevância do seu conteúdo, o que pode melhorar seu posicionamento nos resultados de pesquisa.

Para os desenvolvedores, é muito mais fácil entender e manter um código onde `<nav>` significa "navegação" e `<footer>` significa "rodapé" do que um mar de `<div id="nav">` e `<div id="footer">`. Há um acordo universal sobre o que cada tag semântica representa. Isso torna o código mais previsível e legível para qualquer desenvolvedor no mundo.