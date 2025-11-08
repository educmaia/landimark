import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validação básica
    if (!data.email || !data.nomeEmpresa) {
      return NextResponse.json(
        { message: "Dados incompletos" },
        { status: 400 }
      );
    }

    // URL do Google Apps Script (configurada via variável de ambiente)
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL;

    if (!googleSheetsUrl) {
      console.error("GOOGLE_SHEETS_URL não configurada");
      // Ainda retorna sucesso para não quebrar a UX, mas loga o erro
      console.log("Dados que seriam salvos:", data);
      return NextResponse.json(
        { message: "Inscrição recebida com sucesso!" },
        { status: 200 }
      );
    }

    // Envia para o Google Sheets
    const sheetsResponse = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });

    // Verifica se a resposta foi bem-sucedida
    if (!sheetsResponse.ok) {
      console.error(
        "Erro ao enviar para Google Sheets:",
        sheetsResponse.status,
        await sheetsResponse.text()
      );
      throw new Error("Falha ao salvar no Google Sheets");
    }

    const result = await sheetsResponse.json();
    console.log("Dados salvos com sucesso no Google Sheets:", result);

    // Retorna sucesso
    return NextResponse.json(
      {
        message: "Inscrição recebida com sucesso! Em breve entraremos em contato.",
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar formulário:", error);

    // Log detalhado do erro
    if (error instanceof Error) {
      console.error("Mensagem de erro:", error.message);
      console.error("Stack trace:", error.stack);
    }

    return NextResponse.json(
      {
        message: "Erro ao processar inscrição. Por favor, tente novamente.",
        success: false
      },
      { status: 500 }
    );
  }
}
