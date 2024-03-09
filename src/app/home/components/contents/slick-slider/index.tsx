import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { useState } from "react";
import Slider, { CustomArrowProps, LazyLoadTypes } from "react-slick";
import ItemSlider from "./item-slider";
import "./slick.css";

function DynamicSlides() {
    const [slides] = useState([1, 2, 3, 4, 5, 6]);
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => {
        if (currentSlide === 0) return null;

        return <ArrowBackIosTwoToneIcon
            {...props}
        />
    };

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
        <ArrowForwardIosTwoToneIcon
            {...props}
        />
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: true,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        useCSS: true,
        rtl: false,
        lazyLoad: 'progressive' as LazyLoadTypes,
    };
    return (
        <div className="slider-container w-full">
            <Slider {...settings}>
                {slides.map(slide => {
                    return (
                        <ItemSlider key={slide} />
                    );
                })}
            </Slider>
        </div>
    );
}

export default DynamicSlides;
