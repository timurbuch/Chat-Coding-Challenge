import { useEffect, useState } from "react"
import styled from 'styled-components/macro'


export const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])


    const sendMessage = async () => {
        if (currentMessage !== ''){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time : new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes(),
                id: new Date(Date.now())
            }
        await socket.emit('send_message', messageData)
        setMessageList([...messageList, messageData])
    }}

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList([...messageList, data])
        })
    }, [socket, messageList])


    return (
        <div>
            <div className='chat-header'>
                <h2>Gruppenchat</h2>
            </div>
            <ChatContainer>
                {messageList.map(content => {
                    return (
                    <Message key={content.id}>
                       
                       <div>{content.message} 
                       <MessageInfo>{content.author +' '+ content.time}</MessageInfo>
                       </div>
                    </Message>
                    )
                })}
            </ChatContainer>
            <div className='chat-footer'>
                <input
                type='text'
                placeholder='Enter your message...'
                onChange={ e => {
                    setCurrentMessage(e.target.value)
                }}
                onKeyPress={e => {
                    e.key ==='Enter' && sendMessage()
                }} 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

const ChatContainer = styled.div`
  width: 60vw;
  height:60vh;
  margin: 10vh 20vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px black solid;
  gap: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: lightgrey;
  `
  const Message = styled.div`
  box-sizing: border-box;
  display:flex;
  flex-direction: column;
  padding: 0 0.25rem;
  width: fit-content;
  text-align: left;
  border: 1px solid grey;
  background-color: white;
  border-radius: 0.25rem;
  `
  const MessageInfo = styled.div`
  display:flex;
  flex-direction:column;
  font-size: 0.5rem;
  font-weight: light;`