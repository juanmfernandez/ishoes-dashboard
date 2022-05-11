import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


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
                <div className="detalleProducto">
                    <div className="imagenProducto">
                        <img src={`http://localhost:3030/${product.image}`} alt="" />
                    </div>

                    <div className="detalle">
                        <h2>{product.nombre}</h2>
                        <h3>{product.marca}</h3>
                        <div className="descripcion">
                            <h2>DESCRIPCIÓN</h2>
                            <p>{product.descripcion}</p>
                        </div>                
                        <label>Precio USD {product.precio} </label>
                        
                        <div className="talles">
                            <label htmlFor="talles">Talles  </label>       
                        </div>
                        <div>                
                            <select name="talles" id="talles" className="talles">
                                <option value>Elegí una opción...</option>
                                        <option value="<%= producto.talle %>">{product.talle}</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;