import Cookies from "universal-cookie";
import css from "./Profile.module.css"
import {decodeToken} from "react-jwt";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

const Profile = (props) => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        id: -1,
        email: "",
    })
    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    const Logout = () => {
        props.onSetActiveAC(false)
        props.onRemoveUser()
        cookies.remove('jwt')
        window.location.reload();
    }

    const GetUser = async () => {
        if(user.id === -1) {
            await axios.get('http://localhost:8080/api/user/' + decoded.id).then(res => {
                console.log(res.data)
                setUser({name: res.data[0].name, surname: res.data[0].surname, id:res.data[0].id, email:res.data[0].email})
            })
        }

    }

    GetUser()
    useEffect(() => {
        console.log(user)
    }, [user])


    if (!jwt) {
        return (
            <div className={css.accept_denied}>
                Эта страница вам недоступна
            </div>
        )
    } else {
        return (
            <div className={css.profile_wrapper}>
                <div className={css.user_info_block_wrapper}>
                    <div className={css.user_info_block}>
                        <div className={css.user_info}>
                            {user.name}
                        </div>
                        <div className={css.user_info}>
                            {user.surname}
                        </div>
                        <button className={css.logout_button} onClick={Logout}>
                            <NavLink className={css.next_order} to='/'>Выйти</NavLink>
                        </button>

                    </div>
                    <div className={css.user_info_email}>
                        {user.email}
                    </div>
                </div>

                <div className={css.orders_wrapper}>
                    <NavLink className={css.orders_list}>
                        Спиок заказов
                    </NavLink>
                    <div className={css.next_order}>
                        Ближайший заказ
                    </div>
                </div>
            </div>
        )
    }

}

export default Profile