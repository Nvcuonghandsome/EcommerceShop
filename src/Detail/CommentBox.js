import axios from "axios"

function CommentBox(props) {
    let idComment = props.idComment
    if (idComment != 0) {
        document.getElementById("textarea").focus()
    }

    function handleClick() {
        const checkLogin = localStorage.getItem("isLogin")

        if (!checkLogin) {
            alert("Vui long dang nhap truoc khi binh luan")
        } else {
            let inputValue = document.getElementById("textarea").value
            const errText = document.getElementById("errText")
            if (inputValue === "") {
                errText.innerHTML = "Vui long nhap binh luan"
            } else {
                errText.innerHTML = ""
                // send to API
                let dataUser = localStorage.getItem("dataUser")
                dataUser = JSON.parse(dataUser)
                const formData = new FormData()
                formData.append('id_blog', props.idBlog)
                formData.append('id_user', dataUser.id_user)
                formData.append('id_comment', idComment)
                formData.append('comment', inputValue)
                formData.append('image_user', dataUser.image_user)
                formData.append('name_user', dataUser.name_user)
                // URL path: 
                const url = "http://localhost/laravel/laravel/public/api/blog/comment/" + props.idBlog
                // config send token to API
                const config = {
                    headers: {
                        'Authorization': 'Bearer ' + dataUser.token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
                axios.post(url, formData, config)
                    .then(res => {
                        // console.log("check data comment box: ", res.data.data)
                        props.getComment(res.data.data)
                    })
                    .catch(err => {
                        console.log("something wrong: ", err)
                    })

                // reset textarea
                document.getElementById("textarea").value = ""
            }
        }
    }

    function handleReset() {
        idComment = 0
    }

    return (
        <>
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea id="textarea" name="message" rows={11} defaultValue={""} />
                            <p id="errText"></p>
                            <button
                                onClick={handleClick}
                                className="btn btn-primary"
                            >Post comment</button>
                            <button
                                style={{ marginLeft: "12px" }}
                                onClick={handleReset}
                                className="btn btn-primary"
                            >Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentBox