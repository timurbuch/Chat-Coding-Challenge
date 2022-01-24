import './App.css';
import io from 'socket.io-client'
import styled from 'styled-components';
import { useState } from 'react';
import {Chat} from './Chat';

const socket = io.connect('http://localhost:3001')


function App() {
  const [username, setUsername] = useState('')
  const [showChat, setShowChat] =useState(false)
  
  const room = 'Gruppenchat'

  const joinChat = () => {
    if (username !== '' ){
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }


  return (
    <div className="App">
      {!showChat ? 
      <Login>
        <h1>Planblick Gruppenchat</h1>
        <input type='text' placeholder='Name'onChange={ (e) => {
        setUsername(e.target.value)
      }}/>
        <button onClick={joinChat}>An Chat teilnehmen</button>
      </Login>
      :
      <Chat socket={socket} username={username} room= {room}/>
    }
      
    </div>
  );
}

const Login = styled.div`
  width: 60vw;
  margin: 10vh 20vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  `

export default App;
