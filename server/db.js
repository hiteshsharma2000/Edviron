require('dotenv').config()
const mongoose=require('mongoose')
const connection=mongoose.connect(process.env.MONGO_URI)
connection.then(()=>{
    console.log('database is connected');
    
}).catch((err)=>{
console.log(err);

})

module.exports={connection}