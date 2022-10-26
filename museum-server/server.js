const express = require('express')
const app = express()
const port = 3001

app.listen(port, () => console.log(`Server listening on ${port}`))

app.use(express.json())

// You can replace this with a database
let burgerLayers = []

// Routes
app.get('/burgerLayers', (req, res) => {
  res.json({ burgerLayers })
})

app.post('/burgerLayers', (req, res) => {
  burgerLayers = req.body.burgerLayers
  res.json({ burgerLayers })
})