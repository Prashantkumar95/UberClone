const {Schema,model} = require("mongoose");
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
  
  const userSchema = new Schema({
    fullname: {
        firstame:{
            type: String,
            required: true,
            minlength:[3,'first name should we of three charcter'],
            maxlength: 50
        },
        lasttame:{
            type: String,
            minlength:[3,'first name should we of three charcter'],
            maxlength: 50
        },
   
        lasttame:{
            type: String,
            minlength:[3,'first name should we of three charcter'],
            maxlength: 50
        },
   
        email:{
            type: String,
            require:true,
            unique:true,
            minlength:[3,'first name should we of three charcter'],
            maxlength: 50
        },
   
        password:{
            type: String,
            require:true,
            select:false,
            

        },
        sockedId:{
          type:String,
        }
   
    },
    
  });
  
  userSchema.methods.generateAuthToken = function(){
      const token = jwt.sign({_id: this._id },process.env.jwt_SECRET)
      return token
  }
  
  userSchema.methods.comparePassword = async function(password){
     return await bcrypt.compare(password,this.password);
  }
  userSchema.statics.hashPassword = async function(password){
     return await bcrypt.compare(password,10);
  }
  
  const userModel = model("user", userSchema)
  
  module.exports = userModel