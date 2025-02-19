import { Navigate } from "react-router-dom";

import Home from "../features/home/routes";
// import Blog from "../features/blog/routes";
import Blogdetail from "../features/blogDetail/routes";
import Faq from "../features/faq/routes";
import Features from "../features/features/routes";
import Contact from "../features/contact/routes";
import Signup from "../features/auth/signup/routes";
import Login from "../features/auth/login/routes";
import ForgetPassword from "../features/auth/forgetPassword/routes";
import { APP_ROUTES } from "../utils/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../config";
import Esim from "../features/esim/routes";
import PrivacyPolicy from "../features/privacyPolicy/routes/privacyPolicy";
import Terms_Conditions from "../features/privacyPolicy/routes/terms&Conditions";
import Document from "../features/document/routes";
import Checkout from "../features/checkout/routes";
import BasicDetails from "../features/basicdetail/routes";
import ThankYouPage from "../features/thankyou/routes";
import ShippingPolicy from "../features/privacyPolicy/routes/shippinPolicy";
import RefundPolicy from "../features/privacyPolicy/routes/refundPolicy";
import AppRedirect from "../features/appRedirect";
import AboutUs from "../features/about/routes";
import TroubleShoot from "../features/troubleshoot/routes";
import AppQRCode from "../components/qrCode";
import PackageOption from "../features/packageOption/routes";

export const publicRoutes = [
  { path: APP_ROUTES.HOME, element: <Home /> },
  {
    path: APP_ROUTES.LOGIN,
    element: (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    )
  },
  // { path: "/blog/*", element: <Blog /> },
  // { path: APP_ROUTES.BLOG_DETAILS, element: <Blogdetail /> },
  { path: APP_ROUTES.FAQ_THEME, element: <Faq /> },
  { path: APP_ROUTES.FAQ, element: <Faq /> },
  { path: APP_ROUTES.TROUBLESHOOT, element: <TroubleShoot /> },
  { path: APP_ROUTES.ABOUTUS, element: <AboutUs /> },
  { path: APP_ROUTES.FEATURE, element: <Features /> },
  { path: APP_ROUTES.CONTACT, element: <Contact /> },
  { path: APP_ROUTES.SIGNUP, element: <Signup /> },
  { path: "/document/:id", element: <Document /> },
  { path: "/checkout/:id", element: <Checkout /> },
  { path: APP_ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: APP_ROUTES.TERMS_CONDITIONS, element: <Terms_Conditions /> },
  { path: APP_ROUTES.SHIPPING_POLICY, element: <ShippingPolicy /> },
  { path: APP_ROUTES.REFUND_POLICY, element: <RefundPolicy /> },
  { path: APP_ROUTES.FORGET_PASSWORD, element: <ForgetPassword /> },
  { path: APP_ROUTES.DELETE_ACCOUNT, element: <ForgetPassword /> },  
  { path: APP_ROUTES.PACKAGE_OPTION, element: <PackageOption /> },  
  { path: "/esim-list", element: <Esim /> },
  { path: "/esim-list/:countryName", element: <Esim /> },
  { path: "/basic-details", element: <BasicDetails /> },
  { path: "/basic-details/:simNumber", element: <BasicDetails /> },
  { path: "/thank-you", element: <ThankYouPage/>},
  { path: "/commbitz-redirect-url", element: <AppRedirect/>},
  { path: "/commbitz-app", element: <AppQRCode/>},
  { path: "/esim", element: <Navigate replace to="/" /> },
  { path: "/esim/:countryName", element: <PackageOption /> },
  // { path: "*", element: <Navigate replace to="/" /> },
];
