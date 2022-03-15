import './message.css'

export default function Message({own}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img src={PF + "person/2.png"} alt="" className="messageImg" />
        <p className="messageText">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="messageBottom">
        <span className="messageTime">1 hour ago</span>
      </div>
    </div>
  )
}
