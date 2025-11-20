
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}); //Importando el módulo readline para poder ingresar datos por consola

readline.question("Enter a number to find its Fibonacci value: ", (input) => {// nos pide ingresar numeros por teclado
    const n = parseInt(input);//nos ayuda a convertir el valor ingresado por teclado a un número entero

    function fibonacci(num) {//función recursiva para calcular el valor de Fibonacci
        if (num <= 0) return 0;//caso base para 0
        if (num === 1 || num === 2) return 1;//caso base para 1 y 2
        return fibonacci(num - 1) + fibonacci(num - 2);//llamada recursiva
    }

    if (isNaN(n) || n < 0) {// nos ayuda a validar que el el numero ingresado por teclado sea un numero positivo
        console.log("ingrese un numero positivo.");//mensaje de error si ingresamos un numero negativo
    } else {
        const result = fibonacci(n);
        console.log(`el valor de fifonacci de ${n} es: ${result}`);//imprime el resultado por consola
    }

    readline.close();//cierra la interfaz de readline
}); // GAAAAAAAAAA