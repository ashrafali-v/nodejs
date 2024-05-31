const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { registerValidation } = require("./validation");
const User = require("./app/model/User");
const Post = require("./app/model/Post");
//Import Routes
// const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/user");
const postRoutes = require('./routes/post');


/* ------- new file structure, using dashboard controller -------*/
//const dashboardRoutes = require('./app/dashboard/router.dashboard');
/* ------- new file structure, using dashboard controller -------*/

dotenv.config();
app.use(bodyParser.json());
//Connect to DB

async function start() {
  try {
    mongoose.connect(
      process.env.DB_CONNECT,
      { useUnifiedTopology: true, useNewUrlParser: true },
      () => console.log("DB connected123")
    );
    const port = process.env.PORT || 3027;
    app.listen(port, function (err) {
      if (err) console.log("Error in server setup");
      console.log("Server is Up and running");
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}
start();

//Route Middlewares
app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://localhost:3027",
    "https://test-hackothon.herokuapp.com/"
  ); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/login", (req, res) => {

  try{
    const username = req.body.name;
    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.write;
    res.json({ accessToken: accessToken });
  }catch(err){
    console.log(err);
    res.status(401).send(err)
  }
});

app.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //if the user already there
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("User already exist");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bestFriend: req.body.bestFriend
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);

    user.save((err, savedUser) => {
      if (err) return console.error(err);
      console.log('Post saved with author _id:', savedPost.author);
    });
  } catch (err) {
    res.json({ Message: err.message });
  }
});

function authenticateToken(req,res,next){
  console.log(req.headers);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(403)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}



async function updateExistingDocuments() {
  // Update all documents to use the new key
  //await Post.updateMany({}, { $rename: { 'authorId':'author' } });
  //await Post.deleteMany({})
  console.log('Documents updated successfully.');
}

//updateExistingDocuments().catch(console.error);

//app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


/* ------- new file structure, using dashboard controller -------*/
//app.use("/", authenticateToken, dashboardRoutes);
/* ------- new file structure using dashboard controller -------*/

app.get("/",(req,res)=>{
  try{
    console.log(req.baseUrl);
    //throw new Error('Oops!');
    res.json({name:"Ashraf Ali"})
  }
  catch(err){
    console.log(err);
    res.status(404).json(err.message)
  }
})

app.get('*', function (req, res) {
  res.status(404).send('what???');
})

require("./router")(app);
//start listening the server

module.exports = app;
