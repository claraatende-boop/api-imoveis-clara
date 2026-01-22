import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/buscar-imoveis", async (req, res) => {
  return res.json([
    {
      titulo: "Sobrado em Igara",
      preco: "R$ 480.000",
      link: "https://www.maisnegociosimobiliarios.com.br"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
