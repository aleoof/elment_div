const express = require('express');
const path = require('path')

const app = express()

const config = {
    path: 'dist',
    forceHTTP: false,
    port: process.env.PORT || 3000
}

if(config.forceHTTP){
    app.use((req, res, next) => {
        if(req.header["x-forwarded-proto"] === 'http'){
            res.redirect(`https://${req.headers.host}${req.url}`)
        } else {
            next()
        }
    })
}

app.use(express.static(config.path))

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,config.path, "index.html"))
})

app.listen(config.port, () => {
    console.log(`escutando na ${config.port}`)
})