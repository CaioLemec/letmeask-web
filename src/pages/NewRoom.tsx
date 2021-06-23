import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
    //const {user} =useAuth();

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
                <form action="">
                    <input
                    type="text"
                    placeholder="Room's name"
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