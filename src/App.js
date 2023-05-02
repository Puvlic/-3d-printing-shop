import css from './App.module.css'
import './App.css';
import Main from "./components/Main/Main";
import {BrowserRouter, Router, Route} from "react-router-dom";
import {Routes} from "react-router";
import {CatalogContainer} from "./components/Catalog/CatalogContainer";
import {ProductContainer} from "./components/Catalog/Product/ProductContainer";
import CartContainer from "./components/Cart/CartContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import FavoriteContainer from "./components/Favorites/FavoritesContainer";
import FooterContainer from "./components/Footer/FooterConteiner";
import MaketContainer from "./components/Maket/MaketContainer";
import MainContainer from "./components/Main/MainContainer";
import LoginMenuContainer from "./components/LoginMenu/LoginMenuContainer";
import AboutUs from "./components/AboutUs/AboutUs";
import AboutUsContainer from "./components/AboutUs/AboutUsContainer";
import store from "./components/Redux/redux";
import Cookies from 'universal-cookie';
import Delivery from "./components/Delivery/Delivery";
import UserContextMenu from "./components/Redux/Resucers/UserContextMenuReducer";
import UserContextMenuContainer from "./components/UserContextMenu/UserContextMenuContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import GetOrders from "./components/GetOrders/GetOrders";
import Orders from "./components/Profile/Orders/Orders";
import GetOrdersContainer from "./components/GetOrders/GetOrdersContainer";



const App = (props) => {
    let cartActive = props.cartActive
    let favoritesActive = props.favoritesActive
    let cartProducts = props.cartProducts
    let favorites = props.favorites
    const cookies = new Cookies();

    const singIn = (isLogged) => {
        props.onSetUser(isLogged)
    }

    if (cookies.get('jwt')) {
        singIn(true)
    }

    let modalWindowIsOpen = () => {
        if (cartActive === true || favoritesActive === true) {
            return css.modal_window_open
        }
        else {
            return css.modal_window_close
        }
    }

    let CartSetActive = () => {
        props.onCartSetActive(true)
    }

    let CartFunction

    let FavoritesSetActive = () => {
        props.onFavoritesSetActive(true)
    }

    let FavoriteFunction

    let cartIsEmpty = () => {
        if (cartProducts.length === 0) {
            return css.cartIsEmpty
        }
        else {
            CartFunction = CartSetActive
            return css.cartIsFilled
        }
    }

    let favoritesIsEmpty = () => {
        if (favorites.length === 0) {
            return css.favoritesIsEmpty
        }
        else {
            FavoriteFunction = FavoritesSetActive
            return css.favoritesIsFilled
        }
    }

    let modalWindow = modalWindowIsOpen()
    let cartButtonCssClass = cartIsEmpty()
    let favoritesButtonCssClass = favoritesIsEmpty()

    debugger
    return (
        <BrowserRouter className={css.body}>
            <div className={css.wrapper + ' ' + modalWindow}>
                <HeaderContainer/>
                <div className={css.main}>
                    <Routes>
                        <Route path='/' element={<MainContainer/>}></Route>
                        <Route path='/catalog' element={<CatalogContainer/>}></Route>
                        <Route path='/product/:id' element={<ProductContainer/>}></Route>
                        <Route path='/maket' element={<MaketContainer/>}></Route>
                        <Route path='/about_us' element={<AboutUsContainer/>}></Route>
                        <Route path='/delivery' element={<Delivery/>}></Route>
                        <Route path='/profile' element={<ProfileContainer/>}></Route>
                        <Route path='/get_orders' element={<GetOrdersContainer/>}></Route>
                        <Route path='/orders' element={<Orders/>}></Route>
                    </Routes>
                </div>
                <FooterContainer className={css.footer}/>
            </div>
            <button className={css.cart + ' ' + cartButtonCssClass} onClick={CartFunction}>
                <div>{cartProducts.length}</div>
                {'🛒'}
            </button>
            <button className={css.favorites + ' ' + favoritesButtonCssClass} onClick={FavoriteFunction}>
                <div className={css.favoritesCount}>{favorites.length}</div>
                <div className={css.favoritesButton}>{'❤'}</div>
            </button>
            <FavoriteContainer/>
            <CartContainer/>
            <LoginMenuContainer/>
            <UserContextMenuContainer/>
        </BrowserRouter>
    );
}

export default App;
