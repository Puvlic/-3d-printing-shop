import productImageUnderfind from "../Images/product.png"
import css from "./Catalog.module.css"
import {NavLink} from "react-router-dom";
import CatalogHeaderContainer from "./CatalogHeader/CatalogHeaderContainer";
import axios from "axios";
import Cookies from 'universal-cookie';
import {decodeToken} from "react-jwt";
import {useEffect, useState} from "react";

const Catalog = (props) => {

    const [cartProduct, setCartProduct] = useState([])

    const cookies = new Cookies()
    let jwt = cookies.get(`jwt`)
    let decoded = decodeToken(jwt)
    let id = jwt ? decoded.id : -1

    const GetCartProducts = async () => {
        await axios
            .get('http://localhost:8080/api/cart/' + id)
            .then(res => {
                setCartProduct(res.data)
            })
    }

    const GetFavoritesProducts = async () => {
        await axios
            .get('http://localhost:8080/api/favorites/' + decoded.id)
            .then(res => {
                props.onSetNewFavorites(res.data)
            })
    }

    useEffect(() => {
        const loadData = async () => {
            await GetCartProducts()
        }
        loadData()
    }, [])

    useEffect(() => {
        const loadData = async () => {
            await GetFavoritesProducts()
        }
        loadData()

    }, [])

    if (props.types.length === 0) {
        axios.get('http://localhost:8080/api/type').then(res => {
            props.onGetTypes(res.data)
        })
    }

    if (props.products.length === 0) {
        axios.get('http://localhost:8080/api/product').then(res => {
                props.onGetProducts(res.data)
            }
        )}

    const Redirect = (event) => {
        props.onSetActiveProduct(Number(event.target.id))
    }

    const AddFavorite = async (event) => {
        if (jwt) {
            await axios
                .post('http://localhost:8080/api/favorites', {
                    user_id: decoded.id,
                    product_id: Number(event.target.id)
                }).then(res => {

                })
            await axios
                .get('http://localhost:8080/api/favorites/' + decoded.id)
                .then(res => {
                    console.log(res.data)
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
                        product_id: Number(event.target.id)
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

    const AddInCart = async (event) => {
        if (jwt) {
            await axios
                .post('http://localhost:8080/api/cart', {
                    user_id: decoded.id,
                    product_id: Number(event.target.id)
                })
                .then(res => {})
            await axios
                .get('http://localhost:8080/api/cart/new/' + decoded.id)
                .then(res => {
                    setCartProduct(res.data)
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
                        product_id: Number(event.target.id)
                    }
                })
                .then(res => {})
            await axios
                .get('http://localhost:8080/api/cart/' + decoded.id)
                .then(res => {
                    setCartProduct(res.data)
                    props.onCleanProducts()
                    props.onSetProductsActionCreator(res.data)
                })
        } else {
            props.onSetLoginMenuActive(true)
        }
    }

    let products

    if (props.activeType === 1) {
        products = props.products
    }
    else {
        products = props.products.filter(product => product.type === props.activeType)
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
        <div className={css.catalog}>
            <CatalogHeaderContainer/>
            <div className={css.catalog_body}>
                {
                    products.map(product =>
                            (<div className={css.catalog_product}>
                        <div className={css.imageBox}>
                            <img src={product.img != null ? product.img : productImageUnderfind}
                                 className={css.productImage}/>
                            <button id={product.id}
                                    onClick={productIncludeInFavorites(product.id) ? RemoveFavorite : AddFavorite}
                                    className={productIncludeInFavorites(product.id) ? css.favoriteButton + ' ' + css.favoriteInclude : css.favoriteButton}>❤</button>
                        </div>
                        <div className={css.product_info}>{product.name}</div>
                        <div className={css.product_info}>Цена: {product.price}</div>
                        <div className={css.buttons}>
                            <NavLink to={'/product/' + product.id}><button onClick={Redirect} id={product.id} className={css.button}>Подробнее</button></NavLink>
                            <button onClick={productIncludeInCart(product.id) ? RemoveFromCart : AddInCart}
                                    id={product.id} className={css.button}>{productIncludeInCart(product.id) ? 'Из корзины' : 'В корзину'}</button>
                        </div>
                    </div>)
                    )
                }
            </div>
        </div>
    )
}

export default Catalog