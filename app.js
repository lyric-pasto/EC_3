const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

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
    return
  }
  console.log("Conectado a la base de datos")
})

// =======================
// LISTAR EMPLEADOS (GET)
// =======================
app.get('/', (req, res) => {
  db.query(
    'SELECT * FROM empleados',
    [],
    (err, rows) => {
      if (err) {
        console.error("Error al listar:", err)
        return res.status(500).json({ error: 'Error al listar empleados' })
      }

      // 🔴 ANTES: res.json(rows.lent)  (esto está mal)
      // ✅ AHORA:
      res.json(rows)
    }
  )
})

// =======================
// CREAR EMPLEADO (POST)
// =======================
app.post('/', (req, res) => {
  const { name, lastName, age, dni } = req.body

  db.query(
    'INSERT INTO empleados (name, lastName, age, dni) VALUES (?,?,?,?)',
    [name, lastName, age, dni],
    (err, result) => {
      if (err) {
        console.error("Error al insertar:", err)
        // 🔴 ANTES: res.sendStatus(500).json({ err }) (esto no funciona)
        // ✅ AHORA:
        return res.status(500).json({ error: 'Error al insertar empleado' })
      }

      return res.status(201).json({
        message: "El nuevo personal ha sido creado",
        id: result.insertId
      })
    }
  )
})

// =======================
// ACTUALIZAR EMPLEADO (PUT)
// =======================
app.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, lastName, age, dni } = req.body

  db.query(
    'UPDATE empleados SET name = ?, lastName = ?, age = ?, dni = ? WHERE id = ?',
    [name, lastName, age, dni, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar personal:", err)
        return res.status(500).json({ error: 'Error al actualizar empleado' })
      }

      // Si no encontró filas para actualizar
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Empleado no encontrado' })
      }

      return res.status(200).json({ message: 'Personal actualizado' })
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
