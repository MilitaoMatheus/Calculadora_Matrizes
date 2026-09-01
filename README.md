# Calculadora de Matrizes — Álgebra Linear

**Fatec Osasco — Prefeito Hirant Sanazar**  
**Curso:** 2 Semestre de Tecnologia em Desenvolvimento de Software Multiplataforma (DSM)  
**Disciplina:** Álgebra Linear  
**Professor:** Prof. Dr. Eduardo 

**Integrantes:**
- Fabio Aparecido de Sousa
- Felipe da Silva Rodrigues
- Matheus Militão da Silva
  
**Atividade:** 1º Exercício Programa  

---

## 1. Visão Geral do Projeto

Este projeto consiste em uma **Calculadora de Matrizes** completa, modular e interativa, desenvolvida em duas linguagens de programação: **Python** e **JavaScript (Node.js & Web)**. O programa foi projetado para consolidar os conceitos de matrizes, operações matriciais, tratamento de exceções e portabilidade de software.

Todas as operações foram desenvolvidas **sem uso de bibliotecas de terceiros** (como NumPy ou Math.js), implementando manualmente os algoritmos fundamentais de Álgebra Linear sobre arrays multidimensionais nativos.

---

## 2. Estrutura de Diretórios

```text
Calculadora_Matrizes/
│
├── python/
│   ├── core_matrizes.py       # Funções matemáticas puras e validações em Python
│   ├── calculadora.py         # Interface interativa CLI de console em Python
│   └── test_calculadora.py    # Suíte de testes unitários automatizados
│
├── javascript/
│   ├── core_matrizes.js       # Funções matemáticas puras e validações em JavaScript
│   ├── calculadora.js         # Interface interativa CLI de console em Node.js (readline)
│   ├── test_calculadora.js    # Suíte de testes unitários automatizados
│   └── index.html             # Interface Web visual interativa para navegadores
│
├── README.md                  # Manual de instruções e execução do projeto
├── RELATORIO.md               # Relatório acadêmico detalhado (1-2 páginas)
└── trabalho_calculadora_de_matrizes.md # Enunciado oficial da atividade
```

---

## 3. Funcionalidades Implementadas

### 3.1 Requisitos Obrigatórios
1. **Cadastro de Matrizes (A e B):**
   - Definição dinâmica de linhas e colunas (m x n).
   - **Modo Manual:** Entrada interativa elemento por elemento com validação de tipos.
   - **Modo Automático:** Preenchimento com números inteiros aleatórios dentro de faixa configurável.
2. **Exibição Formatada:**
   - Impressão tabular perfeitamente alinhada por colunas no console.
3. **Operações Matemáticas:**
   - **Soma (A + B):** com validação de dimensões idênticas.
   - **Subtração (A - B):** com validação de dimensões idênticas.
   - **Multiplicação por Escalar (k * A):** multiplicação de cada elemento por um número real k.
   - **Transposição (A^T):** transformação de linhas em colunas (m x n para n x m).
   - **Multiplicação de Matrizes (A x B):** produto linha por coluna com validação (colunas de A == linhas de B).
4. **Tratamento Robusto de Erros:**
   - Tratamento de dimensões incompatíveis com mensagens claras e sem interrupção do programa (sem crash).
   - Validação de entradas não numéricas (texto, caracteres especiais, valores vazios).

### 3.2 Requisitos Opcionais (Pontuação Extra / Bônus)
- **Classificação de Propriedades:**
  - Verificação se a matriz é **Quadrada** (m = n).
  - Verificação se a matriz é **Simétrica** (A == A^T).
  - Verificação se a matriz é **Identidade** (diagonal principal igual a 1 e demais elementos iguais a 0).
- **Cálculo do Traço - tr(A):**
  - Soma dos elementos da diagonal principal para matrizes quadradas.
- **Cálculo do Determinante - det(A):**
  - Matrizes 1x1, 2x2, 3x3 (Regra de Sarrus) e generalizado para ordens superiores n x n via **Teorema de Laplace** (expansão por cofatores).
- **Portabilidade Multiplataforma:**
  - Implementação completa e espelhada em **Python** e **JavaScript**, acompanhada de interface Web interativa em `index.html`.

---

## 4. Instruções de Execução

### 4.1 Versão Python

#### Pré-requisitos:
- Python 3.8 ou superior instalado.

#### Executando a Calculadora Interativa (Console):
Abra o terminal na pasta raiz do projeto e execute:
```bash
python python/calculadora.py
```

