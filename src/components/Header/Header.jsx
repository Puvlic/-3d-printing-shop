import css from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from '../Images/white_ring.png'
import default_img from '../Images/product.png'
import { decodeToken } from "react-jwt";
import axios from "axios";
import Cookies from 'universal-cookie';
import {useDispatch, useSelector} from "react-redux";
import UserContextMenu from "../UserContextMenu/UserContextMenu";
import UserContextMenuContainer from "../UserContextMenu/UserContextMenuContainer";

const MAIN_DIRECTORY = "/"
const CATALOG_DIRECTORY = "/catalog"
const DELIVERY_DIRECTORY = "/delivery"
const ABOUT_US_DIRECTORY = "/about_us"
const MAKET_DIRECTORY = "/maket"


const Header = (props) => {

    const cookies = new Cookies();
    const jwt  = cookies.get('jwt')

    let loginInfo = {
        insetText: "",
        function: null
    }

    console.log(props.isLogged)

    const SetActiveCart = () => {
        if (jwt){
            props.onCartSetActive(true)
        } else {
            SetLoginMenuActive()
        }

    }

    const SetActiveUserContextMenu = () => {
        props.onSetContextMenuActiveAC(true)
    }

    const SetActiveFavorites = () => {
        if (jwt){
            props.onFavoritesSetActive(true)
        } else {
            SetLoginMenuActive()
        }
    }

    const SetActiveInset = (event) => {
        event.target.localName === 'img' ? props.onSetActiveInset(MAIN_DIRECTORY) : props.onSetActiveInset(event.target.pathname)
    }

    const SetActiveProductType = (type) => {
        props.onSetActiveProductType(type)
    }

    const CatalogRedirect = (event) => {
        SetActiveProductType(1);
        SetActiveInset(event)
    }

    const SetLoginMenuActive = () => {
        props.onSetLoginMenuActive(true)
    }

    const SetPhoneMenuActiveAC = () => {
        props.onSetPhoneMenuActiveAC(true)
    }

    if (props.isLogged) {
        let jwt = cookies.get('jwt')
        let decoded = decodeToken(jwt)
        loginInfo.insetText = decoded.username.toUpperCase()
        loginInfo.function = SetActiveUserContextMenu
    }
    else {
        loginInfo.insetText = 'ВОЙТИ'
        loginInfo.function = SetLoginMenuActive
    }

    return (
        <header className={css.header}>
            <button className={css.phone_menu} onClick={SetPhoneMenuActiveAC}>≡</button>
            <NavLink to={MAIN_DIRECTORY} className={css.menuItemLogo} onClick={SetActiveInset}>
                <img src={logo != null ? logo : default_img} pathname={MAIN_DIRECTORY}/>
                PLASTICTOYS
            </NavLink>
            <div className={css.phone_inputs}>
                <button onClick={SetActiveFavorites} className={css.phone_favorites}>❤</button>
                <button onClick={SetActiveCart} className={css.phone_favorites}>🛒</button>
            </div>
            <ul className={css.headerMenu}>
                <li className={css.menuItem_block + ' ' + css.right_border}>
                    <NavLink to={MAIN_DIRECTORY} className={MAIN_DIRECTORY === props.Location ? css.menuItem + ' ' + css.activeInset : css.menuItem} onClick={SetActiveInset}>ГЛАВНАЯ</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink to={CATALOG_DIRECTORY} className={CATALOG_DIRECTORY === props.Location ? css.menuItem + ' ' + css.activeInset : css.menuItem} onClick={CatalogRedirect}>КАТАЛОГ ТОВАРОВ</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink to={MAKET_DIRECTORY} className={MAKET_DIRECTORY === props.Location ? css.menuItem + ' ' + css.activeInset : css.menuItem} onClick={SetActiveInset}>МАКЕТ</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink to={ABOUT_US_DIRECTORY} className={ABOUT_US_DIRECTORY === props.Location ? css.menuItem + ' ' + css.activeInset : css.menuItem} onClick={SetActiveInset}>О НАС</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink to={DELIVERY_DIRECTORY} className={DELIVERY_DIRECTORY === props.Location ? css.menuItem + ' ' + css.activeInset : css.menuItem} onClick={SetActiveInset}>ДОСТАВКА И ОПЛАТА</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={SetActiveCart} className={css.menuItem}>КОРЗИНА</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={SetActiveFavorites} className={css.menuItem}>ИЗБРАННОЕ</NavLink>
                </li>
                <li>
                    <NavLink onClick={loginInfo.function} className={css.menuItem}>
                        <div>{loginInfo.insetText}</div>
                    </NavLink>
                </li>
            </ul>
        </header>
    )
}

export default Header;