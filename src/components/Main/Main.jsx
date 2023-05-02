import css from './Main.module.css'
import {NavLink} from "react-router-dom";
import main from "../Images/main.jpg"
import axios from "axios";
import productImageUnderfind from "../Images/product.png";
import CarouselBox from "./CarouselBox/CarouselBox";

const Main = (props) => {

    let productTypes = Object.entries(props.productTypes)
    let popularProducts

    if (props.products.length === 0) {
        axios.get('http://localhost:8080/api/product').then(res => {
                debugger
                console.log((res.data))
                props.onGetProducts(res.data)
            }
        )}

    const SetActiveTypeInCatalog = (event) => {
        for (let i = 0; i < productTypes.length; i++) {
            if (productTypes[i][1] === event.target.innerHTML) {
                props.onSetActiveType(productTypes[i][1])
                return
            }
        }
        props.onSetActiveType(1)
    }

    const ChangeActiveInset = (event) => {
        SetActiveTypeInCatalog(event)
        props.onSetActiveInset('/catalog')
    }

    const GetPopularProducts = () => {
        let products = props.products.filter(product => product.type === 3);
        return products
    }
    popularProducts = GetPopularProducts();
    debugger

    const Redirect = (event) => {
        props.onSetActiveProduct(Number(event.target.id))
    }

    const AddFavorite = (event) => {
        let productInFavorite
        props.products.forEach(product => product.id === Number(event.target.id) ? productInFavorite = product : '')
        props.onAddFavorite(productInFavorite)
    }

    const RemoveFavorite = (event) => {
        let productInFavorite
        props.products.forEach(product => product.id === Number(event.target.id) ? productInFavorite = product : '')
        props.onRemoveFavorite(productInFavorite)
    }

    const AddInCart = (event) => {
        let productInCart
        props.products.forEach(product => product.id === Number(event.target.id) ? productInCart = product : '')
        props.onAddInCart(productInCart)
    }

    const RemoveFromCart = (event) => {
        let productFromCart
        props.cart.forEach(product => product.id === Number(event.target.id) ? productFromCart = product : '')
        props.onRemoveFromCart(productFromCart)
    }
    return (
        <div className={css.main}>
            <div className={css.start_buying_block}>
                <div className={css.info_block}>
                    <h2 className={css.h_info}>{'3D-ПЕЧАТЬ'}</h2>
                    <p className={css.p_info}>Откройте для себя новые возможности творчества! Воплотите свои фантазии в реальность с нашей широкой линейкой качественных и доступных продуктов, которые помогут вам создавать уникальные и оригинальные проекты. Создавайте, экспериментируйте и воплощайте свои самые смелые идеи в жизнь с нашим интернет-магазином 3D-печатных изделий!</p>
                </div>
                <button className={css.start_buying}>
                    <NavLink onClick={ChangeActiveInset} className={css.link} to='/catalog'>Начать покупки</NavLink>
                </button>
            </div>
            <div className={css.slider}>
                <CarouselBox products={popularProducts}/>
            </div>


        </div>
    )
}

export default Main