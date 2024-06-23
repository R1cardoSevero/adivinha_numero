let listaNumerosSorteados = [];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

//Passando parâmetros para a função
function exibirTextoNaTela(tag, texto) {
    //Pegando os valores e repassando aos parametros
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


/*Atribuindo valores aos parâmetros quando a função é usada, ou seja
    Entao usamos a função e passamos os parâmetros

    exibirTextoNaTela('h1', 'Jogo do Número Secreto')

    function exibirTextoNaTela(tag,texto)
    tag --> 'h1'
    texto --> "Jogo do Número Secreto"
*/
function mensagemInicial() {
    exibirTextoNaTela('h1', "Jogo do Número Secreto");
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
mensagemInicial();

function verificarChute() {
    //Puxando valor da input
    let chute = document.querySelector('input').value;
    //Dados booleanos
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa;"
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é Menor');
    } else {
        exibirTextoNaTela('p', 'O número secreto é Maior');
    }
    //tentativas = tentativas + 1;
    tentativas++;
    limparCampo();

}

function gerarNumeroAleatorio() {
    //Gerando um número aleatório
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    console.log(listaNumerosSorteados);
    if(listaNumerosSorteados.length == numeroLimite){
        listaNumerosSorteados = [];
    }
    //Fazendo com que o número sorteado nao seja repetido novamente colocando ele dentro um lista e depois verificando se na lista tem um numero sorteado e mandando ele sortear de novo se tiver
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
