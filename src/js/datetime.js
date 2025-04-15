const datatimeElement = document.querySelector ('.header__datetime') //datetime

const formatarDataHora = () => {
    
    const agora = new Date(); //objeto com a data e hora atual
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    //obtem e formata os componentes da data
    const dia = agora.getDate().toString().padStart(2, '0'); //dia do mes (01-31)
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); //mes (01-12)
    const ano = agora.getFullYear(); // ano com 4 digitos
    const diaSemana = diasSemana[agora.getDay()]; // nome do dia da semana

    //obtem e formata os componentes do horario
    const hora = agora.getHours().toString().padStart(2, '0'); //hora (00-23)
    const minuto = agora.getMinutes().toString().padStart(2, '0'); //minuto (00-59)
    const segundo = agora.getSeconds().toString().padStart(2, '0'); //segundos (00-59)

    return `${diaSemana}, ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}

//funcao que atualiza o header com a mensagem de bem vindo e a data
const atualizarHeader = () => {
    datatimeElement.textContent = formatarDataHora();
}

//atualiza header a cada segundo

setInterval(atualizarHeader, 1000);

atualizarHeader();