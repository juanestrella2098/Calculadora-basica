let resultado = document.getElementById("resultado");
let operacionCompleta = '';

function pintaOperacion(numeroUOperador) {
    operacionCompleta += numeroUOperador;
    resultado.innerHTML = operacionCompleta;
}

function reset() {
    resultado.innerHTML = ' ';
    operacionCompleta = '';
}

function operar() {
    const resultadoOperacion = convierteOperacion(operacionCompleta);

    if (resultadoOperacion) {
        switch (resultadoOperacion.operador) {
            case '+':
                resultado.innerHTML = resultadoOperacion.primerValor + resultadoOperacion.segundoValor;
                operacionCompleta = resultado.innerHTML;
                break;
            case '-':
                resultado.innerHTML = resultadoOperacion.primerValor - resultadoOperacion.segundoValor;
                operacionCompleta = resultado.innerHTML;
                break;
            case '*':
                let valorTotal = 0;
                for (let i = 0; i < resultadoOperacion.segundoValor; i++) {
                    valorTotal += parseInt(resultadoOperacion.primerValor);
                }
                resultado.innerHTML = valorTotal;
                operacionCompleta = resultado.innerHTML;
                break;
            case '/':
                if (resultadoOperacion.segundoValor != 0) {
                    let cociente = 0;
                    do {
                        resultadoOperacion.primerValor -= resultadoOperacion.segundoValor;
                        cociente++;
                    } while (resultadoOperacion.primerValor >= resultadoOperacion.segundoValor);
                    resultado.innerHTML = cociente;
                    operacionCompleta = resultado.innerHTML;
                } else {
                    resultado.innerHTML = "No se puede dividir entre 0";
                    setTimeout(() => {
                        reset();
                    }, 1000);
                }
                break;
            case 'e':
                resultado.innerHTML = Math.pow(resultadoOperacion.primerValor, resultadoOperacion.segundoValor);
                operacionCompleta = resultado.innerHTML;
                break;
            case '√':
                resultado.innerHTML = Math.sqrt(resultadoOperacion.primerValor || resultadoOperacion.segundoValor);
                operacionCompleta = resultado.innerHTML;
                break;
            case '%':
                if (resultadoOperacion.segundoValor != 0) {
                    resultado.innerHTML = resultadoOperacion.primerValor % resultadoOperacion.segundoValor;
                    operacionCompleta = resultado.innerHTML;
                } else {
                    resultado.innerHTML = "No se puede dividir entre 0";
                    setTimeout(() => {
                        reset();
                    }, 1000);
                }
                break;
        }
    } else {
        resultado.innerHTML = "Operación no válida";
        setTimeout(() => {
            reset();
        }, 1000);
    }
}

function convierteOperacion(operacionCompleta) {
    const regex = /(-?\d+)([+\-*/e√%])(-?\d+)/;
    const match = operacionCompleta.match(regex);

    if (match) {
        const primerValor = parseFloat(match[1]);
        const operador = match[2];
        const segundoValor = parseFloat(match[3]);

        console.log(primerValor + " " + operador + " " +segundoValor)

        return {
            primerValor,
            operador,
            segundoValor
        };
    } else {
        return null;
    }
}
