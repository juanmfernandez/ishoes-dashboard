import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";

function Api(){
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3030/api/users')
            .then(response => response.json())
            .then(data =>{ 
                setUsers( data.users );
                setTotalPages( data.totalPages );
                setTotalUsers( data.count );
                setPage( data.currentPage + 1 );
                setPrevPage( data.prevPage );
            })
            .catch(e => console.log("Error: " + e))        
    }, []);

    useEffect(() => {
        console.log("Se actualizo la pagina")
    },[page])

    useEffect(() => {
        return () => console.log("Api unmount")
    },[])

    function loadPrevOrNext(prevPage) {
        return () => {
            fetch(`http://localhost:3030/api/users?page=${prevPage}`)
                .then(response => response.json())
                .then(data =>{ 
                    setUsers( data.users );
                    setPage( data.currentPage + 1 );
                    setPrevPage( data.prevPage );
                })
                .catch(e => console.log("Error: " + e))         
        }
    }
    return(
        <>
            <div className="usuarios">
                {totalUsers ? <><h2>Usuarios totales: {totalUsers} </h2></> : <><p> No hay usuarios registrados </p></>}            
                <div className="next-prev">
                    {prevPage >= 0 && prevPage < totalPages &&
                        <button onClick={loadPrevOrNext(prevPage)}> Prev </button>
                    }
                    <p> Página {page} de {totalPages} </p>
                    {page < totalPages &&
                        <button onClick={loadPrevOrNext(page)}> Next </button>
                    }                    
                </div>
                <div className="table-responsive">
                    <table className="table" >
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>E-mail</th>
                        <th>Pais</th>
                        <th>Ver</th>
                    </tr>
                    {
                        users.map((user, i) => {
                            return(
                                <tr key={i}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.country}</td>
                                    <td>
                                        <Link to={`/user/${user.email}`}>
                                            <BiUser className="icon"/>
                                        </Link>                                        
                                    </td>
                                </tr>
                            )
                        })
                    } 
                    </table>                    
                </div>  

            </div>     
        </>
    )
}

export default Api;