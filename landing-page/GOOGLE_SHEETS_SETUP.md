# Configuração do Google Sheets para Receber Dados do Formulário

Siga estes passos para configurar o Google Sheets para receber automaticamente os dados do formulário:

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada **"Pesquisa Mestrado - Respostas"**
3. Na primeira linha (cabeçalhos), adicione estas colunas:

```
A1: Data/Hora
B1: Nome da Empresa
C1: Nome do Responsável
D1: Cargo
E1: Email
F1: Telefone
G1: Número de Funcionários
H1: Setor
I1: Tempo de Atuação
J1: Canais Digitais
K1: Usa IA
L1: Melhor Forma de Contato
M1: Observações
```

## Passo 2: Criar o Google Apps Script

1. Na planilha, vá em **Extensões** → **Apps Script**
2. Delete o código existente
3. Cole o código abaixo:

```javascript
function doPost(e) {
  try {
    // Pega a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);

    // Prepara a linha com os dados
    var row = [
      new Date(), // Data/Hora
      data.nomeEmpresa || "",
      data.nomeResponsavel || "",
      data.cargo || "",
      data.email || "",
      data.telefone || "",
      data.numeroFuncionarios || "",
      data.setor || "",
      data.tempoAtuacao || "",
      Array.isArray(data.canaisDigitais) ? data.canaisDigitais.join(", ") : "",
      data.usaIA || "",
      data.melhorContato || "",
      data.observacoes || "",
    ];

    // Adiciona a linha na planilha
    sheet.appendRow(row);

    // Retorna sucesso
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Retorna erro
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Clique em **Salvar** (ícone de disquete)
5. Dê um nome ao projeto: "API Formulário Pesquisa"

## Passo 3: Implantar como Web App

1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecionar tipo"
3. Selecione **Aplicativo da Web**
4. Configure:
   - **Descrição**: "API para receber dados do formulário"
   - **Executar como**: "Eu" (seu email)
   - **Quem tem acesso**: "Qualquer pessoa" (importante!)
5. Clique em **Implantar**
6. **Autorize o acesso** quando solicitado
7. **COPIE A URL** que aparece (algo como: `https://script.google.com/macros/s/AKfycby.../exec`)

## Passo 4: Adicionar a URL no Projeto

1. Copie a URL do Web App
2. No projeto da landing page, crie um arquivo `.env.local` na pasta `landing-page/`
3. Adicione a seguinte linha:

```
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

## Passo 5: Adicionar no Vercel

1. Acesse o projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name**: `GOOGLE_SHEETS_URL`
   - **Value**: Cole a URL do Google Apps Script
   - **Environment**: Marque Production, Preview e Development
4. Clique em **Save**
5. Faça um redeploy do projeto

## Testando

1. Após configurar tudo, acesse sua landing page
2. Preencha e envie o formulário
3. Verifique se os dados aparecem na planilha do Google Sheets

## Troubleshooting

### Erro 401 ou 403

- Verifique se configurou "Quem tem acesso" como "Qualquer pessoa"
- Tente reimplantar o script

### Dados não aparecem na planilha

- Verifique se os cabeçalhos estão corretos
- Verifique o console de erros no Apps Script (Execuções)

### Erro de CORS

- Certifique-se de que está usando `doPost` (não `doGet`)
- Verifique se a URL está correta no `.env.local`
