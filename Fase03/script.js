function  trocarImagem(novaimagem) {
  
    document.getElementById("imagemGaleria").src = novaimagem;
}
function adicionarUC() {
    let novaUC = prompt("Digite o nome da UC:");
    if (novaUC) {
        let ul = document.getElementById("listaUCs");
        if (!ul) {
            ul = document.createElement("ul");
            ul.id = "listaUCs";
            document.body.appendChild(ul);
        }
        let novoItem = document.createElement("li");
        novoItem.innerHTML = '${novaUC} <button onclick="moverParaCima(this)">⬆</button> <button onclick="moverParaBaixo(this)">⬇</button>';
        ul.appendChild(novoItem);
    }

}
function moverParaCima(botao) {
    let item = botao.parentElement;
    if (item.previousElementSibling) {
        item.insertBefore(item, item.previousElementSibling);
    }
}
function moverParaBaixo(botao) {
    let item = botao.parentElement;
    if (item.nextElementSibling) {
        item.parentElement.insertBefore(item.nextElementSibling, item);
    }
}
function validarCPF() {
    const cpfInput = document.getElementById('cpf');
    const errorMsg = document.getElementById('cpf-error');

    cpfInput.addEventListener('input', () => {
      let valor = cpfInput.valor.replace(/\D/g, '');
      if (valor.length > 11) valor = valor.slice(0, 11);

      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      cpfInput.valor = valor;
    });
  
    cpfInput.addEventListener('blur', () => {
      const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!regexCPF.test(cpfInput.valor)){
        errorMsg.style.display = 'inline';
      } else {
        errorMsg.style.display = 'none';
      }
    });
}      
function validarEmail() {
  const emailInput = document.getElementById('email');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(emailInput.valor)) {
      alert("Email inválido. Insira um  e-mail válido.");
      emailInput.focus();
    } 
}

function adicionarDescriçao() {
    let descricao = prompt("Digite a descrição:");
    if (descricao) {
        let p = document.createElement("p");
        p.innerText = descricao;
        document.body.appendChild(p);
    }
}


window.onload =  function () {
  validarCPF;
} 