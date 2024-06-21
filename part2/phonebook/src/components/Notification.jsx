const Notification = ({notification}) => {
    
    const notificationStyle = {
        border: 5,
        color: "lightgrey",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "green",
    }

    if(notification === null){
        return null;
    } else if(notification.message !== null && notification.status === 404){
        const errorStyle = {
            ...notificationStyle, 
            backgroundColor: "red"
        }

        return(
            <div style={errorStyle}>
                {notification.message}
            </div>
        )
    } else {
        return(
            <div style={notificationStyle}>
                {notification.message}
            </div>
        )
        
    }
}

export default Notification