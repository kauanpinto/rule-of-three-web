# Rule of Three - Web

**⚠ PROJETO EM DESENVOLVIMENTO!**

Interface web para planejamento financeiro baseada na regra 50/30/20.

## Descrição

A aplicação organiza os gastos do usuário de acordo com sua renda, distribuindo-os entre:

- 50% — Essenciais: despesas necessárias, como moradia, alimentação e transporte.
- 30% — Lazer: gastos pessoais e de entretenimento.
- 20% — Investimentos: reserva financeira e investimentos.

## Projetos relacionados

- [Rule of Three - API](https://github.com/kauanpinto/rule-of-three-api) — backend REST que alimenta esta aplicação

## Índice

1. [Tecnologias](#tecnologias)
2. [Requisitos](#requisitos)
3. [Como executar](#como-executar)
4. [Variáveis de ambiente](#variaveis-de-ambiente)
5. [Scripts](#scripts)
6. [Testes](#testes)
7. [Autor](#autor)

## Tecnologias

- [React](https://react.dev/) ^19.2.8
- [Vite](https://vite.dev/) ^8.3.0
- [TypeScript](https://www.typescriptlang.org/) ~6.0.2
- [Tailwind CSS](https://tailwindcss.com/) ^4.3.3
- [Sonner](https://sonner.emilkowal.ski/) ^2.0.8
- [Vitest](https://vitest.dev/) ^5.0.3
- [Testing Library](https://testing-library.com/react) ^16.3.3

## Requisitos

- [Node.js](https://nodejs.org/) 22.x
- A [API](https://github.com/kauanpinto/rule-of-three-api) rodando localmente ou em produção

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/kauanpinto/rule-of-three-web.git
cd rule-of-three-web
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

<a id="variaveis-de-ambiente"></a>

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL do seu backend |

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run format` | Formata o código |
| `npm run format:check` | Verifica se o código está formatado |
| `npm run lint` | Verifica problemas no código |
| `npm run test` | Executa os testes |

## Testes

O projeto usa [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/react) para os testes.

1. execute os testes:

```bash
npm run test
```

## Autor

**Kauan Fernando**
