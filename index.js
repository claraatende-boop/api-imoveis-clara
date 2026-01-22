const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Abrindo site...");

  await page.goto(
    "https://www.maissnegociosimobiliarios.com.br/sobrado",
    { waitUntil: "networkidle" }
  );

  await page.waitForTimeout(4000);

  const imoveis = await page.evaluate(() => {
    const lista = [];
    document.querySelectorAll("a[href*='/imovel/']").forEach(el => {
      const titulo = el.innerText.trim();
      const link = el.href;
      if (titulo) {
        lista.push({ titulo, link });
      }
    });
    return lista;
  });

  console.log("Imóveis encontrados:");
  console.log(imoveis);

  await browser.close();
})();
