document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('carrinhoReal_nome') || 'jogador(a)';
    document.getElementById('titulo-saudacao').textContent = `Olá, ${nome}!`;

    const RENDA_COMBINADA = 2358.42;
    const ORCAMENTO_ALIMENTACAO = 305.09;

    const formatarMoeda = (valor) =>
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const rendaCombinadaEl = document.querySelector('.cartao-renda-combinada strong');
    if (rendaCombinadaEl) {
        const duracaoContagem = 900; // ms
        const inicioContagem = performance.now();

        function passoContagem(agora) {
            const progresso = Math.min(1, (agora - inicioContagem) / duracaoContagem);
            const progressoSuave = 1 - Math.pow(1 - progresso, 3);
            rendaCombinadaEl.textContent = formatarMoeda(RENDA_COMBINADA * progressoSuave);

            if (progresso < 1) {
                requestAnimationFrame(passoContagem);
            } else {
                rendaCombinadaEl.textContent = formatarMoeda(RENDA_COMBINADA);
                rendaCombinadaEl.classList.add('contando');
            }
        }
        setTimeout(() => requestAnimationFrame(passoContagem), 850);
    }

    const saldoParcialEl = document.getElementById('saldo-parcial');
    const resultadoFinalEl = document.getElementById('resultado-final');
    const btnIrMercado = document.getElementById('btn-ir-mercado');

    let saldo = RENDA_COMBINADA;
    saldoParcialEl.textContent = formatarMoeda(saldo);

    const itensDespesas = Array.from(document.querySelectorAll('#lista-despesas .item-recibo'));
    const atraso = 380;

    itensDespesas.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('mostrar');
            saldo -= parseFloat(item.dataset.valor);
            saldoParcialEl.textContent = formatarMoeda(saldo);

            if (index === itensDespesas.length - 1) {
                setTimeout(() => {
                    resultadoFinalEl.classList.add('mostrar');
                    btnIrMercado.classList.add('ativo');
                }, 450);
            }
        }, atraso * (index + 1));
    });

    btnIrMercado.addEventListener('click', () => {
        localStorage.setItem('carrinhoReal_orcamentoAlimentacao', ORCAMENTO_ALIMENTACAO);
        window.location.href = 'mercado.html';
    });
});