import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="Login">
            <h1>Authentification</h1>
            <div className='form'>
                <input type='text' placeholder='Email' value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} /><br></br>
                <input type='password' placeholder='Mot de passe' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} /><br></br>

                <button onClick={(e) => {
                    fetch("http://localhost:3001/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }).then((data) => {
                        navigate('/')
                        console.log(data);
                    }).catch((error) => {
                        console.log(error);
                    });

                }}>Se connecter</button>
            </div>
        </div>
    );
}

export default Login;
