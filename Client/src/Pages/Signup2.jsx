import React from "react";
import Review from "../assets/images/Review.svg";
import Merchant from "../assets/images/Merchant.svg";
import NewverLogin from "../assets/images/NeverLogin.svg";
import Kakao from "../assets/images/Kakao.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const InfluencerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navgation = useNavigate();

  const onSubmit = async (data) => {

    
    

    const sent={
      "name": data.name,
      "email": data.email,
      "password": data.password,
      "businessName": data.influenceType,
      "address": "NA",
      "PhoneNumber": data.phoneNumber,
      "signupPath": "NA",
      "TextFild1": "NA",
      "TextFild2": "NA",
      "TextFild3": "NA",
    }
    
    try {
      const response = await fetch("http://localhost:8080/merchant/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sent),
      });

      if (response.status==201) {
        const result = await response.json();
        // alert("User created successfully");
        Navgation("/login");
      alert("Sign Up Successful!")
      return 
      } else {
        if (response.status==409) {
           alert("Signup failed user already exist");
           return 
        }
        alert("Signup failed please fill fields correctly!");
        return 
      }
    } catch (error) {
         alert("Error:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="singup-container">
          <div className="singup-heading">
            <h1>개인/법인 사업자 회원가입</h1>
          </div>
          <div className="singup-form-container">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email" className="block">
                이메일
                <span>*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="jaco3927@naver.com"
              />
              <label htmlFor="" className="block">
                비밀번호
                <span>*</span>
              </label>
              <input
                type="password"
                placeholder="jaco3927"
                {...register("password", { required: true, minLength: 4 })}
              />
              {errors.email && <p className="error">Email is required</p>}

              <label htmlFor="" className="block">
                이름
                <span>*</span>
              </label>
              <input
                type="text"
                placeholder="최진성"
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 100,
                })}
              />
              <p className="message">
                실명으로 등록하지 않을 경우 불이익이 있을 수 있습니다.
              </p>
              <div>
                <label htmlFor="" className="block">
                  휴대폰 번호
                  <span>*</span>
                </label>
                <div className="flex justify-between">
                  <input
                    placeholder="010-4896-3411"
                    type="text"
                    {...register("phoneNumber", { required: true })}
                    style={{ width: "256px", height: "38px" }}
                  />
                  <input
                    type="number"
                    placeholder="인증번호 받기"
                 
                    style={{ width: "123px", height: "40px" }}
                  />
                </div>
                <p className="message">휴대폰 인증을 진행해 주세요.</p>
              </div>
              <label htmlFor="" className="block">
                상호명
                <span>*</span>
              </label>
              <input
                type="text"
                placeholder="최진성"
                {...register("influenceType", { required: true })}
              />
              <p className="message">필수 입력 사항입니다.</p>

              <label htmlFor="" className="block">
                네이버 플레이스 or 홈페이지 주소 URL
              </label>
              <input
                type="email"
                placeholder="https://blog.naver.com/jaco3927"
              />
              <p className="message">
                본인의 업체와 관계없는 링크 기입 시 불이익이 있을 수 있습니다.
              </p>

              <label htmlFor="" className="block">
                가입 경로
                <span>*</span>
              </label>
              <select>
                <option value="">선택</option>
              </select>

              <div className="checkbox-container">
                <label htmlFor="">약관 동의</label>
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      name=""
                      id="input-check"
                      // {...register("terms", { required: true })}
                    />
                    <p className="first-checkbox">
                      이용 약관에 동의합니다. (필수)
                    </p>
                  </div>
                  <div>
                    <p className="last-check">보기</p>
                  </div>
                </div>
              </div>

              <div
                className="checkbox-container"
                style={{ marginTop: "-20px" }}
              >
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      name=""
                      id="input-check"
                      // {...register("privacyPolicy", { required: true })}
                    />
                    <p className="first-checkbox">
                      개인정보 보호 정책에 동의합니다. (필수)
                    </p>
                  </div>
                  <div>
                    <p className="last-check">보기</p>
                  </div>
                </div>
              </div>
              <div
                className="checkbox-container"
                style={{ marginTop: "-20px" }}
              >
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      name=""
                      id="input-check"
                      // {...register("marketingInfo")}
                    />
                    <p className="first-checkbox">
                      마케팅 정보 수신에 동의합니다. (선택)
                    </p>
                  </div>
                  <div>
                    <p className="last-check">보기</p>
                  </div>
                </div>
              </div>

              <button className="sigup-button">가입하기</button>
            </form>
          </div>
        </div>

        <div className="how-to-use mx-auto">
              <ul className="flex gap-6 mt-4">
                <li>About us</li>
                <li>Become Merchant</li>
                <li>How to use</li>
                <li>Privacy policy</li>
              </ul>
            </div>
      </div>
    </>
  );
};

export default InfluencerForm;
