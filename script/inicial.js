let sexoEscolhido = 'nao-binario';

document.addEventListener('DOMContentLoaded', () => {
    // Zera qualquer simulação anterior ao recomeçar
    localStorage.removeItem('carrinhoReal_orcamentoAlimentacao');
    localStorage.removeItem('carrinhoReal_resultado');

    const form = document.getElementById('form-inicio');
    const inputNome = document.getElementById('nome-jogador');
    const aviso = document.getElementById('aviso-nome');
    const botoesSexo = document.querySelectorAll('.opcao-sexo');

    // Inicializa o botão "Não binário" como selecionado padrão visualmente
    botoesSexo.forEach(botao => {
        if (botao.dataset.sexo === 'nao-binario') {
            botao.classList.add('selecionada');
        }
    });

    // Mascote de boas-vindas (estado neutro por padrão)
    atualizarMascote('neutro');

    botoesSexo.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesSexo.forEach(b => b.classList.remove('selecionada'));
            botao.classList.add('selecionada');
            sexoEscolhido = botao.dataset.sexo;
            atualizarMascote('feliz');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = inputNome.value.trim();

        if (nome.length < 2) {
            aviso.textContent = 'Digite um nome com pelo menos 2 letras para continuar.';
            inputNome.focus();
            atualizarMascote('triste');
            return;
        }

        aviso.textContent = '';
        localStorage.setItem('carrinhoReal_nome', nome);
        localStorage.setItem('carrinhoReal_membrosFamilia', '4');
        localStorage.setItem('carrinhoReal_sexo', sexoEscolhido);

        window.location.href = 'salario.html';
    });
});