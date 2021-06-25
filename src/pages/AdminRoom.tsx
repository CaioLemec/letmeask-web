import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/room.scss';
// import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    //const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleCheckQuestionAsAnswred(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })
    }

    async function handleDeleteQuestion(questionId:string) {
        if(window.confirm(`Are you sure you want delete this question?`)) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Logotype" />
                    <div className="">
                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={handleEndRoom} >Close Room</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Room {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                    <div className="question-list">
                        {questions.map(question => {
                        return(
                            <Question 
                             key={question.id}
                             content={question.content}
                             author={question.author}
                             isAnswered={question.isAnswered}
                             isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                <>
                                    <button
                                    type="button"
                                    onClick={()=> handleCheckQuestionAsAnswred(question.id)}
                                    >
                                        <img src={checkImg} alt="mark as answred" />
                                    </button>
                                    <button
                                    type="button"
                                    onClick={()=> handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="mark as highlight question" />
                                    </button>
                                </>
                                ) }
                                <button
                                type="button"
                                onClick={()=> handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="delete question" />
                                </button>
                            </Question>
                            )
                        })}
                    </div>
            </main>
        </div>
    );
}