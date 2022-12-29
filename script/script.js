     let nomeDep = document.getElementById('nome_deputado');
let siglaPartido = document.getElementById('sigla_part');
let IDpartido = document.getElementById('id_part');
let campoExibicao = document.getElementById('exibeInform');
let campoExibir = document.getElementById('exibeInf');
let campoExib = document.getElementById('exibeInformacoes');
let campoTransparecer = document.getElementById('exibeInformations');
let pegaNome = document.getElementById('nomeDespesaDept');
var pegaID;
var nome;

/*do {
    nome=prompt("Olá! Por favor, informe seu nome!");
} while (nome.length <= 0);

alert("Bem-vindo "+nome+" ao meu humilde e simples site acerca de informações políticas!");*/


// Função que recebe um nome
document.querySelector('#buscaDeputadoNome').onclick = function buscaDeputadoNome() {
    let request = new XMLHttpRequest(); 
    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/deputados?nome='+nomeDep.value+'&ordem=ASC&ordenarPor=nome', true); 
    request.setRequestHeader("Accept", "application/json");
    request.onload = function (e) {
        if (request.readyState === 4) {
            if(request.status === 200){
               listaNomeDeputado(request.response);
            } else {
                alert('Erro ao abrir requisição'+request.statusText);
            }
        }
    };

   request.onerror = function (e) {
       alert('Erro: '+request.statusText);
   }
   
   request.send(null);
   request.responseType = "json";
}

document.querySelector('#buscaPartidoSigla').onclick = function buscaPartidoSigla() {
    let request = new XMLHttpRequest(); 
    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/partidos?sigla='+siglaPartido.value+'&ordem=ASC&ordenarPor=sigla', true); 
    request.setRequestHeader("Accept", "application/json");
    //limpaCampos();
    request.onload = function (e) {
        if (request.readyState === 4) {
            if(request.status === 200){
                listaNomePartido(request.response);
            } else {
                alert('Erro ao abrir requisição'+request.statusText);
            }
        }
    };

   request.onerror = function (e) {
       alert('Erro: '+request.statusText);
   }
   
   request.send(null);
   request.responseType = "json";
}

document.querySelector('#buscaPartidoID').onclick = function buscaPartidoMembros() {
    let request = new XMLHttpRequest(); 
    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/partidos/'+IDpartido.value+'/membros', true); 
    request.setRequestHeader("Accept", "application/json");
    request.onload = function (e) {
        if (request.readyState === 4) {
            if(request.status === 200){
                //limpaCampos();
                listaMembrosPartido(request.response);
            } else {
                alert('Erro ao abrir requisição'+request.statusText);
            }
        }
    };

   request.onerror = function (e) {
       alert('Erro: '+request.statusText);
   }
   
   request.send(null);
   request.responseType = "json";
}

document.querySelector('#buscaDeptDespesa').onclick = function buscaDeputadoNomeDespesas() {
    let request = new XMLHttpRequest(); 
    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/deputados?nome='+pegaNome.value+
    '&ordem=ASC&ordenarPor=nome', true); 
    request.setRequestHeader("Accept", "application/json");
    request.onload = function (e) {
        if (request.readyState === 4) {
            if(request.status === 200){
                pegaID=listaDeputadoDespesas(request.response); 
                mostraDespesas();        
            } else {
                alert('Erro ao abrir requisição'+request.statusText);
            }
        }
    };

   request.onerror = function (e) {
       alert('Erro: '+request.statusText);
   }
   
   request.send(null);
   request.responseType = "json";
}

function mostraDespesas() {
    let request = new XMLHttpRequest(); 
    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/deputados/'+pegaID+'/despesas?ordem=ASC&ordenarPor=ano', true); 
    request.setRequestHeader("Accept", "application/json");
    request.onload = function (e) {
        if (request.readyState === 4) {
            if(request.status === 200){
                //limpaCampos();
                listaDespesas(request.response);
            } else {
                alert('Erro ao abrir requisição'+request.statusText);
            }
        }
    };

   request.onerror = function (e) {
       alert('Erro: '+request.statusText);
   }
   
   request.send(null);
   request.responseType = "json";
}

