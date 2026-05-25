const params = new URLSearchParams(window.location.search);

const nome = params.get('nome') || 'Jogador';

document.getElementById('usuario').textContent = nome;

alert("Bem-vindo, " + nome + "!");

const imagens = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg'
];

let cartas = [...imagens,...imagens]
.sort(()=>Math.random()-0.5);

const board = document.getElementById('gameBoard');

let primeira = null;
let segunda = null;
let bloqueio = false;

let jogadas = 0;
let acertos = 0;
let segundos = 0;

const cronometro = setInterval(()=>{

    segundos++;

    let min = Math.floor(segundos / 60);
    let seg = segundos % 60;

    min = String(min).padStart(2,'0');
    seg = String(seg).padStart(2,'0');

    document.getElementById('timer').textContent =
    `${min}:${seg}`;

},1000);

cartas.forEach(img=>{

    let carta = document.createElement('div');

    carta.className='card';

    carta.dataset.img=img;

    carta.innerHTML=`
        <div class="back">?</div>
        <div class="front">
            <img src="../IMG/${img}">
        </div>
    `;

    carta.onclick = ()=> virar(carta);

    board.appendChild(carta);

});

function virar(carta){

    if(
        bloqueio ||
        carta === primeira ||
        carta.classList.contains('flip')
    ) return;

    carta.classList.add('flip');

    if(!primeira){

        primeira = carta;
        return;
    }

    segunda = carta;

    bloqueio = true;

    jogadas++;

    document.getElementById('jogadas').textContent = jogadas;

    if(primeira.dataset.img === segunda.dataset.img){

        acertos++;

        primeira = null;
        segunda = null;

        bloqueio = false;

        verificarVitoria();

    }else{

        setTimeout(()=>{

            primeira.classList.remove('flip');

            segunda.classList.remove('flip');

            primeira = null;
            segunda = null;

            bloqueio = false;

        },1000);

    }
}

function verificarVitoria(){

    if(acertos === 8){

        clearInterval(cronometro);

        let min = Math.floor(segundos/60);
        let seg = segundos%60;

        min = String(min).padStart(2,'0');
        seg = String(seg).padStart(2,'0');

        setTimeout(()=>{

            alert(
`PARABÉNS ${nome}!!

Você venceu!

Tempo: ${min}:${seg}

Jogadas: ${jogadas}`
            );

        },400);

    }
}

function reiniciar(){

    location.reload();

}
