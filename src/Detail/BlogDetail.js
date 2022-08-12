import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CommentBox from "./CommentBox"
import ListComment from "./ListComment"
import Rating from "./Rating"

function BlogDetail() {

    const params = useParams()
    const [dataDetail, setDataDetail] = useState({})
    const [listComment, setListComment] = useState([])
    // mặc định là 0: id comment cha, khi có reply thì set lại
    const [idComment, setIdComment] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost/laravel/laravel/public/api/blog/detail/${params.id}`)
            .then(res => {
                // console.log("data detail: ", res.data.data)
                setDataDetail(res.data.data)
                setListComment(res.data.data.comment)
            })
            .catch(err => {
                console.log(err)
            })
    }, [params.id])

    function getComment(comment) {
        setListComment(state => ([comment, ...state]))
    }

    function handleReply(id) {
        setIdComment(id)
        // console.log("handleReply...", idComment)
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
                                        <h4 className="panel-title"><button>Kids</button></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><button>Fashion</button></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><button>Households</button></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><button>Interiors</button></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><button>Clothing</button></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><button>Bags</button></h4>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 className="panel-title"><button>Shoes</button></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="brands_products">
                                <h2>Brands</h2>
                                <div className="brands-name">
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><button> <span className="pull-right">(50)</span>Acne</button></li>
                                        <li><button> <span className="pull-right">(56)</span>Grüne Erde</button></li>
                                        <li><button> <span className="pull-right">(27)</span>Albiro</button></li>
                                        <li><button> <span className="pull-right">(32)</span>Ronhill</button></li>
                                        <li><button> <span className="pull-right">(5)</span>Oddmolly</button></li>
                                        <li><button> <span className="pull-right">(9)</span>Boudestijn</button></li>
                                        <li><button> <span className="pull-right">(4)</span>Rösch creative culture</button></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="price-range">
                                <h2>Price Range</h2>
                                <div className="well">
                                    <input type="text" className="span2" defaultValue data-slider-min={0} data-slider-max={600} data-slider-step={5} data-slider-value="[250,450]" id="sl2" /><br />
                                    <b>$ 0</b> <b className="pull-right">$ 600</b>
                                </div>
                            </div>
                            <div className="shipping text-center">
                                <img src="images/home/shipping.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            <div className="single-blog-post">
                                <h3>{dataDetail.title}</h3>
                                <div className="post-meta">
                                    <ul>
                                        <li key="1"><i className="fa fa-user" /> Mac Doe</li>
                                        <li key="2"><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li key="3"><i className="fa fa-calendar" /> {dataDetail.created_at}</li>
                                    </ul>
                                </div>
                                <button>
                                    <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + dataDetail.image} alt="" />
                                </button>
                                <p>{dataDetail.description}</p> <br />
                                <p>
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br />
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br />
                                <p>
                                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                </p>
                                <div className="pager-area">
                                    <ul className="pager pull-right">
                                        <li><Link to="#">Pre</Link></li>
                                        <li><Link to="#">Next</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Rating idBlog={params.id} />
                        <div className="socials-share">
                            <a href><img src="images/blog/socials.png" alt="" /></a>
                        </div>
                        <ListComment listComment={listComment} handleReply={handleReply} />
                        <CommentBox idComment={idComment} idBlog={params.id} getComment={getComment} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogDetail