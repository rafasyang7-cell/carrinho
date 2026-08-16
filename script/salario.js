// ===== Tela Salário =====
document.addEventListener('DOMContentLoaded', () => {
    const nome = localStorage.getItem('carrinhoReal_nome') || 'jogador(a)';
    document.getElementById('titulo-saudacao').textContent = `Olá, ${nome}!`;

    const SALARIO_BRUTO = 1621.00;
    const ORCAMENTO_ALIMENTACAO = 248.83; // 1621 - (121.58+97.26+800+120+100+33.33+100)

    const itens = Array.from(document.querySelectorAll('.item-recibo'));
    const saldoParcialEl = document.getElementById('saldo-parcial');
    const resultadoFinalEl = document.getElementById('resultado-final');
    const btnIrMercado = document.getElementById('btn-ir-mercado');

    const formatarMoeda = (valor) =>
        valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let saldo = SALARIO_BRUTO;
    const atraso = 420; // ms entre cada desconto aparecendo

    itens.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('mostrar');
            saldo -= parseFloat(item.dataset.valor);
            saldoParcialEl.textContent = formatarMoeda(saldo);

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