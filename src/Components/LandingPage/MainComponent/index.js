import React from 'react';
import "./style.css";
import Button from '../../Common/Button';
import iphone from "../../../Assets/iphone.png";
import gradient from"../../../Assets/gradient.png";
import {motion} from "framer-motion";
import { Navigate, useNavigate } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
const MainComponent = () => {
  const navigate=useNavigate();
  return (
    <div className='MainContainer'>
        <div className='left-component'>
            <motion.h1 className='track-crypto-heading'
            initial={{y:50}}
            animate={{y:0}}
            transition={{duration:0.5}}
            >Track Crypto</motion.h1>
            <motion.h1 className='real-time-heading'
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.3}}
            >Real Time.</motion.h1>
            <motion.p className='info-text' 
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.65}}
            >Track crypto through a public api in real time. Visit the dashboard to do so!</motion.p>
            <motion.div className='flex-btn'
             initial={{opacity:0,x:50}}
            animate={{opacity:1,x:0}}
            transition={{duration:0.5,delay:1}}
            >
                <Button text={"Dashboard"} onClick={()=>navigate("/dashboard")}/>
                <RWebShare
                data={{ 
                  text:"Crypto DashBoard Made by React JS.",
                  url: "https://crypto-dashboard-dec.netlify.app/",
                  title:"CryptoDashboard"}}
                  onClick={() => console.log("shared successfully!")}
               
                >
                <Button text={"share app"} outlined={true}/>
                </RWebShare>
             
            </motion.div>
        </div>
        <div className='right-component'>
          <motion.img src={iphone} className='iphone' 
           initial={{y:-10}}
            animate={{y:10}}
            transition={{type:"smooth",duration:2,repeatType:"mirror",repeat:Infinity}}
          ></motion.img>
          <img src={gradient} className='gradient'></img>
        </div>
    </div>
  )
}

export default MainComponent;