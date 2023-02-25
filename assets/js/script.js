const cards = document.querySelectorAll(".card");
const btnJogarNovamente = document.querySelector(".btn-reset");
const pontos = document.querySelector(".pontuacao");

const imagensParaMemorizar = [
    'assets/img/img1.jpg',
    'assets/img/img2.jpg',
    'assets/img/img3.jpg',
    'assets/img/img4.jpg',
    'assets/img/img1.jpg',
    'assets/img/img2.jpg',
    'assets/img/img3.jpg',
    'assets/img/img4.jpg'
];

let podeClicar = true; // variável de controle para verificar se o jogador pode clicar nos cartões
let cartasEncontradas = []; // array para armazenar as cartas que já foram encontradas

// Reiniciar o jogo
btnJogarNovamente.addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
    const cartasSelecionadas = shuffle(imagensParaMemorizar.concat());
    let cartasViradas = [];
    let pontuacao = 0;
    pontos.textContent = "Pontuacao: 0"
    podeClicar = true;
    cartasEncontradas = [];

    cards.forEach((card, index) => {
        card.setAttribute('data-card', cartasSelecionadas[index]);
        card.querySelector('img').setAttribute('src', 'assets/img/interrogação.jpg');
    });
}

// Jogo da memória
const cartasSelecionadas = shuffle(imagensParaMemorizar.concat()); 

let cartasViradas = [];
let pontuacao = 0;

cards.forEach((card, index) => {
    card.setAttribute('data-card', cartasSelecionadas[index]);

    card.addEventListener("click", () => {
        if (!podeClicar || cartasViradas.length === 2 || cartasEncontradas.includes(card)) {
            // verifica se o jogador pode clicar no cartão (se a variável podeClicar é verdadeira),
            // se já há duas cartas viradas ou se a carta já foi encontrada
            return;
        }

        const img = card.querySelector('img');
        const cartaSelecionada = card.getAttribute("data-card");

        if (img.getAttribute('src') !== 'assets/img/interrogação.jpg' || cartasViradas === 2) {
            return
        }

        img.setAttribute('src', cartaSelecionada);
        cartasViradas.push(card);

        if (cartasViradas.length === 2) {
            const carta1 = cartasViradas[0];
            const carta2 = cartasViradas[1]; 

            if(carta1.getAttribute('data-card') === carta2.getAttribute('data-card')) {
                pontuacao++;
                pontos.textContent = `Pontuação: ${pontuacao}`;
                cartasEncontradas.push(carta1, carta2);
                cartasViradas = [];
            } else {
                podeClicar = false; // impede o jogador de clicar em outros cartões enquanto as cartas estão viradas

                setTimeout(() => {
                    carta1.querySelector('img').setAttribute('src', 'assets/img/interrogação.jpg');
                    carta2.querySelector('img').setAttribute('src', 'assets/img/interrogação.jpg');
                    cartasViradas = [];
                    podeClicar = true
                }, 1000);
            }
        } 

        if (pontuacao === imagensParaMemorizar.length / 2) {
            setTimeout(() => {
                pontos.textContent = `Parabéns você venceu!`;
            }, 100)
        }
    });
});

function shuffle (array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}