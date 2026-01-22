import express from "express";
import { chromium } from "playwright";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/buscar-imoveis", async (req, res) => {
  try {
    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://www.maisnegociosimobiliarios.com.br", {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    const imoveis = await page.evaluate(() => {
      const cards = document.querySelectorAll(".card-imovel");
      return Array.from(cards).map(card => ({
        titulo: card.querySelector("h2")?.innerText || "",
        preco: card.querySelector(".valor")?.innerText || "",
        link: card.querySelector("a")?.href || ""
      }));
    });

    await browser.close();
    res.json(imoveis);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(PORT, () => {
  console.log("API rodando na porta", PORT);
});
