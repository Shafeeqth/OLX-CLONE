import React, { useContext, useEffect, useState } from 'react';
import './ViewProduct.css';
import { ProductContext } from '../../store/ProductContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseContext } from '../../store/Context';
import {useNavigate} from 'react-router-dom'
import ReactLoading from 'react-loading'


function ViewProduct() {
    const [userDetails, setUserDetails] = useState(null)
    const [loading,setLoading] = useState(true)
    const {productDetails} = useContext(ProductContext) 
    const {db} = useContext(FirebaseContext)
    const navigate = useNavigate()
    console.log(productDetails,'dtaaa');
    useEffect(()=>{
      if (productDetails==null) {
        navigate('/') ;
      }  
        const {userId} = productDetails
        const q = query(collection(db,'users'),where('id','==',userId));
        getDocs(q).then((snapshot)=>{
            snapshot.forEach((doc)=>{
                console.log(doc.data());
                setUserDetails(doc.data())
                setLoading(false)

            })
        })
    },[productDetails,db])
  return (
    <div className="viewParentDiv">
        {loading? <div className='loading-container'><ReactLoading  className='loading-wrapper'
                type="spinningBubbles"
                color="blue"
                height={100}
                width={70}
            /></div>: 
        <>
      <div className="imageShowDiv">
        <img
          src={productDetails.url }
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{productDetails.price} </p>
          <p>&#x20B9;{productDetails?.mrpPrice} </p>
          <span>{productDetails.name}</span>
          <p>{productDetails.category}</p>
          <span>{productDetails.createdAt}</span>
        </div>
        {
        userDetails && 
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.number}</p>
        </div>
        }
      </div>
      </>
      }
    </div>
  );
}
export default ViewProduct;
