const express = require("express");
const { default: mongoose } = require("mongoose");
const router = require("express").Router()
const Blog = require("../model/Blog")

router.post("/addBlog",async(req,res)=>{
  const {title,description,image,user} = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(user)
    if(!existingUser){
        return res.status(400).json({message:"Unable to find User by this ID"})
    }
  } catch (error) {
    return console.log(error)
  }
  const blog = new Blog({
    title,description,image,user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session})
    await session.commitTransaction();
  } catch (error) {
    return res.status(200).json({message:error})
  }
  return res.status(200).json({blog})
});

router.put("/update/:id",async(req,res)=>{
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        const blog = await Blog.findByIdAndUpdate(blogId,{
          title,description
        })
        if(!blog){
           return res.status(500).json({message:"Unable to update the blog"})
        }
        res.status(200).json({blog});
        
    } catch (error) {
        return console.log(error)
    }
})

router.get("/blog/:id",async(req,res)=>{
    const id = req.params.id;
    let blog;
    try {
        blog =await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"No blog Found"})
        }
    } catch (error) {
        return console.log(error)
    }
    res.status(200).json({blog})
})
router.get("/getByUserId/:id",async(req,res)=>{
    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");
        if(!userBlogs){
            return res.status(404).json({message:"No Blog Found"})
        }
        res.status(200).json({blogs:userBlogs})
    } catch (error) {
        return console.log(error)
    }
})

router.get("/allblogs",async(req,res)=>{
    let blogs;
    try {
        blogs = Blog.find();
        if(!blogs){
            return res.status(404).json({message:"No Blogs Found"})
        }
        return res.status(200).json({blogs})
    } catch (error) {
        return console.log(error)
    }
})

router.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRmove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save()
        if(!blog){
            return res.status(400).json({message:"Unable to Delete"})
        }
        return res.status(200).json({message:"Successfully deleted"})
    } catch (error) {
        return console.log(error)
    }
})

module.exports = router