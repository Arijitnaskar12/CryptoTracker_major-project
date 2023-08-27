import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header';
import SelectCoins from '../Components/Compare/SelectCoins';
import SelectDays from '../Components/Coin/SelectDays';
import { coinObject } from '../Functions/CoinObject';
import { getCoinPrices } from '../Functions/getCoinPrices';
import { getCoinData } from '../Functions/getCoinData';
import Loader from '../Components/Common/Loader';
import CoinInfo from '../Components/Coin/CoinInfo';
import List from '../Components/DashBoard/List';
import { settingChartData } from '../Functions/settingChartData';
import LineChart from '../Components/Coin/LineChart';
import TogglePriceType from '../Components/Coin/PriceType';

const ComparePage = () => {
    const[crypto1,setCrypto1]=useState("bitcoin");
    const[crypto2,setCrypto2]=useState("ethereum");
    const[crypto1Data,setcrypto1Data]=useState({});
    const[crypto2Data,setcrypto2Data]=useState({});
    const[days,setDays]=useState(7);
    const[priceType,setPriceType]=useState("prices");
    const[isLoading,setisLoading]=useState(true);
    const[chartData,setChartData]=useState({});
    const handleDaysChange=async (event)=>{
        setisLoading(true);
        setDays(event.target.value);
        const prices1=await getCoinPrices(crypto1,event.target.value,priceType);
         const prices2=await getCoinPrices(crypto2,event.target.value,priceType);
         settingChartData(setChartData,prices1,prices2);
         setisLoading(false);
    }

    const handlePriceTypeChange=async (newType,event)=>{
        setisLoading(true);
        setPriceType(newType.target.value);
        const prices1=await getCoinPrices(crypto1,days,newType.target.value);
        const prices2=await getCoinPrices(crypto2,days,newType.target.value);
        settingChartData(setChartData,prices1,prices2);
        setisLoading(false); 
      
    }
    useEffect(()=>{
        getData();
    },[]);
    async function getData(){
        setisLoading(true);
        const data1= await getCoinData(crypto1);
        const data2= await getCoinData(crypto2);
      
            coinObject(setcrypto1Data,data1);
      
            coinObject(setcrypto2Data,data2);
            const prices1=await getCoinPrices(crypto1,days,priceType);
            const prices2=await getCoinPrices(crypto2,days,priceType);
            settingChartData(setChartData,prices1,prices2);
                setisLoading(false);
            } 
        

    
    const handleCoinChange=async(event,isCoin2)=>{
        setisLoading(true);
        if(isCoin2)
        {
            setCrypto2(event.target.value);
            const data2= await getCoinData(event.target.value);
              coinObject(setcrypto2Data,data2);
              const prices1=await getCoinPrices(crypto1,days,priceType);
              const prices2=await getCoinPrices(event.target.value,days,priceType);
              settingChartData(setChartData,prices1,prices2);
        
        }else{
      
          setCrypto1(event.target.value);
          const data1= await getCoinData(event.target.value);
              coinObject(setcrypto1Data,data1);            
              const prices1=await getCoinPrices(event.target.value,days,priceType);
              const prices2=await getCoinPrices(crypto2,days,priceType);
              settingChartData(setChartData,prices1,prices2);

    }
    setisLoading(false);
    }

  return (
    <div>
        <Header/>
        {
            isLoading?(<Loader/>):
            (
        
         <>
         <div className='coin-days-flex'>
              <SelectCoins
                crypto1={crypto1}
                crypto2={crypto2}
                handleCoinChange={handleCoinChange}/>

              <SelectDays days={days}
                handleDaysChange={handleDaysChange}
                noPtag={true} />
            </div>
            <div>
                <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                  <List coin={crypto1Data} />
                </div>
                <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                  <List coin={crypto2Data} />
                </div>
                <div className='grey-wrapper'>
                  <TogglePriceType
                    priceType={priceType}
                    handlePriceTypeChange={handlePriceTypeChange} />
                  <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                </div>
                <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
                <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
              </div>
              </>
                  
            )
        }     
    </div> 
  )
}
export default ComparePage;