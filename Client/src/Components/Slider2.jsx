import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Image from "../assets/images/Logo.svg"

const Slider2 = () => {


    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const updateTime = () => {
        setTime(new Date());
      };
  
      const intervalId = setInterval(updateTime, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const formatTime = (date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours} : ${minutes} : ${seconds}`;
    };

    const settings = {
    
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
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
        { 
          id: 1, imageUrl: 'https://picsum.photos/id/1015/800/600',
          title:"[브랜드] 제목제목제목제목",
          Image:Image,
          name:'5만원 이용권'

        },
        { 
          id: 2, imageUrl: 'https://picsum.photos/id/1016/800/600',
          title:"[브랜드] 제목제목제목제목",
           Image:Image,
           name:'5만원 이용권'

        },
        { 
          id: 3, imageUrl: 'https://picsum.photos/id/1018/800/600',
          title:"[브랜드] 제목제목제목제목",
           Image:Image,
           name:'5만원 이용권'

        },
        { 
          id: 4, imageUrl: 'https://picsum.photos/id/1019/800/600',
          title:"[브랜드] 제목제목제목제목",
           Image:Image,
           name:'5만원 이용권'

        },
        { 
          id: 5, imageUrl: 'https://picsum.photos/id/1020/800/600',
          title:"[브랜드] 제목제목제목제목",
          name:'5만원 이용권',
          Image:Image,
        }
      ];
  return (
    <>
    <div className="slider-container mx-auto  slider-2 container-fluid 2xl:px-12 ">
    <div className="slider-2-heading ">
        <h2>Remaining time for open</h2>
    </div>
    <div className="time slider-2-time  ">
        <h3>{formatTime(time)}</h3>
        <h4>미리 찜해두고 혜택 받아가세요!!</h4>
    </div>
    
        <Slider {...settings}>
    {slideData.map(slide => (
        <div key={slide.id} className='2xl:ms-3' >
        <div className='lg:px-3 2xl:px-0   mb-2' >
          <img src={slide.imageUrl}  alt={`Slide ${slide.id}`}  style={{borderRadius:'10px',width:'291px',height:'163px'}}/>
          </div>
          <div className='lg:px-3 slider-2-heading-bottom'>
            <img src={slide.Image} alt="" className='pb-3'/>
        <h3>{slide.title}</h3>
        <h4>{slide.name}</h4>
          </div>
        </div>
      ))}
    </Slider>
    
    </div>
    </>
  )
}

export default Slider2