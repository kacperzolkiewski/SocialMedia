import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/UserContext"
import "./topbar.css"

export default function Topbar() {
  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
          <Search className="searchIcon" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={'/profile/' + user.username} >
          <img src=
            {user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/anonim.png"
            } alt="Profile picture" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}
