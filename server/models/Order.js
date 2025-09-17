const mongoose=require('mongoose')

const StudentSchema=new mongoose.Schema({
    name:String,
    id:String,
    email:String
})

const OrderSchema=new mongoose.Schema({
  school_id: String,
  amount: Number,
  callback_url: String,
  collect_request_id: String,
  student_info:StudentSchema,
  createdAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('Order',OrderSchema)