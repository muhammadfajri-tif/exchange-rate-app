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
// <<<<<<< dev/yahya
// import { BankProfileProps } from "../../types/types";
// import Chat from "../chat/Chat";
// import BankChat from "../bankChat/BankChat";

// const BankProfile = ({ users, bankId }: BankProfileProps) => {
//   const currentUser = users.find((user) => user.id === bankId);

//   if (!currentUser) {
//     return <div>User not found</div>;
//   }
//   return (
//     <div className="two-section">
//       <div className="left">
//         <div className="info">
//           <div className="topInfo">
//             {users.map(
//               (user) =>
//                 user.id === bankId && (
//                   <img key={user.id} src={user.img} alt="Image" />
//                 )
//             )}
//           </div>
//           <div className="details">
//             {users.map(
//               (user) =>
//                 user.id === bankId &&
//                 Object.entries(user.info).map((item, index) => (
//                   <div className="item" key={index}>
//                     <span className="itemTitle">
//                       {String(item[0]).split("_").join(" ")}
//                     </span>
//                     <span className="itemValue">{item[1]}</span>
//                   </div>
//                 ))
//             )}
//           </div>
// =======
import { BankProfileProps, UserProps } from "../../types/types";
import BankChat from "../bankChat/BankChat";

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
    <div className="two-section">
      <div className="left">
        <div className="info">
          <div className="topInfo">
            {currentUser.img && <img src={currentUser.img} alt="Image" />}
          </div>
          <div className="details">
            {Object.entries(currentUser.info).map(([key, value], index) => (
              <div className="item" key={index}>
                <span className="itemTitle">
                  {String(key).split("_").join(" ")}
                </span>
                <span className="itemValue">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <ApexCharts currentUser={currentUser} />
        <BankMenu />
      </div>

      <div className="right">
        <BankChat />
      </div>
    </div>
    //     <hr />
    //     <ApexCharts info={currentUser.info} />
    //     <BankMenu />
    //   </div>

    //   <div className="right">
    //     <BankChat />
    //   </div>
    // </div>
  );
};

export default BankProfile;
