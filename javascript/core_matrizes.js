/**
 * Módulo: core_matrizes.js
 * Descrição: Funções matemáticas e utilitárias para manipulação e operações com matrizes em JavaScript.
 * Disciplina: Álgebra Linear — Fatec Osasco
 * Curso: Desenvolvimento de Software Multiplataforma
 */

/**
 * Retorna as dimensões [linhas, colunas] de uma matriz.
 * Lança erro caso a matriz seja inválida ou vazia.
 * @param {number[][]} matriz 
 * @returns {[number, number]} [linhas, colunas]
 */
function obterDimensoes(matriz) {
  if (!Array.isArray(matriz) || matriz.length === 0) {
    throw new Error("A matriz está vazia ou é inválida.");
  }
  const linhas = matriz.length;
  if (!Array.isArray(matriz[0]) || matriz[0].length === 0) {
    throw new Error("As linhas da matriz são inválidas.");
  }
  const colunas = matriz[0].length;

  for (let i = 0; i < linhas; i++) {
    if (!Array.isArray(matriz[i]) || matriz[i].length !== colunas) {
      throw new Error(`Inconsistência na matriz: linha ${i + 1} possui tamanho diferente.`);
    }
  }

  return [linhas, colunas];
}

/**
 * Cria uma matriz vazia preenchida com um valor padrão.
 * @param {number} linhas 
 * @param {number} colunas 
 * @param {number} valorPadrao 
 * @returns {number[][]}
 */
function criarMatrizVazia(linhas, colunas, valorPadrao = 0) {
  if (linhas <= 0 || colunas <= 0) {
    throw new Error("O número de linhas e colunas deve ser maior que zero.");
  }
  const matriz = [];
  for (let i = 0; i < linhas; i++) {
    const linha = [];
    for (let j = 0; j < colunas; j++) {
      linha.push(valorPadrao);
    }
    matriz.push(linha);
  }
  return matriz;
}

/**
 * Gera uma matriz com números inteiros aleatórios no intervalo [minVal, maxVal].
 * @param {number} linhas 
 * @param {number} colunas 
 * @param {number} minVal 
 * @param {number} maxVal 
 * @returns {number[][]}
 */
function gerarMatrizAleatoria(linhas, colunas, minVal = -10, maxVal = 10) {
  if (linhas <= 0 || colunas <= 0) {
    throw new Error("Dimensões devem ser inteiros positivos.");
  }
  if (minVal > maxVal) {
    [minVal, maxVal] = [maxVal, minVal];
  }
  const matriz = [];
  for (let i = 0; i < linhas; i++) {
    const linha = [];
    for (let j = 0; j < colunas; j++) {
      // Gera inteiro inclusivo entre minVal e maxVal
      const val = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      linha.push(val);
    }
    matriz.push(linha);
  }
  return matriz;
}

/**
 * Formata a matriz como string alinhada em linhas e colunas legíveis.
 * @param {number[][]} matriz 
 * @param {string|null} nome 
 * @returns {string}
 */
function formatarMatriz(matriz, nome = null) {
  if (!matriz) return "Matriz não cadastrada.";

  const [linhas, colunas] = obterDimensoes(matriz);

  function strNum(val) {
    return Number.isInteger(val) ? String(val) : val.toFixed(2);
  }

  const gridStr = matriz.map(linha => linha.map(strNum));

  // Encontra a maior largura de cada coluna
  const colWidths = new Array(colunas).fill(0);
  for (let c = 0; c < colunas; c++) {
    for (let r = 0; r < linhas; r++) {
      if (gridStr[r][c].length > colWidths[c]) {
        colWidths[c] = gridStr[r][c].length;
      }
    }
  }

  const linhasTexto = [];
  if (nome) {
    linhasTexto.push(`Matriz ${nome} (${linhas}x${colunas}):`);
  }

  for (let r = 0; r < linhas; r++) {
    const elementos = gridStr[r].map((val, c) => val.padStart(colWidths[c], " "));
    linhasTexto.push(`  [ ${elementos.join("  ")} ]`);
  }

  return linhasTexto.join("\n");
}

// ==========================================
// 4.3 Operações Obrigatórias
// ==========================================

/**
 * Realiza a soma de duas matrizes: A + B.
 * Valida se as dimensões são compatíveis.
 * @param {number[][]} A 
 * @param {number[][]} B 
 * @returns {number[][]}
 */
