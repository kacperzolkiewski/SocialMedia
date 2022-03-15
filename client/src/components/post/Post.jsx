import './post.css'
import { ThumbUp, Favorite, MoreHoriz } from '@mui/icons-material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import {format} from 'timeago.js'
import { AuthContext } from '../../context/UserContext'

export default function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const {user: currentUser} = useContext(AuthContext)

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [post.likes, currentUser._id])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put('/posts/' + post._id + '/like', {userId: currentUser._id})
        } catch (err) {
            console.log(err)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/anonim.png"} alt="" className="postUserImg" />
                        <span className="postUsername">{user.username}</span>
                        <span className="postTimeText">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreHoriz className='postTopIcon' />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.description}</span><br />
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp htmlColor='blue' className="likeIcon" onClick={likeHandler}/>
                        <Favorite htmlColor='red' className="likeIcon" onClick={likeHandler}/>
                        <span className="postLikeText">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postComments">
                            9 comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
