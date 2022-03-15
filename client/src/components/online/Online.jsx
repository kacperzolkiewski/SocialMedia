import './online.css'

export default function Online() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <li className="rightbarFriendItem">
            <div className="rightbarFriendContainer">
                <img src={PF + "person/3.png"} alt="" className="rightbarFriendImg" />
                <div className="rightbarFriendBadge"></div>
            </div>
            <span className="rightbarFriendText">Pola Freud</span>
        </li>
    )
}
