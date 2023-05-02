import {useDispatch, useSelector} from "react-redux";
import css from './UserContextMenu.module.css'
import FavoriteProducts from "../Favorites/FavoriteProducts/FavoriteProducts";
import Cookies from "universal-cookie";
import axios from "axios";
import {decodeToken} from "react-jwt";
import {useState} from "react";
import {NavLink} from "react-router-dom";

const UserContextMenu = (props) => {

    const [user, setUser] = useState()
    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    let username = " "

    const GetUser = async () => {
        if (jwt && !user) {
            await axios.get('http://localhost:8080/api/user/' + decoded.id).then(res => {
                setUser(res.data[0].name + " " + res.data[0].surname)
            })
        }
    }

    const Logout = () => {
        props.onSetActiveAC(false)
        props.onRemoveUser()
        cookies.remove('jwt')
        window.location.reload();
    }

    GetUser()

    console.log(username)

    const SetActive = () => {
        props.onSetActiveAC(false)
    }

    const active = props.active ? css.opened : css.closed

    return (
        <div className={css.menu_block + ' ' + active} onClick={SetActive}>
            <div className={css.blur + ' ' + active}>
                <div className={css.menu_content+ ' ' + active} onClick={e => e.stopPropagation()}>
                    <div className={css.menu_header}>
                        <h2 className={css.menu_title}>{user}</h2>
                        <div onClick={SetActive} className={css.menu_close}>✕</div>
                    </div>
                    <hr/>
                    <div className={css.menu_points}>
                        <button className={css.menu_points_button + " " + css.menu_link}>
                            <NavLink to='/profile' className={css.menu_link} onClick={SetActive}>Профиль</NavLink>
                        </button>

                        <button className={css.menu_points_button} onClick={Logout}>Выйти</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserContextMenu