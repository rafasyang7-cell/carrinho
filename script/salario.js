// ===== Tela de Renda Familiar =====
document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('carrinhoReal_nome') || 'jogador(a)';
    document.getElementById('titulo-saudacao').textContent = `Olá, ${nome}!`;

    // Renda combinada (líquida) dos dois adultos, já com os descontos de CLT aplicados
    // (mostrados nos cartões de cada um, acima da lista de despesas):
    //   Você:            1621.00 − 121.58 (INSS 7,5%) − 97.26 (VT 6%)  = 1402.16
    //   Companheiro(a):  1105.50 −  82.91 (INSS 7,5%) −  66.33 (VT 6%) =  956.26
    //   Renda combinada: 1402.16 + 956.26                              = 2358.42
    // Orçamento de alimentação = renda combinada − despesas fixas da casa:
    //   2358.42 − (1500 + 120 + 100 + 33.33 + 100 + 50 + 150) = 2358.42 − 2053.33 = 305.09
    const RENDA_COMBINADA = 2358.42;
    const ORCAMENTO_ALIMENTACAO = 305.09;

    const formatarMoeda = (valor) =>
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Animação: o valor da "Renda combinada" conta de R$0 até o total, dando a
    // sensação de que as duas rendas realmente estão se somando na tela.
    const rendaCombinadaEl = document.querySelector('.cartao-renda-combinada strong');
    if (rendaCombinadaEl) {
        const duracaoContagem = 900; // ms
        const inicioContagem = performance.now();

        function passoContagem(agora) {
            const progresso = Math.min(1, (agora - inicioContagem) / duracaoContagem);
            // easing suave (desacelera no final)
            const progressoSuave = 1 - Math.pow(1 - progresso, 3);
            rendaCombinadaEl.textContent = formatarMoeda(RENDA_COMBINADA * progressoSuave);

            if (progresso < 1) {
                requestAnimationFrame(passoContagem);
            } else {
                rendaCombinadaEl.textContent = formatarMoeda(RENDA_COMBINADA);
                rendaCombinadaEl.classList.add('contando');
            }
        }

        // Só começa a contar depois que os cartões terminam de "se encontrar" (0.85s, ver CSS)
        setTimeout(() => requestAnimationFrame(passoContagem), 850);
    }

    // Os dois cartões de renda (Você / Companheiro) já aparecem prontos no HTML — só a
    // lista de despesas fixas é animada linha a linha, descontando da renda combinada.
    const saldoParcialEl = document.getElementById('saldo-parcial');
    const resultadoFinalEl = document.getElementById('resultado-final');
    const btnIrMercado = document.getElementById('btn-ir-mercado');

    let saldo = RENDA_COMBINADA;
    saldoParcialEl.textContent = formatarMoeda(saldo);

    const itensDespesas = Array.from(document.querySelectorAll('#lista-despesas .item-recibo'));
    const atraso = 380; // ms entre cada despesa aparecendo

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