import React, { useEffect,useContext, useState } from 'react'
import './Products.css'
import Heart from '../../assets/Heart';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../store/ProductContext';
import {useNavigate} from 'react-router-dom'

const Products = () => {
  const {db} = useContext(FirebaseContext)
  const [products,setProduct] = useState([])
  const {setProductDetails} = useContext(ProductContext)
  const navigate = useNavigate()
  useEffect( () =>{ 
    console.log('resun');
    const collectionRef  = collection(db,'products') 
      getDocs(collectionRef).then((snapshot)=>{
      const allProducts =  snapshot.docs.map((obj)=>{
        return {
          ...obj.data(),
          id:obj.id
        }
      }) 
      setProduct(allProducts)
    })
  },[db])
  const handleClick = (product)=>{
            console.log(product,'product');
            setProductDetails(product);
            navigate('/viewproduct')
  }
  
  return (
    <div className="postParentDiv">
    <div className="moreView">
      <div className="heading">
        <span>Fresh Recomendations</span>
        <span></span>
      </div>
      <div className="cards">
        {
            products.map((product)=>(
        <div
          className="card"
          onClick={()=>handleClick(product)}
        >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.url} alt="dsfas" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <p className="rate">&#x20B9; {product.mrpPrice}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name} </p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>
            ))
        }
      </div>
    </div>

  </div>
  )
}

export default Products
