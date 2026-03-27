const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

db.connect(() => {
  console.log("MySQL conectado");
});

app.post("/evento", (req, res) => {
  const { titulo, codigo } = req.body;

  const sql = "INSERT INTO eventos (titulo, codigo) VALUES (?, ?)";

  db.query(sql, [titulo, codigo], (err) => {
    if (err) {
      return res.send("Erro ao salvar evento");
    }

    res.send("Evento salvo");
  });
});

app.get("/evento/:codigo", (req, res) => {
  const codigo = req.params.codigo;

  const sql = "SELECT * FROM eventos WHERE codigo = ?";

  db.query(sql, [codigo], (err, result) => {
    if (err) {
      return res.status(500).send("Erro no servidor");
    }

    if (result.length === 0) {
      return res.status(404).send("Código inválido");
    }

    res.json(result[0]);
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});