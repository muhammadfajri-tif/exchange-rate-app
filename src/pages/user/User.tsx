import { singleUser } from "../../data";
import "./user.scss";
import { useParams } from "react-router-dom";
import BankProfile from "../../components/bankProfile/BankProfile";
import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";

const User = () => {
  const { id } = useParams();
  // Fetch data and send to Single Component

  const { fetchPayload, payload } = useContext(Context);

  useEffect(() => {
    if (payload === null) fetchPayload();
  }, [fetchPayload, payload]);

  return (
    <div className="user">
      {id === "BCA" ? (
        <BankProfile users={singleUser} bankId={1} />
      ) : id === "BNI" ? (
        <BankProfile users={singleUser} bankId={2} />
      ) : id === "BI" ? (
        <BankProfile users={singleUser} bankId={3} />
      ) : id === "Mandiri" ? (
        <BankProfile users={singleUser} bankId={4} />
      ) : id === "HSBC" ? (
        <BankProfile users={singleUser} bankId={5} />
      ) : id === "Panin" ? (
        <BankProfile users={singleUser} bankId={6} />
      ) : id === "Permata" ? (
        <BankProfile users={singleUser} bankId={7} />
      ) : id === "OCBC" ? (
        <BankProfile users={singleUser} bankId={8} />
      ) : id === "CIMB" ? (
        <BankProfile users={singleUser} bankId={9} />
      ) : id === "BRI" ? (
        <BankProfile users={singleUser} bankId={10} />
      ) : (
        <div>
          <h1>User ID: {id}</h1>
        </div>
      )}
    </div>
  );
};

export default User;
