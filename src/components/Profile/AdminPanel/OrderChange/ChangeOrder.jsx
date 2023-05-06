import React, {useEffect, useState} from 'react';
import axios from "axios";
import css from "./ChangeOrder.module.css"
import {NavLink} from "react-router-dom";

const ChangeOrder = (props) => {

    const currentUrl = window.location.href;
    let id = currentUrl.split("/")

    const [order, setOrder] = useState()
    const [isChange, setIsChange] = useState(false)

    const [validation, setValidation] = useState({
        class: css.validation,
        text: ""
    })

    const GetOrder = () => {
        axios.get('http://localhost:8080/api/order/byId/' + Number(id[id.length - 1]))
             .then(res => {
                 setOrder(res.data)
                 setIsChange(true)
                 props.onSetChangeOrderAddressText(res.data.address)
                 props.onSetChangeOrderStatusText(res.data.status)
             })
    }

    useEffect(() => {
        if (!isChange) {
            GetOrder()
        }
    }, [order, props.statusText, props.addressText])
    console.log(isChange)
    console.log(order)

    const SetChangeOrderAddressText = (event) => {
        props.onSetChangeOrderAddressText(event.target.value)
    }

    const SetChangeOrderStatusText = (event) => {
        props.onSetChangeOrderStatusText(event.target.value)
    }

    const UpdateOrder = () => {
        if (!props.addressText || !props.statusText) {
            setValidation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        axios.put('http://localhost:8080/api/order/' + Number(id[id.length - 1]), {
            id: Number(id[id.length - 1]),
            count: order.count,
            user_id: order.user_id,
            product_id: order.product_id,
            status: props.statusText,
            address: props.addressText
        })
    }

    return (
        <div className={css.inputs_wrapper}>
            <div className={css.inputs_wrapper}>
                Адрес<input type="text" value={props.addressText} className={css.input} placeholder={"Адрес"} onChange={SetChangeOrderAddressText}/>
                Статус<input type="text" value={props.statusText} className={css.input} placeholder={"Статус"} onChange={SetChangeOrderStatusText}/>
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

export default ChangeOrder;