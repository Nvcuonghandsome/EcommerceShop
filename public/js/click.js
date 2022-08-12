// objCha={
//     product1: {
//       img:...
//       price:..
//       name:..
//       qty:2
//     },
//     product2: {
//       img:...
//       price:..
//       name:..
//       qty:2
//     },
//     product3: {
//       img:...
//       price:..
//       name:..
//       qty:2
//     },
//     product4: {
//       img:...
//       price:..
//       name:..
//       qty:2
//     }
// }

// dung ham MAP, map data ra theo table html đã lam sẵn


// ---------
// khi click ADD TO CART:
// từ vị tri thang nay (this) lay: img, name, price, id
// thi tao objcon nhu sau:
// {
//   img:...
//   price:..
//   name:..
//   qty:1
// }

// va sau do dua objcon nay vao objCha, va dung chinh ID cua product làm key
// (ID chua co, nên tụ them vao trong html, 6 product 6 ID)

// {
// product1: {
//   img:...
//   price:..
//   name:..
//   qty:1
// }
// }
// => dua vao local
// {
// product1: {
//   img:...
//   price:..
//   name:..
//   qty:1
// },
// product2: {
//   img:...
//   price:..
//   name:..
//   qty:2
// },
// ...
// }

// va chu y giup a, 1 product mua nhieu lan thi tang qty len
// cái này se lam sau khi đã tao dc product nhu tren


{/* <div class="single-products" id="product-1">
    <div class="productinfo text-center">
        <img src="images/home/product1.jpg" alt="" />
        <h2>$36</h2>
        <p>Easy Polo Black Edition</p>
        <a href="#" class="btn btn-default add-to-cart"><i
            class="fa fa-shopping-cart"></i>Add to cart</a>
    </div>
    <div class="product-overlay">
        <div class="overlay-content">
            <h2>$36</h2>
            <p>Easy Polo Black Edition</p>
            <a href="#" class="btn btn-default add-to-cart"><i
                class="fa fa-shopping-cart"></i>Add to cart</a>
        </div>
    </div>
</div> */}


<tr>
    <td class="cart_product">
        <a href=""><img src="images/cart/one.png" alt=""></a>
    </td>
    <td class="cart_description">
        <h4><a href="">Colorblock Scuba</a></h4>
        <p>Web ID: 1089772</p>
    </td>
    <td class="cart_price">
        <p>$59</p>
    </td>
    <td class="cart_quantity">
        <div class="cart_quantity_button">
            <a class="cart_quantity_up" href=""> + </a>
            <input class="cart_quantity_input" type="text" name="quantity" value="1" autocomplete="off" size="2">
                <a class="cart_quantity_down" href=""> - </a>
        </div>
    </td>
    <td class="cart_total">
        <p class="cart_total_price">$59</p>
    </td>
    <td class="cart_delete">
        <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
    </td>
</tr>
