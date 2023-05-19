import css from './Footer.module.css'
import logo from '../Images/white_ring.png'

const Footer = (props) => {
    return (
        <footer className={css.footer}>
            <div className={css.footer_item}>
                <div className={css.logo}>
                    <img className={css.img} src={logo} alt=""/>
                    <div>PLACTICTOYS</div>
                </div>
                <div className={css.info}>
                    <div>ООО "Пластиковые изделия"</div>
                    {/*<div>ИНН: 5031076070</div>*/}
                    {/*<div>ОГРН: 1075031006368</div>*/}
                    <div>440068, Пензенская область,
                        г.Пенза, ул.Терновского 172
                    </div>
                </div>
            </div>
            <div className={css.footer_item}>
                <div className={css.number}>
                    8 800 555-35-35
                </div>
                <div className={css.emain}>
                    platictoys@info.com
                </div>
            </div>
        </footer>
    )
}

export default Footer