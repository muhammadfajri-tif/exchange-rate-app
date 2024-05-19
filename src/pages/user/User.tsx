import BcaProfile from "../../components/bankProfile/BcaProfile";
import BniProfile from '../../components/bankProfile/BniProfile';
import { singleUser } from "../../data";
import "./user.scss";
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  // Fetch data and send to Single Component
  return (
    <div className="user">
      {id === "BCA" ? (
        <BcaProfile users={singleUser} />
      ) : id === "BNI" ? (
        <BniProfile users={singleUser}/>
      ) : (
        <div>
          <h1>User ID: {id}</h1>
        </div>
      )}
    </div>
  );
};

export default User;