function listaDeputadoDespesas(jsonObj) {
    let scriptLista='';
    
    for (let i = 0; i < jsonObj.dados.length; i++) {
        scriptLista += jsonObj.dados[i].id;
     }
    
    return scriptLista;
}

function listaDespesas(jsonObj) {
    let scriptLista = '';
    for (let i = 0; i < jsonObj.dados.length; i++) {
       scriptLista +='<table><tr><th>Ano</th><th>Mês</th><th>Tipo despesa</th><th>código documento</th><th>Tipo documento</th>'+
       '<th>código Tipo Doc</th><th>Data Doc</th><th>numero Doc</th><th>Valor Doc</th><th>Comprovante</th><th>Nome Fornecedor</th>'
       +'<th>cnpj Cpf Fornecedor</th><th>valor Liquido</th><th>valor Glosa</th><th>cod Lote</th></tr>'
       +'<tr><td>'+jsonObj.dados[i].ano+'</td><td>'+jsonObj.dados[i].mes+'</td><td>'+jsonObj.dados[i].tipoDespesa+'</td><td>'+jsonObj.dados[i].codDocumento+
       '</td><td>'+jsonObj.dados[i].tipoDocumento+'</td><td>'+jsonObj.dados[i].codTipoDocumento+'</td><td>'+jsonObj.dados[i].dataDocumento+'</td>'
       +'<td>'+jsonObj.dados[i].numDocumento+'</td><td>'+jsonObj.dados[i].valorDocumento+'</td><td><a href ="'+jsonObj.dados[i].urlDocumento
       +'" target="_blank" rel="external">Comprovante</a></td><td>'+jsonObj.dados[i].nomeFornecedor+'</td><td>'+jsonObj.dados[i].cnpjCpfFornecedor+'</td>'
       +'<td>'+jsonObj.dados[i].valorLiquido+'</td><td>'+jsonObj.dados[i].valorGlosa+'</td>'
       +'<td>'+jsonObj.dados[i].codLote+'</td></tr></table>';     
    }
    campoTransparecer.innerHTML = scriptLista;
}

function listaDeputado(jsonList) {
    let scriptLista = '';
    scriptLista += jsonList.dados.id + ' - ' + jsonList.dados.ultimoStatus.nome + ' - ' + jsonList.dados.ultimoStatus.siglaPartido + '<br><br>';
    
    campoExibir.innerHTML = scriptLista;
}

function listaNomeDeputado(jsonObj) {
    let scriptLista = '';
    for (let i = 0; i < jsonObj.dados.length; i++) {
       scriptLista +='<br><img src= "'+jsonObj.dados[i].urlFoto+'"><br>'+jsonObj.dados[i].id+'-'+jsonObj.dados[i].nome+'-'+jsonObj.dados[i].siglaPartido+'<br>';
     
    }
    campoExibir.innerHTML = scriptLista;
}

function listaNomePartido(jsonObj) {
    let scriptLista = '';
    for (let i = 0; i < jsonObj.dados.length; i++) {
       scriptLista+='<br>'+jsonObj.dados[i].id+'-'+jsonObj.dados[i].nome+'-'+jsonObj.dados[i].sigla+'<br>';
       
    }

    campoExibicao.innerHTML = scriptLista;
    
}

function listaMembrosPartido(jsonObj) {
    var scriptLista = '';
    for (let i = 0; i < jsonObj.dados.length; i++) {
       scriptLista += '<br><img src= "'+jsonObj.dados[i].urlFoto+'"><br>'+jsonObj.dados[i].id+'-'+jsonObj.dados[i].nome+'-'+jsonObj.dados[i].siglaPartido+'-'
       +jsonObj.dados[i].siglaUf+'<br>';
       
    }
    if (scriptLista.length <= 0) {
        campoExib.innerHTML = "<p> <h1> Este partido não possui trabalhadores!</p>";
    } else{
        campoExib.innerHTML = scriptLista;
    }
    
}






















function openCity(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }