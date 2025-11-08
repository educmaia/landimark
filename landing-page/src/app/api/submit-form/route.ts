import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Aqui você pode integrar com diferentes serviços:

    // 1. Enviar para Google Sheets via API
    // 2. Enviar para um CRM (HubSpot, Salesforce, etc.)
    // 3. Enviar e-mail usando Resend, SendGrid, etc.
    // 4. Salvar em banco de dados
    // 5. Integrar com Notion, Airtable, etc.

    // Exemplo: Enviar e-mail usando Resend (instale: npm install resend)
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'pesquisa@seudominio.com',
      to: 'eduardo.maia@must.edu',
      subject: 'Nova Inscrição - Pesquisa de Mestrado',
      html: `
        <h2>Nova Inscrição Recebida</h2>
        <p><strong>Empresa:</strong> ${data.nomeEmpresa}</p>
        <p><strong>Responsável:</strong> ${data.nomeResponsavel}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.telefone}</p>
        <p><strong>Setor:</strong> ${data.setor}</p>
        <p><strong>Usa IA:</strong> ${data.usaIA}</p>
        <!-- Adicione mais campos conforme necessário -->
      `,
    });
    */

    // Exemplo: Salvar no Google Sheets
    /*
    const sheetsResponse = await fetch(
      'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    */

    // Por enquanto, apenas logamos no console (remova em produção)
    console.log("Dados recebidos:", data);

    // Simular sucesso
    return NextResponse.json(
      { message: "Inscrição recebida com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar formulário:", error);
    return NextResponse.json(
      { message: "Erro ao processar inscrição" },
      { status: 500 }
    );
  }
}