function somarMatrizes(A, B) {
  const [linhasA, colsA] = obterDimensoes(A);
  const [linhasB, colsB] = obterDimensoes(B);

  if (linhasA !== linhasB || colsA !== colsB) {
    throw new Error(
      `Dimensões incompatíveis para Soma: A é ${linhasA}x${colsA} e B é ${linhasB}x${colsB}. ` +
      "Ambas devem possuir as mesmas dimensões."
    );
  }

  const resultado = criarMatrizVazia(linhasA, colsA);
  for (let i = 0; i < linhasA; i++) {
    for (let j = 0; j < colsA; j++) {
      resultado[i][j] = A[i][j] + B[i][j];
    }
  }
  return resultado;
}

/**
 * Realiza a subtração de duas matrizes: A - B.
 * Valida se as dimensões são compatíveis.
 * @param {number[][]} A 
 * @param {number[][]} B 
 * @returns {number[][]}
 */
function subtrairMatrizes(A, B) {
  const [linhasA, colsA] = obterDimensoes(A);
  const [linhasB, colsB] = obterDimensoes(B);

  if (linhasA !== linhasB || colsA !== colsB) {
    throw new Error(
      `Dimensões incompatíveis para Subtração: A é ${linhasA}x${colsA} e B é ${linhasB}x${colsB}. ` +
      "Ambas devem possuir as mesmas dimensões."
    );
  }

  const resultado = criarMatrizVazia(linhasA, colsA);
  for (let i = 0; i < linhasA; i++) {
    for (let j = 0; j < colsA; j++) {
      resultado[i][j] = A[i][j] - B[i][j];
    }
  }
  return resultado;
}

/**
 * Multiplica uma matriz por um número escalar k.
 * @param {number[][]} matriz 
 * @param {number} escalar 
 * @returns {number[][]}
 */
function multiplicarEscalar(matriz, escalar) {
  const [linhas, cols] = obterDimensoes(matriz);
  const resultado = criarMatrizVazia(linhas, cols);
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < cols; j++) {
      resultado[i][j] = matriz[i][j] * escalar;
    }
  }
  return resultado;
}

/**
 * Calcula a matriz transposta (linhas viram colunas).
 * Se a matriz for (m x n), a transposta será (n x m).
 * @param {number[][]} matriz 
 * @returns {number[][]}
 */
function transporMatriz(matriz) {
  const [linhas, cols] = obterDimensoes(matriz);
  const transposta = criarMatrizVazia(cols, linhas);
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < cols; j++) {
      transposta[j][i] = matriz[i][j];
    }
  }
  return transposta;
}

/**
 * Realiza o produto matricial A x B.
 * Requisito: colunas de A == linhas de B.
 * @param {number[][]} A 
 * @param {number[][]} B 
 * @returns {number[][]}
 */
function multiplicarMatrizes(A, B) {
  const [linhasA, colsA] = obterDimensoes(A);
  const [linhasB, colsB] = obterDimensoes(B);

  if (colsA !== linhasB) {
    throw new Error(
      `Dimensões incompatíveis para Multiplicação: colunas de A (${colsA}) != linhas de B (${linhasB}). ` +
      "A multiplicação só é possível quando o número de colunas da 1ª matriz for igual ao número de linhas da 2ª matriz."
    );
  }

  const resultado = criarMatrizVazia(linhasA, colsB);
  for (let i = 0; i < linhasA; i++) {
    for (let j = 0; j < colsB; j++) {
      let soma = 0;
      for (let k = 0; k < colsA; k++) {
        soma += A[i][k] * B[k][j];
      }
      resultado[i][j] = soma;
    }
  }
  return resultado;
}

// ==========================================
// 5. Requisitos Opcionais (Bônus)
// ==========================================

/**
 * Verifica se a matriz é quadrada (linhas == colunas).
 * @param {number[][]} matriz 
 * @returns {boolean}
 */
function verificarQuadrada(matriz) {
  const [linhas, cols] = obterDimensoes(matriz);
  return linhas === cols;
}

/**
 * Verifica se a matriz é simétrica (A == A^T).
 * @param {number[][]} matriz 
 * @returns {{ ehSimetrica: boolean, mensagem: string }}
 */
