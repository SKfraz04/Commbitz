import { useEffect, useState } from 'react';

import styles from '../styles/style.module.css';
import Layout from "../../../components/layout";
import Breadcrumb from '../../../components/breadcrumbs';
import ProfileRight from './ProfileRight';
import EditProfileModal from '../../../components/modals/EditProfile';
import ChangePasswordModal from '../../../components/modals/ChangePassword';
import DashboardSidebar from '../../../components/dashboardsidebar';


const Profile = () => {
	const [modalPasswordShow, setPasswordModalShow] = useState("");
	const [modalEditShow, setEditMolalShow] = useState("");

	const handlePasswordModal = (event: any) => {
		event.preventDefault();
		!modalPasswordShow ? setPasswordModalShow("show") : setPasswordModalShow("")
	}

	const handleEditModal = (event: any) => {
		event.preventDefault();
		!modalEditShow ? setEditMolalShow("show") : setEditMolalShow("")
	}

	const handleCloseModal = (newValue: string) => {
		setPasswordModalShow(newValue);
		setEditMolalShow(newValue)
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])
	return (
		<Layout>
			<Breadcrumb />
			<div className={styles.Profileouter}>
				<div className='container'>
					<div className='row'>
						<DashboardSidebar />
						<ProfileRight handlePasswordModal={handlePasswordModal} handleEditModal={handleEditModal} />
					</div>
				</div>
			</div>
			{modalEditShow && <EditProfileModal show={modalEditShow} handleCloseModal={handleCloseModal} />}

			{modalPasswordShow &&
				<ChangePasswordModal show={modalPasswordShow} handleCloseModal={handleCloseModal} />
			}
		</Layout>
	);
};

export default Profile;