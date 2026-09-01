"""
Arquivo: test_calculadora.py
Descrição: Suíte de testes unitários automatizados cobrindo todos os cenários
           especificados no enunciado (Seção 9) e requisitos bônus.
Disciplina: Álgebra Linear — Fatec Osasco
"""

import unittest
from core_matrizes import (
    somar_matrizes,
    subtrair_matrizes,
    multiplicar_escalar,
    transpor_matriz,
    multiplicar_matrizes,
    verificar_quadrada,
    verificar_simetrica,
    verificar_identidade,
    calcular_traco,
    calcular_determinante,
    gerar_matriz_aleatoria,
    obter_dimensoes
)


class TestCalculadoraMatrizes(unittest.TestCase):

    def setUp(self):
        # Matrizes para Teste 1
        self.A_2x2 = [
            [1.0, 2.0],
            [3.0, 4.0]
        ]
        self.B_2x2 = [
            [5.0, 6.0],
            [7.0, 8.0]
        ]

        # Matrizes para Testes 2, 3 e 4
        self.A_2x3 = [
            [1.0, 2.0, 3.0],
            [4.0, 5.0, 6.0]
        ]
        self.B_3x2 = [
            [7.0, 8.0],
            [9.0, 1.0],
            [2.0, 3.0]
        ]

        # Matrizes especiais para Teste 5
        self.identidade_3x3 = [
            [1.0, 0.0, 0.0],
            [0.0, 1.0, 0.0],
            [0.0, 0.0, 1.0]
        ]
        self.simetrica_3x3 = [
            [2.0, 3.0, 5.0],
            [3.0, 4.0, 6.0],
            [5.0, 6.0, 7.0]
        ]
        self.matriz_det_3x3 = [
            [6.0, 1.0, 1.0],
            [4.0, -2.0, 5.0],
            [2.0, 8.0, 7.0]
        ]

    # --- Teste 1: Soma e Subtração compatíveis (2x2) ---
    def test_01_soma_compativel(self):
        resultado = somar_matrizes(self.A_2x2, self.B_2x2)
        esperado = [
            [6.0, 8.0],
            [10.0, 12.0]
        ]
        self.assertEqual(resultado, esperado)

    def test_02_subtracao_compativel(self):
        resultado = subtrair_matrizes(self.A_2x2, self.B_2x2)
        esperado = [
            [-4.0, -4.0],
            [-4.0, -4.0]
        ]
        self.assertEqual(resultado, esperado)

    # --- Teste 2: Soma e Subtração incompatíveis (2x3 e 3x2) ---
    def test_03_soma_incompativel(self):
        with self.assertRaises(ValueError) as context:
            somar_matrizes(self.A_2x3, self.B_3x2)
        self.assertIn("Dimensões incompatíveis", str(context.exception))

    def test_04_subtracao_incompativel(self):
        with self.assertRaises(ValueError) as context:
            subtrair_matrizes(self.A_2x3, self.B_3x2)
        self.assertIn("Dimensões incompatíveis", str(context.exception))

    # --- Teste 3: Multiplicação compatível (2x3 e 3x2 -> 2x2) ---
    def test_05_multiplicacao_compativel(self):
        # A(2x3) x B(3x2):
        # Linha 1 x Col 1: 1*7 + 2*9 + 3*2 = 7 + 18 + 6 = 31
        # Linha 1 x Col 2: 1*8 + 2*1 + 3*3 = 8 + 2 + 9  = 19
        # Linha 2 x Col 1: 4*7 + 5*9 + 6*2 = 28 + 45 + 12 = 85
        # Linha 2 x Col 2: 4*8 + 5*1 + 6*3 = 32 + 5 + 18 = 55
        resultado = multiplicar_matrizes(self.A_2x3, self.B_3x2)
        esperado = [
            [31.0, 19.0],
            [85.0, 55.0]
        ]
        self.assertEqual(resultado, esperado)

    # --- Teste 4: Multiplicação incompatível (2x3 e 2x2) ---
    def test_06_multiplicacao_incompativel(self):
        with self.assertRaises(ValueError) as context:
            multiplicar_matrizes(self.A_2x3, self.A_2x2)
        self.assertIn("Dimensões incompatíveis", str(context.exception))

    # --- Teste 5: Matriz Quadrada, Transposta, Traço e Determinante ---
    def test_07_transposta(self):
        # Transposta de A (2x3) vira (3x2)
        resultado = transpor_matriz(self.A_2x3)
        esperado = [
            [1.0, 4.0],
            [2.0, 5.0],
            [3.0, 6.0]
        ]
        self.assertEqual(resultado, esperado)

    def test_08_traco(self):
        # Traco da matriz A_2x2: 1 + 4 = 5
        self.assertEqual(calcular_traco(self.A_2x2), 5.0)
        # Matriz não quadrada deve levantar erro
        with self.assertRaises(ValueError):
            calcular_traco(self.A_2x3)

    def test_09_determinante_2x2(self):
        # det(A_2x2) = 1*4 - 2*3 = 4 - 6 = -2
        self.assertEqual(calcular_determinante(self.A_2x2), -2.0)

    def test_10_determinante_3x3(self):
        # det(matriz_det_3x3):
        # Sarrus: 6*(-2)*7 + 1*5*2 + 1*4*8 - (1*(-2)*2 + 6*5*8 + 1*4*7)
        # = (-84 + 10 + 32) - (-4 + 240 + 28)
        # = -42 - 264 = -306
        self.assertEqual(calcular_determinante(self.matriz_det_3x3), -306.0)

    def test_11_propriedades(self):
        # Teste de Quadrada
        self.assertTrue(verificar_quadrada(self.A_2x2))
        self.assertFalse(verificar_quadrada(self.A_2x3))

        # Teste de Simétrica
        eh_sim, _ = verificar_simetrica(self.simetrica_3x3)
        self.assertTrue(eh_sim)
        nao_sim, _ = verificar_simetrica(self.A_2x2)
        self.assertFalse(nao_sim)

        # Teste de Identidade
        eh_id, _ = verificar_identidade(self.identidade_3x3)
        self.assertTrue(eh_id)
        nao_id, _ = verificar_identidade(self.A_2x2)
        self.assertFalse(nao_id)

    # --- Teste Extra: Multiplicação por escalar e Matriz Aleatória ---
    def test_12_multiplicacao_escalar(self):
        resultado = multiplicar_escalar(self.A_2x2, 2.5)
        esperado = [
            [2.5, 5.0],
            [7.5, 10.0]
        ]
        self.assertEqual(resultado, esperado)

    def test_13_geracao_aleatoria(self):
        matriz = gerar_matriz_aleatoria(4, 5, min_val=-5, max_val=5)
        linhas, colunas = obter_dimensoes(matriz)
        self.assertEqual(linhas, 4)
        self.assertEqual(colunas, 5)
        for linha in matriz:
            for val in linha:
                self.assertTrue(-5 <= val <= 5)


if __name__ == "__main__":
    unittest.main(verbosity=2)
