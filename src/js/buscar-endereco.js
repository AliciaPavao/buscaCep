const form = document.getElementById('#consultaform');
const ufInput = document.getElementById('#uf');
const cidadeInput = document.getElementById('#cidade');
const logadouroInput = document.getElementById('#logradouro');
const resultContainer = document.getElementById('#result');

// Adicionar evento de submit so formulário de consulta
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Captura valores dos campos do formulário e remove espaços em branco
    const uf = ufInput.value;
    const cidade = cidadeInput.value.trim;
    const logradouro = logadouroInput.value.trim();

    // Validação dos campos de formulário
    // Verifica se um estado foi selecionado
    if (uf === "") {
        await Swal.fire ({
            icon: 'error',
            title: 'Campo obrigatório',
            text: 'Por favor, selecione um estado',
            confirmButtonColor: '#117000'
        });
        return;
    }

    if (cidade.length < 3) {
        await Swal.fire ({
            icon: 'error',
            title: 'Campo obrigatório',
            text: 'Cidade deve ter pelo menos 3 caracteres.',
            confirmButtonColor: '#117000'
        });
        return;
    }

    if (logradouro.length < 3) {
        await Swal.fire ({
            icon: 'error',
            title: 'Campo obrigatório',
            text: 'Logradouro deve ter pelo menos 3 caracteres.',
            confirmButtonColor: '#117000'
        });
        return;
    }

    try {
        // Exibir indicador de carregamento dura
        Swal.fire({
            title: 'Consultano endereço...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    // Construir URL da API ViaCep com os parâmetros codificados
    //Codificar cidade e logradouro para evitar problemas de caracteres especiais
    const cidadeEncoded = encodeURIComponent(cidade);
    const logradouroEncoded = encodeURIComponent(logradouro);
    const url = `https://viacep.com.br/ws${uf}/${cidade}/${logradouro}/json/`

    // Realizar consulta á API ViaCep e aguardar respostas
    const data = await consultaViaCep(url);

    // Fechar indicador de carregamento após receber resposta
    Swal.close();

    // Limpar resultados anteriores
    resultContainer.innerHTML = '';

    // Verificar se a consulta retornou resultados
    if (data && data.length > 0) {
        // Construir elemento HTML para exibir resultados
        const table = document.createElement('table');
        table.className = 'results__table';

        // Criar linhas para cada resultados da consulta
        const table = document.createElement('table');
        table.className = 'results__table';

        // Criar linhas para cada resultados da consulta
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Criar células para cada resultado da consulta
        const headers = ['CEP', 'Logradouro', 'Bairro'];

        header.forEach(headerText =>{
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
    
    });
