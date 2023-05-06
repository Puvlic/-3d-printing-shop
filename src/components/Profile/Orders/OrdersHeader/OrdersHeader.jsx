import React from 'react';
import css from "../../AdminPanel/AdminPanelHeader/AdminPanelHeader.module.css";

const OrdersHeader = (props) => {

    let productsCssClass = ""
    let maketsCssClass = ""

    if (props.activeInset === 1) {
        productsCssClass = css.header_list_item + " " + css.active
        maketsCssClass = css.header_list_item
    } else {
        productsCssClass = css.header_list_item
        maketsCssClass = css.header_list_item + " " + css.active
    }

    const SetActiveInset = (event) => {
        props.onSetActiveInset(Number(event.target.id))
    }

    return (
        <div className={css.header_wrapper}>
            <ul className={css.header_list}>
                <li id={"1"} onClick={SetActiveInset} className={productsCssClass}>Заказы</li>
                <li id={"2"} onClick={SetActiveInset} className={maketsCssClass}>Макеты</li>
            </ul>
        </div>
    );
};

export default OrdersHeader;