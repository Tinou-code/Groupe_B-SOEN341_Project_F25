const connect = require("./connect.cjs");
const app = require("./app.cjs");

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server running on port ${PORT}`)
})