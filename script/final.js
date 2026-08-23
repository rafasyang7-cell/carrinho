// ===== Tela Final: GAME OVER =====
// Só chegamos aqui quando pelo menos 1 dos 6 alimentos essenciais (arroz, feijão
// carioca, ovos, óleo, cenoura, banana) não foi comprado na quantidade completa.
// Se os 6 estiverem completos, quem decide o destino é o mercado.js, que manda
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
    const obrigatoriosFaltando = dados.obrigatoriosFaltando || [];

    document.getElementById('titulo-resultado').textContent = `Fim de mês, ${nome}`;

    const seloEl = document.getElementById('selo-status');
    const mensagemEl = document.getElementById('mensagem-principal');

    seloEl.classList.add('alerta');
    let estadoMascote = 'preocupado';

    if (obrigatoriosFaltando.length >= 3) {
        seloEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Alimentação insuficiente';
        estadoMascote = 'triste';
    } else {
        seloEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Faltou pouco para vencer';
        estadoMascote = 'preocupado';
    }
    if (saldoFinal <= 0) estadoMascote = 'chocado';

    atualizarMascote(estadoMascote);

    const listaNomesFaltando = obrigatoriosFaltando.map(i => i.nome.toLowerCase()).join(', ');

    mensagemEl.textContent =
        `Você alimentou sua família de 4 pessoas com ${formatarMoeda(dados.gastoTotal)}, mas o ` +
        `orçamento não foi suficiente para fechar a quantidade mínima de itens essenciais` +
        (listaNomesFaltando ? ` (${listaNomesFaltando})` : '') + `. ` +
        `Isso mostra como o preço pode empurrar famílias de baixa renda para uma alimentação ` +
        `insuficiente ou pouco nutritiva, mesmo quando a intenção é comer bem.`;

    document.getElementById('num-gasto').textContent = formatarMoeda(dados.gastoTotal);
    document.getElementById('num-saldo').textContent = formatarMoeda(saldoFinal);
    document.getElementById('num-risco').textContent = dados.fatoresRisco;

    if (totalItens > 0) {
        document.getElementById('fatia-natural').style.width = (dados.itensNatural / totalItens * 100) + '%';
        document.getElementById('fatia-processado').style.width = (dados.itensProcessado / totalItens * 100) + '%';
        document.getElementById('fatia-ultra').style.width = (dados.itensUltra / totalItens * 100) + '%';
    }

    // O que a pessoa deveria ter colocado no carrinho, e a quantidade certa
    // (só os 6 essenciais — é exatamente o motivo do GAME OVER)
    if (obrigatoriosFaltando.length > 0) {
        const blocoFaltando = document.getElementById('bloco-faltando');
        const listaFaltando = document.getElementById('lista-faltando');
        blocoFaltando.style.display = 'block';
        obrigatoriosFaltando.forEach(item => {
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