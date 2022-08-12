
export default function Account() {

    function handleInput(e) {

    }

    function handleFile(e) {

    }

    function handleSignup(e) {
        e.preventDefault()
    }

    return (
        <section id="account" style={{ marginBottom: "20px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        {/* {<RenderErrors errors={errs} />} */}
                        <div className="signup-form">
                            <h2>User Update!</h2>
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
                </div>
            </div>
        </section>
    )
}