import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

export default function Rating(props) {
    const [rating, setRating] = useState(0)
    function changeRating(newRating) {
        const errRating = document.querySelector('p.errRating')
        const checkLogin = localStorage.getItem("isLogin")
        if (!checkLogin) {
            errRating.innerHTML = "Vui lòng đăng nhập trước khi đánh giá"
        } else {
            errRating.innerHTML = ""
            // setRating ở component StarRatings
            setRating(newRating)
            // send to API
            let dataUser = localStorage.getItem("dataUser")
            dataUser = JSON.parse(dataUser)
            const formData = new FormData()
            formData.append('blog_id', props.idBlog)
            formData.append('user_id', dataUser.id_user)
            // rate lấy ở rating sẽ ra 0
            formData.append('rate', newRating)
            // URL
            const url = "http://localhost/laravel/laravel/public/api/blog/rate/" + props.idBlog
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
                    // console.log("check rating data: ", res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/blog/rate/" + props.idBlog)
            .then(res => {
                const data = res.data.data
                // data trên server lỗi, lúc [] lúc {} nên map sẽ lỗi
                if (data.length > 0) {
                    let total = 0
                    data.map(item => {
                        total += item.rate
                    })
                    const averageRating = (total / data.length)
                    setRating(averageRating)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [rating])

    return (
        <>
            <div className="rating-area">
                <StarRatings
                    rating={rating}
                    starRatedColor="yellow"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                />
            </div>
            <p
                style={{ color: "red", marginLeft: "4px" }}
                className="errRating"
            ></p>
        </>
    );
}