import css from './Cart.module.css'
import Products from "./Products/Products";
import axios from "axios";
import Cookies from 'universal-cookie';
import {decodeToken} from "react-jwt";
import {useState} from "react";
import {NavLink} from "react-router-dom";

const Cart = (props) => {

    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)
    let cartProducts = []

    const StateUpdate = (products) => {
        // props.onCleanProducts()
        props.onSetProductsActionCreator(products)
    }

    const getProducts = async () => {
        if (jwt) {
            await axios.get('http://localhost:8080/api/cart/new/' + decoded.id).then(res => {
                if (props.products.length != res.data.length) {
                    StateUpdate(res.data)
                }
            })
            console.log(props.products)
        }
    }

    getProducts()

    const SetActive = () => {
        props.onSetActive(false)

    }

    const SetCartProducts = (products) => {
        props.onSetCartProductsActionCreator(products)
    }

    const RemoveProduct = async (event) => {
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
                    props.onRemoveProduct()
                })
        } else {
            props.onSetLoginMenuActive(true)
        }
    }

    const AddProductCount = (id) => {
        debugger
        props.onAddProductCount(id)
    }

    const RemoveProductCount = (id) => {
        props.onRemoveProductCount(id)
    }

    let cartClass = props.active ? css.open : css.close
    let buyButtonClass = props.products.length !== 0 ? css.open : css.close

    debugger
    return (
        <div className={css.cart + ' ' + cartClass} onClick={SetActive}>
            <div className={css.cart_content + ' ' + cartClass} onClick={e => e.stopPropagation()}>
                <div className={css.cart_close} onClick={SetActive}>✕</div>
                <h2>Ваши товары</h2>
                <hr/>
                <Products products={props.products} RemoveProduct={RemoveProduct} SetActive={SetActive}
                          SetActiveProduct={props.onSetActiveProduct} StateUpdate={StateUpdate} SetCartProducts={SetCartProducts}
                          cartProduct={props.cartProducts} AddProductCount={AddProductCount} RemoveProductCount={RemoveProductCount} getProducts={getProducts}/>
                <NavLink onClick={SetActive} to='get_orders' className={css.buy + ' ' + buyButtonClass}>Оформить заказ</NavLink>
            </div>
        </div>
    )
}

export default Cart