import productImage from '../../Images/product.png'
import css from './Product.module.css'
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";

const Product = (props) => {

    const id = window.location.href.split('/').pop()

    const cookies = new Cookies()
    let jwt = cookies.get(`jwt`)
    let decoded = decodeToken(jwt)

    if (props.products.length === 0) {
        axios.get('http://localhost:8080/api/product').then(res => {
                props.onGetProducts(res.data)
            }
        )}

    props.setActiveProduct(Number(id))

    const AddInCart = async (event) => {
        if (jwt) {
            await axios
                .post('http://localhost:8080/api/cart', {
                    user_id: decoded.id,
                    product_id: Number(id)
                })
                .then(res => {})
            await axios
                .get('http://localhost:8080/api/cart/new/' + decoded.id)
                .then(res => {
                    props.onCleanProducts()
                    props.onSetProductsActionCreator(res.data)
                })
        } else {
            props.onSetLoginMenuActive(true)
        }

    }

    const RemoveFromCart = async (event) => {
        if (jwt) {
            await axios
                .delete('http://localhost:8080/api/cart', {
                    data: {
                        user_id: decoded.id,
                        product_id: Number(id)
                    }
                })
                .then(res => {})
            await axios
                .get('http://localhost:8080/api/cart/' + decoded.id)
                .then(res => {
                    props.onCleanProducts()
                    props.onSetProductsActionCreator(res.data)
                })
        } else {
            props.onSetLoginMenuActive(true)
        }
    }

    const AddFavorite = async (event) => {
        if (jwt) {
            await axios
                .post('http://localhost:8080/api/favorites', {
                    user_id: decoded.id,
                    product_id: Number(id)
                }).then(res => {

                })
            await axios
                .get('http://localhost:8080/api/favorites/' + decoded.id)
                .then(res => {
                    props.onCleanFavorites()
                    props.onSetNewFavorites(res.data)
                })
        } else {
            props.onSetLoginMenuActive(true)
        }
    }


    const RemoveFavorite = async (event) => {
        if (jwt) {
            await axios
                .delete('http://localhost:8080/api/favorites', {
                    data: {
                        user_id: decoded.id,
                        product_id: Number(id)
                    }
                })
                .then(res => {
                })
            await axios
                .get('http://localhost:8080/api/favorites/' + decoded.id)
                .then(res => {
                    props.onCleanFavorites()
                    props.onSetNewFavorites(res.data)
                })
        } else {
            props.onSetLoginMenuActive(true)
        }
    }

    const productIncludeInCart = (id) => {
        if (props.cart.length > 0){
            for (let i = 0; i < props.cart.length; i++) {
                if (Number(id) === props.cart[i].product_id) {
                    return true
                }
            }
        }
        return false
    }

    const productIncludeInFavorites = (id) => {
        if (props.favorites.length > 0) {
            for (let i = 0; i < props.favorites.length; i++) {
                if (Number(id) === props.favorites[i].product_id) {
                    return true
                }
            }
        }
        return false
    }

    return (
        <div className={css.product}>
            <div className={css.product_body}>
                <div>
                    <img className={css.product_img} src={props.activeProduct.img === null ? productImage : props.activeProduct.img}/>
                    <div className={css.buttons_block}>
                        <button onClick={productIncludeInCart(id) ? RemoveFromCart : AddInCart}>{productIncludeInCart(id) ? "Из корзины" : "В корзину"}</button>
                        <button onClick={productIncludeInFavorites(id) ? RemoveFavorite : AddFavorite}>{productIncludeInFavorites(id) ? "Из избранного" : "В избранное"}</button>
                    </div>
                </div>
                <div className={css.product_info}>
                    <div className={css.product_name}>{props.activeProduct.name}</div>
                    <div className={css.product_id}>id:{props.activeProduct.id}</div>
                    <div className={css.product_price}>Цена: {props.activeProduct.price}</div>
                    <div className={css.product_about}>{props.activeProduct.aboutproduct}</div>
                </div>
            </div>
        </div>
    )
}

export default Product