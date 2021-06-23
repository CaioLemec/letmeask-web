import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';


export function Home () {
    const history = useHistory();
    const { signInWithGoogle, user} = useAuth();

    async function handleCreateRoom() {
        if (!user) {
           await signInWithGoogle()
        }
        history.push('/rooms/new');
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
                <form action="">
                    <input
                    type="text"
                    placeholder="Room Code"
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