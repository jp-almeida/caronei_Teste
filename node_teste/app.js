// https://www.youtube.com/watch?v=fm4_EuCsQwg
const { response } = require("express")
const express = require("express")
const {randomUUID} = require("crypto")
const { request } = require("http")

const products = []

const app = express()
app.use(express.json())


//body -> enviar dados para a aplicaçao
//params -> rota obrigatria
//query -. parametros opcionais
app.post("/products", (request, response) => {
    const {name, price} = request.body
    
    product = {
        name, 
        price, 
        id: randomUUID()
    }
    
    products.push(product)

    return response.json(product)
})


app.get("/primeira-rota", (request, response) =>{
    return response.json({message: "Acessou a primeira rota"})
})

app.get("/products", (request, response) =>{
    return response.json(products)
})

app.get("/products/:id", (request, response) =>{
    const { id } = request.params
    const product = products.find(product => product.id === id)

    return response.json(product)

})




app.listen(4002, () => console.log("Servidor está rodando na porta 4002"))