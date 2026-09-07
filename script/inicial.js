let generoEscolhido = 'nao-binario';

document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('carrinhoReal_orcamentoAlimentacao');
    localStorage.removeItem('carrinhoReal_resultado');

    const form = document.getElementById('form-inicio');
    const inputNome = document.getElementById('nome-jogador');
    const aviso = document.getElementById('aviso-nome');
    const botoesGenero = document.querySelectorAll('.opcao-genero');


    atualizarMascote('neutro', generoEscolhido);

    botoesGenero.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesGenero.forEach(b => b.classList.remove('selecionada'));
            botao.classList.add('selecionada');
            generoEscolhido = botao.dataset.genero;


            localStorage.setItem('carrinhoReal_genero', generoEscolhido);

            atualizarMascote('feliz', generoEscolhido);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = inputNome.value.trim();

        if (nome.length < 2) {
            aviso.textContent = 'Digite um nome com pelo menos 2 letras para continuar.';
            inputNome.focus();
            return;
        }

        aviso.textContent = '';
        localStorage.setItem('carrinhoReal_nome', nome);
        localStorage.setItem('carrinhoReal_membrosFamilia', '4');
        localStorage.setItem('carrinhoReal_genero', generoEscolhido);

        window.location.href = 'salario.html';
    });
});
