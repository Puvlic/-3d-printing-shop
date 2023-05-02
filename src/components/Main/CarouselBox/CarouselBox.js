import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './CarouselBox.css'

const CarouselBox = (props) => {
    Carousel.controls = false

    return (

        <div>
            <Carousel className='slider' indicators={false} controls={false}>
                {props.products.map(product =>
                    (<Carousel.Item>
                        <img className='img' src={product.img}/>
                        <Carousel.Caption>
                            <h3>{product.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>)
                )
                }
            </Carousel>
        </div>
    );
}

export default  CarouselBox



