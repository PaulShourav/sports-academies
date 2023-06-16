// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import './style.css'
// import required modules
import { Pagination } from "swiper";
import slider1 from '../assets/images/banner/slider1.jpg'
import slider2 from '../assets/images/banner/slider2.jpg'
import slider3 from '../assets/images/banner/slider3.jpg'
import slider4 from '../assets/images/banner/slider4.jpg'

const SliderBanner = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };
    return (
        <>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div>
                        <img src={slider1} className="w-full h-[300px] md:h-[800px] object-cover" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slider2} className="w-full h-[300px] md:h-[800px] object-cover" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slider3} className="w-full h-[300px] md:h-[800px] object-cover" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src={slider4} className="w-full h-[300px] md:h-[800px] object-cover" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default SliderBanner;