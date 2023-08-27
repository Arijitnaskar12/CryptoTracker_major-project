import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { coinObject } from '../Functions/CoinObject';
import Header from '../Components/Common/Header';
import Loader from '../Components/Common/Loader';
import List from '../Components/DashBoard/List';
import CoinInfo from '../Components/Coin/CoinInfo';
import { getCoinData } from '../Functions/getCoinData';
import { getCoinPrices } from '../Functions/getCoinPrices';
import LineChart from '../Components/Coin/LineChart';
import { ConvertDate } from '../Functions/ConvertDate';
import SelectDays from '../Components/Coin/SelectDays';
import { settingChartData } from '../Functions/settingChartData';
import PriceType from '../Components/Coin/PriceType';
import TogglePriceType from '../Components/Coin/PriceType';
import Footer from '../Components/Common/Footer';
const CoinPage = () => {
  const{id}=useParams();
  const[isLoading,setisLoading]=useState(false);
  const[coinData,setCoinData]=useState();
  const[days,setDays]=useState(60);
  const[chartData,setChartData]=useState({
    labels: [],
    datasets: [],
  });
  const[priceType,setPriceType]=useState("prices");
  useEffect(()=>{
    if(id){
   getData();
      }},[id]);

  async function getData(){
    const data= await getCoinData(id);
    if(data){
      coinObject(setCoinData,data);
      const prices=await getCoinPrices(id,days,priceType);
      // console.log(prices);
      if(prices.length>0)
      { 
        console.log("Whooooo");
       settingChartData(setChartData,prices);
      
        setisLoading(false);
      }
    }
  }
  const handleDaysChange=async (event)=>{
    setisLoading(true);
    setDays(event.target.value);
    const prices=await getCoinPrices(id,event.target.value,priceType);
    settingChartData(setChartData,prices);
    setisLoading(false);

  }
  const handlePriceTypeChange=async (newType,event)=>{
    setisLoading(true);
    setPriceType(newType.target.value);
    const prices=await getCoinPrices(id,days,newType.target.value);
    settingChartData(setChartData,prices);
    setisLoading(false); 
  
}
  return (
    
    <div>
        <Header/>
        {
          isLoading?<Loader/>: coinData&&(
          <>
          <div className='grey-wrapper' style={{padding:"0rem 1rem"}}> <List coin={coinData}/></div>
           <div className='grey-wrapper'>
           <SelectDays days={days} handleDaysChange={handleDaysChange}/>
           <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
           <LineChart chartData={chartData} priceType={priceType} multiAxis={false}/></div>
           <CoinInfo heading={coinData.name} desc={coinData.desc}/>
           {/* <Footer/> */}
          </>
          )
        }
        
        
    </div>
  )
  }

export default CoinPage;