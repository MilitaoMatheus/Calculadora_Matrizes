/**
 * Arquivo: test_calculadora.js
 * Descrição: Suíte de testes unitários automatizados para a versão JavaScript (Node.js).
 * Disciplina: Álgebra Linear — Fatec Osasco
 */

const assert = require("assert");
const {
  somarMatrizes,
  subtrairMatrizes,
  multiplicarEscalar,
  transporMatriz,
  multiplicarMatrizes,
  verificarQuadrada,
  verificarSimetrica,
  verificarIdentidade,
  calcularTraco,
  calcularDeterminante,
  gerarMatrizAleatoria,
  obterDimensoes
} = require("./core_matrizes");

let totalTests = 0;
let passedTests = 0;

function runTest(nome, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [OK] ${nome}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FALHA] ${nome}:`, err.message);
  }
}

console.log("=== Executando Testes Unitários (JavaScript) ===\n");

// Cenários de Teste
const A_2x2 = [
  [1, 2],
  [3, 4]
];
const B_2x2 = [
  [5, 6],
  [7, 8]
];

const A_2x3 = [
  [1, 2, 3],
  [4, 5, 6]
];
const B_3x2 = [
  [7, 8],
  [9, 1],
  [2, 3]
];

const identidade_3x3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];
const simetrica_3x3 = [
  [2, 3, 5],
  [3, 4, 6],
  [5, 6, 7]
];
const matriz_det_3x3 = [
  [6, 1, 1],
  [4, -2, 5],
  [2, 8, 7]
];

// Teste 1: Soma e Subtração compatíveis
runTest("Teste 01: Soma A(2x2) + B(2x2)", () => {
  const res = somarMatrizes(A_2x2, B_2x2);
  assert.deepStrictEqual(res, [
    [6, 8],
    [10, 12]
  ]);
});

runTest("Teste 02: Subtração A(2x2) - B(2x2)", () => {
  const res = subtrairMatrizes(A_2x2, B_2x2);
  assert.deepStrictEqual(res, [
    [-4, -4],
    [-4, -4]
  ]);
});

// Teste 2: Soma e Subtração incompatíveis
runTest("Teste 03: Soma incompatível A(2x3) + B(3x2) deve lançar erro", () => {
  assert.throws(() => somarMatrizes(A_2x3, B_3x2), /Dimensões incompatíveis/);
});

runTest("Teste 04: Subtração incompatível A(2x3) - B(3x2) deve lançar erro", () => {
  assert.throws(() => subtrairMatrizes(A_2x3, B_3x2), /Dimensões incompatíveis/);
});

// Teste 3: Multiplicação compatível (2x3 x 3x2 -> 2x2)
runTest("Teste 05: Multiplicação compatível A(2x3) x B(3x2)", () => {
  const res = multiplicarMatrizes(A_2x3, B_3x2);
  assert.deepStrictEqual(res, [
    [31, 19],
    [85, 55]
  ]);
});

// Teste 4: Multiplicação incompatível (2x3 x 2x2)
runTest("Teste 06: Multiplicação incompatível A(2x3) x A(2x2) deve lançar erro", () => {
  assert.throws(() => multiplicarMatrizes(A_2x3, A_2x2), /Dimensões incompatíveis/);
});

// Teste 5: Matriz Quadrada, Transposta, Traço e Determinante
runTest("Teste 07: Transposição de matriz A(2x3) -> A^T(3x2)", () => {
  const res = transporMatriz(A_2x3);
  assert.deepStrictEqual(res, [
    [1, 4],
    [2, 5],
    [3, 6]
  ]);
});

runTest("Teste 08: Cálculo de traço em matriz quadrada e erro em não quadrada", () => {
  assert.strictEqual(calcularTraco(A_2x2), 5);
  assert.throws(() => calcularTraco(A_2x3), /quadradas/);
});

runTest("Teste 09: Cálculo de determinante 2x2", () => {
  assert.strictEqual(calcularDeterminante(A_2x2), -2);
});

runTest("Teste 10: Cálculo de determinante 3x3", () => {
  assert.strictEqual(calcularDeterminante(matriz_det_3x3), -306);
});

runTest("Teste 11: Propriedades (Quadrada, Simétrica, Identidade)", () => {
  assert.strictEqual(verificarQuadrada(A_2x2), true);
  assert.strictEqual(verificarQuadrada(A_2x3), false);

  assert.strictEqual(verificarSimetrica(simetrica_3x3).ehSimetrica, true);
  assert.strictEqual(verificarSimetrica(A_2x2).ehSimetrica, false);

  assert.strictEqual(verificarIdentidade(identidade_3x3).ehIdentidade, true);
  assert.strictEqual(verificarIdentidade(A_2x2).ehIdentidade, false);
});

runTest("Teste 12: Multiplicação por escalar", () => {
  const res = multiplicarEscalar(A_2x2, 2.5);
  assert.deepStrictEqual(res, [
    [2.5, 5],
    [7.5, 10]
  ]);
});

runTest("Teste 13: Geração de matriz aleatória", () => {
  const mat = gerarMatrizAleatoria(4, 5, -5, 5);
  const [l, c] = obterDimensoes(mat);
  assert.strictEqual(l, 4);
  assert.strictEqual(c, 5);
  mat.forEach(linha => {
    linha.forEach(v => {
      assert(v >= -5 && v <= 5);
    });
  });
});

console.log(`\nResultado: ${passedTests}/${totalTests} testes passaram com sucesso.`);
if (passedTests === totalTests) {
  console.log("Status: SUCESSO TOTAL!");
} else {
  console.error("Status: ALGUNS TESTES FALHARAM.");
  process.exit(1);
}
