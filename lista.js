//Inicializa a lista pegando os dados do localStorage
let listaNome = JSON.parse(localStorage.getItem("listaNomesSalva")) || [];

//Executar assim que a página carrega para mostrar os nomes salvos
document.addEventListener("DOMContentLoaded", mostrarLista);

function nomeValido(nome) {
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return regex.test(nome);
}
//função auxiliar para salvar no LocalStorega e atualizar a tela.
function atualizarDados() {
  localStorage.setItem("listaNomesSalva", JSON.stringify(listaNome));
  mostrarLista();
}

//Adicionar
function adicionar() {
  const input = document.getElementById("nomeAdicionar");
  const nome = input.value.trim();

  // validação de campo vazio
  if (nome === "") {
    alert("ERRO: adicione um nome!");
    return;
  }
  if (!nomeValido(nome)) {
    alert("ERRO: o nome deve conter apenas letras e espaços");
    return;
  }

  const jaExiste = listaNome.some(
    (n) => n.toLowerCase() === nome.toLowerCase(),
  );

  if (jaExiste) {
    alert(`ERRO: O nome "${nome}" já está na lista!`);
    input.value = "";
    return;
  }

  listaNome.push(nome);
  alert(`${nome} Foi adicionado com sucesso!`);

  input.value = "";
  atualizarDados();
}

//Consultar
function consultar() {
  const input = document.getElementById("consultarNome");
  const nome = input.value.trim();

  if (nome === "") {
    alert("Digite um nome para consultar.");
    return;
  }

  if (!nomeValido(nome)) {
    alert("ERRO: o nome deve conter apenas letras e espaços");
    return;
  }

  //Busa inteligente (ex: acha "Maria" mesmo tendo a "Maria Silva")
  const achados = listaNome.filter((n) =>
    n.toLowerCase().includes(nome.toLowerCase()),
  );
  if (achados.length > 0) {
    alert(`encontrado(s): \n- ${achados.join("\n- ")}`);
  } else {
    alert(`O nome "${nome}" não consta na lista.`);
  }
  input.value = "";
}

//Atualizar lista visualmente
function mostrarLista() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  listaNome.forEach((n, index) => {
    const li = document.createElement("li");

    const spanNome = document.createElement("span");
    spanNome.textContent = n;
    li.appendChild(spanNome);

    // Botão de excluir direto na linha do nome
    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "X";
    btnExcluir.classList.add("btn-deletar");

    //remove o index do elemento com precisão
    btnExcluir.onclick = () => removerPorIndex(index);

    li.appendChild(btnExcluir);
    ul.appendChild(li);
  });
}

//Remover
function remover() {
  const nome = document.getElementById("removerNome").value.trim();

  if (nome === "") {
    alert("Digite o nome que deseja remover da lista.");
    return;
  }

  if (!nomeValido(nome)) {
    alert("ERRO: o nome deve conter apenas letras e espaços!");
    return;
  }

  const index = listaNome.findIndex(
    (n) => n.toLowerCase() === nome.toLowerCase(),
  );
  if (index !== -1) {
    listaNome.splice(index, 1);
    alert(`${nome} Foi removido(a) com sucesso.`);
    document.getElementById("removerNome").value = "";
    atualizarDados();
  } else {
    alert(`O nome "${nome}" não está na lista.`);
  }
}

//Remover direto no "X" da Lista.
function removerPorIndex(index) {
  const nomeRemovido = listaNome[index];
  listaNome.splice(index, 1);
  alert(`"${nomeRemovido}" Foi Removido com Sucesso`);
  atualizarDados();
}

//Limpar toda lista
function limparLista() {
  if (listaNome.length === 0) {
    alert("A lista já está vazia!");
    return;
  }

  const confirmar = confirm(
    "Tem certeza que deseja remover todos os nomes da lista? ",
  );
  if (confirmar) {
    listaNome = [];
    atualizarDados();
    alert("Todos os nomes foram removidos!");
  }
}

//Configuração da Tecla ENTER

function configurarAtalhoEnter(idInput, funcaoAcao) {
  const input = document.getElementById(idInput);

  if (input) {
    input.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        funcaoAcao();
      }
    });
  }
}

//Função para disparar nas três caixas
function activarAtalhosEnter() {
  configurarAtalhoEnter("nomeAdicionar", adicionar);
  configurarAtalhoEnter("consultarNome", consultar);
  configurarAtalhoEnter("removerNome", remover);
}

document.addEventListener("DOMContentLoaded", () => {
  activarAtalhosEnter();
});
