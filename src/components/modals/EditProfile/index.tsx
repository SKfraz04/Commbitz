import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ApiLoader from "../../../components/apiLoader";
import userImg from "../../../assets/images/user.jpg";
import modalStyles from "./style.module.css";
import { EditProfilechema } from "./validations";
import { uploadImage, updateProfile, sendOtp, verifyOtp } from "./api";
import VerifyOtpModal from "../Verifition.tsx";
import MainLoader from "../../mainLoader";
import { getUserData } from "../../../redux/api";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "../../../redux/slices/userSlice";
import { Spinner } from "react-bootstrap";

interface Props {
  show: string;
  handleCloseModal: (data: string) => void;
}

const EditProfileModal = ({ show, handleCloseModal }: Props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.getUserData.data);
  const [loader, setLoader] = useState<boolean>(false);
  const [previewImage, setImagePreview] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpId, setOTPID] = useState("");
  const [verifyShow, setVerifyShow] = useState("");
  const [timer, setTimer] = useState(Date.now() + 30000);
  const [fieldForVerify, setFieldForVerify] = useState("");
  const [loadingImg, setLoadingImg] = useState<boolean>();

  const ClosedVerifyModal = (newValue: any) => {
    setVerifyShow(newValue);
  };

  const handleImageChange = async (event: any) => {
    profileFormik.setFieldValue("userImage", event.currentTarget.files[0]);
    setLoadingImg(true);
    const formData = new FormData();
    formData.append("file", event.currentTarget.files[0]);

    const imageData: any = await uploadImage(formData);

    if (imageData?.data?.statusCode === 400) {
      profileFormik.errors.userImage = "Something went's wrong!";
      return false;
    } else if (imageData?.statusCode == 200) {
      setImagePreview(imageData?.data?.url);
      setLoadingImg(false);
    }
  };

  const handleEmailChange = (event: any) => {
    const emailVal = event?.target.value;
    if (emailVal !== userData.email) {
      setEmailVerified(false);
      profileFormik.setFieldValue("email", emailVal);
    } else {
      profileFormik.setFieldValue("email", emailVal);
      setEmailVerified(userData.isEmailVerified);
    }
  };

  const profileFormik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      avatar: "",
      userImage: "",
      isEmailVerified: "",
    },
    validationSchema: EditProfilechema,
    onSubmit: async (values) => {
      let ChangeProfilePayload: any = {
        fullName: values.fullName,
        userImage: values.userImage,
        email: values.email,
        avatar: values.avatar,
        isEmailVerified: emailVerified,
      };

      // if (!ChangeProfilePayload?.userImage && !ChangeProfilePayload?.avatar) {
      //   profileFormik.errors.userImage = "Image is required!";
      //   return null;
      // }

      if (ChangeProfilePayload?.userImage) {
        const formData = new FormData();
        formData.append("file", ChangeProfilePayload?.userImage);

        const imageData: any = await uploadImage(formData);

        if (imageData?.data?.statusCode === 400) {
          profileFormik.errors.userImage = "Something went's wrong!";
          return false;
        } else if (imageData?.statusCode == 200) {
          ChangeProfilePayload.avatar = imageData?.data.fileName;
          if (ChangeProfilePayload.avatar == "") {
            profileFormik.errors.userImage = "Something went's wrong!";
            return false;
          }
        }
      } else {
        delete ChangeProfilePayload?.avatar;
      }

      if (!ChangeProfilePayload.isEmailVerified) {
        profileFormik.errors.email = "Email is not verified!";
        return null;
      }
      toast.promise(updateProfile(ChangeProfilePayload), {
        pending: {
          render() {
            return "Updating Profile";
          },
        },
        success: {
          render({ data }) {
            handleCloseModal("");
            const userData = async () => {
              dispatch(fetchDataStart());
              try {
                const userData = await getUserData();
                dispatch(fetchDataSuccess(userData?.data));
              } catch (error: any) {
                dispatch(fetchDataFailure(error.message));
              }
            };
            userData();
            return "Profile updated successfully";
          },
        },
        error: {
          render({ data }: any) {
            return data.data.message;
          },
        },
      });
    },
  });

  //Email send otp handle function
  const handleEmailVerify = (profileFormik: any) => {
    const email: any = profileFormik.values.email;

    if (profileFormik.errors.email != undefined || email == "") {
      return false;
    }

    const OtpPayload: any = {
      email: email,
      type: 1,
    };
    toast.promise(sendOtp(OtpPayload), {
      pending: {
        render() {
          return "Trying to sent otp";
        },
      },
      success: {
        render({ data }) {
          setOTPID(data.data.otpId);
          setVerifyShow("show");
          setTimer(Date.now() + 30000);
          setFieldForVerify("email");
          return "OTP sent successfully";
        },
      },
      error: {
        render({ data }: any) {
          return data.data.message;
        },
      },
    });
  };

  // Email and phone no otp verification function
  const otpVeriFy = (payload: any) => {
    toast.promise(verifyOtp(payload), {
      pending: {
        render() {
          return "Trying to sent otp";
        },
      },
      success: {
        render({ data }) {
          setEmailVerified(data.data?.isEmailVerified);
          setVerifyShow("");
          return "OTP verified successfully";
        },
      },
      error: {
        render({ data }: any) {
          return data.data.message;
        },
      },
    });
  };

  const handleResendOTP = () => {
    setVerifyShow("show");
    handleEmailVerify(profileFormik);
    setTimer(Date.now() + 30000);
    
  };

  useEffect(() => {
    setEmailVerified(userData.isEmailVerified);
    profileFormik.setValues({
      email: userData.email,
      fullName: userData.fullName,
      avatar: userData.avatar,
      userImage: "",
      isEmailVerified: userData.isEmailVerified,
    });
  }, [userData]);

  return (
    <>
      {loader && <MainLoader />}
      <div
        className={`modal fade ${show}`}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleCloseModal("")}
              ></button>
            </div>
            <div className="modal-body">
              <div className={modalStyles.changePasswordModal}>
                <form onSubmit={profileFormik.handleSubmit}>
                  <div className={modalStyles.editIamge}>
                    <input
                      type="file"
                      name="userImage"
                      onChange={handleImageChange}
                      onBlur={profileFormik.handleBlur}
                    />
                    {loadingImg && (
                      <div className={modalStyles.Lodaer}>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    <span className={modalStyles.PrfileIamge}>
                      {" "}
                      <img
                        src={previewImage ? previewImage : userData.avatar}
                        alt=""
                      />
                    </span>
                    <label>Change Profile photo</label>
                    {profileFormik.touched.userImage &&
                      profileFormik.errors.userImage && (
                        <p className="error">
                          {profileFormik.errors.userImage}
                        </p>
                      )}
                  </div>
                  <div className={modalStyles.formGroup}>
                    <label>Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Name"
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      value={profileFormik.values.fullName}
                    />
                    {profileFormik.touched.fullName &&
                      profileFormik.errors.fullName && (
                        <p className="error">{profileFormik.errors.fullName}</p>
                      )}
                  </div>
                  <div className={modalStyles.formGroup}>
                    <div className="d-flex justify-content-between">
                      <label>Email</label>
                      <span
                        className="text-white"
                        onClick={(event) =>
                          !emailVerified ? handleEmailVerify(profileFormik) : ""
                        }
                      >
                        {!emailVerified ? "Verify" : "Verified"}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleEmailChange}
                      onBlur={profileFormik.handleBlur}
                      value={profileFormik.values.email}
                    />

                    {profileFormik.touched.email &&
                      profileFormik.errors.email && (
                        <p className="error">{profileFormik.errors.email}</p>
                      )}

                    {profileFormik.touched.isEmailVerified &&
                      profileFormik.errors.isEmailVerified && (
                        <p className="error">
                          {profileFormik.errors.isEmailVerified}
                        </p>
                      )}
                  </div>
                  <div className={modalStyles.formGroup}>
                    <input type="submit" value="Save" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {verifyShow && (
          <VerifyOtpModal
            ClosedModal={ClosedVerifyModal}
            show={verifyShow}
            otpId={otpId}
            timer={timer}
            otpVeriFy={otpVeriFy}
            fieldForVerify={fieldForVerify}
            handleResendOTP={handleResendOTP}
          />
        )}
      </div>
    </>
  );
};

export default EditProfileModal;
