const router = require('express').Router()
const Conversation = require('../models/Conversation')
const User = require("../models/User")

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverID]
    })

    try {
        const savedConversation = await newConversation.save()
        req.status(200).json(savedConversation)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]}
        })
        req.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router