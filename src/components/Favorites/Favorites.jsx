import css from './Favorites.module.css'
import FavoriteProducts from "./FavoriteProducts/FavoriteProducts";
import axios from "axios";
import Cookies from 'universal-cookie';
import {decodeToken} from "react-jwt";

const Favorites = (props) => {

    const cookies = new Cookies();
    let jwt = cookies.get('jwt')
    let decoded = decodeToken(jwt)
    debugger
    const getProducts = async () => {
        if (jwt) {
            await axios.get('http://localhost:8080/api/favorites/' + decoded.id).then(res => {
                if (props.products.length != res.data.length) {
                    props.onCleanFavorites()
                    props.onSetNewFavorites(res.data)
                }
            })
        }
    }

    getProducts()

    const SetActive = () => {
        props.onSetActive(false)
    }

    // const RemoveProduct = (event) => {
    //     for (let i = 0; i < props.products.length; i++) {
    //         if (props.products[i].id === Number(event.target.id)) {
    //             props.onRemoveFavorites(props.products[i])
    //         }
    //     }
    // }

    const RemoveFavorite = async (event) => {
        if (jwt) {
            await axios
                .delete('http://localhost:8080/api/favorites', {
                    data: {
                        user_id: decoded.id,
                        product_id: Number(event.target.id)
                    }
                })
                .then(res => {
                })
            await axios
                .get('http://localhost:8080/api/favorites/' + decoded.id)
                .then(res => {
                    props.onCleanFavorites()
                    props.onSetNewFavorites(res.data)
                })
        } else {
            props.onSetLoginMenuActive(true)
        }
    }

    let favoriteActive = props.active ? css.opened : css.closed
    debugger
    return (
        <div className={css.favorite_block + ' ' + favoriteActive} onClick={SetActive}>
            <div className={css.blur + ' ' + favoriteActive}>
                <div className={css.favorite_content+ ' ' + favoriteActive} onClick={e => e.stopPropagation()}>
                    <div className={css.favorite_header}>
                        <h2 className={css.favorite_title}>Избранные</h2>
                        <div onClick={SetActive} className={css.favorite_close}>✕</div>
                    </div>
                    <hr/>
                    <FavoriteProducts products={props.products} SetActive={SetActive} RemoveProduct={RemoveFavorite} SetActiveProduct={props.onSetActiveProduct}/>
                </div>
            </div>
        </div>
    )
}

export default Favorites;