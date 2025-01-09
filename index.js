const prompt = require("prompt-sync")();
const fs = require("fs");
const xml2js = require("xml2js");

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

async function questao3() {
  let faturamento = [];

  try {
    // Carregar dados do JSON
    if (fs.existsSync("faturamento.json")) {
      const jsonData = JSON.parse(fs.readFileSync("faturamento.json", "utf8"));
      faturamento = faturamento.concat(jsonData.map((item) => item.valor)); // Adiciona valores ao array
      console.log("Dados carregados do JSON.");
    }

    // Carregar dados do XML
    if (fs.existsSync("faturamento.xml")) {
      const xmlData = fs.readFileSync("faturamento.xml", "utf8");
      const parser = new xml2js.Parser();
      const result = await new Promise((resolve, reject) =>
        parser.parseString(xmlData, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
      );
      const xmlFaturamento = result.rows.row.map((item) =>
        parseFloat(item.valor[0])
      );
      faturamento = faturamento.concat(xmlFaturamento); // Adiciona valores ao array
      console.log("Dados carregados do XML.");
    }

    // Caso nenhum dos arquivos seja encontrado
    if (faturamento.length === 0) {
      throw new Error("Nenhum dado de faturamento encontrado (JSON ou XML).");
    }
  } catch (error) {
    console.error("Erro ao carregar os dados:", error.message);
    return;
  }

  // Filtrar dias sem faturamento (valor > 0)
  faturamento = faturamento.filter((valor) => valor > 0);

  // Verificar se há dados válidos
  if (faturamento.length === 0) {
    console.log("Não há dados de faturamento válidos para processar.");
    return;
  }

  // Calcular menor, maior e média de faturamento
  const menor = Math.min(...faturamento);
  const maior = Math.max(...faturamento);
  const media =
    faturamento.reduce((acc, valor) => acc + valor, 0) / faturamento.length;

  // Contar dias com faturamento acima da média
  const diasAcimaMedia = faturamento.filter((dia) => dia > media).length;

  // Exibir os resultados
  console.log(`Menor faturamento: ${menor.toFixed(2)}`);
  console.log(`Maior faturamento: ${maior.toFixed(2)}`);
  console.log(`Dias com faturamento acima da média: ${diasAcimaMedia}`);
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
