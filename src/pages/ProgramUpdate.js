import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProgramUpdate() {
    // useParam permet de recuper le paramettre id (ou autre) depuis le path du navigateur
    let { id } = useParams();
    let navigate = useNavigate();

    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [slogan, setSlogan] = useState('')
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [price, setPrice] = useState(0)

    // récuperer les données su programme depuis le back
    // puis, allimenter les etats
    useEffect(() => {
        fetch('http://localhost:3001/programs/' + id).then((response) => {
          return response.json()
        }).then((data) => {
          setName(data.name)
          setSlug(data.slug)
          setSlogan(data.slogan)
          setDescription(data.description)
          setUrl(data.url)
          setPrice(data.price)
        })
    }, [])

    return (
        <div className="ProgramUpdate">
            <h1>Modifier le programme</h1>
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
                    // mettre a jour les données grace au route PUT
                    fetch("http://localhost:3001/programs/" + id, {
                        method: "PUT",
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

                }}>Mettre à jour</button>
            </div>
        </div>
    );
}

export default ProgramUpdate;
