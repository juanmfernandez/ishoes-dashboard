import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

function Productos(){
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3030/api/products')
            .then(response => response.json())
            .then(data =>{ 
                setProducts( data.products );
                setTotalProducts( data.count );
                setTotalPages( data.totalPages );
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
            fetch(`http://localhost:3030/api/products?page=${prevPage}`)
                .then(response => response.json())
                .then(data =>{ 
                    setProducts( data.products )
                    setPage( data.currentPage + 1 );
                    setPrevPage( data.prevPage );
                })
                .catch(e => console.log("Error: " + e))         
        }
    }

    return(
        <>
            <div className="productos">
                {totalProducts ? <><h2>Productos totales: {totalProducts} </h2></> : <><p> No hay productos en stock </p></>}   
                <div className="next-prev">
                    {prevPage >= 0 && prevPage < totalPages-1 &&
                            <button onClick={loadPrevOrNext(prevPage)}> Prev </button>                        
                    }
                    <p> Página {page} de {totalPages} </p>
                    {page < totalPages &&
                        <button onClick={loadPrevOrNext(page)}> Next </button>
                    }                    
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Stock</th>
                            </tr>
                            {
                                products.map((product, i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{product.nombre}</td>
                                            <td>{product.marca}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                <Link to={`/product/${product.id}`}>
                                                        <BiSearchAlt className="icon"/>
                                                </Link>                                          
                                            </td>

                                        </tr>
                                    )
                                })
                            }                             
                        </tbody>
                    </table>                    
                </div>

            </div>
        </>
    )
}

export default Productos;