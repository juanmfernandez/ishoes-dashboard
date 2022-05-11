import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function User(){
    const params = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/api/users/${params.id}`)
            .then(response => response.json())
            .then(data =>{ 
                setUser( data.user );
            })
            .catch(e => console.log("Error: " + e))
    }, []);

    useEffect(() => {
        console.log("Se actualizo la pagina")
    },[user])

    useEffect(() => {
        return () => console.log("Api unmount")
    },[])

    if (user === undefined) {
        return(
            <div className="usuario">
                <h1>Loading {JSON.stringify(params.id)}</h1>    
            </div>
            
        )
    }
    return(
        <>
            <div className="usuario">
            <div className="table-responsive" style={{'overflow-x': 'auto'}}>
                    
                <p>Usuario</p>
                <table className="table" >
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>email</th>
                </tr>
                            <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                </table>
            </div>
            </div>
        </>
    )
}

export default User;