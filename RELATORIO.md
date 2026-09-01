# Relatório Técnico — Calculadora de Matrizes

**Instituição:** Faculdade de Tecnologia de Osasco — Prefeito Hirant Sanazar (Fatec Osasco)  
**Curso:** Tecnologia em Desenvolvimento de Software Multiplataforma (DSM)  
**Disciplina:** Álgebra Linear  
**Docente:** Prof. Dr. Eduardo  
**Atividade:** 1º Exercício Programa  

---

## 1. Introdução e Objetivo

O presente trabalho teve como meta o desenvolvimento de uma aplicação em console interativa para realização de operações fundamentais e avançadas de Álgebra Linear sobre matrizes. O sistema foi construído a fim de exercitar estruturas de repetição, manipulação de arrays multidimensionais (vetores e matrizes nativos), decomposição modular em funções e rigoroso tratamento de exceções para impedir encerramentos inesperados (*crashes*).

Para demonstrar a portabilidade do raciocínio algorítmico, o projeto foi integralmente construído em duas linguagens com paradigmas complementares: **Python** e **JavaScript (Node.js & Web)**, contemplando 100% dos requisitos obrigatórios e todos os requisitos opcionais propostos.

---

## 2. Decisões de Projeto e Arquitetura

### 2.1 Separação de Camadas (Modularização)
Optou-se por separar rigidamente a **lógica de negócios matemática** da **interface de interação com o usuário**:
- **Núcleo Matemático (`core_matrizes`):** Reúne funções puras responsáveis pelas operações (soma, subtração, transposição, produtos, determinantes e análises). Essas funções recebem arrays nativos e devolvem novas matrizes ou valores escalares, validando pré-condições matemáticas e lançando exceções claras caso ocorram inconsistências dimensionais.
- **Interface de Console (`calculadora`):** Controla o menu interativo, leitura guiada de dados, tratamento de entradas não numéricas e apresentação formatada dos resultados.
- **Interface Visual (`index.html`):** Para o ecossistema JavaScript, além da interface de linha de comando com a biblioteca nativa `readline`, implementou-se uma página web responsiva que reutiliza o mesmo `core_matrizes.js`, possibilitando a visualização gráfica e testes imediatos em qualquer navegador sem necessidade de dependências instaladas.

### 2.2 Estruturas de Dados Nativas
Em conformidade estrita com o enunciado, **não foram utilizadas bibliotecas matemáticas externas** (como NumPy, SciPy ou Math.js).
- Em **Python**, as matrizes são modeladas como listas aninhadas: `List[List[float]]`.
- Em **JavaScript**, utilizou-se arrays de arrays: `Array<Array<number>>`.

### 2.3 Formatação e Alinhamento Visual
Para a exibição das matrizes no console, implementou-se um algoritmo que calcula a largura máxima dos caracteres de cada coluna, inserindo espaçamentos padronizados (`rjust`/`padStart`) e colchetes externos, garantindo uma leitura clara mesmo com números de diferentes magnitudes ou sinais negativos.

---

## 3. Itens Opcionais Implementados (Bônus)

Foram implementados com êxito todos os tópicos de pontuação extra descritos na Seção 5 da especificação:

1. **Verificação de Propriedades Matriciais:**
   - **Matriz Quadrada:** Checagem de igualdade entre o número de linhas e colunas (m = n).
   - **Matriz Simétrica:** Validação se a matriz é quadrada e se cada elemento `a[i][j] == a[j][i]` para todo i ≠ j (equivalente a A = A^T).
   - **Matriz Identidade:** Verificação se a matriz é quadrada, se todos os elementos da diagonal principal (i = j) são iguais a 1 e se todos os demais elementos (i ≠ j) são nulos (0).
2. **Cálculo do Traço - tr(A):**
   - Soma de todos os elementos da diagonal principal para matrizes quadradas. O algoritmo valida se a matriz é estritamente quadrada antes do cálculo.
