import React, {useEffect, useState} from 'react';
import axios from "axios";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";
import css from "../OrderChange/ChangeOrder.module.css";
import {NavLink} from "react-router-dom";

const AcceptedMaketChange = () => {

    const currentUrl = window.location.href;
    let id = currentUrl.split("/").pop()

    const [maketInfo, setMaketInfo] = useState({
        status: "",
        price: ""
    })

    const [validation, setValidation] = useState({
        class: css.validation,
        text: ""
    })

    const GetAcceptedMakets = async () => {
        try {
            await axios.get('http://localhost:8080/api/maket/byId/' + id).then(res => {
                setMaketInfo({
                    status: res.data.status,
                    price: res.data.price.toString()
                })
                window.alert(res.data[0].status + res.data[0].price.toString())
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        GetAcceptedMakets().then()
    }, [maketInfo])

    const ResetValidation = () => {
        setValidation({
            class: validation.class,
            text: ""
        })
    }

    const SetStatusText = (event) => {
        setMaketInfo({
            status: event.target.value,
            price: maketInfo.price
        })
    }

    const SetPriceText = (event) => {
        setMaketInfo({
            status: maketInfo.status,
            price: event.target.value
        })
    }

    const UpdateOrder = async () => {
        if (!maketInfo.status || !maketInfo.price) {
            setValidation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        } else if (isNaN(Number(maketInfo.price))) {
            setValidation({
                class: css.validation_denied,
                text: "Поле цены должно быть числом"
            })
            return
        }
        axios.put('http://localhost:8080/api/accepted_maket/',{
            id: id,
            status: maketInfo.status,
            price: Number(maketInfo.price)
        })

        setValidation({
            class: css.validation_accepted,
            text: "Изенения успешно внесены"
        })
    }

    return (
        <div className={css.inputs_wrapper}>
            <div className={css.inputs_wrapper}>
                Статус<input type="text" value={maketInfo.status} onClick={ResetValidation} className={css.input} placeholder={"Status"} onChange={SetStatusText}/>
                Цена<input type="text" value={maketInfo.price} onClick={ResetValidation} className={css.input} placeholder={"Price"} onChange={SetPriceText}/>
            </div>
            <div className={css.validation + " " + validation.class}>
                {validation.text}
            </div>
            <div className={css.buttons_block}>
                <NavLink onClick={UpdateOrder} className={css.links}>Изменить</NavLink>
                <NavLink to={'/admin'} className={css.links}>Назад</NavLink>
            </div>
        </div>
    );
};

export default AcceptedMaketChange;