#### Executando os Testes Unitários:
```bash
python python/test_calculadora.py
```

---

### 4.2 Versão JavaScript

#### Opção A: Execução no Terminal via Node.js
Se possuir o [Node.js](https://nodejs.org/) instalado:
```bash
# Executar a Calculadora Interativa
node javascript/calculadora.js

# Executar a Bateria de Testes Automatizados
node javascript/test_calculadora.js
```

#### Opção B: Execução Visual no Navegador (Sem necessidade de Node.js)
Abra o arquivo `javascript/index.html` em qualquer navegador (Google Chrome, Microsoft Edge, Firefox).  
A interface web permite editar as matrizes em grade visual, testar todas as operações em tempo real e disparar a bateria de testes integrada.

---

## 5. Bateria de Testes Oficiais

Os seguintes cenários do enunciado oficial são validados automaticamente na suíte de testes:

| Teste | Descrição | Entrada A | Entrada B | Resultado Esperado |
|---|---|---|---|---|
| **Teste 1** | Soma e Subtração compatíveis | `[[1, 2], [3, 4]]` (2x2) | `[[5, 6], [7, 8]]` (2x2) | **Soma:** `[[6, 8], [10, 12]]`<br>**Subtração:** `[[-4, -4], [-4, -4]]` |
| **Teste 2** | Soma/Subtração incompatíveis | Matriz 2x3 | Matriz 3x2 | Bloqueio com mensagem de erro clara |
| **Teste 3** | Multiplicação compatível | `[[1, 2, 3], [4, 5, 6]]` (2x3) | `[[7, 8], [9, 1], [2, 3]]` (3x2) | `[[31, 19], [85, 55]]` (2x2) |
| **Teste 4** | Multiplicação incompatível | Matriz 2x3 | Matriz 2x2 | Bloqueio com mensagem de erro (`colunas A != linhas B`) |
| **Teste 5** | Matriz Quadrada & Opcionais | `[[6, 1, 1], [4, -2, 5], [2, 8, 7]]` (3x3) | — | **Traço:** `11`<br>**Determinante:** `-306`<br>**Transposta:** 3x3 |

---

### 5.1 Detalhamento Visual dos Casos de Teste

#### Teste 1 — Soma e Subtração (2x2)
- **Matriz A:**
  ```text
  [ 1  2 ]
  [ 3  4 ]
  ```
- **Matriz B:**
  ```text
  [ 5  6 ]
  [ 7  8 ]
  ```
- **Resultado Soma (A + B):**
  ```text
  [  6   8 ]
  [ 10  12 ]
  ```
- **Resultado Subtração (A - B):**
  ```text
  [ -4  -4 ]
  [ -4  -4 ]
  ```

#### Teste 2 — Soma e Subtração Incompatíveis
- **Matriz A:** ordem 2x3  
- **Matriz B:** ordem 3x2  
- **Comportamento:** O sistema identifica dimensões incompatíveis (2x3 ≠ 3x2), impede a operação e exibe mensagem amigável sem crash.

#### Teste 3 — Multiplicação Compatível (2x3 x 3x2 = 2x2)
- **Matriz A (2x3):**
  ```text
  [ 1  2  3 ]
  [ 4  5  6 ]
  ```
- **Matriz B (3x2):**
  ```text
  [ 7  8 ]
  [ 9  1 ]
  [ 2  3 ]
  ```
- **Resultado do Produto (A x B) (2x2):**
  ```text
  [ 31  19 ]
  [ 85  55 ]
  ```

#### Teste 4 — Multiplicação Incompatível
- **Matriz A:** 2x3 (3 colunas)  
- **Matriz B:** 2x2 (2 linhas)  
- **Comportamento:** Como o número de colunas de A (3) é diferente do número de linhas de B (2), a operação é bloqueada com aviso claro ao usuário.

#### Teste 5 — Matriz Quadrada, Transposta, Traço e Determinante (3x3)
- **Matriz M (3x3):**
  ```text
  [ 6   1  1 ]
  [ 4  -2  5 ]
  [ 2   8  7 ]
  ```
- **Matriz Transposta (M^T):**
  ```text
  [ 6   4  2 ]
  [ 1  -2  8 ]
  [ 1   5  7 ]
  ```
- **Traço:** `6 + (-2) + 7 = 11`
- **Determinante:** `-306` (calculado via Regra de Sarrus e conferido por Teorema de Laplace)
- **Propriedades:** Quadrada: **SIM** | Simétrica: **NÃO** | Identidade: **NÃO**
