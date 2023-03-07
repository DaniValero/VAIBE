import '../styles/home.css'

export default function Spinner(props) {
    return (
        <div className="loading show">
            <div className="spin"></div>

            <h6 className='loadingText'>{props.loadingText}</h6>
        </div>
    )
}