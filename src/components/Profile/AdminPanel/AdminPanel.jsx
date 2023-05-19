import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import AdminPanelHeader from "./AdminPanelHeader/AdminPanelHeader";
import AdminPanelHeaderContainer from "./AdminPanelHeader/AdminPanelHeaderContainer";
import css from "./AdminPanel.module.css"
import {NavLink} from "react-router-dom";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";

const AdminPanel = (props) => {

    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [makets, setMakets] = useState([])
    const [isChange, setIsChange] = useState(false)

    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    console.log(decoded)

    let ordersClassName
    let productsClassName
    let maketsClassName

    if (props.activeInset === 1) {
        ordersClassName = css.activate
        productsClassName = css.deactivate
        maketsClassName = css.deactivate
    } else if (props.activeInset === 2) {
        ordersClassName = css.deactivate
        productsClassName = css.activate
        maketsClassName = css.deactivate
    } else {
        ordersClassName = css.deactivate
        productsClassName = css.deactivate
        maketsClassName = css.activate
    }

    const GetProducts = async () => {
        while (true) {
            try {
                await axios.get('http://localhost:8080/api/order').then(async (res) => {
                    if (products.length !== res.data.length) {
                        await setProducts(res.data)
                    }
                })
                break
            } catch {
                continue
            }
        }
    }

    const GetOrders = async () => {
        let ordersList = []
        for (let i = 0; i < products.length; i++) {
            while (true) {
                try {
                    await axios.get('http://localhost:8080/api/product/' + products[i].product_id).then(async r => {
                        let product = r.data
                        product.status = products[i].status
                        product.address = products[i].address
                        product.order_id = products[i].id
                        ordersList.push(product)
                        await setIsChange(true)
                    })
                    break;
                } catch {
                    continue
                }
            }
        }
        let sort = ordersList.sort((a, b) => a.id > b.id ? 1 : -1);
        await setOrders(sort)
    }

    const GetMakets = async () => {
        try {
            await axios.get('http://localhost:8080/api/maket').then(res => {
                console.log(res.data)
                setMakets(res.data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isChange === false) {
            GetProducts().then()
            GetOrders().then()
            GetMakets().then()
        }
    }, [products, orders, makets, isChange])

    if (orders.length !== 0) {
        console.log(orders)
    }

    const SetActiveOrderId = (event) => {
        props.onSetChangeOrderIdAC(Number(event.target.id))
    }

    if (props.catalogProducts.length === 0) {
        axios.get('http://localhost:8080/api/product').then(res => {
                props.onGetProducts(res.data)
            }
        )
    }

    console.log(props.catalogProducts)

    const DownloadFile = (event) => {
        axios({
            url: 'http://localhost:8080/download/' + event.target.id,
            method: 'GET',
            responseType: 'blob',
        }).then(res => {
            console.log(res.data)
            const href = URL.createObjectURL(res.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'model.stl');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }

    const deleteMaket = (event) => {
        axios.delete('http://localhost:8080/delete/' + event.target.id).then(res => {
            setIsChange(false)
            console.log(res)
        })
    }

    if (!jwt || decoded.roles !== 2) {
        return (
            <div className={css.accept_denied}>
                Эта страница вам недоступна
            </div>
        )

    } else {
        return (
            <div>
                <AdminPanelHeaderContainer/>
                <NavLink className={css.back_to_menu_button} to="/profile">Вернуться в профиль</NavLink>
                <div className={ordersClassName}>
                    {orders.map(order => (
                        <div className={css.order_wrapper}>
                            <img src={order.img} className={css.img}/>
                            <div className={css.product_info}>
                                <div className={css.product_name}>
                                    {order.name}
                                </div>
                                <div className={css.product_id}>
                                    id: {order.id}
                                </div>
                                <div className={css.product_count}>
                                    Количество: {order.count}
                                </div>
                            </div>
                            <div className={css.order_info}>
                                <div className={css.status}>
                                    Статус: "{order.status}"
                                </div>
                                <div className={css.address}>
                                    Адрес доставки: {order.address}
                                </div>
                                <div className={css.order_id}>
                                    Номер заказа: {order.order_id}
                                </div>
                            </div>
                            <NavLink to={'/admin/change_order/' + order.order_id} id={order.order_id}
                                     onClick={SetActiveOrderId} className={css.change_button}>Изменить</NavLink>
                        </div>
                    ))}
                </div>
                <div className={productsClassName}>
                    {props.catalogProducts.map(product => (<div className={css.product_wrapper}>
                            <img src={product.img} className={css.img}/>
                            <div className={css.product_info}>
                                <div className={css.product_name}>
                                    {product.name}
                                </div>
                                <div className={css.product_id}>
                                    id: {product.id}
                                </div>
                                <div className={css.product_count}>
                                    Количество: {product.count}
                                </div>
                            </div>
                            <div className={css.order_info}>
                                <div className={css.product_price}>
                                    Цена: {product.price}
                                </div>
                            </div>
                            <NavLink to={'/admin/change_product/' + product.id} className={css.change_button}>Изменить</NavLink>
                        </div>)
                    )}
                </div>
                <div className={maketsClassName}>
                    {makets.map(maket => (
                        <div className={css.maket_wrapper}>
                            <div className={css.product_info}>
                                <div>
                                    Имя файла: {maket.original_file_name}
                                </div>
                                <div className={css.maket_id}>
                                    id: {maket.id}
                                </div>
                                <div>
                                    {maket.price > 0 ? 'Цена: ' + maket.price : ''}
                                </div>
                                <button className={css.download_button} id={maket.id} onClick={DownloadFile}>Скачать файл</button>
                            </div>
                            <div className={css.maket_status}>
                                Статус: {maket.status}
                            </div>
                            <div className={css.order_solution_block}>
                                <NavLink to={'/admin/change_maket/' + maket.id} className={css.order_solution_button}>Принять заказ</NavLink>
                                <button id={maket.id} onClick={deleteMaket} className={css.order_solution_button}>Отмена заказа</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        );
    }

};

export default AdminPanel;