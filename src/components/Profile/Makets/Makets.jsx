import React, {useEffect, useState} from 'react';
import css from "./Makets.module.css";
import {NavLink} from "react-router-dom";
import axios from "axios";

const Makets = () => {

    const [makets, setMakets] = useState([])
    const [isChange, setIsChange] = useState(false)

    const currentUrl = window.location.href;
    let id = currentUrl.split("/").pop()

    useEffect(() => {
        if (!isChange) {
            axios.get('http://localhost:8080/api/maket/' + id).then(res => {
                setMakets(res.data)
                setIsChange(true)
            })
        }
    }, [makets, isChange])

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

    const DiscountRequest = (event) => {
        axios.put('http://localhost:8080/api/maket/discount/' + event.target.id).then(res => {
            console.log(res.data)
            setIsChange(false)
        })
    }

    const AcceptOrder = (event) => {
        axios.put('http://localhost:8080/api/maket/accept/' + event.target.id).then(res => {
            console.log(res.data)
            setIsChange(false)
        })
    }

    return (
        <div>
            <NavLink className={css.back_to_menu_button} to="/profile">Вернуться в профиль</NavLink>
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
                        <button onClick={DownloadFile} className={css.download_button} id={maket.id} >Скачать файл</button>
                    </div>
                    <div className={css.maket_status}>
                        Статус: {maket.status}
                    </div>
                    <div className={css.order_solution_block}>
                        <NavLink onClick={AcceptOrder} id={maket.id} className={css.order_solution_button}>Принять заказ</NavLink>
                        <NavLink onClick={DiscountRequest} id={maket.id} className={css.order_solution_button}>Понижение цены</NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Makets;