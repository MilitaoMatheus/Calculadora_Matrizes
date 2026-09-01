"""
Programa: calculadora.py
Descrição: Interface de console interativa para a Calculadora de Matrizes.
Disciplina: Álgebra Linear — Fatec Osasco
Curso: Desenvolvimento de Software Multiplataforma
"""

import sys
from typing import Optional
from core_matrizes import (
    Matriz,
    obter_dimensoes,
    criar_matriz_vazia,
    gerar_matriz_aleatoria,
    formatar_matriz,
    somar_matrizes,
    subtrair_matrizes,
    multiplicar_escalar,
    transpor_matriz,
    multiplicar_matrizes,
    verificar_quadrada,
    verificar_simetrica,
    verificar_identidade,
    calcular_traco,
    calcular_determinante
)


def ler_inteiro_positivo(mensagem: str) -> int:
    """Lê um número inteiro estritamente positivo (> 0) com validação de entrada."""
    while True:
        try:
            entrada = input(mensagem).strip()
            valor = int(entrada)
            if valor > 0:
                return valor
            print(">> Erro: O valor deve ser um número inteiro maior que zero.")
        except ValueError:
            print(">> Erro: Entrada inválida. Por favor, digite um número inteiro válido.")


def ler_float(mensagem: str) -> float:
    """Lê um número decimal (float) com validação de entrada, aceitando ponto ou vírgula."""
    while True:
        try:
            entrada = input(mensagem).strip().replace(',', '.')
            return float(entrada)
        except ValueError:
            print(">> Erro: Entrada inválida. Por favor, digite um número real válido.")


def cadastrar_matriz_fluxo(nome: str) -> Matriz:
    """
    Fluxo guiado para cadastro de uma matriz (A ou B).
    Permite escolha entre entrada manual elemento a elemento ou geração aleatória.
    """
    print(f"\n--- Cadastro da Matriz {nome} ---")
    linhas = ler_inteiro_positivo(f"Informe o número de linhas de {nome}: ")
    colunas = ler_inteiro_positivo(f"Informe o número de colunas de {nome}: ")

    print("\nEscolha o método de preenchimento:")
    print("  1 - Manual (digitar elemento por elemento)")
    print("  2 - Automático (valores inteiros aleatórios)")

    while True:
        opcao = input("Opção desejada [1 ou 2]: ").strip()
        if opcao == "1":
            matriz = criar_matriz_vazia(linhas, colunas)
            print(f"\nDigite os elementos da matriz {nome} ({linhas}x{colunas}):")
            for i in range(linhas):
                for j in range(colunas):
                    matriz[i][j] = ler_float(f"  Elemento [{i + 1}, {j + 1}]: ")
            print(f"\nMatriz {nome} cadastrada com sucesso!")
            print(formatar_matriz(matriz, nome))
            return matriz
        elif opcao == "2":
            min_val = int(ler_float("Valor mínimo para os números aleatórios [padrão -10]: ") or -10)
            max_val = int(ler_float("Valor máximo para os números aleatórios [padrão 10]: ") or 10)
            matriz = gerar_matriz_aleatoria(linhas, colunas, min_val, max_val)
            print(f"\nMatriz {nome} gerada aleatoriamente com sucesso!")
            print(formatar_matriz(matriz, nome))
            return matriz
        else:
            print(">> Opção inválida! Escolha 1 para Manual ou 2 para Automático.")


def selecionar_matriz(matriz_a: Optional[Matriz], matriz_b: Optional[Matriz]) -> Optional[tuple[Matriz, str]]:
    """Permite ao usuário escolher entre Matriz A ou Matriz B para operações unárias."""
    print("\nQual matriz deseja utilizar?")
    print("  A - Matriz A")
    print("  B - Matriz B")
    escolha = input("Escolha [A/B]: ").strip().upper()
    if escolha == "A":
        if matriz_a is None:
            print(">> Atenção: A Matriz A ainda não foi cadastrada.")
            return None
        return matriz_a, "A"
    elif escolha == "B":
        if matriz_b is None:
            print(">> Atenção: A Matriz B ainda não foi cadastrada.")
            return None
        return matriz_b, "B"
    else:
        print(">> Opção inválida! Escolha 'A' ou 'B'.")
        return None


