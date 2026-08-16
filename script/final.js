// ===== Tela Final (Game Over Educativo) =====
document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('carrinhoReal_nome') || 'jogador(a)';
    const dadosBrutos = localStorage.getItem('carrinhoReal_resultado');

    if (!dadosBrutos) {
        window.location.href = 'inicial.html';
        return;
    }

    const dados = JSON.parse(dadosBrutos);
    const formatarMoeda = (valor) =>
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const totalItens = dados.itensNatural + dados.itensProcessado + dados.itensUltra;
    const saldoFinal = dados.orcamentoTotal - dados.gastoTotal;

    document.getElementById('titulo-resultado').textContent = `Fim de mês, ${nome}`;

    const seloEl = document.getElementById('selo-status');
    const mensagemEl = document.getElementById('mensagem-principal');

    let estadoMascote = 'neutro';

    if (dados.fatoresRisco >= 3) {
        seloEl.classList.add('alerta');
        seloEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Orçamento apertado, saúde em risco';
        estadoMascote = 'triste';
    } else if (dados.fatoresRisco > 0) {
        seloEl.classList.add('alerta');
        seloEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Alguns pontos de atenção';
        estadoMascote = 'preocupado';
    } else if (dados.essenciaisFaltando && dados.essenciaisFaltando.length > 0) {
        seloEl.classList.add('alerta');
        seloEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Cesta saudável, mas incompleta';
        estadoMascote = 'preocupado';
    } else {
        seloEl.classList.add('bom');
        seloEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Cesta majoritariamente saudável';
        estadoMascote = 'feliz';
    }

    atualizarMascote(estadoMascote);

    mensagemEl.textContent =
        `Parabéns, você alimentou sua família de 4 pessoas com ${formatarMoeda(dados.gastoTotal)}, ` +
        `mas acumulou ${dados.fatoresRisco} ${dados.fatoresRisco === 1 ? 'fator de risco' : 'fatores de risco'} ` +
        `para doenças crônicas ao longo do mês, por causa da presença de alimentos ultraprocessados ` +
        `na cesta. Isso mostra como o preço pode empurrar famílias de baixa renda para uma alimentação ` +
        `menos nutritiva, mesmo quando a intenção é comer bem.`;

    document.getElementById('num-gasto').textContent = formatarMoeda(dados.gastoTotal);
    document.getElementById('num-saldo').textContent = formatarMoeda(saldoFinal);
    document.getElementById('num-risco').textContent = dados.fatoresRisco;

    if (totalItens > 0) {
        document.getElementById('fatia-natural').style.width = (dados.itensNatural / totalItens * 100) + '%';
        document.getElementById('fatia-processado').style.width = (dados.itensProcessado / totalItens * 100) + '%';
        document.getElementById('fatia-ultra').style.width = (dados.itensUltra / totalItens * 100) + '%';
    }

    if (dados.essenciaisFaltando && dados.essenciaisFaltando.length > 0) {
        const blocoFaltando = document.getElementById('bloco-faltando');
        const listaFaltando = document.getElementById('lista-faltando');
        blocoFaltando.style.display = 'block';
        dados.essenciaisFaltando.forEach(nomeAlimento => {
            const li = document.createElement('li');
            li.textContent = nomeAlimento;
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