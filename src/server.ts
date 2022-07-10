import express from 'express'

const app = express()

app.get("/", (request, response) => {
    return response.json({ message: "Hello world" })
})

app.listen(5500, () => console.log("Server is on!"))