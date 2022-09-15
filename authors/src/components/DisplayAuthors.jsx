import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
// import { Link } from 'react-router-dom'

const DisplayAuthors = (props) => {
    // Navigate to a different route
    const navigate = useNavigate();


    // Used nav to redirect our page to our edit page
    const goToUpdate = (authorID) => {
        console.log(authorID);
        navigate("/edit/" + authorID)
    }

    // DELETE // using window.confirm it allows us to confirm a delete, acts as a validation
    const deleteAuthor = (author) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            axios.delete("http://localhost:8000/delete/author/"
                + author)
                .then(result => (result.data.author))
                .catch(error => console.log(error))
            navigate("/")
        }
    }

    return (

        <fieldset>
            <table style={{ margin:"auto",wordSpacing:"space-evenly"}}>
                <thead>
                    <tr style={{background:"pink"}}>
                        <th>Authors</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.allAuthors.map((author) =>
                        <tr key={author._id}>
                            <td>{author.firstName} {author.lastName}</td>
                            <td>
                                <button style ={{color:"white",background:"green"}}onClick={() => goToUpdate(author._id)}>edit</button>
                                <button  style={{background:"red",color:"white"}}  onClick={() => deleteAuthor(author._id)}>delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </fieldset>
    )
}

export default DisplayAuthors