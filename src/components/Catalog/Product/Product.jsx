import productImage from '../../Images/product.png'
import css from './Product.module.css'

const Product = (props) => {

    return (
        <div className={css.product}>
            <div className={css.product_body}>
                <img className={css.product_img} src={props.activeProduct.img === null ? productImage : props.activeProduct.img}/>
                <div className={css.product_info}>
                    <div className={css.product_name}>{props.activeProduct.name}</div>
                    <div className={css.product_id}>id:{props.activeProduct.id}</div>
                    <div className={css.product_about}>{props.activeProduct.aboutproduct}</div>
                </div>

            </div>
        </div>
    )
}

export default Product