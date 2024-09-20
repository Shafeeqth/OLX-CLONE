import React, { useContext, useState } from 'react'
import './AddProduct.css'
import '../NavBar/NavBar'
import { AuthContext,FirebaseContext } from '../../store/Context'
import { storage } from '../../firebase/config'
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import { collection,addDoc } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import ReactLoading from 'react-loading'

const AddProduct = () => {
  const {user} = useContext(AuthContext)
  const {db} = useContext(FirebaseContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [mrpPrice,setMrpPrice] = useState('')
  const [image,setImage] = useState(null)
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dates = new Date(Date.now())
  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true)
    if (!name.trim() || !category.trim()|| !price.trim() || !image){
      setLoading(false)
      setError('All fields are required')
      return
    }
    if (price < 100 ){
      setLoading(false)
      setError("minimum amount 100")
      return 
    }
    if (!user){
      setLoading(false)
      setError('You need to login to add')
      return 
    }
    if (image) {
      const storageRef = ref(storage,`/images/${image.name}`)
      uploadBytes(storageRef, image).then((url) => {
        getDownloadURL(storageRef).then((url)=>{
          addDoc(collection(db,'products' ),{
          name,
          category,
          price,
          mrpPrice,
          url,
          userId: user.uid ,
          createdAt: dates.toISOString().split('T')[0], 
        })
        })
        setLoading(false)
        navigate('/')
      }).catch(err=>{
        setError('server Error')
        setLoading(false)
        console.log(err)
      } )
    }
    else{
      setError('All fields are required')
      console.log('fill every fields');
    }
  }
  return (
    <>
     {
       loading ? <div className='loading-container'><ReactLoading  className='loading-wrapper'
                type="spinningBubbles"
                color="green"
                height={100}
                width={70}
            /></div> :  
            <card>
        <div className="centerDiv">
           
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            /> 
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"  name="Price"
            value={price} 
            onChange={(e)=>{setPrice(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">MRP Price</label>
            <br />
            <input className="input" type="number"  name="Price"
            value={mrpPrice} 
            onChange={(e)=>{setMrpPrice(e.target.value)}}
            />
            <br />
         
          <br />
          <img alt="Product Image" width="200px" height="200px" src={image ? URL.createObjectURL(image):'' } ></img>
          
            <br />
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          {error && <p className="error">{error}</p>}
        </div>
      </card>
            }
      
    </>
  )
}

export default AddProduct
