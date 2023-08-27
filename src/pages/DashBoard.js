import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header';
import TabsComponent from '../Components/DashBoard/Tabs';
import axios from 'axios';
import SearchBar from '../Components/DashBoard/Search';
import Pagination from '../Components/DashBoard/Pagination';
import PaginationComponent from '../Components/DashBoard/Pagination';
import Loader from '../Components/Common/Loader';
import BackToTop from '../Components/Common/BackToTop';
import { get100Coins } from '../Functions/get100Coins';
import Footer from '../Components/Common/Footer';
const DashBoardPage = () => {
  let[coins,setCoins]=useState([]);
  let[paginatedCoins,setPaginatedCoins]=useState([]);
  let[search,setSearch]=useState("");
  const [page, setPage] =useState(1);
  const[isLoading,setisLoading]=useState(true);
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex=(value-1)*10;
    setPaginatedCoins(coins.slice(previousIndex,previousIndex+10));
  };
  var filterCoins=coins.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase())||item.symbol.toLowerCase().includes(search.toLowerCase()) );
  useEffect(()=>{
   getData();
  },[]);
  const getData=async()=>{
    const myCoins=await get100Coins();
    if(myCoins){
      setCoins(myCoins);
      setPaginatedCoins(myCoins.slice(0,10));
      setisLoading(false);
    }
  }
  return (
   <>
     <Header/>
     <BackToTop/>
   {isLoading?<Loader/>:
     <div>
     <SearchBar search={search} setSearch={setSearch}/>
      <TabsComponent coins={search?filterCoins:paginatedCoins}/>
      {!search &&   <PaginationComponent page={page} handlePageChange={handlePageChange}/> }
    </div>
   }
  
   </>
  )
}

export default DashBoardPage;