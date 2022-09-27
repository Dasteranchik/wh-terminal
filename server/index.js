const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/create.terminal")
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use("/api", authRouter)

const PORT = config.get('serverPort')
const url = config.get('dbUrl')

const start = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Started', PORT)
        })  
    }catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    } /* finally {
        await mongoose.disconnect();
        console.log("Подключение закрыто");
    } */
}

start()