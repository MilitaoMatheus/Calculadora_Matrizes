"""
Módulo: core_matrizes.py
Descrição: Funções matemáticas e utilitárias para manipulação e operações com matrizes.
Disciplina: Álgebra Linear — Fatec Osasco
"""

import random
from typing import List, Tuple, Optional

# Tipo para representar matrizes 2D
Matriz = List[List[float]]


def obter_dimensoes(matriz: Matriz) -> Tuple[int, int]:
    """
    Retorna o número de linhas e colunas de uma matriz.
    Lança ValueError se a matriz for vazia ou inconsistente.
    """
    if not matriz or not isinstance(matriz, list) or len(matriz) == 0:
        raise ValueError("A matriz está vazia ou é inválida.")
    
    num_linhas = len(matriz)
    if not isinstance(matriz[0], list) or len(matriz[0]) == 0:
        raise ValueError("As linhas da matriz são inválidas.")
        
    num_colunas = len(matriz[0])
    
    # Verifica se todas as linhas possuem o mesmo número de colunas
    for i, linha in enumerate(matriz):
        if not isinstance(linha, list) or len(linha) != num_colunas:
            raise ValueError(f"Inconsistência na matriz: linha {i+1} possui tamanho diferente.")
            
    return num_linhas, num_colunas


def criar_matriz_vazia(linhas: int, colunas: int, valor_padrao: float = 0.0) -> Matriz:
    """
    Cria e retorna uma matriz preenchida com o valor padrão especificado.
    """
    if linhas <= 0 or colunas <= 0:
        raise ValueError("O número de linhas e colunas deve ser maior que zero.")
    return [[valor_padrao for _ in range(colunas)] for _ in range(linhas)]


def gerar_matriz_aleatoria(linhas: int, colunas: int, min_val: int = -10, max_val: int = 10) -> Matriz:
    """
    Gera uma matriz de dimensões (linhas x colunas) com números inteiros aleatórios
    no intervalo [min_val, max_val].
    """
    if linhas <= 0 or colunas <= 0:
        raise ValueError("Dimensões devem ser inteiros positivos.")
    if min_val > max_val:
        min_val, max_val = max_val, min_val
        
    return [[float(random.randint(min_val, max_val)) for _ in range(colunas)] for _ in range(linhas)]


def formatar_matriz(matriz: Matriz, nome: Optional[str] = None) -> str:
    """
    Retorna uma string com a matriz formatada de maneira alinhada e organizada.
    Exemplo:
      Matriz A (2x2):
      [  1.00   2.00 ]
      [  3.00   4.00 ]
    """
    if matriz is None:
        return "Matriz não cadastrada."
    
    try:
        linhas, colunas = obter_dimensoes(matriz)
    except ValueError as e:
        return f"Erro ao exibir matriz: {e}"

    # Formata números: se for inteiro, exibe sem casas decimais; senão, exibe até 2 casas
    def str_num(val: float) -> str:
        if val == int(val):
            return str(int(val))
        return f"{val:.2f}"

    grid_str = [[str_num(val) for val in linha] for linha in matriz]
    
    # Encontra a largura máxima de cada coluna para alinhar perfeitamente
    col_widths = [0] * colunas
    for col in range(colunas):
        col_widths[col] = max(len(grid_str[lin][col]) for lin in range(linhas))
        
    linhas_texto = []
    if nome:
        linhas_texto.append(f"Matriz {nome} ({linhas}x{colunas}):")
        
    for lin in range(linhas):
        elementos = [grid_str[lin][col].rjust(col_widths[col]) for col in range(colunas)]
        linhas_texto.append(f"  [ {'  '.join(elementos)} ]")
        
    return "\n".join(linhas_texto)


# ==========================================
# 4.3 Operações Obrigatórias
# ==========================================

