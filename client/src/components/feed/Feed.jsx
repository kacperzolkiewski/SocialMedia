import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import { AuthContext } from "../../context/UserContext"

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get("/posts/timeline/" + user._id)

      setPosts(res.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt)
      }))
    }

    fetchPosts()
  }, [username, user._id])

  return (
    <div className="feed">
      {(!username || username === user.username) && <Share />}
      {posts.map((p) => {
        return <Post key={p._id} post={p} />
      })}
    </div>
  )
}
