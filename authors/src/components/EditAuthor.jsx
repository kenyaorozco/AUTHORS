import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAuthor = (props) => {
    // navigate to a different route 
    const navigate = useNavigate();

    // Deconstruct the param that was used on our link on the App.js
    const { id } = useParams();

    // Reuse the Vars that were created when we created our form
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // create const to show errors from our server to our client 
    const [errors, setErrors] = useState([])

    // use get method to render 1 id 
    useEffect(() => {
        axios.get("http://localhost:8000/author/" + id)
            .then(result => {
                // the data was returning an an obj had to call the obj to get the data alone, wanted to prefilter our data, calle each func to 
                console.log(result.data.author);
                setFirstName(result.data.author.firstName);
                setLastName(result.data.author.lastName);
            })
            .catch(error => console.log(error))
    }, [id])
    // in our submit form, then we call our update method to actually update the product
    const updateAuthor = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/update/author/" + id, {
            firstName,
            lastName
        })
            .then(res => { navigate("/") })
            .catch(err => {
                // Get the errors from err.response.data
                const errorResponse = err.response.data.errors;
                // Define a temp error array to push the messages in
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }


    return (
        <form onSubmit={updateAuthor}>
            {errors.map((err, index) => <p key={index} style={{ color: "red" }} >{err}</p>)}
            <h3>Update Author</h3>
            Name: <input onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            <input onChange={(e) => setLastName(e.target.value)} value={lastName} />
            <button style ={{color:"white",background:"violet"}}>Update</button>
            <button style ={{color:"white",background:"violet"}}>Cancel</button>
        </form>

    )
}

export default EditAuthor