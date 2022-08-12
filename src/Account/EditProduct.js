import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import RenderErrors from "../RenderErrors"

export default function EditProduct() {
    const navigate = useNavigate()
    const params = useParams()
    let dataUser = localStorage.getItem("dataUser")
    dataUser = JSON.parse(dataUser)
    const config = {
        headers: {
            'Authorization': 'Bearer ' + dataUser.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    // get edit product
    useEffect(() => {
        axios.get(`http://localhost/laravel/laravel/public/api/user/product/${params.id}`, config)
            .then(res => {
                setProduct(res.data.data)
                // console.log("check edit product: ", res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // data type: object
    const [product, setProduct] = useState({})
    const [brandCategory, setBrandCategory] = useState([])
    const [errs, setErrs] = useState({})
    const [avatar, setAvatar] = useState("")
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        status: "",
        sale: "",
        detail: "",
        company: ""
    })
    const [avatarCheckbox, setAvatarCheckbox] = useState([])

    function handleInput(e) {
        const key = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [key]: value }))
    }

    function handleFile(e) {
        if (e.target && e.target.files) {
            setAvatar(e.target.files)
        }
    }

    function handleEdit(e) {
        e.preventDefault()
        const errs = {}
        let flag = true

        if (inputs.name === "") {
            errs.name = "Vui long nhap ten edit"
            flag = false

        } else if (inputs.name !== "" && inputs.name.length < 5) {
            errs.name = "Vui long nhap ten dai hon 5 ki tu"
            flag = false
        }
        else {
            errs.name = ""
        }

        if (inputs.price === "") {
            errs.price = "Vui long nhap gia tien edit"
            flag = false
        } else if (inputs.price == 0) {
            errs.price = "Vui lòng nhập giá tiền lớn hơn 0"
            flag = false
        } else {
            errs.price = ""
        }

        if (inputs.status == 0 && (inputs.sale === "" || inputs.sale == 0)) {
            errs.sale = "Vui long nhap % sale edit"
            flag = false
        } else {
            errs.sale = ""
        }

        if (inputs.detail === "") {
            errs.detail = "Vui long nhap detail edit"
            flag = false
        } else {
            errs.detail = ""
        }

        if (inputs.company === "") {
            errs.company = "Vui long nhap company profile edit"
            flag = false
        } else {
            errs.company = ""
        }

        if (avatar === "") {
            errs.avatar = "Vui long chon avatar"
            flag = false
        } else {
            // console.log("check avatar: ", avatar)
            // console.log("check avatarCheckbox: ", avatarCheckbox)
            if ((Object.keys(avatar).length + (product.image.length - avatarCheckbox.length)) > 3) {
                errs.avatar = "Vui lòng chọn tối đa 3 files"
                flag = false
            }
            else {
                const regexImg = /\/png|\/jpg|\/jpeg/i
                for (let file of avatar) {
                    if (!regexImg.test(file.type)) {
                        errs.avatar = "File sai định dạng"
                        flag = false
                        break
                    } else if (file.size > 1024 * 1024) {
                        errs.avatar = "File vượt quá 1MB"
                        flag = false
                        break
                    } else {
                        errs.avatar = ""
                    }
                }
            }
        }

        if (!flag) {
            setErrs(errs)
        } else {
            setErrs({})
            // send to API
            const formData = new FormData()
            formData.append('name', inputs.name)
            formData.append('price', inputs.price)
            formData.append('brand', inputs.brand)
            formData.append('category', inputs.category)
            formData.append('detail', inputs.detail)
            formData.append('status', inputs.status)
            formData.append('sale', inputs.sale)
            formData.append('company', inputs.company)
            avatarCheckbox.map(item => {
                formData.append("avatarCheckbox[]", item)
            })
            Object.values(avatar).map(item => {
                formData.append("file[]", item)
            })
            // URL path:    
            const url = "http://localhost/laravel/laravel/public/api/user/edit-product/" + params.id
            axios.post(url, formData, config)
            // .then(res => {
            //     console.log("check data editproduct: ", res)
            // })
            // .catch(err => {
            //     console.log("something wrong: ", err)
            // })
            alert("Bạn đã edit sản phẩm thành công!")
            navigate("/account/myproduct")
        }
    }

    function handleCheckbox(e, img) {
        if (e.target.checked) {
            setAvatarCheckbox(state => ([...state, img]))
        }
        else {
            const avtCheckbox2 = avatarCheckbox.filter(image => {
                return image !== img
            })
            setAvatarCheckbox(avtCheckbox2)
        }
    }

    function renderCategory() {
        const category = brandCategory.category
        // console.log("check category: ", category)
        if (category && category.length > 0) {
            return <select name="category" onChange={handleInput}>
                {
                    category.map((item) => {
                        if (product.id_category === item.id) {
                            return <option key={item.id} value={item.id} selected >{item.category}</option>
                        }
                        return <option key={item.id} value={item.id} >{item.category}</option>
                    })
                }
            </select>
        }
    }

    function renderBrand() {
        const brand = brandCategory.brand
        if (brand && brand.length > 0) {
            return <select name="brand" onChange={handleInput}>
                {
                    brand.map((item) => {
                        if (product.id_brand === item.id) {
                            return <option value={item.id} selected >{item.brand}</option>
                        }
                        return <option value={item.id} >{item.brand}</option>
                    })
                }
            </select>
        }
    }

    function renderStatus() {
        const newOp = document.getElementById("new-option")
        const saleOp = document.getElementById("sale-option")
        const saleDiv = document.getElementById("sale")
        const saleInput = document.querySelector("#sale > input")

        if (inputs.status === "") {
            if (product.status === 1 && newOp && saleDiv) {
                newOp.setAttribute("selected", "selected")
                saleDiv.style.display = "none"
                // console.log("hide sale div on func renderStatus rỗng")
            }
            if (product.status === 0 && saleOp && saleDiv) {
                saleOp.setAttribute("selected", "selected")
                saleDiv.style.display = "block"
                saleInput.defaultValue = product.sale
                // console.log("show sale div on func renderStatus rỗng")
            }
        } else if (inputs.status == 1) {
            saleDiv.style.display = "none"
            // console.log("hide sale div on func renderStatus 1")
        }
        else {
            saleDiv.style.display = "block"
            // console.log("show sale div on func renderStatus 0")
        }

        return (
            <>
                <select id="status" name="status" onChange={handleInput}>
                    <option id="sale-option" value={0}>Sale</option>
                    <option id="new-option" value={1}>New</option>
                </select>
                <div id="sale">
                    <input
                        style={{ width: "30%", display: "inline" }}
                        name="sale" type="number"
                        onChange={handleInput} />
                    %
                </div>
            </>
        )
    }

    // call data for brand & category
    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
            .then(res => {
                setBrandCategory(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="col-sm-9" style={{ marginBottom: "20px" }}>
            {<RenderErrors errors={errs} />}
            <div className="signup-form">
                <h2>Edit Product</h2>
                <form action="" onSubmit={handleEdit} encType="multipart/form-data" >
                    <input defaultValue={product.name} name="name" type="text" placeholder="Name" onChange={handleInput} />
                    <input defaultValue={product.price} name="price" type="number" placeholder="Price" onChange={handleInput} />
                    {renderCategory()}
                    {renderBrand()}
                    {renderStatus()}

                    <input
                        defaultValue={product.company_profile}
                        name="company"
                        type="text"
                        placeholder="Company Profile"
                        onChange={handleInput}
                    />
                    <textarea
                        defaultValue={product.detail}
                        name="detail"
                        placeholder="Detail"
                        onChange={handleInput}
                    />
                    <label htmlFor="avatar">
                        Avatar:
                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            placeholder="Avatar"
                            multiple
                            onChange={handleFile}
                        />
                    </label>
                    <div className="imgCheckbox" style={{ display: "flex" }}>
                        {
                            product.image && product.image.map((img, index) => {
                                return <div>
                                    <img
                                        key={index}
                                        src={`http://localhost/laravel/laravel/public/upload/user/product/${product.id_user}/${img}`}
                                        alt=""
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            marginRight: "10px",
                                            border: "1px solid #ccc"
                                        }}
                                    />
                                    <input
                                        style={{ height: "20px" }}
                                        type="checkbox"
                                        onChange={(e) => handleCheckbox(e, img)}
                                    />
                                </div>
                            })
                        }
                    </div>
                    <button
                        style={{ marginTop: "10px" }}
                        type="submit"
                        className="btn btn-default"
                    >Edit</button>
                </form>
            </div>
        </div>
    )
}