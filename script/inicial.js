// ===== Tela Inicial =====
// Espaço para trocar o ícone "fa-basket-shopping" por uma imagem/logo do curso
// (pasta /image), se quiser.

let generoEscolhido = 'nao-binario';

document.addEventListener('DOMContentLoaded', () => {
    // Zera qualquer simulação anterior ao (re)começar
    localStorage.removeItem('carrinhoReal_orcamentoAlimentacao');
    localStorage.removeItem('carrinhoReal_resultado');

    const form = document.getElementById('form-inicio');
    const inputNome = document.getElementById('nome-jogador');
    const aviso = document.getElementById('aviso-nome');
    const botoesGenero = document.querySelectorAll('.opcao-genero');

    // Mascote de boas-vindas (estado neutro, gênero ainda não escolhido)
    atualizarMascote('neutro', generoEscolhido);

    botoesGenero.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesGenero.forEach(b => b.classList.remove('selecionada'));
            botao.classList.add('selecionada');
            generoEscolhido = botao.dataset.genero;

            // Salva imediatamente (não só no envio do formulário), para garantir que o
            // gênero escolhido não se perca se a pessoa recarregar ou pular alguma etapa.
            localStorage.setItem('carrinhoReal_genero', generoEscolhido);

            // Passamos o gênero direto (generoForcado) também, para a prévia atualizar na hora.
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
