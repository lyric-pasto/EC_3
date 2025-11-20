const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

const PERSONAL = []

app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost', // 127.0.0.1
  port: 3306,
  user: 'root',
  password: "123456",
  database: 'pedrito_sac'
})

db.connect(err => {
  if (err) {
    console.error("Error al conectar:", err)
    return;
  }

  console.log("Conectado a la base de datos")
})

// endpoint
app.get('/', (req, res) => {
  db.query(
    'Select * from empleados',
    [],
    (err, rows) => {
      if (err) {
        console.log("Error al listar")
      }
      res.json(rows)
    }
  )
})

app.post('/', (req, res) => {
  const { name, lastName, age, dni } = req.body
  db.query(
    `Insert Into empleados (name, lastName, age, dni) values (?,?,?,?)`,
    [name, lastName, age, dni],
    (err) => {
      if (err) {
        console.log("Error al insertar:", err)
        res.sendStatus(500).json({ err })
      }
    })

  res.send("El nuevo personal a sido creado")
})

app.put('/:id', (req, res) => {

  const { id } = req.params

  const { name, lastName, age, dni } = req.body
  db.query(
    `Update empleados set name = ?, lastName = ?, age = ?, dni = ? Where id = ?`,
    [name, lastName, age, dni, id],
    (err) => {
    if (err) {
      console.log("Error al actualizar personal:", err)
      res.sendStatus(500).json({ err })
    }
  })

  res.status(200).send("Personal actualizado")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
