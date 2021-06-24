import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim()=== '') {
            return;
        }
        if (!user) {
            throw new Error('You must be logged in');
        }

        const question  = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question)
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logotype" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>5 perguntas</span>
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    placeholder="Your question?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />
                    <div className="form-footer">
                        <span><button>Login</button> to send an question</span>
                        <Button disabled={!user} type="submit">Send your question :)</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}