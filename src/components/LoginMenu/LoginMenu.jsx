import css from "./LoginMenu.module.css";
import CatalogHeaderContainer from "../Catalog/CatalogHeader/CatalogHeaderContainer";
import productImageUnderfind from "../Images/product.png";
import {NavLink} from "react-router-dom";
import Products from "../Cart/Products/Products";
import axios from "axios";
import Cookies from 'universal-cookie';
import {decodeToken} from "react-jwt";
import {useState} from "react";

const LoginMenu = (props) => {

    const [registerValidation, setRegisterValidation] = useState({
        class: css.validation,
        text: ""
    })
    const [loginValidation, setLoginValidation] = useState({
        class: css.validation,
        text: ""
    })

    const cookies = new Cookies();

    const SetActiveLoginMenu = () => {
        props.onSetLoginMenuActive(false)
        props.onSetRegisterActive(false)
    }

    const reloadPage = () => {
        window.location.reload();
    }

    const singIn = (isLogged) => {
        props.onSetUser(isLogged)
        reloadPage()
    }

    const UsernameChange = (event) => {
        props.onUsernameChange(event.target.value)
    }

    const PasswordChange = (event) => {
        props.onPasswordChange(event.target.value)
    }

    const OpenRegisterMenu = () => {
        props.onSetRegisterActive(true)
    }

    const CloseRegisterMenu = () => {
        props.onSetRegisterActive(false)
    }

    const RegisterUsernameChange = (event) => {
        props.onRegisterUsernameChange(event.target.value)
    }

    const RegisterPasswordChange = (event) => {
        props.onRegisterPasswordChange(event.target.value)
    }

    const RegisterNameChange = (event) => {
        props.onRegisterNameChange(event.target.value)
    }

    const RegisterSurnameChange = (event) => {
        props.onRegisterSurnameChange(event.target.value)
    }
    const RegisterEmailChange = (event) => {
        props.onRegisterEmailChange(event.target.value)
    }

    const RegisterInfoClean = () => {
        props.onRegisterUsernameChange("")
        props.onRegisterPasswordChange("")
        props.onRegisterNameChange("")
        props.onRegisterSurnameChange("")
    }

    const SetUser = async () => {
        if (!props.username || !props.password) {
            setLoginValidation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        let user = await axios.post('http://localhost:8080/api/login', {
            username: props.username,
            password: props.password
        }).then ((response) => {
            cookies.set('jwt', response.data.token, { path: '/' })
            console.log(response)
            singIn(true);
        }).catch((error) => {
            console.log(error);
            if (error.response.data.errors !== undefined) {
                setLoginValidation({
                    class: css.validation_denied,
                    text: error.response.data.errors.errors[0].msg
                })
            } else {
                setLoginValidation({
                    class: css.validation_denied,
                    text: error.response.data.message
                })
            }
        });
        await axios
            .get('http://localhost:8080/api/cart/new/' + decodeToken(cookies.get('jwt')).id )
            .then(res => {
                props.onCleanProducts()
                props.onSetProductsActionCreator(res.data)
        })
    }

    const Registration = async () => {
        if (!props.registerName || !props.registerSurname || !props.registerUsername || !props.registerEmail || !props.registerPassword) {
            setRegisterValidation({
                class: css.validation_denied,
                text: "Не все поля были заполнены"
            })
            return
        }
        console.log(props.registerName, props.registerSurname, props.registerUsername, props.registerPassword)
        let newUser = await axios.post('http://localhost:8080/api/registration', {
            name: props.registerName,
            surname: props.registerSurname,
            username: props.registerUsername,
            password: props.registerPassword,
            email: props.registerEmail
        }).then ((res) => {
            console.log(res)
            setRegisterValidation({
                class: css.validation,
                text: ""
            })
            RegisterInfoClean()
            props.onSetRegisterActive(false)
        }).catch((error) => {
            console.log(error)
            console.log(error.response.data.errors)
            if (error.response.data.errors !== undefined) {
                setRegisterValidation({
                    class: css.validation_denied,
                    text: error.response.data.errors.errors[0].msg
                })
            } else {
                setRegisterValidation({
                    class: css.validation_denied,
                    text: error.response.data.message
                })
            }

            props.onRegisterUsernameChange("")
            props.onRegisterPasswordChange("")
            return
        })
    }

    const loginClass = props.loginMenuActive ? css.open : css.close

    if (!props.registerIsOpen) {
        return (
            <div className={css.login_menu + ' ' + loginClass} onClick={SetActiveLoginMenu}>
                <div className={css.login_content + ' ' + loginClass} onClick={e => e.stopPropagation()}>
                    <div className={css.login_close} onClick={SetActiveLoginMenu}>✕</div>
                    <h2>Вход</h2>
                    <hr/>
                    <div className={css.login_info}>
                        <div className={css.paragrph}>Имя пользователя</div>
                        <input onChange={UsernameChange} type="text" placeholder='username' className={css.login_input} value={props.username}/>
                        <div className={css.paragrph}>Пароль</div>
                        <input onChange={PasswordChange} type="password" placeholder='password' className={css.login_input} value={props.password}/>
                        <div className={css.validation + " " + loginValidation.class}>
                            {loginValidation.text}
                        </div>
                        <div className={css.buttons}>
                            <button onClick={SetUser}>Вход</button>
                            <button onClick={OpenRegisterMenu}>Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={css.login_menu + ' ' + loginClass} onClick={SetActiveLoginMenu}>
                <div className={css.login_content + ' ' + loginClass} onClick={e => e.stopPropagation()}>
                    <div className={css.login_close} onClick={SetActiveLoginMenu}>✕</div>
                    <h2>Регистрация</h2>
                    <hr/>
                    <div className={css.login_info}>
                        <div className={css.paragrph}>Иия</div>
                        <input onChange={RegisterNameChange} type="text" placeholder='name' className={css.login_input} value={props.registerName}/>
                        <div className={css.paragrph}>Фамилия</div>
                        <input onChange={RegisterSurnameChange} type="text" placeholder='surname' className={css.login_input} value={props.registerSurname}/>
                        <div  className={css.paragrph}>Имя пользователя</div>
                        <input onChange={RegisterUsernameChange} type="text" placeholder='username' className={css.login_input} value={props.registerUsername}/>
                        <div className={css.paragrph}>Email</div>
                        <input onChange={RegisterEmailChange} type="text" placeholder='email' className={css.login_input} value={props.registerEmail}/>
                        <div className={css.paragrph}>Пароль</div>
                        <input onChange={RegisterPasswordChange} type="password" placeholder='password' className={css.login_input} value={props.registerPassword}/>
                        <div className={css.validation + " " + registerValidation.class}>
                            {registerValidation.text}
                        </div>
                        <div className={css.buttons}>
                            <button onClick={CloseRegisterMenu}>Авторизация</button>
                            <button onClick={Registration}>Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default LoginMenu