function verificarSimetrica(matriz) {
  if (!verificarQuadrada(matriz)) {
    return { ehSimetrica: false, mensagem: "A matriz não é quadrada, logo não pode ser simétrica." };
  }
  const [linhas, cols] = obterDimensoes(matriz);
  for (let i = 0; i < linhas; i++) {
    for (let j = i + 1; j < cols; j++) {
      if (Math.abs(matriz[i][j] - matriz[j][i]) > 1e-9) {
        return {
          ehSimetrica: false,
          mensagem: `Elemento [${i + 1},${j + 1}] (${matriz[i][j]}) difere de [${j + 1},${i + 1}] (${matriz[j][i]}).`
        };
      }
    }
  }
  return { ehSimetrica: true, mensagem: "A matriz é simétrica (A = A^T)." };
}

/**
 * Verifica se a matriz é uma matriz identidade.
 * @param {number[][]} matriz 
 * @returns {{ ehIdentidade: boolean, mensagem: string }}
 */
function verificarIdentidade(matriz) {
  if (!verificarQuadrada(matriz)) {
    return { ehIdentidade: false, mensagem: "A matriz não é quadrada, logo não pode ser identidade." };
  }
  const [linhas, cols] = obterDimensoes(matriz);
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === j) {
        if (Math.abs(matriz[i][j] - 1) > 1e-9) {
          return {
            ehIdentidade: false,
            mensagem: `Elemento da diagonal principal [${i + 1},${j + 1}] não é 1 (valor: ${matriz[i][j]}).`
          };
        }
      } else {
        if (Math.abs(matriz[i][j]) > 1e-9) {
          return {
            ehIdentidade: false,
            mensagem: `Elemento fora da diagonal principal [${i + 1},${j + 1}] não é 0 (valor: ${matriz[i][j]}).`
          };
        }
      }
    }
  }
  return { ehIdentidade: true, mensagem: "A matriz é uma Matriz Identidade." };
}

/**
 * Calcula o traço da matriz (soma dos elementos da diagonal principal).
 * @param {number[][]} matriz 
 * @returns {number}
 */
function calcularTraco(matriz) {
  if (!verificarQuadrada(matriz)) {
    const [linhas, cols] = obterDimensoes(matriz);
    throw new Error(`O traço só pode ser calculado para matrizes quadradas. Matriz informada é ${linhas}x${cols}.`);
  }
  const [linhas] = obterDimensoes(matriz);
  let traco = 0;
  for (let i = 0; i < linhas; i++) {
    traco += matriz[i][i];
  }
  return traco;
}

/**
 * Retorna uma submatriz removendo a linha e coluna indicadas.
 * Auxiliar para o Teorema de Laplace.
 */
function _submatriz(matriz, linhaRemover, colRemover) {
  return matriz
    .filter((_, i) => i !== linhaRemover)
    .map(linha => linha.filter((_, j) => j !== colRemover));
}

/**
 * Calcula o determinante de uma matriz quadrada de qualquer ordem n x n
 * usando a expansão por cofatores (Laplace).
 * @param {number[][]} matriz 
 * @returns {number}
 */
function calcularDeterminante(matriz) {
  if (!verificarQuadrada(matriz)) {
    const [linhas, cols] = obterDimensoes(matriz);
    throw new Error(`Determinante só existe para matrizes quadradas. Matriz informada é ${linhas}x${cols}.`);
  }

  const [n] = obterDimensoes(matriz);

  // Ordem 1x1
  if (n === 1) return matriz[0][0];

  // Ordem 2x2
  if (n === 2) {
    return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
  }

  // Ordem 3x3: Regra de Sarrus
  if (n === 3) {
    const [[a, b, c], [d, e, f], [g, h, i]] = matriz;
    return (
      (a * e * i + b * f * g + c * d * h) -
      (c * e * g + a * f * h + b * d * i)
    );
  }

  // Ordem n x n: Expansão por cofatores na primeira linha
  let det = 0;
  for (let j = 0; j < n; j++) {
    const sinal = (j % 2 === 0) ? 1 : -1;
    const cofator = sinal * matriz[0][j] * calcularDeterminante(_submatriz(matriz, 0, j));
    det += cofator;
  }
  return det;
}

// Exportações para ambiente Node.js / CommonJS e navegadores
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
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
  };
}
