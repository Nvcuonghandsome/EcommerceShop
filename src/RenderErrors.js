
function RenderErrors({ errors }) {
    return (
        <ul>
            {
                Object.keys(errors).map((key, index) => {
                    return (
                        <li style={{ color: "red" }} key={index}>{errors[key]}</li>
                    )
                })
            }
        </ul>
    )
}

export default RenderErrors