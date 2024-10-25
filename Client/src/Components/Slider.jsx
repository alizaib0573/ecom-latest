import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const SliderContainer = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 2,
        autoplay: true,
        fade: true,               
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
              autoplay: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              autoplay: true,
            }
          }
        ]
      };
      const slideData = [
        { id: 1, imageUrl: 'https://picsum.photos/id/1015/800/600' },
        { id: 2, imageUrl: 'https://picsum.photos/id/1016/800/600' },
        { id: 3, imageUrl: 'https://picsum.photos/id/1018/800/600' },
        { id: 4, imageUrl: 'https://picsum.photos/id/1019/800/600' },
        { id: 5, imageUrl: 'https://picsum.photos/id/1020/800/600' }
      ];
  return (
    <>
    <div className="container    mx-auto mt-8 slider 2xl:px-12 px-12" style={{padding:'0 285px !importance'}}>
    <Slider {...settings} >
    {slideData.map(slide => (
        <div key={slide.id}>
            <div className="lg:grid-cols-10 "  style={{maxWidth:'1225px',margin:'0 auto',height:'450px'}}>
          <img src={slide.imageUrl} className='img-fluid' alt={`Slide ${slide.id}`} style={{maxWidth:'100%',width:'100%',height:'450px',borderRadius: '20px'}}/>
          </div>
        </div>
      ))}
    </Slider>
    </div>
    </>
  )
}

export default SliderContainer