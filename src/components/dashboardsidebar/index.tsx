import wall from "../../assets/images/wall.png"
import SideBarNav from "./SideBarNav"
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/api';
import { useEffect, useState } from "react";
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../../redux/slices/userSlice';
import dashboardStyles from './styles/dashboard.module.css';
import MainLoder from '../mainLoader'
import userImg from "../../assets/images/user.jpg"

const DashboardSidebar = () => {
  const dispatch = useDispatch();
  const [loader, setLoader]= useState<boolean>(true);

  const { data } = useSelector((state: any) => state.getUserData);

  useEffect(() => {
    const userData = async () => {
      dispatch(fetchDataStart());
      try {
        const userData = await getUserData();
        dispatch(fetchDataSuccess(userData?.data));
        setLoader(false)
      } catch (error: any) {
        dispatch(fetchDataFailure(error.message));
      }
    }
    userData()
  }, []);


  return (
    <>
    
    <div className='col-md-3'>
    {loader &&
        <MainLoder/>
    }
      <div className={dashboardStyles.ProfileLeft}>
        <div className={dashboardStyles.userPack}>
          <img src={data?.avatar?data?.avatar:userImg} alt={data?.fullName} />
          <h5>{data?.fullName}</h5>
          <h6>{data?.email}</h6>

        </div>
        {/* <div className={dashboardStyles.WalletBal}>
          <div className={dashboardStyles.WallLeft}>
            <h5> Wallet Balance</h5>
            <h4><img src={wall} alt="" /> ${(data?.wallet)}</h4>
          </div>
          <span>Withdraw</span>
        </div> */}
        <SideBarNav />
      </div>
    </div>
    </>
  )
}

export default DashboardSidebar