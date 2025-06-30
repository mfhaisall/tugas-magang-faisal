import UserAddressCard from "../../components/UserProfile/UserAddressCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";

export default function Tabel() {
  return <div className="flex flex-col gap-4">
   
    <div className="flex gap-4">
    <UserInfoCard/>
    <UserAddressCard/>
    </div>
     
  </div>
  ;
}
