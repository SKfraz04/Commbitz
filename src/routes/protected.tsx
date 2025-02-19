import Dashboard from "../features/dashboard/routes";
import Purchase from "../features/purchase/routes";
import Profile from "../features/profile/routes";
import Packages from "../features/packages/routes";
import Checkout from "../features/checkout/routes";
import Payment from "../features/paymentsuccess/routes";
import Logout from "../features/logout/routes";
import InventoryPackages from "../features/InventoryPackages/routes";
import Packsim from "../features/purchasesim/routes";
import Document from "../features/document/routes";
import OrderHistory from "../features/orderHistory/routes";
import Notifications from "../features/notifications/routes";
import EsimDetails from "../features/EsimDetails/routes";
// import ThankYouPage from "../features/thankyou/routes";


export const protectedRoutes: any[] = [
    { path: "/profile", element: Profile },
	// { path: "/my-plans", element: Dashboard },
	{ path: "/purchase", element: Purchase },
    // { path: "/esim", element: Esim  },
	{ path: "/packages", element: Packages},
	{ path: "/order-histories", element: OrderHistory },
    // { path: "/checkout/:id", element: Checkout },
    { path: "/packsim", element: Packsim },
    // { path: "/document/:id", element: Document },
    { path: "/payment", element: Payment },
    { path: "/logout", element: Logout},
    { path: "/notifications", element: Notifications},
    { path: "/InventoryPackages/:id", element: InventoryPackages},
    { path: "/esim-details/:id", element: EsimDetails},
    // { path: "/thank-you", element: ThankYouPage},

];
