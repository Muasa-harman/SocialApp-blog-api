const User = require("../controllers/user");
const router = require("express").Router();
const getAllUser = require("../controllers/user");


router.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body;
    let existingUser;
    try {
     existingUser = await User.findOne({email:req.body.email})
     if(existingUser){
         return res.status(400).json({message:"User already Exists! Login Instead"})
     };
    } catch (error) {
       return console.log(error);
    };
    const user = new User({name:req.body.name,email:req.body.email,password:req.body.password,blogs:[]});
    try {
       const user = await User.save();
       res.status(200).json(user);
    } catch (error) {
       return console.log(error);
    }
    return res.status(201).json(user)
});

router.post("/login",async(req,res)=>{
    const {name,email,password} = req.body;
    let existingUser;
    try {
     existingUser = await User.findOne({email:req.body.email})
     if(!existingUser){
         return res.status(404).json({message:"Couldn't find user by this Email"})
     };

     const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
     if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"})
     }
     return res.status(200).json({message:"Login Successfull"})
    } catch (error) {
       return console.log(error);
    };
})
router.get("/",async(req,res)=>{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return console.log()
    }
    if(!users){
        return res.status(404).json({ message:"No Users Found" });
    }
    return res.status(200).json({users});
})


module.exports = router