const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../model/User")
//register user path
router.post("/register",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        const user = await newUser.save();
        res.status(200).json(user)
        
    }  catch(error){
        res.status(500).json(error)
        console.log(error);
    }
});

//login path 
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
                    //if no user
                    !user && res.status(400).json("No user Found")

                    //if same user then compare password
                    const validate = await bcrypt.compare(req.body.password,user.password)
                    //not validated
                    !validate && res.status(400).json("wrong credentials!")
                   const {password, ...other} = user._doc //details in notes rest operater
                   res.status(200).json(other)
    }catch(error){
        res.status(500).json(error)
        console.log(error);
    }
})




module.exports = router