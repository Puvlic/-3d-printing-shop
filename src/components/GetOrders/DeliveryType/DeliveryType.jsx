import React, {useState} from 'react';
import css from "./DeliveryType.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";

const DeliveryType = (props) => {

    const cookies = new Cookies()
    let jwt = cookies.get(`jwt`)
    let decoded = decodeToken(jwt)
    let id = jwt ? decoded.id : -1

    const [expressDeliveryActive, SetExpressDeliveryActive] = useState(css.express_delivery_deactivated)
    const [pickupActiveActive, SetPickupActive] = useState(css.pickup_delivery_deactivated)
    const [postalDeliveryActive, SetPostalDeliveryActive] = useState(css.postal_delivery_deactivated)

    const [ED_validation, setED_validation] = useState({
        class: "",
        text: "text"
    })
    const [P_validation, setP_validation] = useState({
        class: "",
        text: "text"
    })
    const [PD_validation, setPD_validation] = useState({
        class: "",
        text: "text"
    })

    const SetExpressDeliveryActiveFunction = () => {
        SetExpressDeliveryActive(css.express_delivery_activated)
        SetPickupActive(css.pickup_delivery_deactivated)
        SetPostalDeliveryActive(css.postal_delivery_deactivated)
    }

    const SetPickupActiveFunction = () => {
        SetExpressDeliveryActive(css.express_delivery_deactivated)
        SetPickupActive(css.pickup_delivery_activated)
        SetPostalDeliveryActive(css.postal_delivery_deactivated)
    }

    const SetPostalDeliveryActiveFunction = () => {
        SetExpressDeliveryActive(css.express_delivery_deactivated)
        SetPickupActive(css.pickup_delivery_deactivated)
        SetPostalDeliveryActive(css.postal_delivery_activated)
    }

    const SetNewExpressDeliveryCardNumber = (event) => {
        props.onSetNewExpressDeliveryCardNumber(event.target.value)
    }

    const SetNewExpressDeliveryAddress = (event) => {
        props.onSetNewExpressDeliveryAddress(event.target.value)
    }

    const SetNewPickupCardNumber = (event) => {
        props.onSetNewPickupCardNumber(event.target.value)
    }

    const SetNewPostalDeliveryCardNumber = (event) => {
        props.onSetNewPostalDeliveryCardNumber(event.target.value)
    }

    const SetNewPostalDeliveryAddress = (event) => {
        props.onSetNewPostalDeliveryAddress(event.target.value)
    }

    const CleanParams = () => {
        props.onSetNewExpressDeliveryCardNumber("")
        props.onSetNewExpressDeliveryAddress("")
        props.onSetNewPickupCardNumber("")
        props.onSetNewPostalDeliveryCardNumber("")
        props.onSetNewPostalDeliveryAddress("")
        axios.delete("http://localhost:8080/api/cart/deleteAll").then(r => props.onCleanProducts())
    }

    const ED_GetOrder = () => {
        if (!props.ED_cardNumber || !props.ED_address) {
            setED_validation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        if (props.ED_cardNumber.length != 16) {
            setED_validation({
                class: css.validation_denied,
                text: "Неверный формат номера карты"
            })
            return
        }
        for (let i = 0; i < props.cartProducts.length; i++) {
            axios.post("http://localhost:8080/api/order", {
                count: props.cartProducts[i].productCount,
                user_id: id,
                product_id: props.cartProducts[i].id,
                status: "Подготовка к отправке",
                address: props.ED_address,
            }).catch(error => {
                if (error.response.data.errors !== undefined) {
                    setED_validation({
                        class: css.validation_denied,
                        text: error.response.data.errors.errors[0].msg
                    })
                } else {
                    setED_validation({
                        class: css.validation_denied,
                        text: error.response.data.message
                    })
                }
            })
        }
        CleanParams()
    }

    axios.get("http://localhost:8080/api/order/", {user_id: id})
        .then(res => {
            console.log(res.data)
        })

    console.log(props.cartProducts)

    const P_GetOrder = () => {
        if (!props.P_cardNumber || !props.P_address) {
            setP_validation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        if (props.P_cardNumber.length != 16) {
            setP_validation({
                class: css.validation_denied,
                text: "Неверный формат номера карты"
            })
            return
        }
        for (let i = 0; i < props.cartProducts.length; i++) {
            axios.post("http://localhost:8080/api/order", {
                count: props.cartProducts[i].productCount,
                user_id: id,
                product_id: props.cartProducts[i].id,
                status: "Подготовка к отправке",
                address: props.P_address,
            }).then()
        }
        CleanParams()
    }

    const PD_GetOrder = () => {
        if (!props.PD_cardNumber || !props.PD_address) {
            setPD_validation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        if (props.PD_cardNumber.length != 16) {
            setPD_validation({
                class: css.validation_denied,
                text: "Неверный формат номера карты"
            })
            return
        }
        for (let i = 0; i < props.cartProducts.length; i++) {
            axios.post("http://localhost:8080/api/order", {
                count: props.cartProducts[i].productCount,
                user_id: id,
                product_id: props.cartProducts[i].id,
                status: "Подготовка к отправке",
                address: props.PD_address,
            }).then()
        }
        CleanParams()
    }

    return (
        <div>
            <div className={css.radio_buttons}>
                <ul>
                    <li><input onClick={SetExpressDeliveryActiveFunction} className={css.input} name="delivery"
                               value="1" type="radio"/> Курьерская доставка
                    </li>
                    <li><input onClick={SetPickupActiveFunction} className={css.input} name="delivery" value="2"
                               type="radio"/> Самовывоз
                    </li>
                    <li><input onClick={SetPostalDeliveryActiveFunction} className={css.input} name="delivery" value="3"
                               type="radio"/> Почтовая доставка
                    </li>
                </ul>
            </div>
            {}
            <div className={expressDeliveryActive}>
                <div className={css.requisites}>
                    Номер карты <input className={css.textbox} type="text" placeholder="Номер"
                                       value={props.ED_cardNumber} onChange={SetNewExpressDeliveryCardNumber}/>
                    Адресс доставки <input className={css.textbox} type="text" placeholder="Адрес"
                                           value={props.ED_address} onChange={SetNewExpressDeliveryAddress}/>
                    <div className={css.validation + " " + ED_validation.class}>
                        {ED_validation.text}
                    </div>
                    <button className={css.get_order_button} onClick={ED_GetOrder}>Заказать</button>
                </div>
            </div>
            <div className={pickupActiveActive}>
                <div className={css.requisites}>
                    Номер карты <input className={css.textbox} type="text" placeholder="Номер"
                                       value={props.P_cardNumber} onChange={SetNewPickupCardNumber}/>
                    Адресс доставки <input className={css.textbox} type="text" value={props.P_address}
                                           placeholder="Адрес"/>
                    <div className={css.validation + " " + P_validation.class}>
                        {P_validation.text}
                    </div>
                    <button className={css.get_order_button} onClick={P_GetOrder}>Заказать</button>
                </div>
            </div>
            <div className={postalDeliveryActive}>
                <div className={css.requisites}>
                    Номер карты <input className={css.textbox} type="text" placeholder="Номер"
                                       value={props.PD_cardNumber} onChange={SetNewPostalDeliveryCardNumber}/>
                    Почтовый индекс <input className={css.textbox} type="text" placeholder="Индекс"
                                           value={props.PD_address} onChange={SetNewPostalDeliveryAddress}/>
                    <div className={css.validation + " " + PD_validation.class}>
                        {PD_validation.text}
                    </div>
                    <button className={css.get_order_button} onClick={PD_GetOrder}>Заказать</button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryType;