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

type InfoType = {
  jenis_kurs: string;
  [key: string]: any;
};

type Props = {
  id: number;
  img?: string;
  title: string;
  info: InfoType;
};

type PropsArray = {
  users: Props[];
};

const Single = ({ users }: PropsArray) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {users.map(user => (
              user.id === 1 && <img key={user.id} src={user.img} alt="Image" />
            ))}
          </div>
          <div className="details">
            {users.map(user => (
              user.id === 1 &&
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
        <ApexCharts />
      </div>
    </div>
  );
};

export default Single;