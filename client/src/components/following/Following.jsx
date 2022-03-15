import './following.css'
import { Link } from "react-router-dom"

export default function Following({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <Link to={"/profile/" + user.username} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="following">
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/anonim.png"} alt="" className="followingImg" />
                <span className="followingName">{user.username}</span>
            </div>
        </Link>
    )
}
