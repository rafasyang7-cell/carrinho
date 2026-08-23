// ===== Tela Final: VITÓRIA =====
// Só chegamos aqui quando os 6 alimentos essenciais (arroz, feijão carioca, ovos,
// óleo, cenoura e banana) foram comprados na quantidade completa. Quem decide isso
// é o mercado.js — se faltar algum deles, vai para final.html (GAME OVER) em vez desta.
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
    // "cesta completa" = nenhum alimento com mínimo ficou de fora (não só os 6 essenciais).
    const cestaCompleta = !dados.essenciaisFaltando || dados.essenciaisFaltando.length === 0;
    const usouUltraprocessado = dados.itensUltra > 0;

    document.getElementById('titulo-resultado').textContent = `Parabéns, ${nome}!`;
    atualizarMascote('feliz');

    const seloEl = document.getElementById('selo-status');
    if (cestaCompleta && !usouUltraprocessado) {
        seloEl.innerHTML = '<i class="fa-solid fa-trophy"></i> Cesta completa e sem ultraprocessados';
    } else if (cestaCompleta) {
        seloEl.innerHTML = '<i class="fa-solid fa-trophy"></i> Todos os alimentos recomendados, na quantidade certa';
    } else {
        seloEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Essenciais completos';
    }

    const mensagemEl = document.getElementById('mensagem-principal');

    if (cestaCompleta && !usouUltraprocessado) {
        mensagemEl.textContent =
            `Você alimentou sua família de 4 pessoas com ${formatarMoeda(dados.gastoTotal)} e conseguiu ` +
            `bater a quantidade recomendada de todos os alimentos essenciais, sem recorrer a nenhum ` +
            `ultraprocessado. Uma alimentação saudável e completa é possível, mesmo com o orçamento apertado!`;
    } else if (cestaCompleta) {
        mensagemEl.textContent =
            `Você alimentou sua família de 4 pessoas com ${formatarMoeda(dados.gastoTotal)} e conseguiu ` +
            `bater a quantidade recomendada de todos os alimentos com mínimo, incluindo os 6 essenciais. ` +
            `Ainda assim, sobrou espaço no carrinho para algum ultraprocessado — vale reparar como pequenas ` +
            `trocas mudam o equilíbrio da cesta.`;
    } else {
        mensagemEl.textContent =
            `Você alimentou sua família de 4 pessoas com ${formatarMoeda(dados.gastoTotal)} e garantiu a ` +
            `quantidade completa dos 6 alimentos essenciais (um de cada grupo alimentar) — o suficiente para ` +
            `vencer a simulação. O orçamento não deu pra fechar tudo o mais recomendado, mas o básico da sua ` +
            `família ficou garantido.`;
    }

    document.getElementById('num-gasto').textContent = formatarMoeda(dados.gastoTotal);
    document.getElementById('num-saldo').textContent = formatarMoeda(saldoFinal);
    document.getElementById('num-risco').textContent = dados.fatoresRisco;

    if (totalItens > 0) {
        document.getElementById('fatia-natural').style.width = (dados.itensNatural / totalItens * 100) + '%';
        document.getElementById('fatia-processado').style.width = (dados.itensProcessado / totalItens * 100) + '%';
        document.getElementById('fatia-ultra').style.width = (dados.itensUltra / totalItens * 100) + '%';
    }

    if (!cestaCompleta) {
        const blocoFaltando = document.getElementById('bloco-faltando');
        const listaFaltando = document.getElementById('lista-faltando');
        blocoFaltando.style.display = 'block';
        dados.essenciaisFaltando.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${item.nome}</strong> — quantidade recomendada: ${item.minimoTexto}`;
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

    dispararConfete();
});

// Comemoração simples em CSS/JS puro, sem precisar de nenhum arquivo externo.
function dispararConfete() {
    const cores = ['#52B788', '#E9C46A', '#E76F51', '#1B4332', '#FFFFFF'];
    const camada = document.createElement('div');
    camada.className = 'confete-camada';
    document.body.appendChild(camada);

    for (let i = 0; i < 70; i++) {
        const pedaco = document.createElement('span');
        pedaco.className = 'pedaco-confete';
        pedaco.style.left = Math.random() * 100 + 'vw';
        pedaco.style.background = cores[Math.floor(Math.random() * cores.length)];
        pedaco.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        pedaco.style.animationDelay = (Math.random() * 1.2) + 's';
        camada.appendChild(pedaco);
    }

    // Remove a camada depois que a festa acaba, pra não deixar elementos "mortos" na página
    setTimeout(() => camada.remove(), 5000);
}