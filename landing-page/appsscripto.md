// ======================================================
// FUNÇÃO DO APP DA WEB
// ======================================================
function doPost(e) {
  var sheet; // Declarar fora do try para usar no catch
  try {
    Logger.log("Iniciando doPost...");
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pesquisa");
    if (!sheet) {
      Logger.log("ERRO CRÍTICO: A aba 'Pesquisa' não foi encontrada.");
      throw new Error("Aba 'Pesquisa' não encontrada.");
    }

    // Parse dos dados recebidos
    Logger.log("Parseando dados JSON...");
    var data = JSON.parse(e.postData.contents);
    Logger.log("Dados parseados com sucesso.");

    var listaOuTexto = function (valores, extra) {
      var itens = [];
      if (Array.isArray(valores)) {
        itens = itens.concat(valores);
      }
      if (extra) {
        itens.push(extra);
      }
      return itens
        .map(function (item) {
          return (item || "").toString().trim();
        })
        .filter(function (item) {
          return item.length > 0;
        })
        .join(", ");
    };

    // Prepara a linha com os novos campos do questionário
    var row = [
      new Date(), // Data/Hora
      data.nomeEmpresa || "",
      data.localizacao || "",
      data.numeroFuncionarios || "",
      data.setor || "",
      data.outroSetor || "",
      data.presencaDigital || "",
      listaOuTexto(data.canaisDigitais),
      data.outroCanal || "",
      data.conhecimentoIA || "",
      data.usoIA || "",
      listaOuTexto(data.tarefasIA),
      data.outraTarefaIA || "",
      listaOuTexto(data.motivosParadaIA),
      data.outroMotivoParada || "",
      data.tempoPresencaDigital || "",
      data.investimentoAds || "",
      data.nomeResponsavel || "",
      data.cargo || "",
      data.email || "",
      data.whatsapp || "",
      data.disponibilidadeEntrevista || "",
      data.observacoes || ""
    ];

    // Adiciona a linha na planilha
    Logger.log("Adicionando linha na planilha...");
    sheet.appendRow(row);
    var linhaAdicionada = sheet.getLastRow();
    Logger.log("Linha " + linhaAdicionada + " adicionada.");

    // --- ETAPA DE EMAIL ---
    var statusEmail = "Email não fornecido"; // Status padrão

    if (data.email && data.email.includes("@")) {
      Logger.log(
        "Email válido encontrado (" + data.email + "). Chamando a função de envio..."
      );

      // Chama a função de envio e espera uma resposta (true ou false)
      var emailSucesso = enviarEmailComLinksFixos(data.email);

      if (emailSucesso) {
        statusEmail = "Email enviado com sucesso";
        Logger.log("Função de email retornou SUCESSO.");
      } else {
        statusEmail = "Falha no envio do email";
        Logger.log("Função de email retornou FALHA.");
      }
    } else if (data.email) {
      statusEmail = "Email inválido (sem @)";
      Logger.log("Email inválido detectado: " + data.email);
    }

    // Escreve o status final na coluna 24 (logo após Observações)
    Logger.log("Escrevendo status '" + statusEmail + "' na Coluna X.");
    sheet.getRange(linhaAdicionada, 24).setValue(statusEmail);
    // ----------------------

    // Retorna sucesso
    Logger.log("doPost concluído com sucesso.");
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Loga o erro caso o doPost falhe
    Logger.log("--- ERRO FATAL NO DOPOST ---");
    Logger.log("Mensagem: " + error.message);
    Logger.log("Stack: " + error.stack);

    // Tenta escrever o erro na planilha
    if (sheet) {
      var ultimaLinha = sheet.getLastRow();
      if (ultimaLinha > 0) {
        sheet
          .getRange(ultimaLinha, 24)
          .setValue("Erro no script: " + error.message);
      }
    }

    // Retorna erro
    return ContentService
      .createTextOutput(
        JSON.stringify({ success: false, error: error.toString() })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ======================================================
// FUNÇÃO DE ENVIO DE E-MAIL
// (Com logs detalhados)
// ======================================================
function enviarEmailComLinksFixos(emailDestinatario) {

Logger.log("Iniciando enviarEmailComLinksFixos para: " + emailDestinatario);

try {
// --- Links e IDs (JÁ INSERIDOS) ---
var idVideoDrive = "1Y3HUfD0vny7oS1YIJr_I_VlLjxrZ9XTB";
var idPDFDrive = "1gN122sRVr0v7QNaRnUR6oY6ooMo_RxLb";
var linkInternetFixo = "https://notebooklm.google.com/notebook/d42f1e12-8753-41db-a009-f5990bf4a44b";

    // (O if 'includes("@")' já foi checado no doPost, mas checamos de novo por segurança)
    if (emailDestinatario && emailDestinatario.includes("@")) {

      Logger.log("Tentando acessar o VÍDEO (ID: " + idVideoDrive + ")");
      var arquivoVideo = DriveApp.getFileById(idVideoDrive);
      Logger.log("Vídeo acessado. Tentando definir compartilhamento...");
      arquivoVideo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      var linkVideoDrive = arquivoVideo.getUrl();
      Logger.log("Link do vídeo obtido.");

      Logger.log("Tentando acessar o PDF (ID: " + idPDFDrive + ")");
      var arquivoPDF = DriveApp.getFileById(idPDFDrive);
      Logger.log("PDF acessado. Tentando definir compartilhamento...");
      arquivoPDF.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      var linkPDFDrive = arquivoPDF.getUrl();
      Logger.log("Link do PDF obtido.");

      // Define o assunto e o corpo do e-mail
      var assunto = "Acesso aos seus materiais";

      var corpoEmail = "Olá,\n\n" +
                       "Obrigado por sua participação, caso sua empresa seja selecionada contamos com sua participação.\n" +
                       "Aqui estão os brindes:\n\n" +
                       "Link IA para marketing: " + linkInternetFixo + "\n" +
                       "Link do Vídeo sobre Marketing Digital feito por IA: " + linkVideoDrive + "\n" +
                       "Link do PDF: " + linkPDFDrive + "\n\n" +
                       "Guia de ferramentas: https://marketdir-mqscllke.manus.space/" + "\n" +
                       "Atenciosamente, Eduardo Camargo Maia - Whatsapp: (19) 99126-0742";

      Logger.log("Corpo do e-mail montado. Tentando enviar para " + emailDestinatario);

      // Envia o e-mail
      MailApp.sendEmail(emailDestinatario, assunto, corpoEmail);

      Logger.log("Email enviado com sucesso para: " + emailDestinatario);
      return true;

    } else {
      Logger.log("Email não enviado. Destinatário inválido: " + emailDestinatario);
      return false;
    }

} catch (error) {
// --- ESTE É O LOG MAIS IMPORTANTE ---
Logger.log("--- ERRO FATAL AO ENVIAR EMAIL ---");
Logger.log("Destinatário: " + emailDestinatario);
Logger.log("Mensagem de Erro: " + error.message);
Logger.log("Linha do Erro (Stack): " + error.stack);
// -------------------------------------
return false;
}
}
