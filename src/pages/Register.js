import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

function Register() {
    const role = localStorage.getItem("role");
    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')

    if (role) {
        return role === "admin" ? <Navigate
            to='/admin/programmes'
        /> : <Navigate
            to='/accueil'
        />
    }

    return (
        <div className="Register">
            <h1>Enregistrement</h1>
            <div className='form'>
                <input type='text' placeholder='Nom' value={name} onChange={(e) => {
                    setName(e.target.value)
                }} /><br></br>
                <input type='text' placeholder='Email' value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} /><br></br>
                <input type='password' placeholder='Mot de passe' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} /><br></br>
                <input type='password' placeholder='Resaisir le mot de passe' value={password2} onChange={(e) => {
                    setPassword2(e.target.value)
                }} /><br></br>

                <button onClick={(e) => {
                    // Réinitialiser la variable error
                    setError("")

                    // controle des champs et remplissage de la variable error
                    if (name === "") {
                        setError("Veuillez saisir un nom")
                        return;
                    }

                    if (email === "") {
                        setError("Veuillez saisir un email")
                        return;
                    }

                    if (password.length < 8) {
                        setError("Le mot de passe doit contenir 8 caractères")
                        return;
                    }

                    if (password !== password2) {
                        setError("Les mots de passes sont differents")
                        return;
                    }

                    fetch("http://localhost:3001/auth/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }).then((response) => {
                        console.log("json");
                        return response.json()
                    }).then((data) => {
                        if (data.error) {
                            console.log("error");
                            setError(data.error)
                            return;
                        } else {
                            console.log("navigate");
                            navigate('/authentification')
                        }

                    }).catch((error) => {
                        console.log(error);
                    })

                }}>Se connecter</button>

                <h6>{error}</h6>
            </div>
        </div>
    );
}

export default Register;
