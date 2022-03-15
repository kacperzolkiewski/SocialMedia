const Post = require("../models/Post")
const User = require("../models/User")

const router = require("express").Router()

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId === post.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json("The post has been updated")
        } else {
            res.status(403).json("You can only update your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId === post.userId) {
            await post.deleteOne()
            res.status(200).json("The post has been deleted")
        } else {
            res.status(403).json("You can only delete your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("The post has been liked")
        } else {
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json("The post has been disliked")
        }
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async (req, res) => {
    try {   
        const post = await Post.findById(req.params.id)
        if (!post)
            res.status(404).json("Post does not exists")
        res.status(200).json(post) 
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({userId: friendId})
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/profile/:username", async (req, res) => {
    try {
        const currentUser = await User.findOne({username: req.params.username})
        const userPosts = await Post.find({userId: currentUser._id})
        res.status(200).json(userPosts)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router