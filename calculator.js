onload = () =>{
    document.querySelector('#button-zero').onclick = () => digito(0);
    document.querySelector('#button-one').onclick = () => digito(1);
    document.querySelector('#button-two').onclick = () => digito(2);
    document.querySelector('#button-three').onclick = () => digito(3);
    document.querySelector('#button-four').onclick = () => digito(4);
    document.querySelector('#button-five').onclick = () => digito(5);
    document.querySelector('#button-six').onclick = () => digito(6);
    document.querySelector('#button-seven').onclick = () => digito(7);
    document.querySelector('#button-eight').onclick = () => digito(8);
    document.querySelector('#button-nine').onclick = () => digito(9);
    document.querySelector('#button-clean').onclick = () => clean();
    document.querySelector('#button-porcentage').onclick = () => operator('%');
    document.querySelector('#button-multiply').onclick = () => operator('*');
    document.querySelector('#button-division').onclick = () => operator('/');
    document.querySelector('#button-plus').onclick = () => operator('+');
    document.querySelector('#button-less').onclick = () => operator('-');
    document.querySelector('#button-equal').onclick = calculate;
    document.querySelector('#button-comma').onclick = () => comma();
}

// variaveis para armazenarmos o valor, o operador e o estado do calculadora
let sValor = ''; // Valor que será apresentado no display
let ehNovoNumero = true; // Indica se o proximo digito será de um novo número
let valorAnterior = 0; // Valor acumulado para uma operação
let pendingOperation = null ;

const atualizaVisor = () =>{
    let [wholePart, decimalPart] = sValor.split(',');
    if(wholePart.length>10){
       document.querySelector('#display').innerText = 'Erro';
       return;
    }
    let v = '';
    c=0;
    for(let i=wholePart.length -1 ;i>=0;i--){
        if(++c>3){
            v= '.' + v;
            c=1;
        }
        v = wholePart[i] + v; 
    }
    v = v + (decimalPart ? ',' + decimalPart.substr(0,10-v.length) : '');
    document.querySelector('#display').innerText = v;
};

// Tratamento ao clique no botão de digito

const digito = (n) =>{
    if(ehNovoNumero){
        sValor = ''+n;
        ehNovoNumero = false;
    }else sValor +=n;
    atualizaVisor();
    /* sVisor.length */
};
// Tratamento ao clique no botão de ponto decimal
const comma = () =>{
    if (ehNovoNumero){
        sValor = '0,';
        ehNovoNumero = false;
    }else if(sValor.indexOf(',') ==-1 )
    sValor+= ',';
    atualizaVisor();
};

const clean = () =>{
    ehNovoNumero = true;
    valorAnterior = 0;
    sValor = '0';
    pendingOperation = null;
    atualizaVisor();
};
//converte a string do valor para um número real

const valorAtual = () => parseFloat(sValor.replace(',','.'));
// Tratamento do clique nos botões de operadores
const operator = (op) =>{
    calculate();
    valorAnterior = valorAtual();
    pendingOperation = op;
    ehNovoNumero = true;
}
const calculate = () =>{
    if(pendingOperation!=null){
        let result;
        switch(pendingOperation){
            case '+': result = valorAnterior + valorAtual();break  ;
            case '-': result = valorAnterior - valorAtual();break  ;
            case '/': result = valorAnterior / valorAtual();break  ;
            case '*': result = valorAnterior * valorAtual();break  ;
            case '%': result = valorAnterior % (valorAtual/100)();break  ;
        }
        sValor = result.toString().replace('.',',');
    }
    ehNovoNumero = true;
    pendingOperation= null;
    valorAnterior = 0;
    atualizaVisor();
}