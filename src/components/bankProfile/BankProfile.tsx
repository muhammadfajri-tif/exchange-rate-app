// import {
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
import "./single.scss";
import ApexCharts from "../apexChart/ApexChart";
import BankMenu from "../bankMenu/BankMenu";
import { BankProfileProps } from "../../types/types";

const BankProfile = ({ users, bankId }: BankProfileProps) => {
    const currentUser = users.find(user => user.id === bankId);

    if (!currentUser) {
        return <div>User not found</div>;
    }
    return (
        <div className="single">
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {users.map(user => (
                            user.id === bankId && <img key={user.id} src={user.img} alt="Image" />
                        ))}
                    </div>
                    <div className="details">
                        {users.map(user => (
                            user.id === bankId &&
                            Object.entries(user.info).map((item, index) => (
                                <div className="item" key={index}>
                                    <span className="itemTitle">{String(item[0]).split("_").join(" ")}</span>
                                    <span className="itemValue">{item[1]}</span>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
                <hr />
                <ApexCharts info={currentUser.info}/>
                <BankMenu />
            </div>
        </div>
    );
};

export default BankProfile;