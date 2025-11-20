
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}); //Importando el módulo readline para que puede  acceder a la entrada 
// y salida estándar mediante teclado y pantalla.
// lee desde el teclado 
// y escribe en la consola

readline.question("Enter a number to find its Fibonacci value: ", (input) => {//pide al usuario que ingrese un número
    const n = parseInt(input);//convierte la entrada en un número entero

    function fibonacci(num) {//función recursiva para calcular el valor de Fibonacci
        if (num <= 0) return 0;//caso base para 0
        if (num === 1 || num === 2) return 1;//caso base para 1 y 2
        return fibonacci(num - 1) + fibonacci(num - 2);//llamada recursiva
    }

    if (isNaN(n) || n < 0) {//validación de entrada
        console.log("Please enter a valid positive number.");//mensaje de error si la entrada no es válida
    } else {
        const result = fibonacci(n);
        console.log(`Fibonacci value of ${n} is: ${result}`);//imprime el resultado
    }

    readline.close();//cierra la interfaz de readline
});