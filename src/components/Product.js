import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";

function Product(){
    const params = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/api/products/${params.id}`)
            .then(response => response.json())
            .then(data =>{ 
                setProduct( data.producto );
            })
            .catch(e => console.log("Error: " + e))
    }, []);

    useEffect(() => {
        console.log("Se actualizo la pagina")
    },[product])

    useEffect(() => {
        return () => console.log("Api unmount")
    },[])

    if (product === undefined) {
        return(
            <div className="productos">
                <h1>Loading {JSON.stringify(params.id)}</h1>    
            </div>
            
        )
    }
    return(
        <>
            <div className="producto">
                <div className="card">
                    <img src={`http://localhost:3030/${product.image}`} className="card-img-top" alt="" />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Marca: {product.marca}</li>
                        <li className="list-group-item">Talle: {product.talle}</li>
                        <li className="list-group-item">u$s {product.precio}</li>
                        <li className="list-group-item">Stock: {product.stock}</li>
                    </ul>
                    <div className="card-body">
                        <h5 className="card-title">{product.id} {product.nombre}</h5>
                        <p className="card-text">{product.descripcion}.</p>
                    </div>
                    <div className="card-body">
                        <Link to={`/product/${product.id}`} className="card-link">
                            <BiEdit className="icon"/>
                        </Link>
                        <Link to={`/product/${product.id}`} className="card-link">
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

export default Product;