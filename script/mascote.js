// ===== Mascote (bonequinho de reações) =====
// Este arquivo é compartilhado pelas telas inicial, mercado e final.
//
// COMO TROCAR PELAS SUAS IMAGENS:
// Salve os arquivos dentro de image/mascote/<sexo>/<estado>.png, exatamente com esses nomes:
//   image/mascote/masculino/neutro.png   image/mascote/feminino/neutro.png   image/mascote/nao-binario/neutro.png
//   image/mascote/masculino/feliz.png    image/mascote/feminino/feliz.png    image/mascote/nao-binario/feliz.png
//   image/mascote/masculino/preocupado.png  (... feminino / nao-binario)
//   image/mascote/masculino/triste.png      (... feminino / nao-binario)
//   image/mascote/masculino/chocado.png     (... feminino / nao-binario)
// Assim que o arquivo existir, ele aparece automaticamente no lugar do rosto desenhado.
// Enquanto não existir, o próprio código desenha um rostinho simples (SVG) com a reação.

const MASCOTE_ESTADOS = ['neutro', 'feliz', 'preocupado', 'triste', 'chocado'];

function obterSexoPersonagem() {
    return localStorage.getItem('carrinhoReal_sexo') || 'nao-binario';
}

// Desenha um rosto simples em SVG para cada estado (usado quando não há imagem própria)
function svgRostoMascote(estado, sexo) {
    const bocas = {
        neutro: 'M 40,68 Q 55,70 70,68',
        feliz: 'M 38,64 Q 55,82 72,64',
        preocupado: 'M 40,72 Q 55,64 70,72',
        triste: 'M 38,76 Q 55,60 72,76',
        chocado: 'M 47,64 a 8,10 0 1,0 16,0 a 8,10 0 1,0 -16,0'
    };
    const sobrancelhas = {
        neutro: { esq: 'M 30,42 L 44,40', dir: 'M 66,40 L 80,42' },
        feliz: { esq: 'M 30,40 L 44,38', dir: 'M 66,38 L 80,40' },
        preocupado: { esq: 'M 30,38 L 44,44', dir: 'M 66,44 L 80,38' },
        triste: { esq: 'M 30,36 L 44,44', dir: 'M 66,44 L 80,36' },
        chocado: { esq: 'M 28,36 L 44,38', dir: 'M 66,38 L 82,36' }
    };
    const corRosto = { masculino: '#F6C9A0', feminino: '#F6C9A0', 'nao-binario': '#F6C9A0' }[sexo] || '#F6C9A0';
    const cabelos = {
        masculino: '<path d="M 18,48 Q 20,10 55,10 Q 90,10 92,48 Q 80,32 55,30 Q 30,32 18,48 Z" fill="#4A3728"/>',
        feminino: '<path d="M 14,60 Q 10,10 55,8 Q 100,10 96,60 Q 92,30 78,20 Q 55,42 32,20 Q 18,30 14,60 Z" fill="#4A3728"/>',
        'nao-binario': '<path d="M 16,50 Q 18,12 55,10 Q 92,12 94,50 Q 84,26 55,26 Q 26,26 16,50 Z" fill="#4A3728"/>'
    };
    const cabelo = cabelos[sexo] || cabelos['nao-binario'];
    const b = sobrancelhas[estado] || sobrancelhas.neutro;
    const boca = bocas[estado] || bocas.neutro;

    return `
  <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" class="svg-mascote svg-mascote--${estado}">
    <circle cx="55" cy="58" r="42" fill="${corRosto}"/>
    <circle cx="42" cy="58" r="5.5" fill="#22333B"/>
    <circle cx="68" cy="58" r="5.5" fill="#22333B"/>
    <path d="${b.esq}" stroke="#22333B" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="${b.dir}" stroke="#22333B" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="${boca}" stroke="#B3401E" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    ${cabelo}
  </svg>`;
}

// Atualiza o mascote dentro do elemento #mascote-caixa para o estado indicado
function atualizarMascote(estado) {
    const caixa = document.getElementById('mascote-caixa');
    if (!caixa) return;
    if (!MASCOTE_ESTADOS.includes(estado)) estado = 'neutro';

    const sexo = obterSexoPersonagem();
    caixa.dataset.estadoAtual = estado;

    caixa.innerHTML = `
    <div class="mascote-visual">
      <img src="image/mascote/${sexo}/${estado}.png" alt="Reação do personagem"
           onerror="this.remove()"
           onload="this.nextElementSibling.style.display='none'">
      ${svgRostoMascote(estado, sexo)}
    </div>
  `;
    caixa.classList.remove('mascote-anima');
    // reforça o reflow para reiniciar a animação a cada troca de expressão
    void caixa.offsetWidth;
    caixa.classList.add('mascote-anima');
}
