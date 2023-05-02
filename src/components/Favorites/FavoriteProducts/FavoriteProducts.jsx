import defaultImage from '../../Images/product.png'
import css from './FavoriteProducts.module.css'
import productImageUnderfind from "../../Images/product.png";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";
import {useState} from "react";

const FavoriteProducts = (props) => {



    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        let array = []
        if (jwt) {
            for (let i = 0; i < props.products.length; i++) {
                await axios
                    .get('http://localhost:8080/api/product/' + props.products[i].product_id)
                    .then(res => {
                        array.push(res.data)
                    })
            }
            if (array.length != products.length) {
                setProducts(array)
            }
        }
    }


    getProducts()


    const SetFavoritesActive = () => {
        props.SetActive()
    }

    const SetActiveProduct = (product) => {
        props.SetActiveProduct(product)
    }

    const Redirect = (event) => {
        SetActiveProduct(Number(event.target.id))
        SetFavoritesActive()
    }
    if (products) {
        return (
            <div>
                {
                    products.map(product => (
                        <div className={css.product_body}>
                            <img className={css.product_Img}
                                 src={product.img != null ? product.img : productImageUnderfind}/>
                            <div className={css.product_info}>
                                <div className={css.product_name}>
                                    <NavLink id={product.id} onClick={Redirect} className={css.product_redirect} to={'/product/' + product.id}>{product.name}</NavLink>
                                </div>
                                <div className={css.product_id}>id: {product.id}</div>
                            </div>
                            <div className={css.product_price}>{product.price}р.</div>
                            <button className={css.product_remove} onClick={props.RemoveProduct} id={product.id}>✕</button>
                        </div>
                    ))
                }
            </div>
        )
    }
    else {
        return
    }

}

export default FavoriteProducts