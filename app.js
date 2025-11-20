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
  database: 'familia_db'
})

db.connect(err => {
  if (err) {
    console.error("Error al conectar:", err)
    return
  }
  console.log("Conectado a la base de datos")
})

app.get('/familias', (req, res) => {
  db.query(
    'SELECT * FROM familias',
    [],
    (err, rows) => {
      if (err) {
        console.error("Error al listar:", err)
        return res.status(500).json({ error: 'Error al listar familias' })
      }

      res.json(rows)
    }
  )
})
app.get('/miembros', (req, res) => {
  db.query(
    'SELECT * FROM miembros',
    [],
    (err, rows) => {
      if (err) {
        console.error("Error al listar:", err)
        return res.status(500).json({ error: 'Error al listar miembros' })
      }

      res.json(rows)
    }
  )
})
app.post('/miembros', (req, res) => {
  const { nombre, familia_id } = req.body

  db.query(
    'INSERT INTO miembros (nombre, familia_id) VALUES (?, ?)',
    [nombre, familia_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err })
      db.query(
        'UPDATE familias SET total_miembros = total_miembros + 1 WHERE id = ?',
        [familia_id]
      )

      res.json({ message: "Miembro creado", id: result.insertId })
    }
  )
})

app.put('/miembros/:id', (req, res) => {
  const { id } = req.params
  const { nombre } = req.body

  db.query(
    'UPDATE miembros SET nombre = ? WHERE id = ?',
    [nombre, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.json({ message: 'Miembro actualizado' })
    }
  )
})

app.delete('/miembros/:id', (req, res) => {
  const { id } = req.params

  db.query(
    'DELETE FROM miembros WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.json({ message: 'Miembro eliminado' })
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
