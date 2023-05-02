import React, {useEffect} from 'react';
import css from './GetOrders.module.css'
import axios from "axios";
import {useState} from "react";

const GetOrders = (props) => {

    const [cartProducts, setProduct] = useState([])

    let price = 0

    const getCartProducts = async () => {
        let cartProduct = []
        for (let i = 0; i < props.products.length; i++) {
            await axios.get('http://localhost:8080/api/product/' + props.products[i].product_id).then(res => {
                let product = res.data
                product.productCount = props.products[i].count
                product.cartId = props.products[i].id
                cartProduct.push(product)
            })
        }

        let sort = cartProduct.sort((a, b) => a.id > b.id ? 1 : -1);
        console.log(sort)
        setProduct(sort)
    }

    useEffect(() => {
            getCartProducts()
    }, [cartProducts])


    console.log(cartProducts)

    for (let i = 0; i < cartProducts.length; i++) {
        price += cartProducts[i].price * cartProducts[i].productCount
    }

    if (cartProducts.length !== 0) {
        return (
            <div className={css.get_orders_block}>
                {cartProducts?.map(product => (
                    <div className={css.product_wrapper}>
                        <img src={product.img} className={css.product_img}/>
                        <div className={css.product_info}>
                            <div className={css.product_name}>
                                {product.name}
                            </div>
                            <div className={css.product_id}>
                                id: {product.id}
                            </div>
                            <div className={css.product_count}>
                                Количество: {product.productCount}
                            </div>
                        </div>
                        <div className={css.product_price}>
                            Цена: {product.price * product.productCount}
                        </div>
                    </div>
                ))}
                <div className={css.all_product_price}>
                    Итого: {price}
                </div>
                <hr/>

            </div>
        );
    } else {
        return (
            <div>
                Корзина пуста
            </div>
        )
    }

};

export default GetOrders;