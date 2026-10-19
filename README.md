# Black Terapêutica | Fran Xavier

Landing page estática da campanha Black Terapêutica, pronta para publicação na Vercel.

## Publicar na Vercel

1. Importe este repositório em [vercel.com/new](https://vercel.com/new).
2. Mantenha o framework preset como **Other**.
3. Deixe **Build Command** e **Output Directory** vazios. A página é servida diretamente da raiz.
4. Clique em **Deploy**.

O ponto de entrada é `index.html`; imagens locais ficam em `assets/`. As fontes Instrument Sans e Instrument Serif são carregadas do Google Fonts.

Os formulários das páginas Black Terapêutica e Império de Águias salvam nome, e-mail e WhatsApp na aba correspondente da planilha e, após a confirmação do salvamento, abrem o WhatsApp com a mensagem preenchida. A integração usa a variável de ambiente `SHEETS_WEBHOOK_URL` configurada na Vercel.
