import React, { useContext, useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'


const Home = () => {
  const {loading} = useContext(StoreContext);
  const [category,setCategory] = useState("All")
  
  return (
    <div>
              <Header/>
        <ExploreMenu category={category}  setCategory={setCategory}/>
       {!loading ? <FoodDisplay category = {category}/>  : <div className="spinner"></div>  } 
       <AppDownload/>
    </div>
  )
}

export default Home