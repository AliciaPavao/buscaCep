const form = document.querySelector('#consultaForm');
const resultContainer = document.querySelector('#result');

// Adicionar evento de submit so formulário de consulta
form.addEventListener('submit', async (event) => {
    const ufInput = document.querySelector('#uf');
    const cidadeInput = document.querySelector('#cidade');
    const logadouroInput = document.querySelector('#logradouro');
    event.preventDefault();

    // Captura valores dos campos do formulário e remove espaços em branco
    const uf = ufInput.value;
    const cidade = cidadeInput.value.trim();
    const logradouro = logadouroInput.value.trim();
    console.log(uf, cidade, logradouro);

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
    

        // Construir URL da API ViaCep com os parâmetros codificados
        //Codificar cidade e logradouro para evitar problemas de caracteres especiais
        const cidadeEncoded = encodeURIComponent(cidade);
        const logradouroEncoded = encodeURIComponent(logradouro);
        const url = `https://viacep.com.br/ws/${uf}/${cidadeEncoded}/${logradouroEncoded}/json/`

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
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Criar células para cada resultado da consulta
            const headers = ['CEP', 'Logradouro', 'Bairro'];

            headers.forEach(headerText =>{
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            // Adicionar linha de cabeçalho ao thead e thead á tabela
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Criar corpo da tabela (tbody) para os dados
            const tbody = document.createElement('tbody');
            // Crição da tabela

            // Popular a tabela com os dados retornado da API
            // Iterar sobre os endereços retornandos ppela API
            data.forEach(item => {
                // Criar uma nova linha para cada endereço
                const row = document.createElement('tr');

                // Criar e preencher célula do CEP
                const cellCep = document.createElement('td');
                cellCep.textContent = item.cep;
                row.appendChild(cellCep);

                const cellLog = document.createElement('td');
                cellLog.textContent = item.logradouro;
                row.appendChild(cellLog);

                const cellBairro = document.createElement('td');
                cellBairro.textContent = item.bairro;
                row.appendChild(cellBairro);

                // Adicionar linha completa ao corpo da tabela
                tbody.appendChild(row);
            });

            // Adicionar corpo da tabela e a tabea completa
            table.appendChild(tbody);
            resultContainer.appendChild(table);

        } else {
            await Swal.fire({
                icon: 'info',
                title: 'Nenhum resultado encontrado',
                text:'Não foram enconstrados endereços com os critérios informados.',
                confirmButtonColor: '#117000'
            });
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Erro na consulta',
            text:'Ocorreu um erro ao consultar um endereço. Tente novamente .',
            confirmButtonColor: '#117000'
        });
    }
});
  

// Adiciona evento ao botão de nova consulta
document.querySelector('#novaConsulta').addEventListener('click', async () => {
    // Limpar formulário e área de resultado
    form.reset();
    resultContainer.innerHTML = '';

    await Swal.fire({
        icon: 'sucsses',
        title: 'Formulário limpo',
        text:'Você pode realizar uma nova consulta agora.',
        confirmButtonColor: '#117000',
        timer: 4000,
        timerProgressBar: true
    });
});

// Função para ealizar consulta á API ViaCep
const consultaViaCep = async (url) => {
    try {
            // Realiza a requisição  HTTP GET para a API ViaCep 
            const response = await fetch(url);

            // Verifica se a resposta da API foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status)
            }

            // Converte para um objeto JS que pode ser manipulado no código
            return await response.json();
    }

    catch (error) {
        // Propaga o erro para ser tratado pelo
        throw error;
    }
};