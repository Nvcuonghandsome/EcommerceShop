import axios from "axios"
import { useState } from "react"
import RenderErrors from "../RenderErrors"

function Register() {
    const [file, setFile] = useState("")
    const [avatar, setAvatar] = useState("")
    const [errs, setErrs] = useState({})
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        level: 0,
        avatar: avatar
    })

    function handleInput(e) {
        const inputName = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [inputName]: value }))
    }

    function handleFile(e) {
        const fileImg = e.target.files[0]
        setFile(fileImg) // validate file            
        const reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result) // send API to server
        }
        reader.readAsDataURL(fileImg)
    }

    function handleSignup(e) {
        e.preventDefault()

        const err = {}
        let flag = true

        if (inputs.name == "") {
            err.name = "Vui lòng nhập tên của bạn"
            flag = false
        } else {
            err.name = ""
        }

        if (inputs.email == "") {
            err.email = "Vui lòng nhập email của bạn"
            flag = false
        } else if (!regexEmail.test(inputs.email)) {
            err.email = "Email sai định dạng"
            flag = false
        } else {
            err.email = ""
        }

        if (inputs.password == "") {
            err.password = "Vui lòng nhập password của bạn"
            flag = false
        } else {
            err.password = ""
        }

        if (inputs.phone == "") {
            err.phone = "Vui lòng nhập sđt"
            flag = false
        } else {
            err.phone = ""
        }

        if (inputs.address == "") {
            err.address = "Vui lòng nhập địa chỉ"
            flag = false
        } else {
            err.address = ""
        }

        if (file == "") {
            err.avatar = "Vui lòng nhập avatar"
            flag = false
        } else {
            const validImg = /(\/png|\/jpg|\/jpeg)$/i
            if (!validImg.test(file.type)) {
                err.avatar = "File sai định dạng"
                flag = false
            } else if (file.size > 1024 * 1024) {
                err.avatar = "File vượt quá 1MB"
                flag = false
            } else {
                err.avatar = ""
            }
        }

        if (!flag) {
            setErrs(err)
        }
        else {
            // không set avatar ở lần đầu tiên bằng setInputs đc ???
            // console.log("check inputs register: ", { ...inputs, avatar: avatar })

            axios.post("http://localhost/laravel/laravel/public/api/register", { ...inputs, avatar: avatar })
                .then(res => {
                    console.log("check post data: ", res)
                    if (res.data.errors && res.data.errors.email) {
                        setErrs(res.data.errors.email)
                    } else {
                        setErrs({})
                        alert("Bạn đã đăng kí thành công!!!")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="col-sm-4">
            {<RenderErrors errors={errs} />}
            <div className="signup-form">
                <h2>New User Signup!</h2>
                <form action="" onSubmit={handleSignup} encType="multipart/form-data" >
                    <input name="name" type="text" placeholder="Name" onChange={handleInput} />
                    <input name="email" type="text" placeholder="Email Address" onChange={handleInput} />
                    <input name="password" type="password" placeholder="Password" onChange={handleInput} />
                    <input name="phone" type="text" placeholder="Phone" onChange={handleInput} />
                    <input name="address" type="text" placeholder="Address" onChange={handleInput} />

                    <label htmlFor="avatar">Avatar:</label>
                    <input id="avatar" name="avatar" type="file" placeholder="Avatar" onChange={handleFile} />

                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Register