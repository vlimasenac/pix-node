function ehIgualQue5(numero){
    return numero != 5;
}

var numeros = [1,2,3,4,5,6,7,8,9,10];

for(let i = 0; i < numeros.length; i++) {
    if(ehIgualQue5(numeros[i])) {
        console.log(numeros[i]);
    }
}