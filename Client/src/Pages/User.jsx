import React,{useContext,useEffect} from "react";
import UserInfo from "../assets/images/User.svg";
import Dots from "../assets/images/dots.svg";
import UserProfileLogo from "../assets/images/userProfile.svg";
import PLUS from "../assets/images/PLuse.svg";
import ProjectUser from "../assets/images/projectuser.svg";
import BookMarked from "../assets/images/bookmarked.svg"
import { AuthContext } from '../App'; // Import the context
import axios from "axios";
const User = () => {
  const {name,token,email} = useContext(AuthContext); // Access context values
  useEffect(() => {
    const fetchData = async () => {
      
      try {
       
        const response = await axios.get(`http://localhost:8080/products/`, {
          params: {
            userId: email,
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
       
        if (response.status === 200) {
          const result = response.data;
          console.log(result);
    
          // All products Here
    
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
  }, []); 
    

  return (
    <>
      <div className="container">
        <div className="user-section 2xl:px-12">
          <div className="grid lg:grid-cols-12 2xl:mx-12 2xl:px-12 2xl:gap-5">
            <div className="col-span-3 user-profile-info">
              <div className="user_info px-5 2xl:mx-12 2xl:px-121">
                <img
                  src={UserInfo}
                  alt=""
                  style={{
                    width: "116px !importance",
                    height: "116px !importance",
                  }}
                />
                <h4>NAME</h4>
                <h6>{name}</h6>
                <ul>
                  <li className="flex gap-2">
                    <img src={Dots} alt="" className="mt-1" />
                    sub
                  </li>
                  <li className="flex gap-2">
                    <img src={Dots} alt="" className="mt-1" />
                    sub
                  </li>
                  <li className="flex gap-2">
                    <img src={Dots} alt="" className="mt-1" />
                    sub
                  </li>
                  <li className="flex gap-2">
                    <img src={Dots} alt="" className="mt-1" />
                    sub
                  </li>
                  <li className="flex gap-2">
                    <img src={Dots} alt="" className="mt-1" />
                    sub
                  </li>
                  <li className="flex gap-2">
                    <img src={Dots} alt="" className="mt-1" />
                    Login
                  </li>
                </ul>
              </div>
            </div>
            <div className="right-user-profile ">
              <div className="right-user-profile-heading">
                <h2>
                  이번달 누적 캠페인
                  <span>10개</span>
                </h2>

                <div className="user-profile-images flex gap-3">
                  <img src={UserProfileLogo} alt="" />
                  <img src={UserProfileLogo} alt="" />
                  <img src={UserProfileLogo} alt="" />
                  <img src={PLUS} alt="" />
                </div>
              </div>

              {/* Registered Campagin */}
              <div className="registered-campagin">
                <h2>Registered Campagin</h2>
                <div className="category-btn">
                  <a href="">더보기</a>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 px-5">
                <div className="registered-card flex items-center justify-between">
                  <div className="project-heading">
                    <h3>Project</h3>
                    <p>07.07 수요일 1시</p>
                    <p className="location">식당/서울시 00동</p>
                  </div>

                  <div className="px-5">
                    <img src={ProjectUser} alt="" />
                  </div>
                </div>
                {/* 02 */}
                <div className="registered-card flex items-center justify-between">
                  <div className="project-heading">
                    <h3>Project</h3>
                    <p>07.07 수요일 1시</p>
                    <p className="location">식당/서울시 00동</p>
                  </div>

                  <div className="px-5">
                    <img src={ProjectUser} alt="" />
                  </div>
                </div>
                {/* 03 */}
                <div className="registered-card flex items-center justify-between mt-5">
                  <div className="project-heading">
                    <h3>Project</h3>
                    <p>07.07 수요일 1시</p>
                    <p className="location">식당/서울시 00동</p>
                  </div>

                  <div className="px-5">
                    <img src={ProjectUser} alt="" />
                  </div>
                </div>
                {/* 04 */}
                <div className="registered-card flex items-center justify-between mt-5">
                  <div className="project-heading">
                    <h3>Project</h3>
                    <p>07.07 수요일 1시</p>
                    <p className="location">식당/서울시 00동</p>
                  </div>

                  <div className="px-5">
                    <img src={ProjectUser} alt="" />
                  </div>
                </div>
              </div>

              {/* Bookmarked Campagin */}
              <div className="bookmarked-campagin px-9 ">
                <div className="bookmarked-heading">
                <h2>Bookmarked Campagin</h2>
                <div className="category-btn">
                  <a href="">더보기</a>
                </div>
                </div>
                <div className="grid lg:grid-cols-3">
                <div className="bookmarked-card flex ">
                    <div className="flex items-center h-100 px-3">
                        <img src={BookMarked} alt="" />
                    </div>
                    <div className="mt-7 bookmarked" >
                        <h4>Project</h4>
                        <p>식당/서울시 00동</p>
                    </div>
                </div>
                {/* 02 */}
                <div className="bookmarked-card flex ">
                    <div className="flex items-center h-100 px-3">
                        <img src={BookMarked} alt="" />
                    </div>
                    <div className="mt-7 bookmarked" >
                        <h4>Project</h4>
                        <p>식당/서울시 00동</p>
                    </div>
                </div>
                {/* 03 */}
                <div className="bookmarked-card flex ">
                    <div className="flex items-center h-100 px-3">
                        <img src={BookMarked} alt="" />
                    </div>
                    <div className="mt-7 bookmarked" >
                        <h4>Project</h4>
                        <p>식당/서울시 00동</p>
                    </div>
                </div>
                </div>
              </div>

              {/* Review */}
              <div className="reviews">
                <div className="reviews-section px-9">
                    <h2>Review</h2>
                    <div className="category-btn">
                  <a href="">더보기</a>
                </div>
                </div>
                <div className="grid lg:grid-cols-2 px-8">
                    <div className="reviews-cards">
                    <div className="review-headering">
                        <h3>Project
                            <span>식당/서울시 00동</span>
                        </h3>
                        <p>2024-07-07</p>
                    </div>
                    <div className="review-card-center">
                        <h5>멋진 곳 입니다. <br />
                        또 오고 싶어요</h5>
                    </div>
                    <div className="review-zero-card">
                        <p>0000</p>
                    </div>
                    </div>
                    {/* 02 */}
                    <div className="reviews-cards">
                    <div className="review-headering">
                        <h3>Project
                            <span>식당/서울시 00동</span>
                        </h3>
                        <p>2024-07-07</p>
                    </div>
                    <div className="review-card-center">
                        <h5>멋진 곳 입니다. <br />
                        또 오고 싶어요</h5>
                    </div>
                    <div className="review-zero-card">
                        <p>0000</p>
                    </div>
                    </div>


                    {/* 03 */}
                    <div className="reviews-cards">
                    <div className="review-headering">
                        <h3>Project
                            <span>식당/서울시 00동</span>
                        </h3>
                        <p>2024-07-07</p>
                    </div>
                    <div className="review-card-center">
                        <h5>멋진 곳 입니다. <br />
                        또 오고 싶어요</h5>
                    </div>
                    <div className="review-zero-card">
                        <p>0000</p>
                    </div>
                    </div>


                    {/* 04 */}
                    <div className="reviews-cards">
                    <div className="review-headering">
                        <h3>Project
                            <span>식당/서울시 00동</span>
                        </h3>
                        <p>2024-07-07</p>
                    </div>
                    <div className="review-card-center">
                        <h5>멋진 곳 입니다. <br />
                        또 오고 싶어요</h5>
                    </div>
                    <div className="review-zero-card">
                        <p>0000</p>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
