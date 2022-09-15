import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewAuthor = () => {
// create a navigate function to redirect the page once the form has been completed
    const navigate = useNavigate();

// create const that will take the data that the form will take in and then send it to the DB
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState ('')

// create const to show errors from our server to our client 
    const [errors, setErrors] = useState([])

// create an onSubmit function that will send the data off to the DB and redirect the page once submitted
    const createAuthor = (e) => {
        e.preventDefault();
        // call in axios to connect our react app to our server
        axios.post("http://localhost:8000/newAuthor",{
            firstName,
            lastName
        })
        // after form is submitted it will redirect to the main page
        .then( result => {navigate("/")})
        .catch( err =>{ const errorResponse = err.response.data.errors; 
            // Get the errors from err.response.data
            const errorArr = []; 
            // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        })            

    }

        // Used nav to redirect our page to our edit page
        const goToHome = () => {
            console.log();
            navigate("/")
        }


    return (
        <fieldset>
            <form onSubmit={createAuthor}>
                <h2>Add a new Author: <br />
                    <button onClick={goToHome}>Home</button>
                </h2>
            {errors.map((err, index) => <p style={{color:"red"}} key={index}>{err}</p>)}
                First Name: <input value={firstName} onChange={(e => setFirstName(e.target.value))}/> 
                Last Name: <input value={lastName} onChange={(e => setLastName(e.target.value))}/>
                <button style={{background:"cyan"}}>Create</button>
            </form>
        </fieldset>
    )
}

export default NewAuthor