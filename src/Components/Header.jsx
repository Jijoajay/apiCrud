import "../Styles/Header.css";
import icon from "../Assets/icon.png";

const Header = () => {
    return (
        <>
            <header className="headerMainContainer">
                <div className="icon">
                    <img src={icon} alt="Icon" width={100} height={100}/>
                </div>

                <div>
                    <div></div>
                    <div></div>
                </div>
            </header>
        </>
    )
}

export default Header
