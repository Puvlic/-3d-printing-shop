import React, {useEffect, useState} from 'react';
import css from './MaketChange.module.css'
import axios from "axios";
import {NavLink} from "react-router-dom";

const MaketChange = () => {

    const currentUrl = window.location.href;
    let id = currentUrl.split("/").pop()

    const [price, setPrice] = useState(null)
    const [isChange, setIsChange] = useState(false)
    const [changeIsAccepted, SetChangeIsAccepted] = useState(false)

    const [validation, setValidation] = useState({
        class: css.validation,
        text: ""
    })

    useEffect(() => {
        if (!isChange) {
            axios.get('http://localhost:8080/api/maket/byId/' + id).then(res => {
                if(res.data.accept_status != 1) {
                    SetChangeIsAccepted(true)
                } else {
                    console.log(res.data)
                    setPrice(res.data.price)
                    setIsChange(true)
                }
            })
        }
    }, [price, isChange])

    const acceptMaket = () => {
        if (!price) {
            setValidation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }

        axios.put('http://localhost:8080/api/maket/', {
            id: id,
            price: price
        }).then(res => {
            console.log(res)
        })

        setValidation({
            class: css.validation_accepted,
            text: "Изенения успешно внесены"
        })
        SetChangeIsAccepted(true)
    }

    if (!changeIsAccepted) {
        return (
            <div className={css.inputs_wrapper}>
                <div className={css.inputs_block}>
                    Цена <input className={css.input} type="text" value={price} onChange={e => setPrice(Number(e.target.value))}/>
                </div>
                <div className={css.validation + " " + validation.class}>
                    {validation.text}
                </div>
                <div className={css.buttons_block}>
                    <NavLink onClick={acceptMaket} className={css.links}>Оформить</NavLink>
                    <NavLink to={'/admin'} className={css.links}>Назад</NavLink>
                </div>
            </div>
        );
    } else {
        return  (
            <div className={css.maket_accepted_block}>
                Заказ был успешно оформлен
                <NavLink to={'/admin'} className={css.links}>Назад</NavLink>
            </div>

        )
    }

};

export default MaketChange;