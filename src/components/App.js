import React, { useEffect, useState, useMemo, useCallback, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import { Box } from '@quarkly/widgets';
import atomize from "@quarkly/atomize";
export const AppContext = createContext();

const useLoadingValue = (_data = null, _loading = true, _error = null) => {
	const [data, setData] = useState(_data);
	const [loading, setLoading] = useState(_loading);
	const [error, setError] = useState(_error);

	const success = data => {
		setData(data);
		setLoading(false);
		setError(null);
	};

	const fail = e => {
		setData(null);
		setLoading(false);
		setError(e);
	};

	return useMemo(() => ({
		data,
		loading,
		error,
		success,
		fail
	}), [data, loading, error]);
};

const API_BACKEND = 'https://api-backend-bot.herokuapp.com';

const apiGetUser = async id => {
	const token = loadUserData();
	const res = await fetch(`${API_BACKEND}/api/users/${id}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();
	return data;
};

export const useUser = () => {
	const {
		user
	} = useContext(AppContext);
	return [user.data, user.loading, user.error];
};
export const useLogin = () => {
	const {
		user
	} = useContext(AppContext);
	return useCallback(async data => {
		saveUserData(data);
		const userData = await apiGetUser(data.id);
		user.success(userData);
	}, [user.success]);
};
export const useLogout = () => {
	const {
		user
	} = useContext(AppContext);
	return useCallback(async data => {
		saveUserData(undefined);
		user.success(null);
	}, [user.success]);
};
const TG_USER_DATA_KEY = "tg_user_data";
export const loadUserData = () => {
	return Cookies.get(TG_USER_DATA_KEY);
};
export const saveUserData = data => {
	if (data == null) {
		Cookies.remove(TG_USER_DATA_KEY);
	} else {
		Cookies.set(TG_USER_DATA_KEY, JSON.stringify(data));
	}
};

const App = ({
	children,
	...props
}) => {
	const user = useLoadingValue(null);
	useEffect(() => {
		const init = async () => {
			const tgUserData = loadUserData();

			if (!tgUserData) {
				user.success(null);
			}

			let parsed = null;

			try {
				parsed = JSON.parse(tgUserData);
			} catch (e) {
				console.error(e);
			}

			try {
				if (parsed) {
					const userData = await apiGetUser(parsed.id);
					user.success(userData);
				} else {
					user.success(null);
				}
			} catch (e) {
				user.fail(e);
			}
		};

		init();
	}, []);
	return <Box {...props}>
		    
		<AppContext.Provider value={{
			user
		}}>
			      
			{children}
			    
		</AppContext.Provider>
		  
	</Box>;
};

export default atomize(App)({
	name: "App",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		// paste here description for your component
		en: "App — my awesome component"
	},
	propInfo: {
		// paste here props description for your component
		yourCustomProps: {
			control: "input"
		}
	}
});