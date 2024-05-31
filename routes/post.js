const router = require('express').Router();
const Post = require('../app/model/Post')
//const { registerValidation } = require('../validation');

router.get('/', async (req, res) => {
    //const status = await Post.updateMany({}, { $rename: { 'authorId': 'author' } });
    const posts = await Post.where('title').equals('Python').exec();
    res.json(posts)
});

router.post('/create',async(req,res)=>{
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    })
    const post = await newPost.save()
    res.json(post)
})

router.get('/:postId',async(req,res)=>{
    const post = await Post.findById(req.params.postId).populate('author').exec();
    res.json(post)
})

router.get('/user/:userId', async (req, res) => {
    try {
        const userPosts = await Post.find({ author: req.params.userId }).populate('author').exec()
        res.json(userPosts)
    }
    catch (err) {
        console.log(err.message);
    }
})

module.exports = router;