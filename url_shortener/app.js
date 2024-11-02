const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express()
const routes = require('./routes/index')
const connectDB = require('./config/connectDB')
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)



connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch((err) => {
        console.error(err.message)
    });