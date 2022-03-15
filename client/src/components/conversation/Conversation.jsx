import './conversation.css'

export default function Conversation() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className='conversation'>
      <img src={PF + 'person/2.png'} alt="" className="conversationImg" />
      <span className="conversationName">
        Rick Morty
      </span>
    </div>
  )
}
