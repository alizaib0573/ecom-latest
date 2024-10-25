import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blog from "../assets/images/Blog.svg";
import axios from "axios";
import { AuthContext } from "../App";
import { AppProvider } from "../ContextApi/Api";

const Category = () => {
  const { name, token, email } = useContext(AuthContext);
  const {item, setItem} = useContext(AppProvider);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/public`, {
          // params: {
          //   userId: email,
          // },
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setItem(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, [email, token]);

  const limitedData = item.slice(0, 8);

  // const  limitedData = item

  console.log(limitedData)

  return (
    <div className="container mx-auto mt-12 lg:px-12">
      <div className="category-section flex justify-between mb-5" style={{ maxWidth: "1225px", margin: "0 auto" }}>
        <h3>Category</h3>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 mt-8" style={{ maxWidth: "1225px", margin: "0 auto" }}>
        {limitedData.map((items) => (
          // console.log(items._id)
          <div key={items._id} className="category-card-section mx-auto pt-6">
            <Link to={`/view/${items._id}`}>
            <div className="lg:px-2 2xl:px-0">
              <img
                src={items.image}
                alt={items.heading}
                className="mb-3"
                style={{ borderRadius: "10px", width: "291px", height: "163px" }}
              />
            </div>
            <div className="mx-3">
              <h3 className="text-start mb-3 mt-4 flex items-center gap-2">
                <span>
                  <img src={Blog} alt="Blog" />
                </span>
                {items.availableTime}
              </h3>
              <h4 className="text-start">{items.campaignName}</h4>
              <h5 className="text-start mt-1 mb-3">{items.coupon}</h5>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
