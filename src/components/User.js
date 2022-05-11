import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";

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
                <div className="card">
                    <img src={`http://localhost:3030/profileImages/${user.image}`} className="card-img-top" alt="" />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{user.firstName} {user.lastName}</li>
                        <li className="list-group-item">{user.email}</li>
                        <li className="list-group-item">{user.birthDate}</li>
                    </ul>
                    <div className="card-body">
                        <h5 className="card-title">{user.userName}</h5>
                        <p className="card-text">{user.province} {user.city} {user.address} {user.country}.</p>
                    </div>
                    <div className="card-body">
                        <Link to={`/user/${user.email}`} className="card-link">
                            <BiEdit className="icon"/>
                        </Link>
                        <Link to={`/user/${user.email}`} className="card-link">
                            <BiTrash className="icon"/>
                        </Link>
                    </div>
                </div>
                <div className="table-responsive" style={{'overflow-x': 'auto'}}>
                </div>
            </div>
        </>
    )
}

export default User;