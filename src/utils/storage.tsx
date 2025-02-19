import { AUTH } from "./auth";

const storage = {
	getToken: () => {
		return window.localStorage.getItem("token");
	},
	setToken: (token: string) => {
		window.localStorage.setItem("token", token);
	},
	clearToken: () => {
		window.localStorage.removeItem("token");
	},
	validateRememberMe:()=>{
		if(window.localStorage.getItem(AUTH.REMEMBERME)===AUTH.TRUE)
		{
			return true;
		}
		else{
			return false
		}
	}
	,
	storeRememberMe:(token:string)=>{
		window.localStorage.setItem(AUTH.REMEMBERME, token);
	}

};

export default storage;