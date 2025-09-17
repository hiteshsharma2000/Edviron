const express=require('express')
const app=express()
const cors=require('cors')
const {connection}=require('./db')
require('dotenv').config()

const {UserRouter}=require('./Routes/UserRoute')
const {PaymentRoute}=require('./Routes/Payments')
const { WebhookRoute } = require('./Routes/Webhooks')
const { transaction_route } = require('./Routes/Transactions')

app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use('/user',UserRouter)
app.use('/payments',PaymentRoute)
app.use('/webhook',WebhookRoute)
app.use('/transaction',transaction_route)
app.get('/',async (req,res)=>{
    try {
        
        res.send({msg:'welcome to home page'})
        
    } catch (error) {
      res.errored(error)   
    }
})


app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log(`🚀 Server running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
        
    }
    console.log('db connected')
})