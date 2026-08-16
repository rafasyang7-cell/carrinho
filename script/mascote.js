// ===== Mascote (bonequinho de reações) =====
// Compartilhado pelas telas inicial, mercado e final.

const MASCOTE_ESTADOS = ['neutro', 'feliz', 'preocupado', 'triste', 'chocado'];

function obterGeneroPersonagem() {
  return localStorage.getItem('carrinhoReal_genero') || 'nao-binario';
}

// Mapeia o gênero escolhido para o prefixo correto do arquivo de imagem
function obterPrefixoArquivo(genero) {
  switch (genero) {
    case 'masculino': return 'masc';
    case 'feminino': return 'fem';
    case 'nao-binario': default: return 'nao';
  }
}

// Desenha um rosto simples em SVG para cada estado / gênero (fallback caso a imagem não carregue)
function svgRostoMascote(estado, genero) {
  const bocas = {
    neutro: '<path d="M 40,68 Q 55,70 70,68" stroke="#22333B" stroke-width="3.5" stroke-linecap="round" fill="none"/>',
    feliz: '<path d="M 36,62 Q 55,86 74,62" stroke="#22333B" stroke-width="3.5" stroke-linecap="round" fill="none"/>',
    preocupado: '<path d="M 40,74 Q 55,64 70,74" stroke="#22333B" stroke-width="3.5" stroke-linecap="round" fill="none"/>',
    triste: '<path d="M 37,78 Q 55,58 73,78" stroke="#22333B" stroke-width="3.5" stroke-linecap="round" fill="none"/>',
    chocado: '<ellipse cx="55" cy="70" rx="9" ry="12" fill="#22333B"/>'
  };
  const sobrancelhas = {
    neutro: { esq: 'M 30,42 L 44,40', dir: 'M 66,40 L 80,42' },
    feliz: { esq: 'M 30,40 L 44,37', dir: 'M 66,37 L 80,40' },
    preocupado: { esq: 'M 30,36 L 44,44', dir: 'M 66,44 L 80,36' },
    triste: { esq: 'M 30,34 L 44,44', dir: 'M 66,44 L 80,34' },
    chocado: { esq: 'M 28,32 L 44,36', dir: 'M 66,36 L 82,32' }
  };
  const extras = {
    neutro: '',
    feliz: '<path d="M 30,50 Q 26,56 30,60" stroke="#E9C46A" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M 80,50 Q 84,56 80,60" stroke="#E9C46A" stroke-width="3" stroke-linecap="round" fill="none"/>',
    preocupado: '<circle cx="82" cy="52" r="3" fill="#8ecae6"/><ellipse cx="82" cy="58" rx="3" ry="5" fill="#8ecae6"/>',
    triste: '<path d="M 38,64 Q 34,72 37,78" stroke="#5FA8D3" stroke-width="2.5" stroke-linecap="round" fill="none"/>',
    chocado: '<text x="90" y="34" font-size="20" fill="#E76F51" font-family="Arial, sans-serif" font-weight="bold">!</text>'
  };
  const corFundo = {
    neutro: '#F6C9A0', feliz: '#F8D3AC', preocupado: '#F3C398', triste: '#EFC094', chocado: '#F0BE8E'
  };

  const cabelos = {
    masculino: '<path d="M 18,48 Q 20,10 55,10 Q 90,10 92,48 Q 80,30 55,28 Q 30,30 18,48 Z" fill="#4A3728"/><rect x="40" y="82" width="30" height="4" rx="2" fill="#4A3728" opacity="0"/>',
    feminino: '<path d="M 12,64 Q 8,8 55,6 Q 102,8 98,64 Q 96,32 78,18 Q 55,42 32,18 Q 14,32 12,64 Z" fill="#5C3A21"/><circle cx="18" cy="66" r="3.5" fill="#E9C46A"/><circle cx="92" cy="66" r="3.5" fill="#E9C46A"/>',
    'nao-binario': '<path d="M 16,52 Q 14,12 55,10 Q 96,12 94,52 Q 90,22 65,16 Q 55,30 45,16 Q 20,22 16,52 Z" fill="#3D5A45"/><rect x="30" y="20" width="50" height="6" rx="3" fill="#E9C46A"/>'
  };
  const cabelo = cabelos[genero] || cabelos['nao-binario'];
  const b = sobrancelhas[estado] || sobrancelhas.neutro;
  const boca = bocas[estado] || bocas.neutro;
  const extra = extras[estado] || '';
  const fundo = corFundo[estado] || corFundo.neutro;

  return `
  <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" class="svg-mascote svg-mascote--${estado}">
    <circle cx="55" cy="58" r="42" fill="${fundo}"/>
    <circle cx="42" cy="58" r="5.5" fill="#22333B"/>
    <circle cx="68" cy="58" r="5.5" fill="#22333B"/>
    <path d="${b.esq}" stroke="#22333B" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="${b.dir}" stroke="#22333B" stroke-width="3" stroke-linecap="round" fill="none"/>
    ${boca}
    ${extra}
    ${cabelo}
  </svg>`;
}

/**
 * Atualiza o mascote dentro do elemento #mascote-caixa.
 * @param {string} estado - neutro | feliz | preocupado | triste | chocado
 * @param {string} [generoForcado] - opcional: usa esse gênero em vez de reler o localStorage
 */
function atualizarMascote(estado, generoForcado) {
  const caixa = document.getElementById('mascote-caixa');
  if (!caixa) return;
  if (!MASCOTE_ESTADOS.includes(estado)) estado = 'neutro';

  const genero = generoForcado || obterGeneroPersonagem();
  const prefixo = obterPrefixoArquivo(genero);

  // Tratamento específico para o estado "chocado" que no arquivo está como "chocada" (feminino)
  let sufixoEstado = estado;
  if (genero === 'feminino' && estado === 'chocado') {
    sufixoEstado = 'chocada';
  }

  caixa.dataset.estadoAtual = estado;
  caixa.dataset.generoAtual = genero;

  caixa.innerHTML = `
    <div class="mascote-visual">
      <img src="image/mascote/${prefixo} ${sufixoEstado}.png" alt="Reação do personagem"
           onerror="this.style.display='none'"
           onload="this.nextElementSibling.style.display='none'">
      ${svgRostoMascote(estado, genero)}
    </div>
  `;
  caixa.classList.remove('mascote-anima');
  void caixa.offsetWidth;
  caixa.classList.add('mascote-anima');
}