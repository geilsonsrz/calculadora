// Elemento tela superior
const telaSup = document.querySelector(".telaSup");
// Elemento tela infeior
const telaInf = document.querySelector(".telaInf");
// Elementos teclado
const botoes = document.querySelectorAll(".teclado button");

class Calculadora {
    constructor(telaSup, telaInf) {
        this.telaSupTxt = telaSup;   // Texto da tela superior
        this.telaInfTxt = telaInf;   // Texto da tela inferior
        this.telaInf = "";
    }
    //add digitos no visor da calculadora
    addDigito(digito) {
        //Checagem para ponto decimal --- no máximo 1 ponto
        if (digito === "." && this.telaInfTxt.innerText.includes(".")) {
            return;
        }
        this.telaInf = digito
        this.updateTela()
    }
    //Processamento de operações
    operacoes(op) {
        //Checando se a tela inferior está vazia ou não para operar
        if (this.telaInfTxt.innerText === "" && op !== "C") {
            //Validação para mudança de operação
            if (this.telaSupTxt.innerText !== "") {
                this.mudarOp(op);
            }
            return
        }
        //Capturando valores --- "+" converte o valor para número
        let valorOp;   // Valor da operação
        const valorSup = +this.telaSupTxt.innerText.split(" ")[0];   //Valor da tela superior. Esta como uma string [número] [símbolo da operação]
        const valorInf = +this.telaInfTxt.innerText;   // Valor da tela inferior
        //Identificando a operação
        switch (op) {
            case "+":
                valorOp = valorSup + valorInf;
                this.updateTela(valorOp, op, valorSup, valorInf)
                break
            case "-":
                valorOp = valorSup - valorInf;
                this.updateTela(valorOp, op, valorSup, valorInf)
                break
            case "x":
                valorOp = valorSup * valorInf;
                this.updateTela(valorOp, op, valorSup, valorInf)
                break
            case "/":
                valorOp = valorSup / valorInf;
                this.updateTela(valorOp, op, valorSup, valorInf)
                break
            case "DEL":
                this.opDel();
                break
            case "CE":
                this.opCE();
                break
            case "C":
                this.opC();
                break
            case "=":
                this.opIgual();
                break
            default:
                return;
        }
    }

    //Atualização da tela
    updateTela(valorOp = null, op = null, valorSup = null, valorInf = null) {

        console.log(valorOp, op, valorSup, valorInf)

        if (valorOp === null) {
            this.telaInfTxt.innerText += this.telaInf
        } else {
            // Checando se o valor superior é nulo
            if (valorSup === 0) {
                valorOp = valorInf;
            }
            //Adicionando o valor na tela superior
            this.telaSupTxt.innerText = `${valorOp} ${op}`;
            this.telaInfTxt.innerText = "";
        }
    }

    //Mudar opração
    mudarOp(operacao) {
        //Operações possíveis
        const mathOp = ["+", "-", "x", "/"]
        //Checagem se a operação é válida
        if (!mathOp.includes(operacao)) {
            return
        }
        //Caso esteja validado, alteramos a operação. É o último caractere.
        this.telaSupTxt.innerText = this.telaSupTxt.innerText.slice(0, -1) + operacao;
    }

    //Operador DEL --- Deletar o último digito
    opDel() {
        this.telaInfTxt.innerText = this.telaInfTxt.innerText.slice(0, -1);
    }

    //Operador CE --- Limpar a tela infeior
    opCE() {
        this.telaInfTxt.innerText = "";
    }

    //Operador C -- Limpar toda a tela
    opC() {
        this.telaSupTxt.innerText = "";
        this.telaInfTxt.innerText = "";
    }

    //Operador igual
    opIgual() {
        //Identificando operação para resultado
        const operacao = this.telaSupTxt.innerText.split(" ")[1]
        //Utilizando o processo de operação
        this.operacoes(operacao);
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
