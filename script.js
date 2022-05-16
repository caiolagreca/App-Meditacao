const app = () => {
    const video = document.querySelector('.container-video video');
    const som = document.querySelector('.som');
    const toca = document.querySelector('.play');
    const linhaContornada = document.querySelector('.moving-outline circle');
    
    // Áudios
    const botaoSelecionaSons = document.querySelectorAll('.container-tema button');

    // Display do Tempo
    const displayTemporizador = document.querySelector('.display-temporizador');
    const botaoSelecionaMinutos = document.querySelectorAll('.container-tempo button');

    // Comprimento do círculo
    const comprimendoLinhaContornada = linhaContornada.getTotalLength();

    // Duração falsa 
    let duracaoFalsa = 600;

    // Fazendo temporizador se movimentar
    linhaContornada.style.strokeDasharray = comprimendoLinhaContornada;
    linhaContornada.style.strokeDashoffset = comprimendoLinhaContornada;

    // Selecionando sons diferentes
    botaoSelecionaSons.forEach(musica => {
        musica.addEventListener('click', function() {
            som.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checaSeEstaTocando(som);
        })
    })

    // Play no som
    toca.addEventListener('click', () => {
        checaSeEstaTocando(som);
    });

    // Alterando os minutos
    botaoSelecionaMinutos.forEach(botao => {
        botao.addEventListener('click', function() {
            duracaoFalsa = this.getAttribute('data-time');
            displayTemporizador.textContent = `${Math.floor(duracaoFalsa/60)}:${Math.floor(duracaoFalsa%60)}`;
        });
    })

    const checaSeEstaTocando = som => {
        // Se o som estiver pausado, ao clicarmos nele queremos que o video continue e o som volte a tocar
        if (som.paused) {
            som.play();
            video.play();
            toca.src = "./svg/pause.svg";
        } else {
            som.pause();
            video.pause();
            toca.src = "./svg/play.svg";
        }
    };

    // Fazendo o circulo realizar a "cronometragem"
    som.ontimeupdate = () => {
        let tempoAtual = som.currentTime;
        let tempoRestante = duracaoFalsa - tempoAtual;
        let segundos = Math.floor(tempoRestante % 60);
        let minutos = Math.floor(tempoRestante / 60);

        let progresso = comprimendoLinhaContornada - (tempoAtual / duracaoFalsa) * comprimendoLinhaContornada;
        linhaContornada.style.strokeDashoffset = progresso;

        // Fazendo o tempo realizar a cronometragem
        displayTemporizador.textContent = `${minutos}:${segundos}`;

        // Fazendo o tempo parar ao zerar
        if (tempoAtual >= duracaoFalsa) {
            som.pause();
            video.pause();
            toca.src = './svg/play.svg';
            som.currentTime = 0;
        }
    }
};

app();