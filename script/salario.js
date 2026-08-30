// ===== Tela de Renda Familiar =====
document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('carrinhoReal_nome') || 'jogador(a)';
    document.getElementById('titulo-saudacao').textContent = `Olá, ${nome}!`;

    // Renda combinada (líquida) dos dois adultos, já com os descontos de CLT aplicados:
    //   Você:            1621.00 − 121.58 (INSS 7,5%) − 97.26 (VT 6%)  = 1402.16
    //   Companheiro(a):  1105.50 −  82.91 (INSS 7,5%) −  66.33 (VT 6%) =  956.26
    //   Renda combinada: 1402.16 + 956.26                              = 2358.42
    // Orçamento de alimentação = renda combinada − despesas fixas da casa:
    //   2358.42 − (800 + 120 + 100 + 33.33 + 100 + 50 + 50) = 2358.42 − 1253.33 = 1105.09
    const RENDA_COMBINADA = 2358.42;
    const ORCAMENTO_ALIMENTACAO = 1105.09;

    const itens = Array.from(document.querySelectorAll('.item-recibo'));
    const saldoParcialEl = document.getElementById('saldo-parcial');
    const notaPerCapitaEl = document.getElementById('nota-per-capita');
    const resultadoFinalEl = document.getElementById('resultado-final');
    const btnIrMercado = document.getElementById('btn-ir-mercado');

    const formatarMoeda = (valor) =>
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    saldoParcialEl.textContent = '—';
    notaPerCapitaEl.style.opacity = '0';

    let saldo = null; // só passa a existir depois que a renda combinada aparece
    const atraso = 380; // ms entre cada linha aparecendo

    itens.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('mostrar');
            const tipo = item.dataset.tipo;

            if (tipo === 'renda-combinada') {
                saldo = RENDA_COMBINADA;
                saldoParcialEl.textContent = formatarMoeda(saldo);
                notaPerCapitaEl.style.opacity = '1';
            } else if (tipo === 'desconto' && saldo !== null) {
                // só desconta do saldo visível depois que a renda combinada já apareceu
                // (as despesas fixas da casa)
                saldo -= parseFloat(item.dataset.valor);
                saldoParcialEl.textContent = formatarMoeda(saldo);
            }

            if (index === itens.length - 1) {
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