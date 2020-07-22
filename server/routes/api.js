const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')
const video = require('../models/video')

const db = "mongodb://localhost:27017/videoplayer"
mongoose.Promise = global.Promise

mongoose.connect(db, { useUnifiedTopology: true, useFindAndModify: false, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("Error " + err)
    }
    console.log("Connected to database")

})
router.get('/videos', (req, res) => {
        console.log('Get request for all videos')
        Video.find({})
            .exec((err, videos) => {
                if (err) throw err;
                else {
                    res.json(videos)
                }
            })
    })
    //GET REQUEST//
router.get('/videos/:id', (req, res) => {
    console.log('Get request for one video')
    Video.findById(req.params.id)
        .exec((err, video) => {
            if (err) throw err;
            else {
                res.json(video)
            }
        })
})

//POST REQUEST//
router.post('/video', (req, res) => {
        console.log('Post a video')
        var newVideo = new Video();
        newVideo.title = req.body.title;
        newVideo.url = req.body.url;;
        newVideo.description = req.body.description;
        newVideo.save((err, insertedVideo) => {
            if (err) throw err;
            else {
                res.json(insertedVideo)
            }
        })
    })
    //PUT REQUEST//
router.put('/video/:id', (req, res) => {
    console.log('Updating a video')
    Video.findByIdAndUpdate(req.params.id, {
            $set: { title: req.body.title, url: req.body.url, description: req.body.description }
        }, { useFindAndModify: true, new: true },
        (err, updateVideo) => {
            if (err) throw err;
            else
                res.json(updateVideo)
        })
})
router.delete('/video/:id', (req, res) => {
    console.log("Video is deleted")
    video.findByIdAndRemove(req.params.id, (err, deleteVideo) => {
        if (err) throw err;
        else
            res.json(deleteVideo)
    })
})
module.exports = router