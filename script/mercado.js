// ===== Tela Mercado =====
// Preços médios de pesquisa de mercado nacional (referência 2026).
// Cada alimento in natura tem um "minimoFamilia": a quantidade aproximada
// necessária para alimentar adequadamente uma família de 4 pessoas por 1 mês.
// REGRA DO CARRINHO: para cada alimento com mínimo, o jogador precisa colocar
// 0 (não compra esse item, e pode substituir por uma opção processada/ultra
// da mesma seção) OU a quantidade mínima completa — nunca uma quantidade
// "pela metade". Alimentos processados/ultraprocessados não têm mínimo.
//
// As seções abaixo misturam, de propósito, opções in natura, processadas e
// ultraprocessadas dentro do MESMO grupo alimentar — assim dá pra comparar e
// trocar um alimento saudável por um mais barato dentro da mesma categoria.

const ORCAMENTO_TOTAL = parseFloat(localStorage.getItem('carrinhoReal_orcamentoAlimentacao')) || 148.83;

const SECOES = [
    {
        id: 'graos-carboidratos',
        nome: 'Grãos, Massas e Pães',
        icone: 'fa-wheat-awn',
        alimentos: [
            { id: 'arroz', nome: 'Arroz', unidade: 'pacote 1kg', preco: 6.20, tipo: 'natural', icone: 'fa-bowl-rice', minimoFamilia: 6, minimoTexto: '6kg de arroz' },
            { id: 'feijao-carioca', nome: 'Feijão carioca', unidade: 'pacote 1kg', preco: 9.80, tipo: 'natural', icone: 'fa-plate-wheat', minimoFamilia: 4, minimoTexto: '4kg de feijão' },
            { id: 'feijao-preto', nome: 'Feijão preto', unidade: 'pacote 1kg', preco: 9.50, tipo: 'natural', icone: 'fa-mortar-pestle', minimoFamilia: 4, minimoTexto: '4kg de feijão' },
            { id: 'milho', nome: 'Milho verde (espiga)', unidade: 'pacote com 3', preco: 7.00, tipo: 'natural', icone: 'fa-wheat-awn', minimoFamilia: 2, minimoTexto: '2 pacotes de milho verde' },
            { id: 'pao-frances', nome: 'Pão francês', unidade: '10 unidades', preco: 9.00, tipo: 'processado', icone: 'fa-mug-saucer', minimoFamilia: 0, minimoTexto: '' },
            { id: 'pao-forma', nome: 'Pão de forma', unidade: 'pacote', preco: 10.50, tipo: 'processado', icone: 'fa-bread-slice', minimoFamilia: 0, minimoTexto: '' },
            { id: 'miojo', nome: 'Macarrão instantâneo (miojo)', unidade: 'pacote', preco: 2.50, tipo: 'ultraprocessado', icone: 'fa-bowl-food', minimoFamilia: 0, minimoTexto: '' },
            { id: 'biscoito', nome: 'Biscoito recheado', unidade: 'pacote', preco: 5.50, tipo: 'ultraprocessado', icone: 'fa-cookie', minimoFamilia: 0, minimoTexto: '' },
            { id: 'salgadinho', nome: 'Salgadinho (chips)', unidade: 'pacote', preco: 7.50, tipo: 'ultraprocessado', icone: 'fa-stroopwafel', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
    {
        id: 'proteinas',
        nome: 'Carnes, Peixes, Ovos e Frios',
        icone: 'fa-drumstick-bite',
        alimentos: [
            { id: 'ovos', nome: 'Ovos', unidade: 'dúzia', preco: 11.80, tipo: 'natural', icone: 'fa-egg', minimoFamilia: 2, minimoTexto: '2 dúzias de ovos' },
            { id: 'carne', nome: 'Carne bovina (acém/patinho)', unidade: '1kg', preco: 34.90, tipo: 'natural', icone: 'fa-cow', minimoFamilia: 3, minimoTexto: '3kg de carne bovina' },
            { id: 'frango', nome: 'Frango (peito/coxa)', unidade: '1kg', preco: 16.90, tipo: 'natural', icone: 'fa-drumstick-bite', minimoFamilia: 3, minimoTexto: '3kg de frango' },
            { id: 'peixe', nome: 'Peixe fresco (tilápia)', unidade: '1kg', preco: 22.00, tipo: 'natural', icone: 'fa-fish', minimoFamilia: 2, minimoTexto: '2kg de peixe' },
            { id: 'atum', nome: 'Atum enlatado', unidade: 'lata', preco: 7.50, tipo: 'processado', icone: 'fa-fish-fins', minimoFamilia: 0, minimoTexto: '' },
            { id: 'sardinha', nome: 'Sardinha enlatada', unidade: 'lata', preco: 6.20, tipo: 'processado', icone: 'fa-jar', minimoFamilia: 0, minimoTexto: '' },
            { id: 'queijo', nome: 'Queijo mussarela', unidade: '500g', preco: 24.00, tipo: 'processado', icone: 'fa-cheese', minimoFamilia: 0, minimoTexto: '' },
            { id: 'presunto', nome: 'Presunto fatiado', unidade: '200g', preco: 8.50, tipo: 'ultraprocessado', icone: 'fa-layer-group', minimoFamilia: 0, minimoTexto: '' },
            { id: 'mortadela', nome: 'Mortadela fatiada', unidade: '300g', preco: 6.50, tipo: 'ultraprocessado', icone: 'fa-layer-group', minimoFamilia: 0, minimoTexto: '' },
            { id: 'salsicha', nome: 'Salsicha', unidade: 'pacote 500g', preco: 8.00, tipo: 'ultraprocessado', icone: 'fa-hotdog', minimoFamilia: 0, minimoTexto: '' },
            { id: 'nuggets', nome: 'Nuggets congelados', unidade: '300g', preco: 9.90, tipo: 'ultraprocessado', icone: 'fa-cubes', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
    {
        id: 'gorduras',
        nome: 'Gorduras e Óleos',
        icone: 'fa-jar',
        alimentos: [
            { id: 'abacate', nome: 'Abacate', unidade: 'unidade (~500g)', preco: 6.00, tipo: 'natural', icone: 'fa-seedling', minimoFamilia: 2, minimoTexto: '2 abacates' },
            { id: 'oleo', nome: 'Óleo de soja', unidade: 'garrafa 900ml', preco: 8.20, tipo: 'natural', icone: 'fa-wine-bottle', minimoFamilia: 1, minimoTexto: '1 garrafa de óleo' },
            { id: 'manteiga', nome: 'Manteiga', unidade: 'pote 200g', preco: 13.50, tipo: 'processado', icone: 'fa-cheese', minimoFamilia: 1, minimoTexto: '1 pote de manteiga' },
            { id: 'margarina', nome: 'Margarina', unidade: 'pote 500g', preco: 7.50, tipo: 'ultraprocessado', icone: 'fa-box', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
    {
        id: 'legumes-frutas',
        nome: 'Legumes, Verduras e Frutas',
        icone: 'fa-carrot',
        alimentos: [
            { id: 'cenoura', nome: 'Cenoura', unidade: '1kg', preco: 5.50, tipo: 'natural', icone: 'fa-carrot', minimoFamilia: 2, minimoTexto: '2kg de cenoura' },
            { id: 'abobora', nome: 'Abóbora', unidade: '1kg', preco: 5.00, tipo: 'natural', icone: 'fa-pepper-hot', minimoFamilia: 2, minimoTexto: '2kg de abóbora' },
            { id: 'batata', nome: 'Batata inglesa', unidade: '1kg', preco: 6.80, tipo: 'natural', icone: 'fa-bowl-food', minimoFamilia: 3, minimoTexto: '3kg de batata' },
            { id: 'alface', nome: 'Alface', unidade: 'unidade/maço', preco: 3.50, tipo: 'natural', icone: 'fa-leaf', minimoFamilia: 4, minimoTexto: '4 unidades de alface' },
            { id: 'couve', nome: 'Couve', unidade: 'maço', preco: 3.80, tipo: 'natural', icone: 'fa-seedling', minimoFamilia: 4, minimoTexto: '4 maços de couve' },
            { id: 'agriao', nome: 'Agrião', unidade: 'maço', preco: 4.50, tipo: 'natural', icone: 'fa-leaf', minimoFamilia: 2, minimoTexto: '2 maços de agrião' },
            { id: 'tomate', nome: 'Tomate', unidade: '1kg', preco: 8.50, tipo: 'natural', icone: 'fa-apple-whole', minimoFamilia: 3, minimoTexto: '3kg de tomate' },
            { id: 'cebola', nome: 'Cebola', unidade: '1kg', preco: 6.00, tipo: 'natural', icone: 'fa-lemon', minimoFamilia: 2, minimoTexto: '2kg de cebola' },
            { id: 'banana', nome: 'Banana', unidade: '1kg', preco: 6.50, tipo: 'natural', icone: 'fa-lemon', minimoFamilia: 3, minimoTexto: '3kg de banana' },
            { id: 'maca', nome: 'Maçã', unidade: '1kg', preco: 8.90, tipo: 'natural', icone: 'fa-apple-whole', minimoFamilia: 2, minimoTexto: '2kg de maçã' },
            { id: 'mamao', nome: 'Mamão', unidade: '1kg', preco: 5.80, tipo: 'natural', icone: 'fa-pepper-hot', minimoFamilia: 2, minimoTexto: '2kg de mamão' },
            { id: 'laranja', nome: 'Laranja', unidade: '1kg', preco: 5.20, tipo: 'natural', icone: 'fa-lemon', minimoFamilia: 3, minimoTexto: '3kg de laranja' },
            { id: 'melancia', nome: 'Melancia', unidade: 'unidade (~5kg)', preco: 18.00, tipo: 'natural', icone: 'fa-bowl-food', minimoFamilia: 1, minimoTexto: '1 melancia' },
            { id: 'conserva', nome: 'Conserva (seleta de legumes)', unidade: 'lata', preco: 5.80, tipo: 'processado', icone: 'fa-jar', minimoFamilia: 0, minimoTexto: '' },
            { id: 'extrato-tomate', nome: 'Extrato de tomate', unidade: 'lata 340g', preco: 4.80, tipo: 'processado', icone: 'fa-jar', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
    {
        id: 'bebidas',
        nome: 'Bebidas',
        icone: 'fa-bottle-water',
        alimentos: [
            { id: 'suco-caixinha-natural', nome: 'Suco de caixinha (100% natural)', unidade: 'caixa 1L', preco: 9.50, tipo: 'processado', icone: 'fa-bottle-water', minimoFamilia: 0, minimoTexto: '' },
            { id: 'suco-po', nome: 'Suco em pó', unidade: 'pacote (rende 1L)', preco: 2.80, tipo: 'ultraprocessado', icone: 'fa-mortar-pestle', minimoFamilia: 0, minimoTexto: '' },
            { id: 'refrigerante', nome: 'Refrigerante', unidade: '2 litros', preco: 8.90, tipo: 'ultraprocessado', icone: 'fa-wine-bottle', minimoFamilia: 0, minimoTexto: '' },
        ]
    },
];

const SECAO_OBRIGATORIOS = {
    id: 'obrigatorios',
    nome: 'Alimentos Obrigatórios',
    icone: 'fa-star',
    alimentos: SECOES.flatMap(secao => secao.alimentos.filter(a => a.minimoFamilia > 0)),
};

const IDS_ESSENCIAIS_PARA_VITORIA = ['arroz', 'feijao-carioca', 'ovos', 'oleo', 'cenoura', 'banana'];

function ehEssencialParaVitoria(alimento) {
    return IDS_ESSENCIAIS_PARA_VITORIA.includes(alimento.id);
}

const SECOES_PARA_EXIBIR = [SECAO_OBRIGATORIOS, ...SECOES];

const carrinho = {};

const formatarMoeda = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function calcularGastoTotal() {
    let total = 0;
    SECOES.forEach(secao => {
        secao.alimentos.forEach(alimento => { total += (carrinho[alimento.id] || 0) * alimento.preco; });
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

    const proporcao = ORCAMENTO_TOTAL > 0 ? saldo / ORCAMENTO_TOTAL : 0;
    let estado = 'neutro';
    if (saldo <= 0) estado = 'chocado';
    else if (proporcao < 0.15) estado = 'triste';
    else if (proporcao < 0.45) estado = 'preocupado';
    else if (proporcao >= 0.75) estado = 'feliz';
    atualizarMascote(estado);
}

function podeAdicionar(alimento) {
    const gasto = calcularGastoTotal();
    return (gasto + alimento.preco) <= ORCAMENTO_TOTAL + 0.001;
}

function criarCartaoAlimento(alimento, destacarEssencial) {
    const div = document.createElement('div');
    div.className = 'cartao-alimento';
    div.dataset.id = alimento.id;

    const rotulos = { natural: 'In natura', processado: 'Processado', ultraprocessado: 'Ultraprocessado' };
    const ehEssencial = !!destacarEssencial && ehEssencialParaVitoria(alimento);

    div.innerHTML = `
    ${ehEssencial ? `<span class="fita-essencial"><i class="fa-solid fa-star"></i> Essencial p/ vencer</span>` : ''}
    <div class="foto-alimento">
      <i class="fa-solid ${alimento.icone} icone-alimento"></i>
      <img src="image/mascote/comida/${alimento.id}.jpg" alt="${alimento.nome}" onerror="this.remove()">
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
        div.classList.toggle('insuficiente', alimento.minimoFamilia > 0 && qtd > 0 && qtd < alimento.minimoFamilia);
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

    SECOES_PARA_EXIBIR.forEach((secao, index) => {
        const temMinimo = secao.alimentos.some(a => a.minimoFamilia > 0);
        const ehObrigatorios = secao.id === 'obrigatorios';

        const aba = document.createElement('button');
        aba.type = 'button';
        aba.className = 'aba' + (index === 0 ? ' ativa' : '') + (ehObrigatorios ? ' aba-obrigatorios' : '');
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
      ${ehObrigatorios ? `<p class="descricao-obrigatorios"><i class="fa-solid fa-circle-info"></i> Estes são os alimentos com quantidade mínima para nutrir sua família de 4 pessoas. Os marcados com <i class="fa-solid fa-star"></i> <strong>Essencial p/ vencer</strong> precisam estar completos para você vencer a simulação — os demais são recomendados, mas você pode zerá-los e usar uma opção alternativa da seção correspondente.</p>` : ''}
      <div class="grade-alimentos" data-grade="${secao.id}"></div>
    `;

        const grade = bloco.querySelector(`[data-grade="${secao.id}"]`);
        secao.alimentos.forEach(alimento => grade.appendChild(criarCartaoAlimento(alimento, ehObrigatorios)));

        secoesEl.appendChild(bloco);
    });
}

function mostrarSecao(id) {
    document.querySelectorAll('.aba').forEach(a => a.classList.toggle('ativa', a.dataset.secao === id));
    document.querySelectorAll('.secao-mercado').forEach(s => s.classList.toggle('ativa', s.dataset.secao === id));
}

function listarItensInsuficientes() {
    const lista = [];
    SECOES.forEach(secao => {
        secao.alimentos.forEach(alimento => {
            const qtd = carrinho[alimento.id] || 0;
            if (alimento.minimoFamilia > 0 && qtd > 0 && qtd < alimento.minimoFamilia) {
                lista.push({ secaoId: secao.id, alimento });
            }
        });
    });
    return lista;
}

function atualizarSecoes() {
    SECOES_PARA_EXIBIR.forEach(secao => {
        const itensNaSecao = secao.alimentos.reduce((soma, a) => soma + (carrinho[a.id] || 0), 0);
        document.querySelector(`[data-contagem="${secao.id}"]`).textContent = itensNaSecao;

        const comMinimo = secao.alimentos.filter(a => a.minimoFamilia > 0);
        if (comMinimo.length > 0) {
            const suficientes = comMinimo.filter(a => (carrinho[a.id] || 0) >= a.minimoFamilia).length;
            const meta = document.querySelector(`[data-meta="${secao.id}"]`);
            meta.textContent = `${suficientes} de ${comMinimo.length} itens na quantidade recomendada`;
            meta.classList.toggle('incompleto', suficientes < comMinimo.length);
        }
    });

    const itensInsuficientes = listarItensInsuficientes();
    const avisoRodape = document.getElementById('aviso-minimo');
    if (avisoRodape) {
        avisoRodape.innerHTML = itensInsuficientes.length > 0
            ? `<i class="fa-solid fa-triangle-exclamation"></i> ${itensInsuficientes.length} alimento(s) com quantidade insuficiente no carrinho`
            : `<i class="fa-solid fa-circle-check"></i> Nenhuma quantidade pela metade — pode finalizar!`;
        avisoRodape.classList.toggle('aviso-minimo--alerta', itensInsuficientes.length > 0);
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

let timeoutToast = null;
function mostrarToast(mensagem) {
    let toast = document.getElementById('toast-aviso');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-aviso';
        toast.className = 'toast-aviso';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>${mensagem}</span>`;
    toast.classList.add('mostrar');
    clearTimeout(timeoutToast);
    timeoutToast = setTimeout(() => toast.classList.remove('mostrar'), 5000);
}

function tentarFinalizar() {
    const insuficientes = listarItensInsuficientes();

    if (insuficientes.length > 0) {
        const primeiro = insuficientes[0];
        mostrarToast(`Quantidade mínima para abastecer sua família de 4 pessoas é ${primeiro.alimento.minimoTexto}. Complete a quantidade ou zere o item e escolha outra opção da seção.`);
        mostrarSecao(primeiro.secaoId);

        const cartao = document.querySelector(`.secao-mercado.ativa .cartao-alimento[data-id="${primeiro.alimento.id}"]`);
        if (cartao) {
            cartao.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cartao.classList.add('cartao-destaque');
            setTimeout(() => cartao.classList.remove('cartao-destaque'), 1600);
        }
        return;
    }

    finalizarCompra();
}

function finalizarCompra() {
    const gastoTotal = calcularGastoTotal();

    let itensNatural = 0, itensProcessado = 0, itensUltra = 0;
    const categoriasUltraCompradas = new Set();
    const listaCarrinho = [];
    const essenciaisFaltando = [];
    const obrigatoriosFaltando = [];

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
                essenciaisFaltando.push({ nome: alimento.nome, minimoTexto: alimento.minimoTexto });
                if (ehEssencialParaVitoria(alimento)) {
                    obrigatoriosFaltando.push({ nome: alimento.nome, minimoTexto: alimento.minimoTexto });
                }
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
        obrigatoriosFaltando,
        carrinho: listaCarrinho
    };

    localStorage.setItem('carrinhoReal_resultado', JSON.stringify(resultado));

    window.location.href = (obrigatoriosFaltando.length === 0) ? 'vitoria.html' : 'final.html';
}

document.addEventListener('DOMContentLoaded', () => {
    montarSecoes();
    atualizarTudo();
    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', tentarFinalizar);
    }
});