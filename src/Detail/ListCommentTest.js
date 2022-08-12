
function ListCommentTest(props) {
    const listComment = props.listComment
    if (listComment) {
        function getHoursMinutesAMPM(time) {
            const date = new Date(time)
            const options = { hour: 'numeric', minute: 'numeric', hour12: true }
            return date.toLocaleString('en-US', options)
        }

        function getLongDate(time) {
            const date = new Date(time)
            const options = { day: 'numeric', month: 'short', year: 'numeric' }
            return date.toLocaleString('en-US', options)
        }
        return (
            <div className="response-area">
                <h2>{listComment.length} RESPONSES</h2>
                <ul className="media-list">
                    {
                        listComment.map(comment => {
                            return (
                                <li
                                    key={comment.id}
                                    className="media"
                                >
                                    <button className="pull-left">
                                        <img
                                            width="50px"
                                            className="media-object"
                                            src={`http://localhost/laravel/laravel/public/upload/user/avatar/${comment.image_user}`}
                                            alt=""
                                        />
                                    </button>
                                    <div className="media-body">
                                        <ul className="sinlge-post-meta">
                                            <li><i className="fa fa-user" />{comment.name_user}</li>
                                            <li><i className="fa fa-clock-o" /> {getHoursMinutesAMPM(comment.created_at)}</li>
                                            <li><i className="fa fa-calendar" /> {getLongDate(comment.created_at)}</li>
                                        </ul>
                                        <p>{comment.comment}</p>
                                        <button
                                            onClick={() => props.handleReply(comment.id)}
                                            className="btn btn-primary"
                                        ><i className="fa fa-reply" />Replay</button>
                                    </div>
                                </li >
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ListCommentTest