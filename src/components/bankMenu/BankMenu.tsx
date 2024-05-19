import "./bankMenu.scss"
import { bankMenu } from "../../data";
import { Link } from "react-router-dom";

const BankMenu = () => {
    return (
        <div>
            <h1>Bank List :</h1>
            <ul className="bank-menu">
                {
                    Object.entries(bankMenu).map(item => (
                        <li><Link to={item[1]}>{item[0]}</Link></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BankMenu