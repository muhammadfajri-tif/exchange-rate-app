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
import { useState, useEffect } from "react";
import ApexCharts from "../apexChart/ApexChart";
import BankMenu from "../bankMenu/BankMenu";
import { BankProfileProps, UserProps } from "../../types/types";

const BankProfile = ({ users, bankId }: BankProfileProps) => {
    const [currentUser, setCurrentUser] = useState<UserProps | undefined>(
        users.find((user) => user.id === bankId)
    );

    useEffect(() => {
        setCurrentUser(users.find((user) => user.id === bankId));
    }, [bankId, users]);

    if (!currentUser) {
        return <div>User not found</div>;
    }
    return (
        <div className="single">
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {currentUser.img && <img src={currentUser.img} alt="Image" />}
                    </div>
                    <div className="details">
                        {Object.entries(currentUser.info).map(([key, value], index) => (
                            <div className="item" key={index}>
                                <span className="itemTitle">{String(key).split("_").join(" ")}</span>
                                <span className="itemValue">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <ApexCharts currentUser={currentUser}/>
                <BankMenu />
            </div>
        </div>
    );
};

export default BankProfile;