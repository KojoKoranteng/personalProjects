const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    fName: {type:String, required: true, trim:true},
    lName: {type:String, required: true, trim:true},
    email: {type:String, required: true, trim:true, lowercase:true, unique:true, 
    validate(param){
        if(!validator.isEmail(param)){
            throw new Error("Invalid email");
        }
    }
    },
    password: {type:String, required: true, trim: true, minLength: 8,
       validate(param){
        if(param.toLowerCase().includes("password")){
            throw new Error("Password cannot contain password")
        }
       }
    }

},{
    timestamps:true,
    versionKey:false
})

userSchema.pre("save", async function(next) {
    const user = this;
    console.log("action performed before user save")
    if (user) {
        let salt = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(user.password,salt)
    }
    
    next()
})

userSchema.statics.findByCredential = async (email,password) => {
    
    let user = await User.findOne({ email })
    console.log("user", user)
    
    if (user) {
       //verify if password is a match by comparing plain password to password in the db
    let isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch);
    
    if (!isMatch) {
        throw new  Error("Unauthorized user")
    }

        return user;
        
    } else {
    
        //console.log("user does not exist")
    throw new Error("User does not exist")
        
    }
    
}


const User = mongoose.model("User", userSchema);

module.exports = User