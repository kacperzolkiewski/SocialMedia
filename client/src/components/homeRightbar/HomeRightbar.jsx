import './homeRightbar.css'
import Online from '../online/Online'

export default function HomeRightbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <>
          <div className="birthdayContainer">
            <img src={PF + "birthday.png"} alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>John Carter</b> and <b>2 other friends</b> have a birthday.
            </span>
          </div>
          <img src={PF + "ad.png"} alt="" className="rightbarAd" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendsList">
            <Online />
            <Online />
            <Online />
            <Online />
            <Online />
          </ul>
        </>
      )
  
}
