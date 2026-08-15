// ===== Tela Mercado =====
// Preços médios de pesquisa de mercado nacional (referência 2026).
// Cada alimento tem um "minimoFamilia": a quantidade aproximada necessária
// para alimentar adequadamente uma família de 4 pessoas durante 1 mês.
// Alimentos processados/ultraprocessados não têm mínimo, pois não são
// nutricionalmente necessários — eles aparecem como "saída" quando o
// dinheiro não é suficiente para as quantidades mínimas dos in natura.
//
// FOTOS: cada alimento tenta carregar image/comida/<id>.jpg automaticamente.
// Enquanto o arquivo não existir, aparece um emoji no lugar (veja "emoji" abaixo).
// Basta salvar a foto com o nome certo (ex: image/comida/arroz.jpg) que ela some no lugar do emoji.

const ORCAMENTO_TOTAL = parseFloat(localStorage.getItem('carrinhoReal_orcamentoAlimentacao')) || 182.16;

const SECOES = [
    {
        id: 'graos',
        nome: 'Grãos e Leguminosas',
        icone: 'fa-wheat-awn',
        alimentos: [
            { id: 'arroz', nome: 'Arroz', unidade: 'pacote 1kg', preco: 6.20, tipo: 'natural', emoji: '🍚', minimoFamilia: 6, minimoTexto: '6kg de arroz' },
            { id: 'feijao-carioca', nome: 'Feijão carioca', unidade: 'pacote 1kg', preco: 9.80, tipo: 'natural', emoji: '🫘', minimoFamilia: 4, minimoTexto: '4kg de feijão' },
            { id: 'feijao-preto', nome: 'Feijão preto', unidade: 'pacote 1kg', preco: 9.50, tipo: 'natural', emoji: '🫘', minimoFamilia: 4, minimoTexto: '4kg de feijão' },
            { id: 'milho', nome: 'Milho verde (espiga)', unidade: 'pacote com 3', preco: 7.00, tipo: 'natural', emoji: '🌽', minimoFamilia: 2, minimoTexto: '2 pacotes de milho verde' },
        ]
    },
    {
        id: 'legumes',
        nome: 'Legumes e Verduras',
        icone: 'fa-carrot',
        alimentos: [
            { id: 'cenoura', nome: 'Cenoura', unidade: '1kg', preco: 5.50, tipo: 'natural', emoji: '🥕', minimoFamilia: 2, minimoTexto: '2kg de cenoura' },
            { id: 'abobora', nome: 'Abóbora', unidade: '1kg', preco: 5.00, tipo: 'natural', emoji: '🎃', minimoFamilia: 2, minimoTexto: '2kg de abóbora' },
            { id: 'batata', nome: 'Batata inglesa', unidade: '1kg', preco: 6.80, tipo: 'natural', emoji: '🥔', minimoFamilia: 3, minimoTexto: '3kg de batata' },
            { id: 'alface', nome: 'Alface', unidade: 'unidade/maço', preco: 3.50, tipo: 'natural', emoji: '🥬', minimoFamilia: 4, minimoTexto: '4 unidades de alface' },
            { id: 'couve', nome: 'Couve', unidade: 'maço', preco: 3.80, tipo: 'natural', emoji: '🥬', minimoFamilia: 4, minimoTexto: '4 maços de couve' },
            { id: 'agriao', nome: 'Agrião', unidade: 'maço', preco: 4.50, tipo: 'natural', emoji: '🌿', minimoFamilia: 2, minimoTexto: '2 maços de agrião' },
            { id: 'tomate', nome: 'Tomate', unidade: '1kg', preco: 8.50, tipo: 'natural', emoji: '🍅', minimoFamilia: 3, minimoTexto: '3kg de tomate' },
            { id: 'cebola', nome: 'Cebola', unidade: '1kg', preco: 6.00, tipo: 'natural', emoji: '🧅', minimoFamilia: 2, minimoTexto: '2kg de cebola' },
        ]
    },
    {
        id: 'frutas',
        nome: 'Frutas da Época',
        icone: 'fa-apple-whole',
        alimentos: [
            { id: 'banana', nome: 'Banana', unidade: '1kg', preco: 6.50, tipo: 'natural', emoji: '🍌', minimoFamilia: 3, minimoTexto: '3kg de banana' },
            { id: 'maca', nome: 'Maçã', unidade: '1kg', preco: 8.90, tipo: 'natural', emoji: '🍎', minimoFamilia: 2, minimoTexto: '2kg de maçã' },
            { id: 'mamao', nome: 'Mamão', unidade: '1kg', preco: 5.80, tipo: 'natural', emoji: '🥭', minimoFamilia: 2, minimoTexto: '2kg de mamão' },
            { id: 'laranja', nome: 'Laranja', unidade: '1kg', preco: 5.20, tipo: 'natural', emoji: '🍊', minimoFamilia: 3, minimoTexto: '3kg de laranja' },
            { id: 'melancia', nome: 'Melancia', unidade: 'unidade (~5kg)', preco: 18.00, tipo: 'natural', emoji: '🍉', minimoFamilia: 1, minimoTexto: '1 melancia' },
        ]
    },
    {
        id: 'proteinas',
        nome: 'Carnes, Peixes e Ovos',
        icone: 'fa-drumstick-bite',
        alimentos: [
            { id: 'ovos', nome: 'Ovos', unidade: 'dúzia', preco: 11.80, tipo: 'natural', emoji: '🥚', minimoFamilia: 2, minimoTexto: '2 dúzias de ovos' },
            { id: 'carne', nome: 'Carne bovina (acém/patinho)', unidade: '1kg', preco: 34.90, tipo: 'natural', emoji: '🥩', minimoFamilia: 3, minimoTexto: '3kg de carne bovina' },
            { id: 'frango', nome: 'Frango (peito/coxa)', unidade: '1kg', preco: 16.90, tipo: 'natural', emoji: '🍗', minimoFamilia: 3, minimoTexto: '3kg de frango' },
            { id: 'peixe', nome: 'Peixe fresco (tilápia)', unidade: '1kg', preco: 22.00, tipo: 'natural', emoji: '🐟', minimoFamilia: 2, minimoTexto: '2kg de peixe' },
        ]
    },
    {
        id: 'gorduras',
        nome: 'Gorduras e Óleos',
        icone: 'fa-jar',
        alimentos: [
            { id: 'abacate', nome: 'Abacate', unidade: 'unidade (~500g)', preco: 6.00, tipo: 'natural', emoji: '🥑', minimoFamilia: 2, minimoTexto: '2 abacates' },
            { id: 'oleo', nome: 'Óleo de soja', unidade: 'garrafa 900ml', preco: 8.20, tipo: 'natural', emoji: '🫗', minimoFamilia: 1, minimoTexto: '1 garrafa de óleo' },
            { id: 'manteiga', nome: 'Manteiga', unidade: 'pote 200g', preco: 13.50, tipo: 'natural', emoji: '🧈', minimoFamilia: 1, minimoTexto: '1 pote de manteiga' },
        ]
    },
    {
        id: 'processados',
        nome: 'Alimentos Processados',
        icone: 'fa-box',
        alimentos: [
            { id: 'queijo', nome: 'Queijo mussarela', unidade: '500g', preco: 24.00, tipo: 'processado', emoji: '🧀', minimoFamilia: 0, minimoTexto: '' },
            { id: 'atum', nome: 'Atum enlatado', unidade: 'lata', preco: 7.50, tipo: 'processado', emoji: '🥫', minimoFamilia: 0, minimoTexto: '' },
            { id: 'sardinha', nome: 'Sardinha enlatada', unidade: 'lata', preco: 6.20, tipo: 'processado', emoji: '🥫', minimoFamilia: 0, minimoTexto: '' },
            { id: 'conserva', nome: 'Conserva (seleta de legumes)', unidade: 'lata', preco: 5.80, tipo: 'processado', emoji: '🥫', minimoFamilia: 0, minimoTexto: '' },
            { id: 'pao-frances', nome: 'Pão francês', unidade: '10 unidades', preco: 9.00, tipo: 'processado', emoji: '🥖', minimoFamilia: 0, minimoTexto: '' },
            { id: 'pao-forma', nome: 'Pão de forma', unidade: 'pacote', preco: 10.50, tipo: 'processado', emoji: '🍞', minimoFamilia: 0, minimoTexto: '' },
            { id: 'extrato-tomate', nome: 'Extrato de tomate', unidade: 'lata 340g', preco: 4.80, tipo: 'processado', emoji: '🥫', minimoFamilia: 0, minimoTexto: '' },
            { id: 'suco-caixinha-natural', nome: 'Suco de caixinha (100% natural)', unidade: 'caixa 1L', preco: 9.50, tipo: 'processado', emoji: '🧃', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
    {
        id: 'ultraprocessados',
        nome: 'Ultraprocessados e Embutidos',
        icone: 'fa-bacon',
        alimentos: [
            { id: 'presunto', nome: 'Presunto fatiado', unidade: '200g', preco: 8.50, tipo: 'ultraprocessado', emoji: '🍖', minimoFamilia: 0, minimoTexto: '' },
            { id: 'mortadela', nome: 'Mortadela fatiada', unidade: '300g', preco: 6.50, tipo: 'ultraprocessado', emoji: '🍖', minimoFamilia: 0, minimoTexto: '' },
            { id: 'salsicha', nome: 'Salsicha', unidade: 'pacote 500g', preco: 8.00, tipo: 'ultraprocessado', emoji: '🌭', minimoFamilia: 0, minimoTexto: '' },
            { id: 'biscoito', nome: 'Biscoito recheado', unidade: 'pacote', preco: 5.50, tipo: 'ultraprocessado', emoji: '🍪', minimoFamilia: 0, minimoTexto: '' },
            { id: 'salgadinho', nome: 'Salgadinho (chips)', unidade: 'pacote', preco: 7.50, tipo: 'ultraprocessado', emoji: '🍟', minimoFamilia: 0, minimoTexto: '' },
            { id: 'miojo', nome: 'Macarrão instantâneo (miojo)', unidade: 'pacote', preco: 2.50, tipo: 'ultraprocessado', emoji: '🍜', minimoFamilia: 0, minimoTexto: '' },
            { id: 'nuggets', nome: 'Nuggets congelados', unidade: '300g', preco: 9.90, tipo: 'ultraprocessado', emoji: '🍗', minimoFamilia: 0, minimoTexto: '' },
            { id: 'refrigerante', nome: 'Refrigerante', unidade: '2 litros', preco: 8.90, tipo: 'ultraprocessado', emoji: '🥤', minimoFamilia: 0, minimoTexto: '' },
            { id: 'suco-po', nome: 'Suco em pó', unidade: 'pacote (rende 1L)', preco: 2.80, tipo: 'ultraprocessado', emoji: '🧃', minimoFamilia: 0, minimoTexto: '' },
            { id: 'margarina', nome: 'Margarina', unidade: 'pote 500g', preco: 7.50, tipo: 'ultraprocessado', emoji: '🧈', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
];

const carrinho = {}; // { alimentoId: quantidade }

const formatarMoeda = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function calcularGastoTotal() {
    let total = 0;
    SECOES.forEach(secao => {
        secao.alimentos.forEach(alimento => {
            total += (carrinho[alimento.id] || 0) * alimento.preco;
        });
    });
    return total;
}

function atualizarOrcamentoNoTopo() {
    const gasto = calcularGastoTotal();
    const saldo = ORCAMENTO_TOTAL - gasto;

    document.getElementById('valor-gasto').textContent = formatarMoeda(gasto);
    const saldoEl = document.getElementById('saldo-restante');
    saldoEl.textContent = formatarMoeda(saldo);
    saldoEl.classList.toggle('negativo', saldo < 0);
    saldoEl.classList.toggle('ok', saldo >= 0);

    // Mascote reage à saúde do orçamento
    const proporcao = ORCAMENTO_TOTAL > 0 ? saldo / ORCAMENTO_TOTAL : 0;
    let estado = 'neutro';
    if (saldo < 0) estado = 'chocado';
    else if (proporcao < 0.10) estado = 'triste';
    else if (proporcao < 0.35) estado = 'preocupado';
    else if (proporcao >= 0.70) estado = 'feliz';
    if (typeof atualizarMascote === 'function') atualizarMascote(estado);
}

function podeAdicionar(alimento) {
    const gasto = calcularGastoTotal();
    return (gasto + alimento.preco) <= ORCAMENTO_TOTAL + 0.001;
}

function criarCartaoAlimento(alimento) {
    const div = document.createElement('div');
    div.className = 'cartao-alimento';
    div.dataset.id = alimento.id;

    const rotulos = { natural: 'In natura', processado: 'Processado', ultraprocessado: 'Ultraprocessado' };

    div.innerHTML = `
    <div class="foto-alimento">
      <span class="emoji-alimento">${alimento.emoji}</span>
      <img src="image/comida/${alimento.id}.jpg" alt="${alimento.nome}" onerror="this.remove()">
    </div>
    <span class="rotulo-tipo ${alimento.tipo}">${rotulos[alimento.tipo]}</span>
    <h4>${alimento.nome}</h4>
    <span class="unidade-alimento">Unidade: ${alimento.unidade}</span>
    <span class="preco">${formatarMoeda(alimento.preco)}</span>
    <div class="seletor-qtd">
      <button type="button" class="btn-menos" aria-label="Diminuir quantidade">−</button>
      <span class="qtd">0</span>
      <button type="button" class="btn-mais" aria-label="Aumentar quantidade">+</button>
    </div>
    ${alimento.minimoFamilia > 0 ? `<span class="aviso-item" data-aviso="${alimento.id}"></span>` : ''}
  `;

    const qtdEl = div.querySelector('.qtd');
    const btnMenos = div.querySelector('.btn-menos');
    const btnMais = div.querySelector('.btn-mais');
    const avisoItem = div.querySelector('.aviso-item');

    const render = () => {
        const qtd = carrinho[alimento.id] || 0;
        qtdEl.textContent = qtd;
        btnMenos.disabled = qtd <= 0;
        div.classList.toggle('selecionado', qtd > 0);
        btnMais.disabled = !podeAdicionar(alimento);

        if (avisoItem) {
            if (qtd === 0) {
                avisoItem.className = 'aviso-item aviso-item--dica';
                avisoItem.innerHTML = `<i class="fa-solid fa-circle-info"></i> Recomendado no mês: ${alimento.minimoTexto}`;
            } else if (qtd < alimento.minimoFamilia) {
                avisoItem.className = 'aviso-item aviso-item--alerta';
                avisoItem.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> O mínimo para alimentar sua família de 4 pessoas é ${alimento.minimoTexto}.`;
            } else {
                avisoItem.className = 'aviso-item aviso-item--ok';
                avisoItem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Quantidade suficiente para o mês`;
            }
        }
    };

    btnMais.addEventListener('click', () => {
        if (!podeAdicionar(alimento)) return;
        carrinho[alimento.id] = (carrinho[alimento.id] || 0) + 1;
        atualizarTudo();
    });

    btnMenos.addEventListener('click', () => {
        if ((carrinho[alimento.id] || 0) <= 0) return;
        carrinho[alimento.id] -= 1;
        atualizarTudo();
    });

    div._render = render;
    render();
    return div;
}

function montarSecoes() {
    const abasEl = document.getElementById('abas-secoes');
    const secoesEl = document.getElementById('secoes-mercado');

    SECOES.forEach((secao, index) => {
        const temMinimo = secao.alimentos.some(a => a.minimoFamilia > 0);

        const aba = document.createElement('button');
        aba.type = 'button';
        aba.className = 'aba' + (index === 0 ? ' ativa' : '');
        aba.dataset.secao = secao.id;
        aba.innerHTML = `<i class="fa-solid ${secao.icone}"></i> ${secao.nome} <span class="contagem" data-contagem="${secao.id}">0</span>`;
        aba.addEventListener('click', () => mostrarSecao(secao.id));
        abasEl.appendChild(aba);

        const bloco = document.createElement('section');
        bloco.className = 'secao-mercado' + (index === 0 ? ' ativa' : '');
        bloco.dataset.secao = secao.id;

        bloco.innerHTML = `
      <div class="cabecalho-secao">
        <h2><i class="fa-solid ${secao.icone}"></i> ${secao.nome}</h2>
        ${temMinimo ? `<span class="meta-minimo" data-meta="${secao.id}"></span>` : ''}
      </div>
      <div class="grade-alimentos" data-grade="${secao.id}"></div>
    `;

        const grade = bloco.querySelector(`[data-grade="${secao.id}"]`);
        secao.alimentos.forEach(alimento => grade.appendChild(criarCartaoAlimento(alimento)));

        secoesEl.appendChild(bloco);
    });
}

function mostrarSecao(id) {
    document.querySelectorAll('.aba').forEach(a => a.classList.toggle('ativa', a.dataset.secao === id));
    document.querySelectorAll('.secao-mercado').forEach(s => s.classList.toggle('ativa', s.dataset.secao === id));
}

function atualizarSecoes() {
    let totalItensAbaixoDoMinimo = 0;

    SECOES.forEach(secao => {
        const itensNaSecao = secao.alimentos.reduce((soma, a) => soma + (carrinho[a.id] || 0), 0);
        document.querySelector(`[data-contagem="${secao.id}"]`).textContent = itensNaSecao;

        const comMinimo = secao.alimentos.filter(a => a.minimoFamilia > 0);
        if (comMinimo.length > 0) {
            const suficientes = comMinimo.filter(a => (carrinho[a.id] || 0) >= a.minimoFamilia).length;
            const meta = document.querySelector(`[data-meta="${secao.id}"]`);
            meta.textContent = `${suficientes} de ${comMinimo.length} itens na quantidade recomendada`;
            meta.classList.toggle('incompleto', suficientes < comMinimo.length);

            totalItensAbaixoDoMinimo += comMinimo.filter(a => (carrinho[a.id] || 0) < a.minimoFamilia).length;
        }
    });

    const avisoRodape = document.getElementById('aviso-minimo');
    if (avisoRodape) {
        avisoRodape.innerHTML = totalItensAbaixoDoMinimo > 0
            ? `<i class="fa-solid fa-triangle-exclamation"></i> ${totalItensAbaixoDoMinimo} alimentos essenciais ainda abaixo da quantidade recomendada para o mês`
            : `<i class="fa-solid fa-circle-check"></i> Todos os essenciais na quantidade recomendada!`;
    }
}

function atualizarCartoes() {
    document.querySelectorAll('.cartao-alimento').forEach(cartao => { if (cartao._render) cartao._render(); });
}

function atualizarTudo() {
    atualizarOrcamentoNoTopo();
    atualizarSecoes();
    atualizarCartoes();
}

function finalizarCompra() {
    const gastoTotal = calcularGastoTotal();

    let itensNatural = 0, itensProcessado = 0, itensUltra = 0;
    const categoriasUltraCompradas = new Set();
    const listaCarrinho = [];
    const essenciaisFaltando = [];

    SECOES.forEach(secao => {
        secao.alimentos.forEach(alimento => {
            const qtd = carrinho[alimento.id] || 0;

            if (qtd > 0) {
                listaCarrinho.push({ nome: alimento.nome, qtd, tipo: alimento.tipo, secao: secao.nome });
                if (alimento.tipo === 'natural') itensNatural += qtd;
                if (alimento.tipo === 'processado') itensProcessado += qtd;
                if (alimento.tipo === 'ultraprocessado') { itensUltra += qtd; categoriasUltraCompradas.add(secao.id); }
            }

            if (alimento.minimoFamilia > 0 && qtd < alimento.minimoFamilia) {
                essenciaisFaltando.push(alimento.nome);
            }
        });
    });

    const resultado = {
        gastoTotal,
        orcamentoTotal: ORCAMENTO_TOTAL,
        itensNatural,
        itensProcessado,
        itensUltra,
        fatoresRisco: categoriasUltraCompradas.size,
        essenciaisFaltando,
        carrinho: listaCarrinho
    };

    localStorage.setItem('carrinhoReal_resultado', JSON.stringify(resultado));
    window.location.href = 'final.html';
}

document.addEventListener('DOMContentLoaded', () => {
    montarSecoes();
    atualizarTudo();
    document.getElementById('btn-finalizar').addEventListener('click', finalizarCompra);
});