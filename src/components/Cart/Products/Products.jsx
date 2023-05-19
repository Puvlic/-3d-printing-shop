import productImageUnderfind from "../../Images/product.png";
import css from './Products.module.css'
import {NavLink} from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import {decodeToken} from "react-jwt";
import {useEffect, useState} from "react";

const Products = (props) => {

    const [cartProduct, setProduct] = useState([])
    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let id
    let decoded


    const getCartProducts = async () => {
        let cartProducts = []
            for (let i = 0; i < props.products.length; i++) {
            await axios.get('http://localhost:8080/api/product/' + props.products[i].product_id).then(res => {
                let product = res.data
                product.productCount = props.products[i].count
                product.cartId = props.products[i].id
                cartProducts.push(product)
            })
        }
        let sort = cartProducts.sort((a, b) => a.id > b.id ? 1 : -1);
        setProduct(sort)
    }


    // const setCartProducts = async (products) => {
    //     if (cartProduct.length !== products.length) {
    //         await getCartProducts(products)
    //     }
    // }
    useEffect(() => {
            if (cartProduct.length !== props.products.length) {
                getCartProducts().then()
            } else if (cartProduct.length === props.products.length) {
                let sort = props.products.sort((a, b) => a.product_id > b.product_id ? 1 : -1);
                for (let i = 0; i < props.products.length; i++) {
                    if (cartProduct[i].productCount !== sort[i].count) {
                        getCartProducts().then()
                    }
                }
            }
    })

    // setCartProducts(props.products)

    if (jwt) {
        decoded = decodeToken(jwt)
        id = decoded.id
    } else {
        id = 1
    }

    const SetActive = () => {
        props.SetActive()
    }

    const SetActiveProduct = (id) => {
        props.SetActiveProduct(id)
    }

    const Redirect = (event) => {
        SetActive()
        SetActiveProduct(Number(event.target.id))
    }

    const IncreaseProductCountInState = (id) => {
        props.AddProductCount(id)
    }

    const IncreaseProductCount = async (event) => {
        let products = []
        let product
        let cart
        await axios.get('http://localhost:8080/api/cart/new/' + id).then(async res => {
            products = res.data
        })

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === Number (event.target.id)) {
                product = products[i]
                break
            }
        }

        for (let i = 0; i < cartProduct.length; i++) {
            if(cartProduct[i].cartId === Number (event.target.id)) {
                cart = cartProduct[i]
            }
        }
        if (product.count < cart.count) {
            await axios.put('http://localhost:8080/api/cart/count_increase/' + Number(event.target.id))
            await axios.get('http://localhost:8080/api/cart/new/' + id).then(async res => {
                await getCartProducts(res.data)

            })
            IncreaseProductCountInState(Number(event.target.name))
        }
    }

    const DecreaseProductCountInState = (id) => {
        props.RemoveProductCount(id)
    }

    const DecreaseProductCount = async (event) => {
        let products = []
        let product
        let cart
        await axios.get('http://localhost:8080/api/cart/new/' + id).then(async res => {
            products = res.data
        })

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === Number (event.target.id)) {
                product = products[i]
                break
            }
        }

        for (let i = 0; i < cartProduct.length; i++) {
            if(cartProduct[i].cartId === Number (event.target.id)) {
                cart = cartProduct[i]
            }
        }

        if (product.count > 1) {
            await axios.put('http://localhost:8080/api/cart/count_decrease/' + Number(event.target.id))
            await axios.get('http://localhost:8080/api/cart/new/' + id).then(async res => {
                getCartProducts(res.data)
            })
            DecreaseProductCountInState(Number(event.target.name))
        } else {
            return
        }

    }

    let currentPrice = 0

    if (cartProduct) {
        for (let i = 0; i < cartProduct.length; i++) {
            currentPrice += cartProduct[i].price * cartProduct[i].productCount
        }
    }
    console.log(cartProduct)
    if (cartProduct.length !== 0) {
        return (
            <div>
                {
                    cartProduct.map(product => (
                        <div className={css.product_body}>
                            <img className={css.product_Img}
                                 src={product.img !== null ? product.img : productImageUnderfind}/>
                            <div className={css.product_info}>
                                <div className={css.product_name}>
                                    <NavLink id={product.id} onClick={Redirect} className={css.link}
                                             to={'/product/' + product.id}>{product.name}</NavLink>
                                </div>
                                <div className={css.product_id}>id: {product.id}</div>
                            </div>
                            <div className={css.product_count_block}>
                                <button onClick={DecreaseProductCount} name={product.id} id={product.cartId}>{'-'}</button>
                                <div className={css.product_count}>{product.productCount}</div>
                                <button onClick={IncreaseProductCount} name={product.id} id={product.cartId}>{'+'}</button>
                            </div>
                            <div className={css.product_price_block}>
                                <div className={css.product_price}>{product.price * product.productCount}р.</div>
                            </div>
                            <button className={css.product_remove} onClick={props.RemoveProduct} id={product.id}>✕</button>
                        </div>
                    ))
                }
                {
                    <div>
                        <div className={css.final_price}>
                            {props.products ? 'Цена: ' + currentPrice : ''}
                        </div>
                        {props.products ? <hr/> : ''}
                    </div>

                }
            </div>
        )
    } else {
        return (
            <div>
                Корзина пуста
            </div>
        )
    }
}

export default Products