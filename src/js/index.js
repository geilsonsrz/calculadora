const telaSup = document.querySelector(".telaSup");
const telaInf = document.querySelector(".telaInf");
const botoes = document.querySelectorAll(".teclado button");

class Calculadora {
    constructor(telaSup, telaInf) {
        this.telaSupTxt = telaSup;
        this.telaInfTxt = telaInf;
        this.telaInf = "";
    }
    //add digitos no visor da calculadora
    addDigito(digito) {
        //Checagem para ponto decimal
        if(digito === "." && this.telaInfTxt.innerText.includes(".")){
            return;
        }
        this.telaInf = digito
        this.updateTela()
    }
    //Processamento de operações
    operacoes(op){
        console.log(op)
    }


    //Atualização da tela
    updateTela() {
        this.telaInfTxt.innerText += this.telaInf
    }
}

const calc = new Calculadora(telaSup, telaInf)

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //Não reconhece innerText mas funciona normal como JS
        const btn_valor = e.target?.innerText;
        //Identificando se o usuário clicou em número ou em operação.
        if (+btn_valor >= 0 || btn_valor === ".") {
            calc.addDigito(btn_valor);
        }
        else {
            calc.operacoes(btn_valor);
        }
    });
});
