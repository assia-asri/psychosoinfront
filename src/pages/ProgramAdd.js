import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProgramAdd() {
    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [slogan, setSlogan] = useState('')
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [price, setPrice] = useState(0)

    return (
        <div className="ProgramAdd">
            <h1>Ajouter un nouveau programme</h1>
            <div className='form'>
                <input type='text' placeholder='Libellé' value={name} onChange={(e) => {
                    setName(e.target.value)
                }} /><br></br>
                <input type='text' placeholder='Slug' value={slug} onChange={(e) => {
                    setSlug(e.target.value)
                }} /><br></br>
                <input type='text' placeholder='Slogan' value={slogan} onChange={(e) => {
                    setSlogan(e.target.value)
                }} /><br></br>
                <textarea rows={5} placeholder='Description' value={description} onChange={(e) => {
                    setDescription(e.target.value)
                }} /><br></br>
                <input type='text' placeholder='URL de la vidéo' value={url} onChange={(e) => {
                    setUrl(e.target.value)
                }} /><br></br>
                <input type='number' placeholder='Prix' value={price} onChange={(e) => {
                    setPrice(e.target.value)
                }} /><br></br>

                <button onClick={(e) => {
                    fetch("http://localhost:3001/programs", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name,
                            slug,
                            slogan,
                            description,
                            url,
                            price
                        })
                    }).then((data) => {
                        navigate('/')
                        console.log(data);
                    }).catch((error) => {
                        console.log(error);
                    });

                }}>Envoyer</button>
            </div>
        </div>
    );
}

export default ProgramAdd;
