const NotificationMessage = ({text, error}) => {
    return (
        <div className={error ? "error" : "success"}>
            {text}
        </div>
    )
}

export default NotificationMessage