import React, { useEffect, useRef,useContext } from "react";
import Plus from "../assets/images/plus.svg"
import { useState } from "react";
import { basicSettings } from "../Constants/ConstBasic";
import DaumPostcode from 'react-daum-postcode';
import { AuthContext } from '../App'; // Import the context
import axios from "axios";

const BasicSetting = () => {
  const {email,token} = useContext(AuthContext); // Access context values

  console.log(token , "token")
 
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);  // Correct file appending

    try {
      const response = await axios.post('http://localhost:8080/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data);
      console.log('Image URL:', response.data.imageUrl);

      // You can handle the response data as needed here
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;
    const uploadedFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file) {
        try {
          const uploadedFileData = await uploadImage(file);
          uploadedFiles.push(uploadedFileData);
          setFiles((prevFiles) => [...prevFiles, file]);
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const newFiles = Array.from(event.dataTransfer.files);
    newFiles.forEach(file => uploadImage(file));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };


  const InputItems = {
    width: '514px', background: "transparent ", border: "1px solid #ccc"
  }


  const basicInfo = {
    marginTop: '170px'
  }



  //check chanel state
  const checkChanel = (input_chanel) => {
    if (activeChanel.includes(input_chanel)) {
      setActiveChanel(activeChanel.filter(chanel => chanel !== input_chanel));
      setUserData({ ...userData, chanel: activeChanel.filter(chanel => chanel !== input_chanel) })
    }

    else {
      setActiveChanel([...activeChanel, input_chanel])
      setUserData({ ...userData, chanel: [...activeChanel, input_chanel] })

    }
  }

  const checkWeek = (input_week) => {
    if (activeWeek.includes(input_week)) {
      setActiveWeek(activeWeek.filter(week => week !== input_week));
      setUserData({ ...userData, week: activeWeek.filter(week => week !== input_week) })
    }

    else {
      setActiveWeek([...activeWeek, input_week])
      setUserData({ ...userData, week: [...activeWeek, input_week] })

    }
  }

  // function for cheking daum map api
  const onCompletePost = data => {
    setModalState(false);
    setUserData({
      ...userData, address: {
        address: data.address,
        sido: data.sido,
        sigungu: data.sigungu
      }
    });

  };

//   const handleSubmit = async () => {
//     // Log all the data on form submission
//     const formData = {
//       ...userData,
//       files: files.map(file => ({
//         name: file.name,
//         size: file.size,
//         type: file.type,
//       })),
//     };
   
// const rawdata=formData
//     const derivedData = {
//       userId: email,  // Replace with actual userId
//       email: email,  // Replace with actual email
//       campaignName: rawdata.campaignName, // Direct mapping
//       isVisitOrShip: "Visit",  // This needs to be hardcoded or set elsewhere, not in rawdata
//       location: rawdata.address.detailAddress,  // Using detailAddress from rawdata
//       checkDay: rawdata.week[0].charAt(0).toUpperCase() + rawdata.week[0].slice(1),  // Capitalizing 'mon' -> 'Mon'
//       availableTime: "10:00 AM - 6:00 PM",  // Manually defined or get from another source if needed
//       numberOfPeople: rawdata.member,  // Direct mapping from member
//       image: "https://example.com/images/campaign.png",  // Add image URL, not present in rawdata
//       textArea1: rawdata.Info,  // Mapped from rawdata.Info
//       textArea2: rawdata.howtoregister,  // Mapped from rawdata.howtoregister
//       textArea3: rawdata.keywords,  // Mapped from rawdata.keywords
//       textArea4: rawdata.aditionalinfo,  // Mapped from rawdata.aditionalinfo
//       textArea5: "Additional details",  // You can add another value or map it if available
//       channel: 'Instagram',  // ['youtube'] -> ['YouTube'], assuming 'YouTube' is valid in your enum
//     };
//   console.log(derivedData);
  
//   try {
//     const response = await fetch("http://localhost:8080/products/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "authorization": `Bearer ${token}`  // Sending JWT in the Authorization header

//       },
//       body: JSON.stringify(derivedData),
//     });

//     if (response.status==201) {
     
//       alert("Added successfully");
//       return
     
//     } if (response.status==500) {
//       alert("Invalid Data");
//       return
//     }
//     alert("Failed to perform operation Unauthorized "+error);

//   } catch (error) {
//     console.error("Error:", error);
//     alert("Failed to perform operation "+error);
//   }
    
//   };




const handleSubmit = async () => {
    if (!userData.campaignName || files.length === 0) {
        alert("Please fill in all required fields and upload at least one image.");
        return;
    }

    let uploadedImageUrls = [];
    try {
        for (const file of files) {
            const uploadedFileData = await uploadImage(file);
            if (uploadedFileData && uploadedFileData.imageUrl) {
                uploadedImageUrls.push(uploadedFileData.imageUrl);
            }
        }

        const derivedData = {
            userId: email,
            email,
            campaignName: userData.campaignName,
            isVisitOrShip: activeVisit ? "Visit" : "Ship",
            location: userData.address.detailAddress,
            checkDay: activeWeek.map(week => week.charAt(0).toUpperCase() + week.slice(1)).join(', '),
            availableTime: "10:00 AM - 6:00 PM",
            numberOfPeople: userData.member,
            image: uploadedImageUrls[0] || "https://example.com/images/campaign.png",
            textArea1: userData.Info,
            textArea2: userData.howtoregister,
            textArea3: userData.keywords,
            textArea4: userData.aditionalinfo,
            textArea5: "Additional details",
            channel: activeChanel.join(', '),
        };

        const response = await fetch("http://localhost:8080/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(derivedData),
        });

        if (response.ok) {
            alert("Added successfully");
        } else {
            alert("Failed to add campaign. Please check the data.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to perform operation: " + error);
    }
};





  //set state
  const [modalState, setModalState] = useState(false)
  const [activeVisit, setActiveVisit] = useState(false)
  const [activeChanel, setActiveChanel] = useState([])
  const [activeWeek, setActiveWeek] = useState([])
  const [userData, setUserData] = useState(basicSettings)


  // for debugging
  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <>
      <div className="container mt-5 basic-campian-section 2xl:px-12 lg:px-5">
        <div className=" 2xl:px-12">
          <div className="basic-setting 2xl:px-12 lg:px-0">
            <h2>Campagin</h2>
            <button className="bring-prev">Bring prev campaign</button>
            <button className="reset">reset</button>
          </div>
          <div className="basic-setting-main-page">
            <div className="basic-setting-one flex items-center gap-3">
              <div className="one">
                <span> 1</span>
              </div>
              <div className="basic-setting-headin">
                <h1>Basic settings</h1>
              </div>
              <div className="last-basic flex items-center gap-2 justify-center">
                <p>필수</p>

              </div>
            </div>

            <div className="form-data ">
              <div className="">
                <label>Campaign Name(30letter)</label>
                <input className="input-campaign-name w-full mt-4 h-[50px] px-4 rounded-[5px]" type="text" placeholder="campaign name" 
                value={userData.campaignName}
                onChange={(e) => setUserData({ ...userData, campaignName: e.target.value })}
                />
              </div>
            </div>

            {/* basic */}
            <div className="basic-info-capian-type mt-12">
              <p>Campaign type</p>
            </div>


            {/* Visit */}

            <div className="flex justify-between">
              <div className={` ${activeVisit ? 'visti' : 'ship'}`} onClick={() => {
                setActiveVisit(true)
                console.log(activeVisit)
                setUserData({ ...userData, campaignType: 'visit' })
              }}>
                <h4>Visit</h4>
                <p>Visit and reivew</p>
              </div>

              <div className={` ${activeVisit ? 'ship' : 'visti'}`}
                onClick={() => {
                  setActiveVisit(false)
                  console.log(activeVisit)
                  setUserData({ ...userData, campaignType: 'ship' })
                }}
              >
                <h4>Ship</h4>
                <p>Get shipping and review</p>
              </div>
            </div>


            {/* Chanel  youtube active insta inactive*/}
            <div className="chanel-social">
              <h3>Chanel</h3>
              <div className="flex justify-between mt-4">
                <div className={`${activeChanel.includes('youtube') ? 'youtube' : 'insta'}`}
                  onClick={() => { checkChanel('youtube') }}
                >Youtube</div>

                <div className={`${activeChanel.includes('instagram') ? 'youtube' : 'insta'}`}
                  onClick={() => { checkChanel('instagram') }}
                >instagram</div>

                <div className={`${activeChanel.includes('blog') ? 'youtube' : 'insta'}`}
                  onClick={() => { checkChanel('blog') }}
                >Blog</div>


                <div className={`${activeChanel.includes('web') ? 'youtube' : 'insta'}`}
                  onClick={() => { checkChanel('web') }}
                >Web</div>

                <div className={`${activeChanel.includes('etc') ? 'youtube' : 'insta'}`}
                  onClick={() => { checkChanel('etc') }}
                >Etc</div>

              </div>
            </div>

            {/* Adress to visit */}
            <div className="Adress_to_visit">


              <div className="address_to_visit_para">
                <p>Adress to visit</p>
              </div>
              <div className="address-one mt-3 px-5" onClick={() => { setModalState(true) }}>
                <span>{userData.address.address ? userData.address.address : '주소 설정'}</span>
                {/* change this style */}
                <DaumPostcode
                  style={{
                    width: '700px',
                    position: 'absolute',
                    height: '400px',
                    display: modalState ? 'block' : 'none'
                  }}
                  onComplete={onCompletePost}
                ></DaumPostcode>
                <p className="주소검색" onClick={() => { setModalState(true) }}>주소 검색</p>
              </div>
            </div>

            {/* 나머지 주소 입력 */}

            <input type="text" placeholder="나머지 주소 입력" className="last-container mt-2"
              onChange={(e) => {
                setUserData({ ...userData, address: { ...userData.address, detailAddress: e.target.value } })
              }}
            >

            </input>

            {/* Monday friday*/}
           
            <div className="chanel-social">
              <h3>가능한 요일</h3>
              <div className="flex justify-between mt-4">
                <div className={`${activeWeek.includes('mon') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('mon') }}
                >Monday</div>

                <div className={`${activeWeek.includes('tue') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('tue') }}
                >Tuesday</div>

                <div className={`${activeWeek.includes('wen') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('wen') }}
                >Wednesday</div>


                <div className={`${activeWeek.includes('thur') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('thur') }}
                >Thursday</div>

                <div className={`${activeWeek.includes('fri') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('fri') }}
                >Friday</div>

                <div className={`${activeWeek.includes('sat') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('sat') }}
                >Saturday</div>

                <div className={`${activeWeek.includes('sun') ? 'weekend-active' : 'weekend'}`}
                  onClick={() => { checkWeek('sun') }}
                >Sunday</div>

              </div>
            </div>

            {/* Time */}
            <input type="time" className="time-input w-full mt-5 rounded-[5px] h-[50px] px-8" placeholder="시간 설정"></input>


            {/* how many membmers */}
            <div className="form-data">
              <div className="flex justify-between">
                <div className="form-input-group mt-12" >
                  <label>How many members</label>
                  <div className="member-input">
                    <span className="plus-minus-btn"
                      onClick={() => {
                        if (userData.member > 1) {
                          setUserData({ ...userData, member: userData.member - 1 })
                        }
                      }}>-</span>
                    <p>{userData.member}</p>
                    <span className="plus-minus-btn"
                      onClick={() => {
                        if (userData.member < 100) {
                          setUserData({ ...userData, member: userData.member + 1 })
                        }
                      }}>+</span>
                  </div>
                  <span className="mt-2">range of 1~100</span>
                </div>


                <div className="form-input-group mt-12" >
                  <label >(Optional) Points to give out</label>
                  <div className="zero-input">
                    <input type="number"
                      className="zero-input-number"
                      value={userData.points} onChange={(e) => setUserData({ ...userData, points: e.target.value })} />
                    <strong>p</strong>
                  </div>
                </div>
              </div>

            </div>


     {/* Drop */}

     <div
        className="drop"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="Main-image">
          <p>Main image (Max 5)</p>
        </div>
        <div className="drag-drop">
          <div className="drag-drop-heading">
            <h2>Drag to upload</h2>
            <p>600x520px, 10mb 이하, jpg/png 권장</p>
          </div>
          <div className="upload" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
            <img src={Plus} alt="Upload" />
          </div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className="file-list" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
          {files.map((file, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', padding: '5px 10px', margin: '5px', borderRadius: '5px', position: 'relative' }}>
              <span style={{ marginRight: '10px' }}>{file.name}</span>
              <button onClick={() => handleRemoveFile(index)} style={{ background: 'transparent', border: 'none', color: '#ff6347', fontSize: '16px', cursor: 'pointer', position: 'absolute', top: '2px', right: '2px' }}>
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>


            {/* text area  */}
            <div className="form-data ">
              <div className="form-input-group">
                <label>Info</label>
                <textarea name="Info" id="" rows={10}
                onChange={(e) => setUserData({ ...userData, Info: e.target.value })}
                
                ></textarea>
              </div>
            </div>

            <div className="form-data ">
              <div className="form-input-group">
                <label>How to Register</label>
                <textarea name="How to Register" id="" rows={10}
                onChange={(e) => setUserData({ ...userData, howtoregister: e.target.value })}
                
                ></textarea>
              </div>
            </div>

            <div className="form-data ">
              <div className="form-input-group">
                <label>Mission</label>
                <textarea name="Mission" id="" rows={10}
                onChange={(e) => setUserData({ ...userData, mission: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="form-data ">
              <div className="form-input-group">
                <label>Keywords</label>
                <textarea name="Keywords" id="" rows={10}
                onChange={(e) => setUserData({ ...userData, keywords: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="form-data ">
              <div className="form-input-group">
                <label>Aditional Info</label>
                <textarea name="Aditional Info" id="" rows={10}
                onChange={(e) => setUserData({ ...userData, aditionalinfo: e.target.value })}
                ></textarea>
              </div>
            </div>






            



            











            {/* End */}

          </div>
        </div>
        <div className="2xl:px-12  mt-10 mb-12" style={{ paddingBottom: '90px' }} >
          <div className="flex justify-between max-w-[1220px] mx-auto ">
            <div className="bottom-btn-one cursor-pointer ">
              <p>캠페인 미리보기</p>
            </div>
            <div className="bottom-btn-two cursor-pointer	" onClick={handleSubmit}>
              <p>캠페인 등록하기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicSetting;
