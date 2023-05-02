import React from 'react';
import css from './CatalogHeader.module.css'

const CatalogHeader = (props) => {

    const SetActiveType = (event) => {
        debugger
        props.onSetActiveType(Number(event.target.id))
    }

    return (
        <ul className={css.list}>
            {
                props.productTypes.map(product => (<li className={props.activeProductType === product.id ? css.active_type : ''}>
                    <button id={product.id} onClick={SetActiveType} className={css.button}>
                        {product.type}
                    </button>
                </li>
                ))
            }
        </ul>
    );
};

export default CatalogHeader;