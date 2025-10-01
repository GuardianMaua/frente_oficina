const express = require("express")
const app = express()
const path = require("path")
const port = 80
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res) => {
  res.redirect("/login")
})


app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname + '/public' + '/index.html'))
})

app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "AindaEstouPensando" && senha === "AindaNaoSei") {
    res.json({ redirect: "/Acesso" });
  } else {
    res.status(401).send("Usuário ou senha inválidos");
  }
});

app.get("/Acesso",(req,res) => {
  res.sendFile(path.join(__dirname + "/public" + "/working.html"))
})




app.listen(port, () => {

})
