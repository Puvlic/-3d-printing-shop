import {NavLink} from "react-router-dom";
import css from './MobileMenu.module.css'
import {useDispatch, useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {decodeToken} from "react-jwt";

const MobileMenu = () => {

    const cookies = new Cookies();
    const jwt  = cookies.get('jwt')
    let decoded = decodeToken(jwt)

    let styleClass = ""
    let userCssClass = {
        user: "",
        login: ""
    }

    if (jwt) {
        userCssClass.user = ""
        userCssClass.login = css.isLogged
    } else {
        userCssClass.user = css.isLogged
        userCssClass.login = ""
    }



    const header = useSelector(state => state.header);
    const isLogged = useSelector(state => state.loginMenu.userIsLogged)
    const dispatch = useDispatch()

    const MAIN_DIRECTORY = "/"
    const CATALOG_DIRECTORY = "/catalog"
    const DELIVERY_DIRECTORY = "/delivery"
    const ABOUT_US_DIRECTORY = "/about_us"
    const MAKET_DIRECTORY = "/maket"


    let loginInfo = {
        insetText: "ВОЙТИ",
        function: null
    }

    if (header.phoneMenuActive) {
        styleClass = css.menu_active
    } else {
        styleClass = css.menu_disable
    }

    const DisableMobileMenu = () => {
        dispatch({type:"SET-PHONE-MENU-ACTIVE", active: false})
    }

    const LoginMenuOpen = () => {
        DisableMobileMenu()
        dispatch({type:"SET-ACTIVE", loginMenuActive: true})
    }

    const CartOpen = () => {
        DisableMobileMenu()
        if (jwt) {
            dispatch({type:"SET-ACTIVE", cartActive: true})
        } else {
            dispatch({type:"SET-ACTIVE", loginMenuActive: true})
        }
    }

    const FavoritesOpen = () => {
        DisableMobileMenu()
        if (jwt) {
            dispatch({type:"SET-ACTIVE", favoritesActive: true})
        } else {
            dispatch({type:"SET-ACTIVE", loginMenuActive: true})
        }
    }

    const plug = () => {}
    console.log(isLogged)

    if (isLogged) {
        let decoded = decodeToken(jwt)
        loginInfo.insetText = decoded.username.toUpperCase()
        loginInfo.function = plug
    }
    else {
        loginInfo.insetText = 'ВОЙТИ'
        loginInfo.function = LoginMenuOpen
    }

    return (
        <div className={css.phone_menu_wrapper + ' ' + styleClass}>
            <div className={css.phone_menu_header}>
                <div>Меню</div>
                <div onClick={DisableMobileMenu}>✕</div>
            </div>
            <hr className={css.hr_line}/>
            <ul className={css.phone_menu}>
                <li>
                    <NavLink onClick={LoginMenuOpen} className={userCssClass.login + ' ' + css.menuItem}>
                        <div>
                            ВОЙТИ
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={DisableMobileMenu} to='/profile' className={userCssClass.user + ' ' + css.menuItem}>
                        <div>
                            {jwt ? decoded.username.toUpperCase() : ""}
                        </div>
                    </NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={DisableMobileMenu} className={css.menuItem} to={MAIN_DIRECTORY}>ГЛАВНАЯ</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={DisableMobileMenu} className={css.menuItem} to={CATALOG_DIRECTORY}>КАТАЛОГ ТОВАРОВ</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={DisableMobileMenu} className={css.menuItem} to={MAKET_DIRECTORY}>МАКЕТ</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={DisableMobileMenu} className={css.menuItem} to={ABOUT_US_DIRECTORY}>О НАС</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={DisableMobileMenu} className={css.menuItem} to={DELIVERY_DIRECTORY}>ДОСТАВКА И ОПЛАТА</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={CartOpen} className={css.menuItem}>КОРЗИНА</NavLink>
                </li>
                <li className={css.menuItem_block}>
                    <NavLink onClick={FavoritesOpen} className={css.menuItem}>ИЗБРАННОЕ</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MobileMenu;