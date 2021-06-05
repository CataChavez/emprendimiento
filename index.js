const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require ("./db/consults");
const Handlebars = require("handlebars")
require("dotenv").config();

const app = express();

//server
app.listen(process.env.PORT || 3000, () => console.log("Servidor encendido"));

//middlewares, config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/assets", express.static(__dirname + "/assets"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/mainLayout"),
    partialsDir: path.join(__dirname, "/views/components"),
  })
);

app.set("view engine", "handlebars");
Handlebars.registerHelper("formatDate", (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
});

//Routes
//Obtiene la pagina inicial
app.get("/", (req, res) => {
    res.render("Login")
})

//Login rout
app.post("/login", async (req, res) => {
  const credentials = Object.values(req.body);
  console.log(credentials);
  try {
    const user = await db.login(credentials);
    if (user) {
      const token = jwt.sign(user, process.env.SECRET_KEY);
      res.status(200).send(token);
    } else {
      res.status(404).send("No existe un usuario con estas credenciales");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "500 Internal Server Error", message: e });
  }
});

app.get("/registro", (req, res) => {
  res.render("Register");
});

//Home con usuario
app.get("/Home", (req,res) => {
  const { token } = req.query;
  jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
    if (error) {
      const { message } = error;
      res.status(401).send({ error: "401 Unauthorized", message});
    }else {
      let tiendas;
      let tiendasDesc;
      try {
        const { id } = data;
        tiendas = await db.getTiendas()
        tiendasDesc = await db.getTiendasDesc()
        res.render("Home", {
          user: data,
          tiendas,
          tiendasDesc,
          token
        });
      } catch (e) {
        console.log(e);
        res
          .status(500)
          .send({ error: "500 Internal Server Error", message: e });
      }
    }
  })
})

app.post("/tiendas", async (req, res) => {
  const tienda = Object.values(req.body);
  try {
    const result = await db.newUser(tienda);
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "500 Internal Server Error", message: e });
  }
});

app.put("/tiendas/:id", async (req, res) => {
  const { id } = req.params;
  const datos = Object.values(req.body);
  try {
    const result = await db.updateUser(datos, id);
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "500 Internal Server Error", message: e });
  }
});

app.delete("/tiendas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowCount = await db.deleteUser(id);
    if (rowCount == 0) throw "No existe usuario con este id";
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "500 Internal Server Error", message: e });
  }
});

app.get("/Home/perfil", (req, res) => {
  const { token } = req.query;
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      const { message } = err;
      res.status(401).send({ error: "401 Unauthorized", message });
    } else {
      res.render("Profile", { user: data, token });
    }
  });
});

app.get("*", (req, res) => {
  res.render("Error");
});
