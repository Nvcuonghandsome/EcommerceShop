import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from 'react-router-dom'
import MenuLeft from './Account/MenuLeft'
import { CartContext } from './CartContext';
import { useState } from "react";

function App(props) {
  const [total, setTotal] = useState("")
  const params = useLocation()

  function getCart(cart) {
    setTotal(cart)
    // get cart xong phải set vào localStorage để khi reload page cart vẫn đc hiển thị
    localStorage.setItem("cart", cart)
  }

  return (
    <CartContext.Provider value={getCart}>
      <Header total={total} />
      <div className="container">
        <div className="row">
          {
            params.pathname.includes("account") ? <MenuLeft /> : ""
          }
          {props.children}
        </div>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
