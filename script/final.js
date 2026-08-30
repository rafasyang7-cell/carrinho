// ===== Tela Final: GAME OVER =====
// Só chegamos aqui quando faltou pelo menos 1 grupo alimentar inteiro no
// carrinho (nenhum item de Grãos/Massas, Proteínas, Gorduras, Legumes/Frutas
// ou Mercearia). Se a cesta tiver pelo menos 1 item de cada grupo — mesmo que
// em quantidade insuficiente — quem decide o destino é o mercado.js, que manda
// para vitoria.html em vez desta tela.
document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('carrinhoReal_nome') || 'jogador(a)';
    const dadosBrutos = localStorage.getItem('carrinhoReal_resultado');

    if (!dadosBrutos) {
        window.location.href = 'index.html';
        return;
    }

    const dados = JSON.parse(dadosBrutos);
    const formatarMoeda = (valor) =>
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const totalItens = dados.itensNatural + dados.itensProcessado + dados.itensUltra;
    const saldoFinal = dados.orcamentoTotal - dados.gastoTotal;
    const gruposFaltando = dados.gruposFaltando || [];
    const itensFaltando = dados.essenciaisFaltando || [];

    document.getElementById('titulo-resultado').textContent = `Fim de mês, ${nome}`;

    const seloEl = document.getElementById('selo-status');
    const mensagemEl = document.getElementById('mensagem-principal');

    seloEl.classList.add('alerta');
    let estadoMascote = 'preocupado';

    if (gruposFaltando.length >= 2) {
        seloEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Alimentação pouco variada';
        estadoMascote = 'triste';
    } else {
        seloEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Faltou variedade na cesta';
        estadoMascote = 'preocupado';
    }
    if (saldoFinal <= 0) estadoMascote = 'chocado';

    atualizarMascote(estadoMascote);

    const listaGruposTexto = gruposFaltando.map(g => g.toLowerCase()).join(', ');

    mensagemEl.textContent =
        `Você alimentou sua família de 4 pessoas com ${formatarMoeda(dados.gastoTotal)}, mas a cesta ` +
        `ficou sem nenhum item de pelo menos um grupo alimentar inteiro` +
        (listaGruposTexto ? ` (${listaGruposTexto})` : '') + `. ` +
        `Uma alimentação equilibrada precisa de variedade entre os grupos mesmo com o orçamento ` +
        `apertado, vale a pena garantir pelo menos um pouco de cada tipo de alimento antes de gastar ` +
        `tudo em poucos itens.`;

    document.getElementById('num-gasto').textContent = formatarMoeda(dados.gastoTotal);
    document.getElementById('num-saldo').textContent = formatarMoeda(saldoFinal);
    document.getElementById('num-risco').textContent = dados.fatoresRisco;

    if (totalItens > 0) {
        document.getElementById('fatia-natural').style.width = (dados.itensNatural / totalItens * 100) + '%';
        document.getElementById('fatia-processado').style.width = (dados.itensProcessado / totalItens * 100) + '%';
        document.getElementById('fatia-ultra').style.width = (dados.itensUltra / totalItens * 100) + '%';
    }

    // Motivo principal do GAME OVER: grupos alimentares inteiros que ficaram de fora
    if (gruposFaltando.length > 0) {
        const blocoGrupos = document.getElementById('bloco-grupos-faltando');
        const listaGrupos = document.getElementById('lista-grupos-faltando');
        blocoGrupos.style.display = 'block';
        gruposFaltando.forEach(nomeGrupo => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${nomeGrupo}</strong>`;
            listaGrupos.appendChild(li);
        });
    }

    // Informação extra: itens que entraram na cesta mas ficaram abaixo do recomendado
    if (itensFaltando.length > 0) {
        const blocoFaltando = document.getElementById('bloco-faltando');
        const listaFaltando = document.getElementById('lista-faltando');
        blocoFaltando.style.display = 'block';
        itensFaltando.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.nome}</strong> — faltou completar ${item.minimoTexto}`;
            listaFaltando.appendChild(li);
        });
    }

    const listaEl = document.getElementById('lista-itens-final');
    const rotulos = { natural: 'In natura', processado: 'Processado', ultraprocessado: 'Ultraprocessado' };

    if (dados.carrinho.length === 0) {
        listaEl.innerHTML = '<p style="font-size:0.85rem; color:var(--tinta-suave);">Nenhum item foi colocado no carrinho.</p>';
    }

    dados.carrinho.forEach(item => {
        const linha = document.createElement('div');
        linha.className = 'item-final';
        linha.innerHTML = `
      <span>${item.qtd}x ${item.nome}</span>
      <span class="tag-final ${item.tipo}">${rotulos[item.tipo]}</span>
    `;
        listaEl.appendChild(linha);
    });
});