def menu_principal():
    """Loop principal de execução da calculadora de matrizes."""
    matriz_a: Optional[Matriz] = None
    matriz_b: Optional[Matriz] = None

    while True:
        print("\n" + "=" * 45)
        print("         CALCULADORA DE MATRIZES")
        print("=" * 45)
        print(" 1  - Cadastrar Matriz A")
        print(" 2  - Cadastrar Matriz B")
        print(" 3  - Exibir Matriz A")
        print(" 4  - Exibir Matriz B")
        print(" 5  - Somar (A + B)")
        print(" 6  - Subtrair (A - B)")
        print(" 7  - Multiplicar (A x B)")
        print(" 8  - Multiplicar Matriz por Escalar")
        print(" 9  - Transpor Matriz")
        print("--- [Opcionais / Bônus] ---")
        print(" 10 - Verificar Propriedades (Quadrada, Simétrica, Identidade)")
        print(" 11 - Calcular Traço da Matriz")
        print(" 12 - Calcular Determinante")
        print(" 0  - Sair")
        print("=" * 45)

        opcao = input("Digite a opção desejada: ").strip()

        if opcao == "1":
            matriz_a = cadastrar_matriz_fluxo("A")

        elif opcao == "2":
            matriz_b = cadastrar_matriz_fluxo("B")

        elif opcao == "3":
            if matriz_a is None:
                print(">> Matriz A não cadastrada. Utilize a opção 1 primeiro.")
            else:
                print("\n" + formatar_matriz(matriz_a, "A"))

        elif opcao == "4":
            if matriz_b is None:
                print(">> Matriz B não cadastrada. Utilize a opção 2 primeiro.")
            else:
                print("\n" + formatar_matriz(matriz_b, "B"))

        elif opcao == "5":
            if matriz_a is None or matriz_b is None:
                print(">> Erro: Ambas as matrizes (A e B) devem estar cadastradas para realizar a soma.")
            else:
                try:
                    resultado = somar_matrizes(matriz_a, matriz_b)
                    print("\n--- Resultado da Soma (A + B) ---")
                    print(formatar_matriz(resultado, "A + B"))
                except ValueError as err:
                    print(f"\n>> Erro de Operação: {err}")

        elif opcao == "6":
            if matriz_a is None or matriz_b is None:
                print(">> Erro: Ambas as matrizes (A e B) devem estar cadastradas para realizar a subtração.")
            else:
                try:
                    resultado = subtrair_matrizes(matriz_a, matriz_b)
                    print("\n--- Resultado da Subtração (A - B) ---")
                    print(formatar_matriz(resultado, "A - B"))
                except ValueError as err:
                    print(f"\n>> Erro de Operação: {err}")

        elif opcao == "7":
            if matriz_a is None or matriz_b is None:
                print(">> Erro: Ambas as matrizes (A e B) devem estar cadastradas para realizar a multiplicação.")
            else:
                try:
                    resultado = multiplicar_matrizes(matriz_a, matriz_b)
                    print("\n--- Resultado do Produto (A x B) ---")
                    print(formatar_matriz(resultado, "A x B"))
                except ValueError as err:
                    print(f"\n>> Erro de Operação: {err}")

        elif opcao == "8":
            selecao = selecionar_matriz(matriz_a, matriz_b)
            if selecao:
                matriz, nome = selecao
                k = ler_float(f"Informe o escalar (número real) para multiplicar a Matriz {nome}: ")
                resultado = multiplicar_escalar(matriz, k)
                print(f"\n--- Resultado da Multiplicação ({k} * {nome}) ---")
                print(formatar_matriz(resultado, f"{k} * {nome}"))

        elif opcao == "9":
            selecao = selecionar_matriz(matriz_a, matriz_b)
            if selecao:
                matriz, nome = selecao
                resultado = transpor_matriz(matriz)
                print(f"\n--- Matriz Transposta de {nome} ({nome}^T) ---")
                print(formatar_matriz(resultado, f"{nome}^T"))

        elif opcao == "10":
            selecao = selecionar_matriz(matriz_a, matriz_b)
            if selecao:
                matriz, nome = selecao
                linhas, colunas = obter_dimensoes(matriz)
                print(f"\n--- Análise de Propriedades da Matriz {nome} ({linhas}x{colunas}) ---")
                
                # Quadrada
                eh_quadrada = verificar_quadrada(matriz)
                print(f"1. Matriz Quadrada: {'SIM' if eh_quadrada else 'NÃO'}")
                
                # Simétrica
                eh_simetrica, msg_sim = verificar_simetrica(matriz)
                print(f"2. Matriz Simétrica: {'SIM' if eh_simetrica else 'NÃO'} ({msg_sim})")
                
                # Identidade
                eh_identidade, msg_id = verificar_identidade(matriz)
                print(f"3. Matriz Identidade: {'SIM' if eh_identidade else 'NÃO'} ({msg_id})")

        elif opcao == "11":
            selecao = selecionar_matriz(matriz_a, matriz_b)
            if selecao:
                matriz, nome = selecao
                try:
                    traco = calcular_traco(matriz)
                    print(f"\n--- Traço da Matriz {nome} ---")
                    print(f"Tr({nome}) = {traco if traco != int(traco) else int(traco)}")
                except ValueError as err:
                    print(f"\n>> Erro: {err}")

        elif opcao == "12":
            selecao = selecionar_matriz(matriz_a, matriz_b)
            if selecao:
                matriz, nome = selecao
                try:
                    det = calcular_determinante(matriz)
                    print(f"\n--- Determinante da Matriz {nome} ---")
                    print(f"det({nome}) = {det if det != int(det) else int(det)}")
                except ValueError as err:
                    print(f"\n>> Erro: {err}")

        elif opcao == "0":
            print("\nEncerrando a Calculadora de Matrizes. Até logo!")
            sys.exit(0)

        else:
            print(">> Opção inválida! Por favor, digite um número correspondente ao menu.")


if __name__ == "__main__":
    try:
        menu_principal()
    except KeyboardInterrupt:
        print("\n\nExecução interrompida pelo usuário. Saindo...")
        sys.exit(0)
