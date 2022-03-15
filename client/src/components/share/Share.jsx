import React, { useContext, useRef, useState } from 'react'
import { Label, PermMedia, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import { AuthContext } from '../../context/UserContext'
import axios from 'axios'
import './share.css'

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext)
    const description = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            description: description.current.value
        }

        if (file) {
            const data = {
                file: file,
                name: Date.now() + file.name
            }
            newPost.img = file.name
            console.log(data)
            try {
                await axios.post('/upload', data)
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post('/posts', newPost)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/anonim.png"} alt="" className="shareProfileImg" />
                    <input placeholder={"What's in your mind " + user.username + "?"} className="shareInput" ref={description} />
                </div>
                <hr className="shareHr" />
                    {file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                            <Cancel className='shareImgCancel' onClick={() => setFile(null)} />
                        </div>
                    )}
                    <form className="shareBottom" onSubmit={handleSubmit}>
                        <div className="shareOptions">
                            <label className="shareOption" htmlFor='file'>
                                <PermMedia htmlColor='tomato' className='shareOptionIcon' />
                                <span className="shareOptionText">Photo or Video</span>
                                <input type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                            <div className="shareOption">
                                <Label htmlColor='blue' className='shareOptionIcon' />
                                <span className="shareOptionText">Tag</span>
                            </div>
                            <div className="shareOption">
                                <Room htmlColor='green' className='shareOptionIcon' />
                                <span className="shareOptionText">Location</span>
                            </div>
                            <div className="shareOption">
                                <EmojiEmotions htmlColor='goldenrod' className='shareOptionIcon' />
                                <span className="shareOptionText">Feelings</span>
                            </div>
                        </div>
                        <button className="shareButton" type='submit'>Share</button>
                    </form>
                </div>
            </div>
            )
}
