import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';


export function Home () {
    const history = useHistory();
    const { signInWithGoogle, user} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
           await signInWithGoogle()
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();

        if (roomCode.trim()==='') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert("Room does not exists.")
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustration showing questions and answers" />
                <strong>Create live Q&amp;A rooms</strong>
                <p>Solve your audience's doubts in real time</p>
            </aside>
            <main>
                <div className="main-content">
                <img src={logoImg} alt="Letmeask Logotype" />
                <button onClick={handleCreateRoom} className="create-room">
                    <img src={googleIconImg} alt="Google Logotype" />
                    Create rooms with google
                </button>
                <div className="separator">or ... get in an room</div>
                <form onSubmit={handleJoinRoom}>
                    <input
                    type="text" 
                    placeholder="Room Code"
                    onChange={event => setRoomCode(event.target.value)} 
                    value={roomCode}
                    />
                <Button type="submit">
                    Get in right now
                </Button>
                </form>
                </div>
            </main>
        </div>
    );
}