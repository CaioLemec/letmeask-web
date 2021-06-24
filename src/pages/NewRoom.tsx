import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
    const {user} =useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] =useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        if(newRoom.trim() ==='') {
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)

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
                <h2>Create new room</h2>
                <form action="" onSubmit={handleCreateRoom}>
                    <input
                    type="text"
                    placeholder="Room's name"
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
                    />
                <Button type="submit">
                    Create room
                </Button>
                </form>
                <p>
                Would you like to enter an existing room? <Link to="/">Click here</Link>
                </p>
                </div>
            </main>
        </div>
    );
}