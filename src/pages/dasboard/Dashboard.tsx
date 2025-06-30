import BannerLengkapiData from "../../components/UserProfile/Banner";
import UserAddressCard from "../../components/UserProfile/UserAddressCard";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";

export default function DashboardHome() {
  return <div className="flex flex-col gap-4">
    <BannerLengkapiData/>
    <UserMetaCard/>
    <div className="flex gap-4">
    <UserInfoCard/>
    <UserAddressCard/>
    </div>
     
  </div>
  ;
}
