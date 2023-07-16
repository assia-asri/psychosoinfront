import './App.css';
//import de la librairie axios
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

  //afficher la liste des trainings
  const [listOfTrainings, setListOfTrainings] = useState([]);

  //récupérer les données du backend : la liste des trainings
  useEffect(()=>{
    axios.get("http://localhost:3001/trainings").then((response) => {
      setListOfTrainings(response.data);
    });
  },[]);

  return (
    <div className="App">
      {listOfTrainings.map((value, key) => {
        return <div className="training">
          <div className="trainingPicture">
            <img src={value.trainingPicture}/>
            </div>
          <div className="trainingName">{value.trainingName}</div>
          <div className="trainingSlogan">{value.trainingSlogan}</div>
          </div>
      })}
    </div>
  );
}

export default App;
