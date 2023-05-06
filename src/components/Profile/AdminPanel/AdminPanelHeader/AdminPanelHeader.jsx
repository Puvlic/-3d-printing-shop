import React from 'react';
import css from './AdminPanelHeader.module.css'

const AdminPanelHeader = (props) => {

    let ordersCssClass = ""
    let productsCssClass = ""
    let maketsCssClass = ""

    if (props.activeInset === 1) {
        ordersCssClass = css.header_list_item  + " " + css.active
        productsCssClass = css.header_list_item
        maketsCssClass = css.header_list_item
    } else if (props.activeInset === 2) {
        ordersCssClass = css.header_list_item
        productsCssClass = css.header_list_item  + " " + css.active
        maketsCssClass = css.header_list_item
    } else {
        ordersCssClass = css.header_list_item
        productsCssClass = css.header_list_item
        maketsCssClass = css.header_list_item   + " " + css.active
    }

    const SetActiveInset = (event) => {
        props.onSetActiveInset(Number(event.target.id))
    }

    return (
        <div className={css.header_wrapper}>
            <ul className={css.header_list}>
                <li id={"1"} onClick={SetActiveInset} className={ordersCssClass}>Заказы</li>
                <li id={"2"} onClick={SetActiveInset} className={productsCssClass}>Товары</li>
                <li id={"3"} onClick={SetActiveInset} className={maketsCssClass}>Макеты</li>
            </ul>
        </div>
    );
};

export default AdminPanelHeader;