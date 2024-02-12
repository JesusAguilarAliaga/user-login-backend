import app from "./app.js"
import sequelize from "./utils/connection.js"
import { config } from "dotenv"
import "./models/index.js"

config()


const PORT = process.env.PORT || 8080
const DATABASE_URL = process.env.DATABASE_URL

const main = async () => {
    try {
        sequelize.sync()
        console.log(`DB connected: ${DATABASE_URL}`)
        app.listen(PORT)
        console.log(`   ✅ Server running on port ${PORT}`)
        console.log(`   ⚡ Link: http://localhost:${PORT}\n`)
    } catch (error) {
        console.error(error)
    }
}

main()