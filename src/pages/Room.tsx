import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type RoomParams = {
    id: string;
}

type Question = {
    id: string;
      author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] =useState('');
    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parseQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parseQuestions)
        })    
    }, [roomId])

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

        setNewQuestion('');
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
                    <h1>Room {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    placeholder="Your question?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                            </div>
                        ) : (
                            <span><button>Login</button> to send an question</span>
                        ) }
                        <Button disabled={!user} type="submit">Send your question :)</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    );
}