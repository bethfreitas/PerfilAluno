function  trocarImagem(novaimagem) {
  document.getElementById("imagemGaleria").src = novaimagem;
}

function adicionarUC() {
    const novaUC = prompt("Digite o nome da UC:");
    if (novaUC) {
      const ul = document.getElementById("listaUCs");
      const novoItem = document.createElement("li");
      novoItem.textContent = novaUC;
      novoItem.setAttribute('draggable', 'true');
      ul.appendChild(novoItem);
      ativarArrastarUCs();
      salvarOrdemUCs();
    }
}

function moverParaCima(botao) {
    const item = botao.parentElement;
    const anterior = item.previousElementSibling;
    if (anterior) {
        item.parentElement.insertBefore(item, anterior);
    }
}
function moverParaBaixo(botao) {
    const item = botao.parentElement;
    const proximo = item.nextElementSibling;
    if (proximo) {
        item.parentElement.insertBefore(proximo, item);
    }
}

function validarCPF() {
  const cpfInput = document.getElementById('cpf');
  const errorMsg = document.getElementById('cpf-error');
  if (!cpfInput || !errorMsg) return;

    cpfInput.addEventListener('input', () => {
      let valor = cpfInput.value.replace(/\D/g, '').slice(0, 11);
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
      cpfInput.value = valor;
    });

    cpfInput.addEventListener('blur', () => {
      const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      errorMsg.style.display = regexCPF.test(cpfInput.value) ? "none" : "inline";
      if (!regexCPF.test(cpfInput.value)) {
        errorMsg.textContent = "CPF inválido. Insira um CPF válido.";
      } else {
        errorMsg.textContent = "";
      }
    }); 
}

function validarEmail() {
  const emailInput = document.getElementById("email");
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(emailInput.value)) {
      alert("Email inválido. Insira um e-mail válido.");
  } 
}

function adicionarDescricao() {
  const inputDescricao = document.getElementById('inputDescricao');
  const texto = inputDescricao.value.trim();
  const lista = document.getElementById('listaDescricao');
  if (texto) {
    const novaDescriçao = document.createElement('p');
    novaDescriçao.textContent = texto;
    lista.appendChild(novaDescriçao);
    inputDescricao.value = "";
  }
  else {
    alert("Por favor, insira uma descrição antes de salvar.");
  }
}

function salvarOrdemUCs() {
  const ucs =  [] ;
  document.querySelectorAll("#listaUCs li").forEach((li) => {
    ucs.push(li.textContent);
  });
  localStorage.setItem('ordemUCs', JSON.stringify(ucs));
}

function carregarOrdemUCs() {
  const dados = localStorage.getItem('ordemUCs');
  if (dados) {
    try {
      const ucs = JSON.parse(dados);
      if (Array.isArray(ucs) && ucs.length > 0) {
    const lista = document.getElementById('listaUCs');
    lista.innerHTML = "";
    ucs.forEach((texto) => {
      const item = document.createElement('li');
      item.textContent = texto;
      item.setAttribute('draggable', 'true');
      lista.appendChild(item);
    });
    ativarArrastarUCs();
  }

} catch (e) {
      console.error("Erro ao carregar a ordem das UCs:", e);
    }
  }
}
function ativarArrastarUCs() {
  let itemArrastado = null;
  const lista = document.getElementById('listaUCs');
  const itens = Array.from(lista.children);

  itens.forEach(olditem => {
    const newItem = oldItem.cloneNode(true);
    lista.replaceChild(newItem, oldItem);
  });
  const novosItens = lista.querySelectorAll('li');
  novosItens.forEach(item => {
    item.setAttribute('draggable', 'true');

    item.addEventListener('dragstart', () => {
    itemArrastado = item;
    item.classList.add('arrastando');
    });

    item.addEventListener('dragover', e => {
      e.preventDefault();
    });

    item.addEventListener('drop', e => {
      e.preventDefault();
      
      if (item !== itemArrastado) {
        const alvoRect = item.getBoundingClientRect();
        const noMeio = e.clientY > alvoRect.top +  alvoRect.height / 2;
        const lista = item.parentElement;
      
        if (noMeio) {
          lista.insertBefore(itemArrastado, item.nextSibling);
        } else {
          lista.insertBefore(itemArrastado, item);
        }
        salvarOrdemUCs();
      }
    }); 

    item.addEventListener('dragend', () => {
      item.classList.remove('arrastando');
      salvarOrdemUCs(); 
    });
  });
}
  
window.addEventListener('DOMContentLoaded', () => {
  validarCPF();
  carregarOrdemUCs();

const botaoDescriçao = document.getElementById('adicionarDescricao');
  if (botaoDescriçao) {
    botaoDescriçao.addEventListener('click', adicionarDescricao);
  }
  const botaoUC = document.getElementById('adicionarUC');
  if (botaoUC) {
    botaoUC.addEventListener('click', adicionarUC);
  }
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', validarEmail);
  }
});