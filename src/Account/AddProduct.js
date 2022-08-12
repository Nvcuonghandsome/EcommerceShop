import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import RenderErrors from '../RenderErrors'

export default function AddProduct() {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [errs, setErrs] = useState({})
    const [avatar, setAvatar] = useState("")
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: 0,
        sale: "",
        detail: "",
        company: ""
    })

    function handleInput(e) {
        const key = e.target.name
        const value = e.target.value
        if (key === "status") {
            const saleElement = document.querySelector("form > #sale")
            if (value == 1) {
                saleElement.style.display = "none"
            } else {
                saleElement.style.display = "block"
            }
        }
        setInputs(state => ({ ...state, [key]: value }))
    }

    function handleFile(e) {
        if (e.target && e.target.files) {
            setAvatar(e.target.files)
        }
    }

    function handleSignup(e) {
        e.preventDefault()
        const errs = {}
        let flag = true
        if (inputs.name === "") {
            errs.name = "Vui long nhap ten cua ban"
            flag = false
        } else if (inputs.name.length < 5) {
            errs.name = "Vui long nhap ten dai hon 5 ki tu"
            flag = false
        }
        else {
            errs.name = ""
        }

        if (inputs.price === "") {
            errs.price = "Vui long nhap gia tien"
            flag = false
        } else if (inputs.price == 0) {
            errs.price = "Vui lòng nhập giá tiền lớn hơn 0"
            flag = false
        } else {
            errs.price = ""
        }

        if (inputs.category === "") {
            errs.category = "Vui long chon category"
            flag = false
        } else {
            errs.category = ""
        }

        if (inputs.brand === "") {
            errs.brand = "Vui long chon brand"
            flag = false
        } else {
            errs.brand = ""
        }

        if (inputs.status == 0 && (inputs.sale === "" || inputs.sale == 0)) {
            errs.sale = "Vui long nhap % sale"
            flag = false
        } else {
            errs.sale = ""
        }

        if (inputs.detail === "") {
            errs.detail = "Vui long nhap detail"
            flag = false
        } else {
            errs.detail = ""
        }

        if (inputs.company === "") {
            errs.company = "Vui long nhap company profile"
            flag = false
        } else {
            errs.company = ""
        }

        if (avatar === "") {
            errs.avatar = "Vui long chon avatar"
            flag = false
        } else {
            // console.log("check avatar: ", avatar)
            if (Object.keys(avatar).length > 3) {
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
            Object.keys(avatar).map(item => {
                formData.append("file[]", avatar[item])
            })
            // URL path:    
            const url = "http://localhost/laravel/laravel/public/api/user/add-product"
            // config send token to API
            let dataUser = localStorage.getItem("dataUser")
            dataUser = JSON.parse(dataUser)
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + dataUser.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            axios.post(url, formData, config)
                .then(res => {

                    console.log("check data addproduct: ", res)
                })
                .catch(err => {
                    console.log("something wrong: ", err)
                })
            alert("Bạn đã thêm sản phẩm thành công!")
            navigate("/account/myproduct")
        }
    }

    function renderCategory() {
        const category = data.category
        // console.log("check category: ", category)
        if (category && category.length > 0) {
            return <select name="category" onChange={handleInput}>
                <option value="">Please choose category</option>
                {
                    category.map((item) => {
                        return <option key={item.id} value={item.id} >{item.category}</option>
                    })
                }
            </select>
        }
    }

    function renderBrand() {
        const brand = data.brand
        // console.log("check category: ", category)
        if (brand && brand.length > 0) {
            return <select name="brand" onChange={handleInput}>
                <option value="">Please choose brand</option>
                {
                    brand.map((item) => {
                        return <option value={item.id} >{item.brand}</option>
                    })
                }
            </select>
        }
    }

    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/category-brand")
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="col-sm-9" style={{ marginBottom: "20px" }}>
            {<RenderErrors errors={errs} />}
            <div className="signup-form">
                <h2>Create Product</h2>
                <form action="" onSubmit={handleSignup} encType="multipart/form-data" >
                    <input name="name" type="text" placeholder="Name" onChange={handleInput} />
                    <input name="price" type="number" placeholder="Price" onChange={handleInput} />
                    {renderCategory()}
                    {renderBrand()}
                    <select name="status" onChange={handleInput}>
                        <option value={0}>Sale</option>
                        <option value={1}>New</option>
                    </select>
                    <div id="sale">
                        <input
                            style={{ width: "30%", display: "inline" }}
                            defaultValue={0}
                            name="sale" type="number"
                            onChange={handleInput} />
                        %
                    </div>
                    <input name="company" type="text" placeholder="Company Profile" onChange={handleInput} />
                    <textarea name="detail" placeholder="Detail" onChange={handleInput} />
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

                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
    )
}