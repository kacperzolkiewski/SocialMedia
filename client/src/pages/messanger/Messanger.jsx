import './messanger.css'
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Online from "../../components/online/Online"
import Message from '../../components/message/Message'

export default function Messanger() {
  return (
    <>
      <Topbar />
      <div className='messanger'>
        <div className="messageMenu">
          <div className="messageMenuWrapper">
            <input type="text" placeholder='Search for friends' className="messageMenuInput" />
            <hr className="messageMenuHr" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="messageChat">
          <div className="messageChatWrapper">
            <div className="messageChatBox">
              <div className="messageChatBoxTop">
                <Message />
                <Message />
                <Message own={true} />
                <Message />
                <Message />
              </div>
              <div className="messageChatBoxBottom">
                <textarea id="" placeholder='Write something...' cols="30" rows="10" className="messageChatText">
                </textarea>
                <button className="messageChatBtn">Send</button>
              </div>
            </div>
          </div>
        </div>
        <div className="messageOnline">
          <div className="messageOnlineWrapper">
            <Online />
            <Online />
            <Online />
            <Online />
          </div>
        </div>
      </div>
    </>
  )
}
