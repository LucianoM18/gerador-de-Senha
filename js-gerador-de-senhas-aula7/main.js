const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.parametro-senha-textos p:last-child');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 69) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera senha inicial
geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }
    
    // Se nenhum checkbox estiver marcado, usa todos os caracteres
    if (alfabeto === '') {
        alfabeto = letrasMaiusculas + letrasMinusculas + numeros + simbolos;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto);
}

function classificaSenha(alfabeto) {
    // Calcula a entropia da senha (bits de segurança)
    const tamanhoAlfabeto = alfabeto.length;
    const entropia = Math.log2(Math.pow(tamanhoAlfabeto, tamanhoSenha));
    
    // Atualiza a classe de força
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    if (entropia < 28) {
        forcaSenha.classList.add('fraca');
    } else if (entropia < 60) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('forte');
    }
    
    // Calcula o tempo estimado para quebrar a senha
    // Supondo 100 milhões de tentativas por segundo (ataque de força bruta)
    const tentativasPorSegundo = 100e6;
    const segundosParaQuebrar = Math.pow(2, entropia) / tentativasPorSegundo;
    
    // Formata o tempo de forma legível
    let tempoFormatado;
    if (segundosParaQuebrar < 60) {
        tempoFormatado = `${Math.round(segundosParaQuebrar)} segundos`;
    } else if (segundosParaQuebrar < 3600) {
        tempoFormatado = `${Math.round(segundosParaQuebrar / 60)} minutos`;
    } else if (segundosParaQuebrar < 86400) {
        tempoFormatado = `${Math.round(segundosParaQuebrar / 3600)} horas`;
    } else if (segundosParaQuebrar < 31536000) {
        tempoFormatado = `${Math.round(segundosParaQuebrar / 86400)} dias`;
    } else if (segundosParaQuebrar < 3153600000) {
        tempoFormatado = `${Math.round(segundosParaQuebrar / 31536000)} anos`;
    } else {
        tempoFormatado = `${Math.round(segundosParaQuebrar / 3153600000)} milênios`;
    }
    
    valorEntropia.textContent = `Um computador pode levar até ${tempoFormatado} para descobrir essa senha.`;
}





