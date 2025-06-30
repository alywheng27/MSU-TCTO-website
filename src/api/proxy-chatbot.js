// src/pages/api/proxy-chatbot.js
export async function get() {
  const response = await fetch('https://insights.elishatelecom.com/aichat/public/snippet_assets/js/include-chatbot.min.js');
  return new Response(await response.text(), {
    headers: { 'Content-Type': 'application/javascript' }
  });
}