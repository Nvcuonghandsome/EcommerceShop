import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../CartContext"

const Cart = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState("")
    const getCart = useContext(CartContext)

    if (cart !== "") {
        getCart(cart)
    }

    let cartList = {}
    const cartLocal = localStorage.getItem("cartLocal")
    if (cartLocal) {
        cartList = JSON.parse(cartLocal)
    }
    useEffect(() => {
        axios.post("http://localhost/laravel/laravel/public/api/product/cart", cartList)
            .then(res => {
                // console.log("check cart: ", res)
                setData(res.data.data)

                const data = res.data.data
                if (data && data.length > 0) {
                    let total = 0
                    let qtyTotal = 0
                    data.map(product => {
                        total += product.price * product.qty
                        qtyTotal += product.qty
                    })
                    setTotal(total)
                    setCart(qtyTotal)
                }
            })
    }, [])

    function handleDelete(id, qty, price) {
        const deleteElement = document.getElementById(id)
        setTotal(total - price * qty)
        setCart(cart - qty)
        deleteElement.style.display = "none"
        delete cartList[id]
        localStorage.setItem("cartLocal", JSON.stringify(cartList))
    }

    function handleUpDown(action, id, qty, price) {
        const tableRound = document.getElementById(id)
        const input = tableRound.querySelector('input.cart_quantity_input')

        if (action === "up") {
            qty++
            cartList[id] = qty
            input.value = qty
            setTotal(total + price)
            setCart(cart + 1)
        } else {
            if (qty > 1) {
                qty--
                cartList[id] = qty
                input.value = qty
            } else {
                tableRound.style.display = "none"
                delete cartList[id]
            }
            setTotal(total - price)
            setCart(cart - 1)
        }

        localStorage.setItem("cartLocal", JSON.stringify(cartList))
        axios.post("http://localhost/laravel/laravel/public/api/product/cart", cartList)
            .then(res => {
                // console.log("check cart: ", res)
                setData(res.data.data)
            })
    }

    function renderTable() {
        if (data && data.length > 0) {
            return data.map(product => {
                const images = JSON.parse(product.image)
                return (
                    <tr id={product.id} key={product.id}>
                        <td className="cart_product">
                            <Link to="">
                                <img
                                    width="100px"
                                    height="80px"
                                    src={`http://localhost/laravel/laravel/public/upload/user/product/${product.id_user}/${images[0]}`}
                                    alt=""
                                />
                            </Link>
                        </td>
                        <td className="cart_description">
                            <h4><Link to="">{product.name}</Link></h4>
                            <p>Web ID: {product.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${product.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <Link
                                    onClick={() => handleUpDown("up", product.id, product.qty, product.price)}
                                    to=""
                                    className="cart_quantity_up"
                                > + </Link>
                                <input
                                    className="cart_quantity_input"
                                    type="text"
                                    name="quantity"
                                    value={product.qty}
                                    autoComplete="off" size={2}
                                />
                                <Link
                                    onClick={() => handleUpDown("down", product.id, product.qty, product.price)}
                                    to=""
                                    className="cart_quantity_down"
                                > - </Link>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${product.price * product.qty}</p>
                        </td>
                        <td className="cart_delete">
                            <Link
                                onClick={() => handleDelete(product.id, product.qty, product.price)}
                                className="cart_quantity_delete"
                                to=""
                            ><i className="fa fa-times" /></Link>
                        </td>
                    </tr>
                )
            })
        }
    }

    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description" />
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                                {renderTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your
                            delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping &amp; Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href>Get Quotes</a>
                                <a className="btn btn-default check_out" href>Continue</a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>${total}</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>${total + 2}</span></li>
                                </ul>
                                <a className="btn btn-default update" href>Update</a>
                                <a className="btn btn-default check_out" href>Check Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart