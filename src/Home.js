import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "./CartContext"

function Home() {

    const [data, setData] = useState([])

    // get cart by useContext
    const [cart, setCart] = useState("")
    const getCart = useContext(CartContext)
    if (cart !== "") {
        getCart(cart)
    }

    useEffect(() => {
        // get product
        axios.get("http://localhost/laravel/laravel/public/api/product")
            .then(res => {
                // console.log("check data:", res)
                setData(res.data.data)
            })
            .catch(err => {
                console.log("err")
            })

        // let cartList = {}
        // const cartLocal = localStorage.getItem("cartLocal")
        // if (cartLocal) {
        //     cartList = JSON.parse(cartLocal)
        // }
        // axios.post("http://localhost/laravel/laravel/public/api/product/cart", cartList)
        //     .then(res => {
        //         // console.log("check handle add data cart: ", res)
        //         const data = res.data.data
        //         if (data && data.length > 0) {
        //             let totalQty = 0
        //             data.map(product => {
        //                 totalQty += product.qty
        //             })
        //             setCart(totalQty)
        //         }
        //     })

    }, [])

    function renderData() {
        if (data) {
            return data.map(product => {
                const images = JSON.parse(product.image)
                return (
                    <div key={product.id} className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products" id={product.id}>
                                <div className="productinfo text-center">
                                    <img
                                        src={`http://localhost/laravel/laravel/public/upload/user/product/${product.id_user}/${images[0]}`}
                                        alt=""
                                    />
                                    <h2>${product.price}</h2>
                                    <p>{product.name}</p>
                                    <button className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>${product.price}</h2>
                                        <p>{product.name}</p>
                                        <button
                                            className="btn btn-default add-to-cart"
                                            onClick={() => handleAddToCart(product.id)}
                                        ><i className="fa fa-shopping-cart" />Add to cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li>
                                        <Link
                                            onClick={() => handleWishList(product.id)}
                                            to=""
                                        ><i className="fa fa-plus-square" />Add to wishlist</Link>
                                    </li>
                                    <li><Link to=""><i className="fa fa-plus-square" />Add to compare</Link></li>
                                </ul>
                            </div>
                            <Link
                                className="btn btn-default add-to-cart"
                                to={`/product/detail/${product.id}`}
                            >More</Link>
                        </div>
                    </div >
                )
            })
        }
    }

    function handleWishList(id) {
        let wishList = []
        const wishListLocal = localStorage.getItem("wishListLocal")
        if (wishListLocal) {
            wishList = JSON.parse(wishListLocal)
        }
        if (wishList && wishList.length > 0) {
            // check xem id có trong wishList chưa
            const flag = wishList.some((item) => {
                return item === id
            })
            if (!flag) {
                wishList.push(id)
            }
        } else {
            wishList.push(id)
        }
        localStorage.setItem("wishListLocal", JSON.stringify(wishList))
    }

    function handleAddToCart(id) {
        let cartList = {}
        const cartLocal = localStorage.getItem("cartLocal")
        if (cartLocal) {
            cartList = JSON.parse(cartLocal)
        }

        if (cartList && Object.keys(cartList).length > 0 && cartList[id]) {
            cartList[id]++
        }
        else {
            cartList[id] = 1
        }
        axios.post("http://localhost/laravel/laravel/public/api/product/cart", cartList)
            .then(res => {
                // console.log("check handle add data cart: ", res)
                const data = res.data.data
                if (data && data.length > 0) {
                    let totalQty = 0
                    data.map(product => {
                        totalQty += product.qty
                    })
                    setCart(totalQty)
                }
            })
        localStorage.setItem("cartLocal", JSON.stringify(cartList))
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="left-sidebar">
                            <h2>Category</h2>
                            <div className="panel-group category-products" id="accordian">
                                {/*category-productsr*/}
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                                Sportswear
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="sportswear" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <ul>
                                                <li><a href="#">Nike </a></li>
                                                <li><a href="#">Under Armour </a></li>
                                                <li><a href="#">Adidas </a></li>
                                                <li><a href="#">Puma</a></li>
                                                <li><a href="#">ASICS </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                                Mens
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="mens" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <ul>
                                                <li><a href="#">Fendi</a></li>
                                                <li><a href="#">Guess</a></li>
                                                <li><a href="#">Valentino</a></li>
                                                <li><a href="#">Dior</a></li>
                                                <li><a href="#">Versace</a></li>
                                                <li><a href="#">Armani</a></li>
                                                <li><a href="#">Prada</a></li>
                                                <li><a href="#">Dolce and Gabbana</a></li>
                                                <li><a href="#">Chanel</a></li>
                                                <li><a href="#">Gucci</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                                                <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                                Womens
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="womens" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <ul>
                                                <li><a href="#">Fendi</a></li>
                                                <li><a href="#">Guess</a></li>
                                                <li><a href="#">Valentino</a></li>
                                                <li><a href="#">Dior</a></li>
                                                <li><a href="#">Versace</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Kids</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Fashion</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Households</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Interiors</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Clothing</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Bags</a></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><a href="#">Shoes</a></h4>
                                    </div>
                                </div>
                            </div>
                            {/*/category-products*/}
                            <div className="brands_products">
                                {/*brands_products*/}
                                <h2>Brands</h2>
                                <div className="brands-name">
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><a href="#"> <span className="pull-right">(50)</span>Acne</a></li>
                                        <li><a href="#"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                                        <li><a href="#"> <span className="pull-right">(27)</span>Albiro</a></li>
                                        <li><a href="#"> <span className="pull-right">(32)</span>Ronhill</a></li>
                                        <li><a href="#"> <span className="pull-right">(5)</span>Oddmolly</a></li>
                                        <li><a href="#"> <span className="pull-right">(9)</span>Boudestijn</a></li>
                                        <li><a href="#"> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/*/brands_products*/}
                            <div className="price-range">
                                {/*price-range*/}
                                <h2>Price Range</h2>
                                <div className="well text-center">
                                    <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                                    <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
                                </div>
                            </div>
                            {/*/price-range*/}
                            <div className="shipping text-center">
                                {/*shipping*/}
                                <img src="images/home/shipping.jpg" alt="" />
                            </div>
                            {/*/shipping*/}
                        </div>
                    </div>
                    <div className="col-sm-9 padding-right">
                        <div className="features_items">
                            <h2 className="title text-center">Features Items</h2>
                            {renderData()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home