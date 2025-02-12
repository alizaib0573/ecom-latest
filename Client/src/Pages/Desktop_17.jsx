import React, { useEffect, useContext, useState, useRef } from "react"; // Import useRef
import Gropu from "../assets/images/Group 26285.svg";
import Vector from "../assets/images/Vectore.svg";
import CategoryData from "../JsonData/Category.json";
import Blog from "../assets/images/Blog.svg";
import { AuthContext } from '../App'; // Import the context
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppProvider } from "../ContextApi/Api";

const Desktop17 = () => {
  const { name, token, email } = useContext(AuthContext); // Access context values
  const { item } = useContext(AppProvider);
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  

  
  // Create a ref for the Chinese section
  const chineseSectionRef = useRef(null);
  const howToRegisterRef = useRef(null);
  const scrollToMissionRef = useRef(null)
  const scrollToKeyWordRef = useRef(null)
  const scrollToAditionalRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`, {
          // params: {
          //   userId: email,
          // },
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const result = response.data;
          console.log(result);
          setProduct(result);
        } else if (response.status === 205) {
          alert("No Campaigns Data found! Empty!");
        } else {
          alert("ERROR OCCURRED");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to perform operation: " + error.message);
      }
    };

    fetchData();
  }, [id, email, token]); // Add dependencies

  const data = item;
  const SliceData = data.slice(0, 4);

  console.log(data)

  // Function to scroll to the Chinese section
  const scrollToChineseSection = () => {
    if (chineseSectionRef.current) {
      chineseSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToHowToRegisterSection = () => {
    if (howToRegisterRef.current) {
      howToRegisterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToMission =()=>{
    if (scrollToMissionRef.current) {
      scrollToMissionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  const scrollToKeyWord =()=>{
    if (scrollToKeyWordRef.current) {
      scrollToKeyWordRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const scrollToAditional = ()=>{
    if (scrollToAditionalRef.current) {
      scrollToAditionalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <div className="container mx-auto  2xl:px-12">
        <div className="brand-section">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="brand-left py-5">
              <div className="brand-title">
                <h1>{product?.campaignName || "[Brand] Title"}</h1>
                <p>{product?.location || "Bla Bla Bla Bla"}</p>
                <h4 className="flex items-center gap-2 blog-left">
                  <img src={Blog} alt="" />
                  {product?.availableTime || "2 day Left"}
                </h4>
                <h5>Product Info</h5>
              </div>
              <img src={product?.image || ""} alt="" className="mt-8 mb-9" />
              <div className="brand-left-button">
                <button className="flex">More
                  <img src={Vector} alt="" className="mt-1" />
                </button>
              </div>
            </div>
            <div className="mt-8 border pt-3 brand-right">
              <table>
                <tr>
                  <th className="pb-3">Campagin</th>
                  <th className="pb-3">07.11 (수) ~ 07.21 (토)</th>
                </tr>
                <tr>
                  <td className="pb-3">Enroll</td>
                  <td className="pb-3">{product?.availableTime || "07.23 (토)"}
                    <span className="mx-2">{product?.checkDay || ""}</span>
                  </td>
                </tr>
                <tr>
                  <td className="pb-3">Deadline</td>
                  <td className="pb-3">{product?.availableTime || "07.24 (일) ~ 07.31 (월)"}</td>
                </tr>
                <tr>
                  <td className="pb-3">Result</td>
                  <td className="pb-3">08.02 (토)</td>
                </tr>
                <tr>
                  <td className="pb-3">Current Enroll</td>
                  <td className="pb-3">{product?.channel || "지원 51 / 모집 1"}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-b"></td>
                </tr>
                <tr>
                  <td className="pt-3 pb-3 px-1">
                    <p onClick={scrollToChineseSection} style={{ cursor: 'pointer' }}>Info</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-b"></td>
                </tr>
                <tr>
                  <td onClick={scrollToHowToRegisterSection} style={{ cursor: 'pointer' }} className="pt-3 pb-3 px-1">
                    <p>how to register</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-b" style={{ borderCollapse: 'collapse' }}></td>
                </tr>
                <tr>
                  <td onClick={scrollToMission} style={{ cursor: 'pointer' }} className="pt-3 pb-3 px-1">
                    <p>Misson</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-b"></td>
                </tr>
                <tr>
                  <td onClick={scrollToKeyWord} style={{ cursor: 'pointer' }} className="pt-3 pb-3 px-1">
                    <p>Keyword</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-b"></td>
                </tr>
                <tr>
                  <td onClick={scrollToAditional} style={{ cursor: 'pointer' }} className="pt-3 pb-3 px-1">
                    <p>Aditional Info</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="border-b"></td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button>Register</button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button className="event-btn">Event <br /> Banner</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          {/* Chinese Section */}
          <div ref={chineseSectionRef} className="chines-text mb-5 flex gap-12" style={{ width: '1220px', display: 'flex', flexDirection: 'column' }}>
            <div className="chines-heading">
              <h2>제공 내역</h2>
            </div>
            <div className="chines-headings">
              <h2 className="mb-8">{product?.textArea1.slice(0,25) || "명륜진사갈비 40,000원 이용권"}</h2>
              {/* <p>[참고사항]</p>
              <p>※ 전국 명륜진사갈비에서 사용 가능한 이용권입니다.</p>
              <p>※ 명륜진사갈비 홈페이지에서 확인 가능</p>
              <p>※ 모바일 이용권으로 제공되며 이용금액 내에서 자유롭게 이용 가능합니다.</p>
              <p>※ 잔액은 환불되지 않습니다. 이용금액 외 추가주문은 결제 부탁드립니다.</p>
              <p className="mb-9">※ 점심 특선 메뉴나 기타 메뉴만 사용 시 이용권 정상 이용 불가합니다.</p> */}

              <p style={{ color: '#FF0000' }}>★ '잠실아시아선수촌점, 서충주기업도시점'은 체험 불가 매장입니다.</p>
              <div className="border-b bottom-border"></div>
            </div>
            {/* 02 */}
        <div ref={howToRegisterRef} className="chines-heading">
          <h2>제공 내역</h2>
        </div>
        <div className="chines-headings" >
          <h2 className="mb-8">{product?.textArea2.slice(0,25)}</h2>
          {/* <p>[영업시간 및 방문 안내]</p>
          <p>※장찾기(클릭)</p>
          <p>※ 명륜진사갈비 홈페이지에서 확인 가능</p>
          <p>※ 모바일 이용권으로 제공되며 이용금액 내에서 자유롭게 이용 가능합니다.</p>
          <p>※ 잔액은 환불되지 않습니다. 이용금액 외 추가주문은 결제 부탁드립니다.</p>
          <p className="mb-9" >※ 점심 특선 메뉴나 기타 메뉴만 사용 시 이용권 정상 이용 불가합니다.</p> */}
          <p style={{color:'#FF0000'}}>★ '잠실아시아선수촌점, 서충주기업도시점'은 체험 불가 매장입니다.</p>
          <div className="border-b bottom-border"></div>
        </div>

        {/* 03 */}
        <div ref={scrollToMissionRef} className="chines-heading">
          <h2>제공 내역</h2>
        </div>
        <div className="chines-headings" >
          <h2 className="mb-8">{product?.textArea3.slice(0,25) || "방문 및 예약안내"}</h2>
          {/* <p>[영업시간 및 방문 안내]</p>
          <p>※장찾기(클릭)</p>
          <p>※ 명륜진사갈비 홈페이지에서 확인 가능</p>
          <p>※ 모바일 이용권으로 제공되며 이용금액 내에서 자유롭게 이용 가능합니다.</p>
          <p>※ 잔액은 환불되지 않습니다. 이용금액 외 추가주문은 결제 부탁드립니다.</p>
          <p className="mb-9" >※ 점심 특선 메뉴나 기타 메뉴만 사용 시 이용권 정상 이용 불가합니다.</p>
          <p style={{color:'#FF0000'}}>★ '잠실아시아선수촌점, 서충주기업도시점'은 체험 불가 매장입니다.</p> */}
          <div className="border-b bottom-border"></div>
        </div>

         {/* 03 */}
         <div ref={scrollToKeyWordRef} className="chines-heading">
          <h2>제공 내역</h2>
        </div>
        <div  className="chines-headings" >
          <h2 className="mb-8">{product?.textArea4.slice(0,25) || "방문 및 예약안내" }</h2>
          {/* <p>[영업시간 및 방문 안내]</p>
          <p>※장찾기(클릭)</p>
          <p>※ 명륜진사갈비 홈페이지에서 확인 가능</p>
          <p>※ 모바일 이용권으로 제공되며 이용금액 내에서 자유롭게 이용 가능합니다.</p>
          <p>※ 잔액은 환불되지 않습니다. 이용금액 외 추가주문은 결제 부탁드립니다.</p>
          <p className="mb-9" >※ 점심 특선 메뉴나 기타 메뉴만 사용 시 이용권 정상 이용 불가합니다.</p>
          <p style={{color:'#FF0000'}}>★ '잠실아시아선수촌점, 서충주기업도시점'은 체험 불가 매장입니다.</p> */}
          <div className="border-b bottom-border"></div>
        </div>


         {/* 03 */}
         <div ref={scrollToAditionalRef} className="chines-heading">
          <h2>제공 내역</h2>
        </div>
        {/* 04 */}
        <div  className="chines-headings" >
          <h2 className="mb-8">{product?.textArea4.slice(0,25) || "방문 및 예약안내"}</h2>
          {/* <p>[영업시간 및 방문 안내]</p>
          <p>※장찾기(클릭)</p>
          <p>※ 명륜진사갈비 홈페이지에서 확인 가능</p>
          <p>※ 모바일 이용권으로 제공되며 이용금액 내에서 자유롭게 이용 가능합니다.</p>
          <p>※ 잔액은 환불되지 않습니다. 이용금액 외 추가주문은 결제 부탁드립니다.</p>
          <p className="mb-9" >※ 점심 특선 메뉴나 기타 메뉴만 사용 시 이용권 정상 이용 불가합니다.</p> */}
          
          <p style={{color:'#FF0000'}}>★ '잠실아시아선수촌점, 서충주기업도시점'은 체험 불가 매장입니다.</p>
          <div className="border-b bottom-border"></div>
        </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div style={{ background: '#D9D9D9' }} className="py-3 ">
        <div className="container mx-auto mt-12 lg:px-12 pb-3">
          <div className="category-section 2xl:px-2 xl:px-6 lg:px-0 flex justify-between mb-5 2xl:mb-8 " style={{ maxWidth: '1225px', margin: '0 auto' }}>
            <div className="category-heading">
              <h3>Category</h3>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 mt-8 " style={{ maxWidth: '1225px', margin: '0 auto' }}>
            {SliceData.map((item, index) => (
              <div className="category-card" key={index}>
                <div className="category-image flex justify-center">
                  <img src={item.image} alt="img"  />
                </div>
                <div className="category-title flex justify-center">
                  <h3>{item.campaignName}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Desktop17;
