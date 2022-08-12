import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RenderErrors from "../RenderErrors"

function Login() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        password: "",
        email: "",
        level: 0
    })
    const [errs, setErrs] = useState({})
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    function handleInput(e) {
        const inputName = e.target.name
        const value = e.target.value
        setInputs(state => ({ ...state, [inputName]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const err = {}
        let flag = true

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
            err.password = "Vui lòng nhập mật khẩu của bạn"
            flag = false
        } else {
            err.password = ""
        }

        if (!flag) {
            setErrs(err)
        } else {
            // check data
            axios.post("http://localhost/laravel/laravel/public/api/login", inputs)
                .then(res => {
                    // nếu có lỗi
                    if (res.data.errors) {
                        setErrs(res.data.errors)
                    } else {
                        // return Home Page
                        alert("Bạn đã đăng nhập thành công")
                        // console.log("check data login: ", res)
                        localStorage.setItem("isLogin", true)
                        // set data comment: 
                        let dataUser = {
                            id_user: res.data.Auth.id,
                            name_user: res.data.Auth.name,
                            image_user: res.data.Auth.avatar,
                            token: res.data.success.token
                        }
                        dataUser = JSON.stringify(dataUser)
                        localStorage.setItem("dataUser", dataUser)
                        // redirect to Home Page
                        navigate("/")
                    }
                })
                .catch(err => {
                    console.log("check err", err)
                })

        }
    }

    return (
        <div className="col-sm-4 col-sm-offset-1">
            {<RenderErrors errors={errs} />}
            <div className="login-form">
                <h2>Login to your account</h2>
                <form action="" onSubmit={handleSubmit} >
                    <input name="email" type="text" placeholder="Email Address" onChange={handleInput} />
                    <input name="password" type="password" placeholder="Your Password" onChange={handleInput} />
                    <span>
                        <input type="checkbox" className="checkbox" />
                        Keep me signed in
                    </span>
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login