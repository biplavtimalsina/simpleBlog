var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blogs");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//schema for Blog
var blogSchema=new mongoose.Schema({
    name:String,
    description:String
});

var Blog=mongoose.model("Blog",blogSchema);

// Blog.create({
//         name:"First",
//         description:"This is my first blog!"
//     },
//     function(err, blog){
//         if(err){
//             console.log(err);
//         }else
//         {
//             console.log(blog);
//         }
// });


//routes
app.get("/",function(req,res){
    //res.send("This is the landing page!");
    res.render("landing");
});

//show all blogs
app.get("/blogs",function(req,res){
   // res.send("this is where all blogs are shown!");
   Blog.find({},function(err,allBlogs){
        if(err){
            console.log(err);
        }else{
             res.render("blogs",{blogPosts:allBlogs});
        }
       
   });
});

//add new blog 
app.post("/blogs",function (req,res){
    //res.send("Add a new blog post");
    //console.log(req.body);
    var title=req.body.name;
    var desc=req.body.description;
    var newBlog={name:title,description:desc};
    //blogPosts.push(newBlog);
    Blog.create(newBlog,function(err,newBlog){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/blogs");
        }
    });
});

//form for new blog addition
app.get("/new",function(req,res){
    res.render("new");
});




//listen to port
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Blog app starting..."); 
});