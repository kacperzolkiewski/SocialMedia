import "./rightbar.css"
import Following from "../following/Following"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { Add, Remove } from '@mui/icons-material'
import { AuthContext } from "../../context/UserContext"
import HomeRightbar from "../homeRightbar/HomeRightbar"

export default function Rightbar({ user }) {
  const [followings, setFollowings] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id))

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const followingList = await axios.get("/users/followings/" + user?._id)
        setFollowings(followingList.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchFollowings()
  }, [user])

  const handleClick = async () => {
    try {
      if(followed) {
        await axios.put('/users/' + user._id + '/unfollow', {userId: currentUser._id})
        dispatch({type: "UNFOLLOW", payload: user._id})
      } else {
        await axios.put('/users/' + user._id + '/follow', {userId: currentUser._id})
        dispatch({type: "FOLLOW", payload: user._id})
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed)
  }

  const ProfileRightBar = () => {
    return (
      <>
        {
          user.username !== currentUser.username && (
            <button className="rightbarFollowBtn" onClick={handleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove/> : <Add />}
            </button>
          )
        }
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "-"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Married"
                  : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Followings</h4>
        <div className="rightbarFollowings">
          {
            followings.map(following => {
              return <Following user={following} key={following._id} />
            })
          }
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
