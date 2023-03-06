// const express = require("express")

// const User = require("../model/User");


// const getAllUser = async (req,res,next) =>{
//     let users;
//     try {
//         users = await User.find();
//     } catch (error) {
        
//     }
//     if(!users){
//         return res.status(404).json({ message:"No Users Found" });
//     }
//     return res.status(200).json({users});
// }

// module.exports = ({getAllUser})