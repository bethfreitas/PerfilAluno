function  trocarImagem(novaimagem){
    document.getElementById("imagemGaleria").src = novaimagem;
}
function adicionarUC() {
    let novaUC = prompt("Digite o nome da nova UC:");
    if (novaUC) {
        let ul = document.getElementById("listaUCs");
        if (!ul) {
            ul = document.createElement("ul");
            ul.id = "listaUCs";
            document.body.appendChild(ul);
        }
        let li = document.createElement("li");
        li.innerText = novaUC;
        ul.appendChild(li);
    }
}
function ValidarCPF(){
    const cpfInput = document.getElementById('cpf');
    const errorMsg = document.getElementById('cpf-error');

    cpfInput.addEventListener('input', () => {
      let value = cpfInput.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      cpfInput.value = value;
    });

    cpfInput.addEventListener('blur', () => {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(cpfInput.value)) {
        errorMsg.style.display = 'inline';
      } else {
        errorMsg.style.display = 'none';
      }
    });
}
window.onload = ValidarCPF;