import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  let navigate = useNavigate();

  const [programs, setPrograms] = useState([])

  // ce hook s'execute une seule fois grace au tableau vide (deuxieme parametre)
  useEffect(() => {
    fetch('http://localhost:3001/programs').then((response) => {
      return response.json()
    }).then((data) => {
      setPrograms(data)
    })
  }, [])

  return (
    <div className="App">
      <button onClick={()=>navigate("/programmes/nouveau")}>
        Ajouter un programme
      </button>
      <div className='table'>
        <div className='table-row'>
          <div className='table-column'>
            libellé
          </div>
          <div className='table-column'>
            slogan
          </div>
          <div className='table-column'>
            description
          </div>
          <div className='table-column'>
            url
          </div>
          <div className='table-column'>
            prix
          </div>
          <div className='table-column'>
            crée le
          </div>
        </div>
        {
          programs.map((program) => {
            return <div className='table-row'>
              <div className='table-column'>{program.name}</div>
              <div className='table-column'>{program.slogan}</div>
              <div className='table-column'>{program.description}</div>
              <div className='table-column'>{program.url}</div>
              <div className='table-column'>{program.price}</div>
              <div className='table-column'>{program.createdAt}</div>
              <div className='table-column'>
                <button>
                  editer
                </button>
                <button
                  onClick={() => {
                    // appel du backend route de suppression de program
                    fetch('http://localhost:3001/programs/' + program.id, {
                      method: "DELETE"
                    }).then(()=>{
                      // recuperation de la nouvelle liste des programmes sans celui qu'on a supprimer
                      fetch('http://localhost:3001/programs').then((response) => {
                        return response.json()
                      }).then((data) => {
                        setPrograms(data)
                      })
                    })
                  }}
                >
                  supprimer
                </button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
