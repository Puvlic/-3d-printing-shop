import React, {useEffect, useState} from 'react';
import axios from "axios";
import css from './ProductChange.module.css'
import {NavLink} from "react-router-dom";

const ProductChange = (props) => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [count, setCount] = useState(null)
    const [aboutProduct, setAboutProduct] = useState("")
    const [type, setType] = useState(null)
    const [img, setImg] = useState("")
    const [isChange, setIsChange] = useState(false)

    const [validation, setValidation] = useState({
        class: css.validation,
        text: ""
    })

    const currentUrl = window.location.href;
    let id = currentUrl.split("/")
    id = id[id.length - 1]

    const GetProduct = () => {
        axios.get('http://localhost:8080/api/product/' + id).then(res => {
            console.log(res.data)
            setName(res.data.name)
            setPrice(res.data.price)
            setCount(res.data.count)
            setAboutProduct(res.data.aboutproduct)
            setType(res.data.type)
            setImg(res.data.img)
            setIsChange(true)
        })
    }

    const UpdateProduct = () => {
        if (!name || !price || !count || !aboutProduct) {
            setValidation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        axios.put('http://localhost:8080/api/product/', {
            id: id,
            name: name,
            type: type,
            price: price,
            img: img,
            count: count,
            aboutproduct: aboutProduct
        }).then(res => {
            console.log(res.data)
        })

        setValidation({
            class: css.validation_accepted,
            text: "Изенения успешно внесены"
        })
    }

    useEffect(() => {
        if (!isChange) {
            GetProduct()
        }
    })

    const SetProductName = (event) => {
        setName(event.target.value)
    }

    const SetProductPrice = (event) => {
        setPrice(event.target.value)
    }

    const setProductCount = (event) => {
        setCount(event.target.value)
    }

    const setAboutProductFunction = (event) => {
        setAboutProduct(event.target.value)
    }

    const ResetValidation = () => {
        setValidation({
            class: css.validation_accepted,
            text: ""
        })
    }

    return (
        <div className={css.inputs_wrapper}>
            <div className={css.inputs_block}>
                Название <input className={css.input} type="text" value={name} onClick={ResetValidation} onChange={SetProductName}/>
                Цена <input className={css.input} type="text" value={price} onClick={ResetValidation} onChange={SetProductPrice}/>
                Количество <input className={css.input} type="text" value={count} onClick={ResetValidation} onChange={setProductCount}/>
                Описание <textarea className={css.textarea} value={aboutProduct} onClick={ResetValidation} onChange={setAboutProductFunction}></textarea>
            </div>
            <div className={css.validation + " " + validation.class}>
                {validation.text}
            </div>
            <div className={css.buttons_block}>
                <NavLink onClick={UpdateProduct} className={css.links}>Изменить</NavLink>
                <NavLink to={'/admin'} className={css.links}>Назад</NavLink>
            </div>
        </div>

    );
};

export default ProductChange;