def somar_matrizes(A: Matriz, B: Matriz) -> Matriz:
    """
    Realiza a soma A + B.
    Requisito: A e B devem ter a mesma ordem (m x n).
    """
    linhas_A, cols_A = obter_dimensoes(A)
    linhas_B, cols_B = obter_dimensoes(B)
    
    if linhas_A != linhas_B or cols_A != cols_B:
        raise ValueError(
            f"Dimensões incompatíveis para Soma: A é {linhas_A}x{cols_A} e B é {linhas_B}x{cols_B}. "
            "Ambas devem possuir as mesmas dimensões."
        )
        
    resultado = criar_matriz_vazia(linhas_A, cols_A)
    for i in range(linhas_A):
        for j in range(cols_A):
            resultado[i][j] = A[i][j] + B[i][j]
            
    return resultado


def subtrair_matrizes(A: Matriz, B: Matriz) -> Matriz:
    """
    Realiza a subtração A - B.
    Requisito: A e B devem ter a mesma ordem (m x n).
    """
    linhas_A, cols_A = obter_dimensoes(A)
    linhas_B, cols_B = obter_dimensoes(B)
    
    if linhas_A != linhas_B or cols_A != cols_B:
        raise ValueError(
            f"Dimensões incompatíveis para Subtração: A é {linhas_A}x{cols_A} e B é {linhas_B}x{cols_B}. "
            "Ambas devem possuir as mesmas dimensões."
        )
        
    resultado = criar_matriz_vazia(linhas_A, cols_A)
    for i in range(linhas_A):
        for j in range(cols_A):
            resultado[i][j] = A[i][j] - B[i][j]
            
    return resultado


def multiplicar_escalar(matriz: Matriz, escalar: float) -> Matriz:
    """
    Multiplica cada elemento da matriz pelo escalar k.
    """
    linhas, cols = obter_dimensoes(matriz)
    resultado = criar_matriz_vazia(linhas, cols)
    for i in range(linhas):
        for j in range(cols):
            resultado[i][j] = matriz[i][j] * escalar
    return resultado


def transpor_matriz(matriz: Matriz) -> Matriz:
    """
    Retorna a matriz transposta (linhas viram colunas).
    Se A é (m x n), a transposta é (n x m).
    """
    linhas, cols = obter_dimensoes(matriz)
    transposta = criar_matriz_vazia(cols, linhas)
    for i in range(linhas):
        for j in range(cols):
            transposta[j][i] = matriz[i][j]
    return transposta


def multiplicar_matrizes(A: Matriz, B: Matriz) -> Matriz:
    """
    Realiza o produto matricial A x B.
    Requisito: número de colunas de A deve ser igual ao número de linhas de B.
    Se A é (m x p) e B é (p x n), o resultado será (m x n).
    """
    linhas_A, cols_A = obter_dimensoes(A)
    linhas_B, cols_B = obter_dimensoes(B)
    
    if cols_A != linhas_B:
        raise ValueError(
            f"Dimensões incompatíveis para Multiplicação: colunas de A ({cols_A}) != linhas de B ({linhas_B}). "
            "A multiplicação só é possível quando o número de colunas da 1ª matriz for igual ao número de linhas da 2ª matriz."
        )
        
    # Inicializa matriz resultado (m x n) com zeros
    resultado = criar_matriz_vazia(linhas_A, cols_B)
    
    for i in range(linhas_A):
        for j in range(cols_B):
            soma = 0.0
            for k in range(cols_A):
                soma += A[i][k] * B[k][j]
            resultado[i][j] = soma
            
    return resultado


# ==========================================
# 5. Requisitos Opcionais (Bônus)
# ==========================================

def verificar_quadrada(matriz: Matriz) -> bool:
    """
    Verifica se a matriz é quadrada (número de linhas == número de colunas).
    """
    linhas, cols = obter_dimensoes(matriz)
    return linhas == cols


def verificar_simetrica(matriz: Matriz) -> Tuple[bool, str]:
    """
    Verifica se a matriz é simétrica (A == A^T).
    Uma matriz só pode ser simétrica se for quadrada.
    """
    if not verificar_quadrada(matriz):
        return False, "A matriz não é quadrada, logo não pode ser simétrica."
        
    linhas, cols = obter_dimensoes(matriz)
    for i in range(linhas):
        for j in range(i + 1, cols):
            if abs(matriz[i][j] - matriz[j][i]) > 1e-9:
                return False, f"Elemento [{i+1},{j+1}] ({matriz[i][j]}) difere de [{j+1},{i+1}] ({matriz[j][i]})."
                
    return True, "A matriz é simétrica (A = A^T)."


def verificar_identidade(matriz: Matriz) -> Tuple[bool, str]:
    """
    Verifica se a matriz é a Matriz Identidade:
    - É quadrada;
    - Elementos da diagonal principal são iguais a 1;
    - Todos os demais elementos são iguais a 0.
    """
    if not verificar_quadrada(matriz):
        return False, "A matriz não é quadrada, logo não pode ser identidade."
        
    linhas, cols = obter_dimensoes(matriz)
    for i in range(linhas):
        for j in range(cols):
            if i == j:
                if abs(matriz[i][j] - 1.0) > 1e-9:
                    return False, f"Elemento da diagonal principal [{i+1},{j+1}] não é 1 (valor: {matriz[i][j]})."
            else:
                if abs(matriz[i][j]) > 1e-9:
                    return False, f"Elemento fora da diagonal principal [{i+1},{j+1}] não é 0 (valor: {matriz[i][j]})."
                    
    return True, "A matriz é uma Matriz Identidade."


def calcular_traco(matriz: Matriz) -> float:
    """
    Calcula o traço da matriz (soma dos elementos da diagonal principal).
    Requisito: A matriz deve ser quadrada.
    """
    if not verificar_quadrada(matriz):
        linhas, cols = obter_dimensoes(matriz)
        raise ValueError(f"O traço só pode ser calculado para matrizes quadradas. Matriz informada é {linhas}x{cols}.")
        
    linhas, _ = obter_dimensoes(matriz)
    traco = sum(matriz[i][i] for i in range(linhas))
    return traco


def _submatriz(matriz: Matriz, linha_remover: int, col_remover: int) -> Matriz:
    """
    Função auxiliar que remove a linha e a coluna especificadas,
    retornando o menor complementar para cálculo de determinante por Laplace.
    """
    return [
        [matriz[i][j] for j in range(len(matriz[i])) if j != col_remover]
        for i in range(len(matriz)) if i != linha_remover
    ]


def calcular_determinante(matriz: Matriz) -> float:
    """
    Calcula o determinante de uma matriz quadrada de qualquer ordem n x n
    usando a expansão por cofatores (Teorema de Laplace).
    """
    if not verificar_quadrada(matriz):
        linhas, cols = obter_dimensoes(matriz)
        raise ValueError(f"Determinante só existe para matrizes quadradas. Matriz informada é {linhas}x{cols}.")
        
    n, _ = obter_dimensoes(matriz)
    
    # Ordem 1x1: det = único elemento
    if n == 1:
        return float(matriz[0][0])
        
    # Ordem 2x2: det = ad - bc
    if n == 2:
        return float(matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0])
        
    # Ordem 3x3: Regra de Sarrus direta para maior velocidade e precisão
    if n == 3:
        a, b, c = matriz[0]
        d, e, f = matriz[1]
        g, h, i = matriz[2]
        return float(
            (a * e * i + b * f * g + c * d * h) -
            (c * e * g + a * f * h + b * d * i)
        )
        
    # Ordem n x n: Expansão por cofatores na 1ª linha (Laplace)
    det = 0.0
    for j in range(n):
        cofator = ((-1) ** j) * matriz[0][j] * calcular_determinante(_submatriz(matriz, 0, j))
        det += cofator
        
    return det
