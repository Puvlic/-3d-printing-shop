import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";
import css from "./Orders.module.css"
import {NavLink} from "react-router-dom";
import OrdersHeaderContainer from "./OrdersHeader/OrdersHeaderContainer";

const Orders = (props) => {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [makets, setMakets] = useState([])
    const [isChange, setIsChange] = useState(false)
    const [maketIsChange, setMaketIsChange] = useState(false)
    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    let ordersClassName
    let maketsClassName

    if (props.activeInset === 1) {
        ordersClassName = css.activate
        maketsClassName = css.deactivate
    } else {
        ordersClassName = css.deactivate
        maketsClassName = css.activate
    }

    const GetProducts = async () => {
        while (true) {
            try {
                await axios.get('http://localhost:8080/api/order/' + decoded.id).then(async (res) => {
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
        axios.get('http://localhost:8080/api/maket/byUser/' + decoded.id).then(async res => {
            await setMakets(res.data)
            await setMaketIsChange(true)
        })
    }

    useEffect(() => {
        if (!isChange) {
            GetProducts().then()
            GetOrders().then()
        }
    }, [products, orders, isChange])

    useEffect(() => {
        if (!maketIsChange) {
            GetMakets().then()
        }
    }, [makets, maketIsChange])

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

    console.log(makets)
    console.log(orders)

    return (
        <div className={css.orders}>
            <NavLink className={css.back_to_menu_button} to="/profile">Вернуться в профиль</NavLink>
            <OrdersHeaderContainer/>
            <div className={ordersClassName}>
                {orders.map(order => (
                    <div className={css.order_wrapper}>
                        <img src={order.img} className={css.order_img}/>
                        <div className={css.order_info}>
                            <div className={css.order_name}>
                                {order.name}
                            </div>
                            <div className={css.order_id}>
                                id: {order.id}
                            </div>
                            <div className={css.order_count}>
                                Количество: {order.count}
                            </div>
                        </div>
                        <div className={css.order_status}>
                            <div className={css.order_status}>
                                Статус: {order.status}
                            </div>
                            <div>
                                {order.address}
                            </div>
                        </div>
                    </div>
                ))}
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
                            <div className={css.maket_id}>
                                Цена: {maket.price}
                            </div>
                            <button className={css.download_button} id={maket.id} onClick={DownloadFile}>Скачать файл</button>
                        </div>
                        <div className={css.maket_status}>
                            Статус: {maket.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;