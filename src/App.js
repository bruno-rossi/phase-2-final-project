import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, Navigate, useNavigate} from "react-router-dom";
import Parks from "./pages/Parks";
import "./App.css";

function App() {

  const [parks, setParks] = useState([]);
  const [search, setSearch] = useState("Park");
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8000/stamps")
      .then(res => res.json())
      .then(data => setStamps(data))
  }, [])

  useEffect(() => {
    fetch(`https://developer.nps.gov/api/v1/parks?limit=472&start=0&api_key=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      setParks(data);
      console.log(data);
    })
  }, [])

  if(!parks.data){
    return <h1>Loading...</h1>;
  };

  return (
    <div className="App">
        <NavBar />
        <Outlet context={{parks: parks, search: search, setSearch: setSearch, stamps: stamps, setStamps: setStamps}} />
    </div>
  );
}

export default App;
