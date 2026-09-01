/**
 * Programa: calculadora.js
 * Descrição: Interface de console interativa para a Calculadora de Matrizes em Node.js.
 * Disciplina: Álgebra Linear — Fatec Osasco
 * Curso: Desenvolvimento de Software Multiplataforma
 */

const readline = require("readline");
const {
  obterDimensoes,
  criarMatrizVazia,
  gerarMatrizAleatoria,
  formatarMatriz,
  somarMatrizes,
  subtrairMatrizes,
  multiplicarEscalar,
  transporMatriz,
  multiplicarMatrizes,
  verificarQuadrada,
  verificarSimetrica,
  verificarIdentidade,
  calcularTraco,
  calcularDeterminante
} = require("./core_matrizes");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Função utilitária assíncrona para solicitar entrada ao usuário.
 * @param {string} query 
 * @returns {Promise<string>}
 */
function ask(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Lê um número inteiro estritamente positivo com validação.
 * @param {string} mensagem 
 * @returns {Promise<number>}
 */
async function lerInteiroPositivo(mensagem) {
  while (true) {
    const input = (await ask(mensagem)).trim();
    const val = parseInt(input, 10);
    if (!isNaN(val) && val > 0 && String(val) === input) {
      return val;
    }
    console.log(">> Erro: O valor deve ser um número inteiro maior que zero.");
  }
}

/**
 * Lê um número real (float) com validação de entrada.
 * @param {string} mensagem 
 * @returns {Promise<number>}
 */
async function lerFloat(mensagem) {
  while (true) {
    const input = (await ask(mensagem)).trim().replace(",", ".");
    const val = parseFloat(input);
    if (!isNaN(val)) {
      return val;
    }
    console.log(">> Erro: Entrada inválida. Por favor, digite um número real válido.");
  }
}

/**
 * Fluxo guiado para cadastro de matriz (Manual ou Aleatória).
 * @param {string} nome 
 * @returns {Promise<number[][]>}
 */
async function cadastrarMatrizFluxo(nome) {
  console.log(`\n--- Cadastro da Matriz ${nome} ---`);
  const linhas = await lerInteiroPositivo(`Informe o número de linhas de ${nome}: `);
  const colunas = await lerInteiroPositivo(`Informe o número de colunas de ${nome}: `);

  console.log("\nEscolha o método de preenchimento:");
  console.log("  1 - Manual (digitar elemento por elemento)");
  console.log("  2 - Automático (valores inteiros aleatórios)");

  while (true) {
    const opcao = (await ask("Opção desejada [1 ou 2]: ")).trim();

    if (opcao === "1") {
      const matriz = criarMatrizVazia(linhas, colunas);
      console.log(`\nDigite os elementos da matriz ${nome} (${linhas}x${colunas}):`);
      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
          matriz[i][j] = await lerFloat(`  Elemento [${i + 1}, ${j + 1}]: `);
        }
      }
      console.log(`\nMatriz ${nome} cadastrada com sucesso!`);
      console.log(formatarMatriz(matriz, nome));
      return matriz;
    } else if (opcao === "2") {
      const minInput = (await ask("Valor mínimo para os números aleatórios [padrão -10]: ")).trim();
      const minVal = minInput === "" ? -10 : parseInt(minInput, 10);

      const maxInput = (await ask("Valor máximo para os números aleatórios [padrão 10]: ")).trim();
      const maxVal = maxInput === "" ? 10 : parseInt(maxInput, 10);

      const matriz = gerarMatrizAleatoria(linhas, colunas, minVal, maxVal);
      console.log(`\nMatriz ${nome} gerada aleatoriamente com sucesso!`);
      console.log(formatarMatriz(matriz, nome));
      return matriz;
    } else {
      console.log(">> Opção inválida! Escolha 1 para Manual ou 2 para Automático.");
    }
  }
}

/**
 * Seleciona Matriz A ou B para operações unárias.
 * @param {number[][]|null} matrizA 
 * @param {number[][]|null} matrizB 
 * @returns {Promise<{ matriz: number[][], nome: string } | null>}
 */
async function selecionarMatriz(matrizA, matrizB) {
  console.log("\nQual matriz deseja utilizar?");
  console.log("  A - Matriz A");
  console.log("  B - Matriz B");
  const escolha = (await ask("Escolha [A/B]: ")).trim().toUpperCase();

  if (escolha === "A") {
    if (!matrizA) {
      console.log(">> Atenção: A Matriz A ainda não foi cadastrada.");
      return null;
    }
    return { matriz: matrizA, nome: "A" };
  } else if (escolha === "B") {
    if (!matrizB) {
      console.log(">> Atenção: A Matriz B ainda não foi cadastrada.");
      return null;
    }
    return { matriz: matrizB, nome: "B" };
  } else {
    console.log(">> Opção inválida! Escolha 'A' ou 'B'.");
    return null;
  }
}

/**
 * Loop principal do menu interativo em console.
 */
