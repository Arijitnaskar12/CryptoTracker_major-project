import React, { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import "./style.css";
import { IconButton, Tooltip } from '@mui/material';
import convertNumber from '../../../Functions/convertNumber';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../../../Functions/removeFromWatchlist';
import { addToWatchlist } from '../../../Functions/addToWatchlist';
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { hasBeenAdded } from '../../../Functions/hasBeenAdded';
const List = ({coin}) => {
  // console.log(coin);
  const [added, setAdded] = useState(hasBeenAdded(coin.id));
  return (
    <Link to={`/coin/${coin.id}`}>
    <tr className='list-row'>
    <Tooltip title="Coin Logo" placement='bottom-start'>
    <td className='img-logo'>
           <img src={coin.image} className='image-logo'/>
    </td>
    </Tooltip>  
    <Tooltip title="Coin Info" placement='bottom-start'>
    <td>
           <div className='upperPara'>
            <p className='coinSymbol'>{coin.symbol}</p>
            <p className='coinName'>{coin.name}</p>
            </div>
    </td>
    </Tooltip>
    <Tooltip title="Price Changes in 24h" placement='bottom-start'>
            {
                coin.price_change_percentage_24h>0 ?(
            
            <td  className='middleDiv'>
                <div className='percentage'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-green td-icon'><TrendingUpIcon/></div>
            </td>
                ):(
                <td  className='middleDiv'>
                <div className='pred'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className=' icon-red td-icon'><TrendingDownIcon/></div>
               </td>
                )
                }
                </Tooltip>
                <Tooltip title="Current Price" placement='bottom'>
                <td>
               <h3 className='coin-price td-align-center' style={{color:coin.price_change_percentage_24h>0 ? "var(--green)":"var(--red)"}}>${coin.current_price.toLocaleString()}</h3>
               </td>
               </Tooltip>

           <Tooltip title="Total Volume" placement='bottom-end'><td> <p className='totalVolume td-align-right td-total-volume'>${coin.total_volume.toLocaleString()}</p></td></Tooltip>

               
           <Tooltip title="Market Cap" placement='bottom-end'><td className='desktop-td-mkt'> <p className='totalVolume  td-align-right'>${coin.market_cap.toLocaleString()}</p></td></Tooltip>
           <Tooltip title="Market Cap" placement='bottom-end'><td className='mobile-td-mkt'> <p className='totalVolume  td-align-right'>${convertNumber(coin.market_cap)}</p></td></Tooltip>
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
            
   </tr>
    </Link>
  )
}

export default List;