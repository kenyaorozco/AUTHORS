import './App.css'; 
import { Link, Routes, Route } from 'react-router-dom'
import NewAuthor from './components/NewAuthor';
import {useEffect, useState} from 'react'
import axios from 'axios';
import DisplayAuthors from './components/DisplayAuthors';
import EditAuthor from './components/EditAuthor';

function App() {

 /* ========== Display All Author on home page (aka App.js) ============== */
  const [allAuthors,setAllAuthors] = useState ([])
  const [awaiting,setAwaitng] = useState (false)

//using useEffect to display all authors after they've been created or already in the db

  useEffect(() => {
    axios.get("http://localhost:8000/author")
    .then( result => {
      setAllAuthors(result.data)
      setAwaitng(true)
    })
    .catch(err => console.log("whoops error in the App.js",err))
  },[allAuthors])







  return (
    <div className="App">

      <h1>Favorite Authors</h1>
      <p>We have quotes by:</p>
{/* "/newAuthor will redirect to a form to create " */}
      <Link to={"/newAuthor"}>Add an Author</Link>

{/* ========== Divider between App.js & routes ============== */}

      <Routes>
        <Route path="/newAuthor" element={ <NewAuthor /> } />
        <Route path="/edit/:id" element={ <EditAuthor />}  />
        <Route path="/" element={ awaiting &&
        <DisplayAuthors allAuthors={allAuthors} />} />
      </Routes>

    </div>
  );
}

export default App;
