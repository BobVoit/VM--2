

const Button = ({ onClick, text }) => {

    // console.log(onClick);
    return (
        <div className="button">
            <button 
                onClick={onClick}
                className="button__click"
            >
                {text}
            </button>
        </div>
    )
}


export default Button;