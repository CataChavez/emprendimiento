const database = require("mime-db");
const { Pool } = require("pg");

const pool = new Pool({
  user: "cata",
  host: "localhost",
  password: "1234",
  database: "emprendimiento", 
  port: "5432"
});
//login
const login = async (credentials) => {
  try{
    const result = await pool.query(
    `SELECT * FROM tiendas WHERE email = $1 AND password = $2`,
    credentials
    );
    return result.rows[0];
  } catch (e) {
    console.log(e);
    return e;
  };
};

//ingresa un nuevo usuario
const newUser = async (usuario) => {
  const result = await pool.query(
    `INSERT INTO tiendas (email, nombre_tienda, nombre_emprendedor, direccion, comuna, rut, password, imagen) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    usuario
  );
  return result.rows[0];
}

const deleteUser = async (id) => {
  const result = await pool.query(
  `DELETE FROM tiendas WHERE id = $1 RETURNING *`,
  [id]
);
return result.rowCount;
}

const updateUser = async (datos, id) => {
  const result = await pool.query(
    `UPDATE tiendas SET nombre_tienda = $1, nombre_emprendedor = $2, direccion = $3, comuna = $4, rut = $5, password = $6, imagen = $7 WHERE id = ${id} RETURNING *`,
    datos
  );
  return result.rows[0];
};

const getTiendas = async () => {
  const result = await pool.query(
    `SELECT nombre_tienda, imagen FROM tiendas`
  )
  return result.rows
}

const getTiendasDesc = async() => {
  const result = await pool.query(
    `SELECT nombre_tienda, imagen FROM tiendas ORDER BY nombre_tienda DESC`
  )
  return result.rows
}

const newProduct = async(datos, id) => {
  const result = await pool.query(
    `INSERT INTO productos (nombre, descripcion, precio, tienda_id) values ($1, $2, $3, ${id}) RETURNING *`,
    datos
  );
  return result.rows[0];  
}

const getProducts = async(tienda, id) => {
  const result = await pool.query(
    `SELECT * FROM productos WHERE tienda_id=${id}`
  )
  return result.rows
}

module.exports = {
  login,
  newUser,
  deleteUser,
  updateUser,
  getTiendas,
  getTiendasDesc,
  newProduct,
  getProducts
};