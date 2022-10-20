const telaSup = document.querySelector(".telaSup");
const telaInf = document.querySelector(".telaInf");
const botoes = document.querySelectorAll(".teclado button");

class Calculadora {
    constructor(telaSup, telaInf) {
        this.telaSup = telaSup;
        this.telaInf = telaInf;
    }
    //add digitos no visor da calculadora
    addDigito(digito) {
    }
}

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //Não reconhece innerText mas funciona normal como JS
        const btn_valor = e.target?.innerText;
        //Identificando se o usuário clicou em número ou em operação.
        if (+btn_valor >= 0 || btn_valor === ".") {
            console.log(btn_valor);
        }
        else {
            console.log("Op.: " + btn_valor);
        }
    });
});
