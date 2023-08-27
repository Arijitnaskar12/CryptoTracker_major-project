import { toast } from "react-toastify";
// import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const addToWatchlist = (id) => {
  let items = localStorage.getItem("watchlist");
  if (items) {
    let arr = JSON.parse(items);
    if (!arr.includes(id)) {
      arr.push(id);
      localStorage.setItem("watchlist", JSON.stringify(arr));
    }
  } else {
    var arr = JSON.stringify([id]);
    localStorage.setItem("watchlist", arr);
  }
  toast.success(
    `${id.slice(0, 1).toUpperCase() + id.slice(1)} - Added To The Watchlist!`
  );
};