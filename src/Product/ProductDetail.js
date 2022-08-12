import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams()
    const [data, setData] = useState({}) // object
    const [images, setImages] = useState([])
    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/product/detail/" + params.id)
            .then(res => {
                setData(res.data.data)
                setImages(JSON.parse(res.data.data.image))
                // console.log("check product detail data: ", res.data.data)
            })
    }, [])

    function handleItemClick(e) {
        // console.log("check item: ", e.target.currentSrc)
        const showImg = document.querySelector('.view-product > img')
        showImg.src = e.target.currentSrc
    }

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="left-sidebar">
                            <h2>Category</h2>
                            <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
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
                                                <li><a href>Nike </a></li>
                                                <li><a href>Under Armour </a></li>
                                                <li><a href>Adidas </a></li>
                                                <li><a href>Puma</a></li>
                                                <li><a href>ASICS </a></li>
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
                                                <li><a href>Fendi</a></li>
                                                <li><a href>Guess</a></li>
                                                <li><a href>Valentino</a></li>
                                                <li><a href>Dior</a></li>
                                                <li><a href>Versace</a></li>
                                                <li><a href>Armani</a></li>
                                                <li><a href>Prada</a></li>
                                                <li><a href>Dolce and Gabbana</a></li>
                                                <li><a href>Chanel</a></li>
                                                <li><a href>Gucci</a></li>
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
                                                <li><a href>Fendi</a></li>
                                                <li><a href>Guess</a></li>
                                                <li><a href>Valentino</a></li>
                                                <li><a href>Dior</a></li>
                                                <li><a href>Versace</a></li>
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
                            </div>{/*/category-products*/}
                            <div className="brands_products">{/*brands_products*/}
                                <h2>Brands</h2>
                                <div className="brands-name">
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><a href> <span className="pull-right">(50)</span>Acne</a></li>
                                        <li><a href> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                                        <li><a href> <span className="pull-right">(27)</span>Albiro</a></li>
                                        <li><a href> <span className="pull-right">(32)</span>Ronhill</a></li>
                                        <li><a href> <span className="pull-right">(5)</span>Oddmolly</a></li>
                                        <li><a href> <span className="pull-right">(9)</span>Boudestijn</a></li>
                                        <li><a href> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                                    </ul>
                                </div>
                            </div>{/*/brands_products*/}
                            <div className="price-range">{/*price-range*/}
                                <h2>Price Range</h2>
                                <div className="well">
                                    <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                                    <b>$ 0</b> <b className="pull-right">$ 600</b>
                                </div>
                            </div>{/*/price-range*/}
                            <div className="shipping text-center">{/*shipping*/}
                                <img src="images/home/shipping.jpg" alt="" />
                            </div>{/*/shipping*/}
                        </div>
                    </div>
                    <div className="col-sm-9 padding-right">
                        <div className="product-details">
                            <div className="col-sm-5">
                                <div className="view-product">
                                    <img
                                        src={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/${images[0]}`}
                                        alt="" />
                                    <a
                                        href={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/${images[0]}`}
                                        rel="prettyPhoto">
                                        <h3>ZOOM</h3>
                                    </a>
                                </div>

                                <div id="similar-product" className="carousel slide" data-ride="carousel">
                                    {/* Wrapper for slides */}
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            {images && images.length > 0 &&
                                                images.map((image, index) => {
                                                    return (
                                                        <Link
                                                            to="" key={index}
                                                            onClick={handleItemClick}
                                                        >
                                                            <img
                                                                src={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/${image}`}
                                                                alt=""
                                                                width="28%"
                                                            />
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/* <div className="item">
                                            {images && images.length > 0 &&
                                                images.map((image, index) => {
                                                    return (
                                                        <Link to="" key={index}>
                                                            <img src={`http://localhost/laravel/laravel/public/upload/user/product/${data.id_user}/${image}`} alt="" />
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div> */}
                                    </div>
                                    {/* Controls */}
                                    <a className="left item-control" href="#similar-product" data-slide="prev">
                                        <i className="fa fa-angle-left" />
                                    </a>
                                    <a className="right item-control" href="#similar-product" data-slide="next">
                                        <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="product-information">
                                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                    <h2>{data.name}</h2>
                                    <p>Web ID: {data.web_id}</p>
                                    <img src="images/product-details/rating.png" alt="" />
                                    <span>
                                        <span>US ${data.price}</span>
                                        <label>Quantity:</label>
                                        <input type="text" defaultValue={1} />
                                        <button type="button" className="btn btn-fefault cart">
                                            <i className="fa fa-shopping-cart" />
                                            Add to cart
                                        </button>
                                    </span>
                                    <p><b>Availability:</b> In Stock</p>
                                    <p><b>Condition:</b> New</p>
                                    <p><b>Brand:</b> {data.company_profile}</p>
                                    <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ProductDetail