async function main() {
  let matrizA = null;
  let matrizB = null;

  while (true) {
    console.log("\n" + "=".repeat(45));
    console.log("         CALCULADORA DE MATRIZES");
    console.log("=".repeat(45));
    console.log(" 1  - Cadastrar Matriz A");
    console.log(" 2  - Cadastrar Matriz B");
    console.log(" 3  - Exibir Matriz A");
    console.log(" 4  - Exibir Matriz B");
    console.log(" 5  - Somar (A + B)");
    console.log(" 6  - Subtrair (A - B)");
    console.log(" 7  - Multiplicar (A x B)");
    console.log(" 8  - Multiplicar Matriz por Escalar");
    console.log(" 9  - Transpor Matriz");
    console.log("--- [Opcionais / Bônus] ---");
    console.log(" 10 - Verificar Propriedades (Quadrada, Simétrica, Identidade)");
    console.log(" 11 - Calcular Traço da Matriz");
    console.log(" 12 - Calcular Determinante");
    console.log(" 0  - Sair");
    console.log("=".repeat(45));

    const opcao = (await ask("Digite a opção desejada: ")).trim();

    if (opcao === "1") {
      matrizA = await cadastrarMatrizFluxo("A");

    } else if (opcao === "2") {
      matrizB = await cadastrarMatrizFluxo("B");

    } else if (opcao === "3") {
      if (!matrizA) {
        console.log(">> Matriz A não cadastrada. Utilize a opção 1 primeiro.");
      } else {
        console.log("\n" + formatarMatriz(matrizA, "A"));
      }

    } else if (opcao === "4") {
      if (!matrizB) {
        console.log(">> Matriz B não cadastrada. Utilize a opção 2 primeiro.");
      } else {
        console.log("\n" + formatarMatriz(matrizB, "B"));
      }

    } else if (opcao === "5") {
      if (!matrizA || !matrizB) {
        console.log(">> Erro: Ambas as matrizes (A e B) devem estar cadastradas para realizar a soma.");
      } else {
        try {
          const resultado = somarMatrizes(matrizA, matrizB);
          console.log("\n--- Resultado da Soma (A + B) ---");
          console.log(formatarMatriz(resultado, "A + B"));
        } catch (err) {
          console.log(`\n>> Erro de Operação: ${err.message}`);
        }
      }

    } else if (opcao === "6") {
      if (!matrizA || !matrizB) {
        console.log(">> Erro: Ambas as matrizes (A e B) devem estar cadastradas para realizar a subtração.");
      } else {
        try {
          const resultado = subtrairMatrizes(matrizA, matrizB);
          console.log("\n--- Resultado da Subtração (A - B) ---");
          console.log(formatarMatriz(resultado, "A - B"));
        } catch (err) {
          console.log(`\n>> Erro de Operação: ${err.message}`);
        }
      }

    } else if (opcao === "7") {
      if (!matrizA || !matrizB) {
        console.log(">> Erro: Ambas as matrizes (A e B) devem estar cadastradas para realizar a multiplicação.");
      } else {
        try {
          const resultado = multiplicarMatrizes(matrizA, matrizB);
          console.log("\n--- Resultado do Produto (A x B) ---");
          console.log(formatarMatriz(resultado, "A x B"));
        } catch (err) {
          console.log(`\n>> Erro de Operação: ${err.message}`);
        }
      }

    } else if (opcao === "8") {
      const selecao = await selecionarMatriz(matrizA, matrizB);
      if (selecao) {
        const { matriz, nome } = selecao;
        const k = await lerFloat(`Informe o escalar (número real) para multiplicar a Matriz ${nome}: `);
        const resultado = multiplicarEscalar(matriz, k);
        console.log(`\n--- Resultado da Multiplicação (${k} * ${nome}) ---`);
        console.log(formatarMatriz(resultado, `${k} * ${nome}`));
      }

    } else if (opcao === "9") {
      const selecao = await selecionarMatriz(matrizA, matrizB);
      if (selecao) {
        const { matriz, nome } = selecao;
        const resultado = transporMatriz(matriz);
        console.log(`\n--- Matriz Transposta de ${nome} (${nome}^T) ---`);
        console.log(formatarMatriz(resultado, `${nome}^T`));
      }

    } else if (opcao === "10") {
      const selecao = await selecionarMatriz(matrizA, matrizB);
      if (selecao) {
        const { matriz, nome } = selecao;
        const [linhas, colunas] = obterDimensoes(matriz);
        console.log(`\n--- Análise de Propriedades da Matriz ${nome} (${linhas}x${colunas}) ---`);

        // Quadrada
        const ehQuad = verificarQuadrada(matriz);
        console.log(`1. Matriz Quadrada: ${ehQuad ? "SIM" : "NÃO"}`);

        // Simétrica
        const { ehSimetrica, mensagem: msgSim } = verificarSimetrica(matriz);
        console.log(`2. Matriz Simétrica: ${ehSimetrica ? "SIM" : "NÃO"} (${msgSim})`);

        // Identidade
        const { ehIdentidade, mensagem: msgId } = verificarIdentidade(matriz);
        console.log(`3. Matriz Identidade: ${ehIdentidade ? "SIM" : "NÃO"} (${msgId})`);
      }

    } else if (opcao === "11") {
      const selecao = await selecionarMatriz(matrizA, matrizB);
      if (selecao) {
        const { matriz, nome } = selecao;
        try {
          const traco = calcularTraco(matriz);
          console.log(`\n--- Traço da Matriz ${nome} ---`);
          console.log(`Tr(${nome}) = ${traco}`);
        } catch (err) {
          console.log(`\n>> Erro: ${err.message}`);
        }
      }

    } else if (opcao === "12") {
      const selecao = await selecionarMatriz(matrizA, matrizB);
      if (selecao) {
        const { matriz, nome } = selecao;
        try {
          const det = calcularDeterminante(matriz);
          console.log(`\n--- Determinante da Matriz ${nome} ---`);
          console.log(`det(${nome}) = ${det}`);
        } catch (err) {
          console.log(`\n>> Erro: ${err.message}`);
        }
      }

    } else if (opcao === "0") {
      console.log("\nEncerrando a Calculadora de Matrizes. Até logo!");
      rl.close();
      process.exit(0);

    } else {
      console.log(">> Opção inválida! Por favor, digite um número correspondente ao menu.");
    }
  }
}

// Inicia execução
main().catch((err) => {
  console.error("Erro inesperado:", err);
  rl.close();
  process.exit(1);
});
