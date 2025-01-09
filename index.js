const prompt = require("prompt-sync")();

function questao1() {
  let indice = 13;
  let soma = 0;
  let j = 0;

  while (j < indice) {
    j += 1;
    soma += j;
  }

  console.log(`Questão 1 - A soma da variável é: ${soma}`);
}

function questao2() {
  function isFibonacci(num) {
    let a = 0,
      b = 1;
    while (b < num) {
      [a, b] = [b, a + b];
    }
    return b === num || num === 0;
  }

  const numero = parseInt(prompt("Questão 2 - Informe um número: "));
  if (isNaN(numero)) {
    console.log("Entrada inválida. Por favor, informe um número.");
    return;
  }

  if (isFibonacci(numero)) {
    console.log(`O número ${numero} pertence à sequência de Fibonacci.`);
  } else {
    console.log(`O número ${numero} não pertence à sequência de Fibonacci.`);
  }
}

function questao3() {
  const dados = {
    faturamento: [
      0, 22174.1664, 24537.6698, 26139.6134, 0, 0, 0, 25681.8318, 0, 0,
      30059.0456, 0, 0, 0, 12000.1234, 0, 0, 12345.6789,
    ],
  };
  const faturamento = dados.faturamento.filter((valor) => valor > 0);
  const menor = Math.min(...faturamento);
  const maior = Math.max(...faturamento);
  const media =
    faturamento.reduce((acc, valor) => acc + valor, 0) / faturamento.length;
  const diasAcimaMedia = faturamento.filter((dia) => dia > media).length;
  console.log(`Questão 3 - Menor faturamento: ${menor}`);
  console.log(`Questão 3 - Maior faturamento: ${maior}`);
  console.log(
    `Questão 3 - Dias com faturamento acima da média: ${diasAcimaMedia}`
  );
}

function questao4() {
  const faturaEstado = {
    SP: 67836.43,
    RJ: 36678.66,
    MG: 29229.88,
    ES: 27165.48,
    Outros: 19849.53,
  };

  const total = Object.values(faturaEstado).reduce(
    (acc, valor) => acc + valor,
    0
  );

  const percentual = Object.entries(faturaEstado).map(([estado, valor]) => {
    return { estado, percentual: ((valor / total) * 100).toFixed(2) };
  });

  console.log("Questão 4 - Percentual de faturamento por estado:");
  percentual.forEach(({ estado, percentual }) => {
    console.log(`${estado}: ${percentual}%`);
  });
}

function questao5() {
  function invertString(str) {
    let inverte = "";
    for (let i = str.length - 1; i >= 0; i--) {
      inverte += str[i];
    }
    return inverte;
  }

  const string = prompt("Questão 5 - Informe uma string: ");
  console.log(`Questão 5 - String invertida: ${invertString(string)}`);
}
function main() {
  questao1();
  questao2();
  questao3();
  questao4();
  questao5();
}
main();
