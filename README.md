# 🚀 QA Automation Exercise - Web Tests

Projeto de automação de testes E2E para o site [AutomationExercise](http://automationexercise.com) utilizando WebdriverIO.

## 📋 Sobre o Projeto

Este projeto implementa testes automatizados end-to-end seguindo as melhores práticas de automação de testes:
- ✅ Pattern Page Object Model (POM)
- ✅ Padrão Triple A (Arrange, Act, Assert)
- ✅ Execução em modo headless
- ✅ Relatórios Allure
- ✅ CI/CD com GitHub Actions
- ✅ Código modular e reutilizável

## 🎯 Casos de Teste Implementados

### Test Case 1: Registrar Usuário
- Registro completo de novo usuário
- Preenchimento de formulário com dados pessoais e endereço
- Validação de criação e exclusão de conta

### Test Case 9: Buscar Produto
- Navegação para página de produtos
- Busca por termo específico
- Validação de produtos relacionados à busca

### Test Case 12: Adicionar Produtos ao Carrinho
- Adição de múltiplos produtos ao carrinho
- Validação de preços, quantidades e totais
- Verificação de integridade dos dados

### Test Case 13: Verificar Quantidade de Produto no Carrinho
- Alteração de quantidade antes de adicionar ao carrinho
- Validação da quantidade exata no carrinho

### Test Case 17: Remover Produtos do Carrinho
- Adição de produtos ao carrinho
- Remoção de produtos específicos
- Validação da remoção correta

## 🛠️ Tecnologias Utilizadas

- **WebdriverIO** v8 - Framework de automação
- **Mocha** - Framework de testes
- **Allure Reports** - Relatórios detalhados
- **Chrome Headless** - Navegador para execução
- **GitHub Actions** - CI/CD

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** v18 ou superior ([Download](https://nodejs.org/))
- **NPM** v9 ou superior (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))

Verificar instalação:
```bash
node --version
npm --version
git --version
```

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/qa.automationexercise-web.webdriverio.git
cd qa.automationexercise-web.webdriverio
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Verifique a instalação:**
```bash
npm run test -- --help
```

## ▶️ Execução dos Testes

### Executar todos os testes
```bash
npm test
```

### Executar suite específica
```bash
# Suite de usuário
npm run test:user

# Suite de produtos
npm run test:product

# Suite de carrinho
npm run test:cart
```

### Executar em modo headless (padrão)
```bash
npm run test:headless
```

## 📊 Relatórios

### Gerar e visualizar relatório Allure

```bash
# Gerar relatório
npm run allure:generate

# Abrir relatório no navegador
npm run allure:open

# Gerar e abrir em um comando
npm run allure:report
```

O relatório Allure fornece:
- ✅ Status detalhado de cada teste
- 📸 Screenshots de falhas
- ⏱️ Tempo de execução
- 📈 Estatísticas e tendências
- 📝 Logs detalhados

## 📁 Estrutura do Projeto

```
qa.automationexercise-web.webdriverio/
├── .github/
│   └── workflows/
│       └── web-tests.yml          # Pipeline GitHub Actions
├── test/
│   ├── pages/                     # Page Objects
│   │   ├── base.page.js          # Page Object base
│   │   ├── home.page.js          # Página inicial
│   │   ├── signup.page.js        # Página de cadastro
│   │   ├── products.page.js      # Página de produtos
│   │   └── cart.page.js          # Página do carrinho
│   ├── specs/                     # Test Specs
│   │   ├── user.spec.js          # Testes de usuário
│   │   ├── product.spec.js       # Testes de produto
│   │   └── cart.spec.js          # Testes de carrinho
│   └── data/
│       └── user.data.js          # Dados de teste
├── wdio.conf.js                   # Configuração WebdriverIO
├── package.json                   # Dependências e scripts
├── .gitignore                     # Arquivos ignorados
└── README.md                      # Documentação
```

## 🏗️ Arquitetura e Padrões

### Page Object Model (POM)
Cada página da aplicação possui sua própria classe com:
- Seletores de elementos
- Métodos de interação
- Lógica de negócio encapsulada

### Triple A Pattern (Arrange, Act, Assert)
Todos os testes seguem a estrutura:
```javascript
it('Should do something', async () => {
    // Arrange - Preparação
    const data = generateUser();
    
    // Act - Ação
    await HomePage.open();
    await HomePage.clickButton();
    
    // Assert - Verificação
    await expect(result).toBe(expected);
});
```

### Reutilização de Código
- Base Page com métodos comuns
- Data factories para geração de dados
- Helpers e utilitários compartilhados

## 🔄 CI/CD - GitHub Actions

O projeto está configurado com pipeline automático que:
- ✅ Executa em cada push/PR
- 🔄 Instala dependências
- 🧪 Roda todos os testes
- 📊 Gera relatórios Allure
- 📦 Arquiva resultados e screenshots

### Visualizar resultados no GitHub
1. Acesse a aba **Actions** no repositório
2. Selecione a execução desejada
3. Baixe os artifacts:
   - `allure-results` - Dados brutos
   - `allure-report` - Relatório HTML
   - `screenshots` - Screenshots de falhas

## 🐛 Troubleshooting

### Erro: ChromeDriver não encontrado
```bash
npm install chromedriver --save-dev
```

### Erro: Timeout em elementos
- Aumente o timeout em `wdio.conf.js`
- Verifique seletores nos Page Objects
- Verifique conectividade de rede

### Testes falhando em headless
```bash
# Remova --headless temporariamente em wdio.conf.js
# para debugar visualmente
```

## 📝 Boas Práticas Implementadas

✅ **Código Limpo**: Funções pequenas e com responsabilidade única  
✅ **Nomenclatura Clara**: Nomes descritivos e auto-explicativos  
✅ **Sem Duplicação**: Reutilização máxima de código  
✅ **Waits Explícitos**: Sincronização adequada  
✅ **Dados Dinâmicos**: Geração de dados aleatórios  
✅ **Independência**: Testes não dependem uns dos outros  
✅ **Performance**: Execução paralela quando possível  

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença ISC.

## 👤 Autor

Desenvolvido por Lincon Vinicius como parte do desafio técnico de QA Automation.
