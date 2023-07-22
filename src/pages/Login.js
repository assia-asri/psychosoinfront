import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

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
                    setError("")

                    fetch("http://localhost:3001/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }).then((response) => {
                        return response.json()
                    }).then((data) => {
                        if(data.role) {
                            localStorage.setItem("role", data.role);
                            navigate('/');
                        }
                        
                        if(data.error) {
                            setError(data.error)
                        }

                        console.log(data);
                    }).catch((error) => {
                        console.log(error);
                    });

                }}>Se connecter</button>
                <h6>{error}</h6>
            </div>
        </div>
    );
}

export default Login;
