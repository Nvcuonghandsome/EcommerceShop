import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './MyProduct.scss'

export default function MyProduct() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    let dataUser = localStorage.getItem("dataUser")
    dataUser = JSON.parse(dataUser)
    const config = {
        headers: {
            'Authorization': 'Bearer ' + dataUser.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }

    function handleDelete(id) {
        axios.get(`http://localhost/laravel/laravel/public/api/user/delete-product/${id}`, config)
            .then(res => {
                setData(res.data.data)
                // console.log("check delete data: ", res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function renderData() {
        if (Object.keys(data).length > 0) {
            return Object.values(data).map(item => {
                const images = JSON.parse(item.image)
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            {/* {
                                images.map(link => {
                                    return <img src={`http://localhost/laravel/laravel/public/upload/user/product/${item.id_user}/${link}`} alt="" />
                                })
                            } */}
                            <img src={`http://localhost/laravel/laravel/public/upload/user/product/${item.id_user}/${images[0]}`} alt="" />
                        </td>
                        <td>{item.price}</td>
                        <td>
                            <i
                                onClick={() => navigate(`/account/user/product/${item.id}`)}
                                id="edit"
                                className="fa-solid fa-pen-to-square"
                            ></i>
                            <i
                                onClick={() => handleDelete(item.id)}
                                id="delete"
                                className="fa-solid fa-x"
                            ></i>
                        </td>
                    </tr>
                )
            })
        }
    }

    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/user/my-product", config)
            .then(res => {
                setData(res.data.data)
                console.log("check data: ", res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='col-sm-9'>
            <div className="myproduct">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </table>
                <Link to="/account/addproduct">Add New</Link>
            </div>
        </div>
    )
}