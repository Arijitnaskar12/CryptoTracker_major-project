import React, { useState } from 'react'
import "./style.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { removeFromWatchlist } from '../../../Functions/removeFromWatchlist';
import { addToWatchlist } from '../../../Functions/addToWatchlist';
import { hasBeenAdded } from '../../../Functions/hasBeenAdded';
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Grid = ({coin}) => {
    // console.log(coin);
    const [added, setAdded] = useState(hasBeenAdded(coin.id));
  return (
    <>
    <Link to={`/coin/${coin.id}`}>
    <div className={`cardContainer  ${coin.price_change_percentage_24h<0 && "cardContainer_red" }`}>
    <div className='upperdiv'>
           <img src={coin.image} className='image-logo'/>
           <div className='upperPara'>
            <p className='coinSymbol'>{coin.symbol}</p>
            <p className='coinName'>{coin.name}</p>
            </div>
          
            <IconButton
            onClick={(e) => {
              e.preventDefault();
              if (added) {
                removeFromWatchlist(coin.id);
                setAdded(false);
              } else {
                addToWatchlist(coin.id);
             
                setAdded(true);
              }
            }}
          >
            {added ? (
              <StarRoundedIcon
                className={`watchlist-icon ${
                  coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                } `}
                sx={{ fontSize: "2rem !important" }}
              />
            ) : (
              <StarBorderRoundedIcon
                className={`watchlist-icon ${
                  coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                } `}
                sx={{ fontSize: "2rem !important" }}
              />
            )}
          </IconButton>
          </div>
            {
                coin.price_change_percentage_24h>0 ?(
            
            <div  className='middleDiv'>
                <div className='percentage'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-green'><TrendingUpIcon/></div>
            </div>
                ):(
                <div  className='middleDiv'>
                <div className='pred'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className=' icon-red'><TrendingDownIcon/></div>
               </div>
                )
                }
                <div className='LowerDiv'>
               <h3 className='coin-price' style={{color:coin.price_change_percentage_24h>0 ? "var(--green)":"var(--red)"}}>${coin.current_price.toLocaleString()}</h3>
                <p className='totalVolume'>Total Volume:{coin.total_volume.toLocaleString()}</p>
                <p className='totalVolume'>Market Cap:{coin.market_cap.toLocaleString()}</p>

                </div>
    </div>
    </Link>
    <ToastContainer/>
    </>
  )
}

export default Grid;