3. **Cálculo de Determinante - det(A):**
   - Para matrizes 1x1: valor do próprio elemento.
   - Para matrizes 2x2: fórmula do produto da diagonal principal menos a secundária (ad - bc).
   - Para matrizes 3x3: aplicação direta da Regra de Sarrus, otimizando o número de operações.
   - Para ordens superiores n x n: algoritmo recursivo baseado no **Teorema de Laplace** (expansão por cofatores ao longo da primeira linha).
4. **Desenvolvimento Bilíngue (Multiplataforma):**
   - Implementação idêntica da suíte em **Python** e **JavaScript**, provando a equivalência de lógica entre diferentes ambientes de tempo de execução.

---

## 4. Dificuldades Encontradas e Soluções Adotadas

1. **Tratamento de Entradas Inválidas e Prevenção de Travamentos (*Crash*):**
   - *Problema:* O usuário pode digitar caracteres literais (letras, espaços, símbolos) em campos onde se esperam números inteiros ou reais, ou tentar realizar operações com matrizes ainda não cadastradas.
   - *Solução:* Criaram-se funções utilitárias com laços de repetição `while` e blocos `try/except` (Python) / `isNaN` e `try/catch` (JavaScript) que validam a entrada antes do processamento e notificam o usuário sem abortar o programa.
2. **Validação Dimensional de Operações Matriciais:**
   - *Problema:* Operações de soma/subtração exigem matrizes de mesma dimensão (m x n), enquanto a multiplicação requer que o número de colunas da primeira matriz seja idêntico ao número de linhas da segunda (colunas de A == linhas de B).
   - *Solução:* Cada função do módulo matemático verifica as dimensões antes de alocar a matriz resultante. Caso incompatível, uma exceção explicativa com as ordens encontradas é disparada e capturada pela camada visual, que exibe um alerta claro ao usuário.
3. **Precisão de Ponto Flutuante em Comparações:**
   - *Problema:* Em operações com números de ponto flutuante, dízimas e imprecisões binárias podem fazer com que valores teoricamente idênticos difiram por frações mínimas (ex.: 1.0000000000000002 ≠ 1.0).
   - *Solução:* Nas funções de verificação de simetria e matriz identidade, adotou-se uma tolerância de margem de erro (epsilon = 10^-9), comparando `abs(val1 - val2) > 1e-9`.

---

## 5. Resultados dos Casos de Teste

A aplicação foi validada contra todos os cenários de teste da Seção 9 da especificação:

- **Cenário 1 (Soma e Subtração 2x2):**
  - Matriz A = `[[1, 2], [3, 4]]`
  - Matriz B = `[[5, 6], [7, 8]]`
  - Resultado Soma: `[[6, 8], [10, 12]]`
  - Resultado Subtração: `[[-4, -4], [-4, -4]]` (Sucesso).
- **Cenário 2 (Soma Incompatível 2x3 com 3x2):**
  - O sistema capturou o descompasso dimensional (2x3 ≠ 3x2) e informou a incompatibilidade sem interromper a execução (Sucesso).
- **Cenário 3 (Multiplicação 2x3 por 3x2):**
  - Matriz A (2x3) × Matriz B (3x2) resultou na matriz C (2x2) = `[[31, 19], [85, 55]]`, confirmando a corretude do produto escalar entre linhas e colunas (Sucesso).
- **Cenário 4 (Multiplicação Incompatível 2x3 por 2x2):**
  - O sistema barrou a operação informando que colunas de A (3) ≠ linhas de B (2) (Sucesso).
- **Cenário 5 (Matriz Quadrada 3x3):**
  - Testada com M = `[[6, 1, 1], [4, -2, 5], [2, 8, 7]]`, obtendo tr(M) = 11, det(M) = -306 e transposta de ordem 3x3 correta (Sucesso).

Todas as 13 asserções automatizadas da suíte de testes unitários foram executadas com **100% de aprovação**.

---

## 6. Conclusão

A atividade permitiu consolidar a aplicação prática dos teoremas de Álgebra Linear por meio de algoritmos computacionais puros. A modularização adotada tornou o código legível, de fácil manutenção e amplamente testável. A entrega simultânea em Python e JavaScript demonstra a versatilidade do projeto para diferentes ambientes de execução.
