import React, { useEffect } from 'react';
import atomize from "@quarkly/atomize";
import { saveUserData } from './App';
const whitelistParams = ['id', 'hash', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date'];

const TgLoginHandler = props => {
	useEffect(() => {
		const params = new URLSearchParams(window.parent.location.search);
		const data = {};
		whitelistParams.forEach(k => {
			const v = params.get(k);

			if (v) {
				data[k] = v;
			}
		});

		if (data.hash) {
			saveUserData(data);
			window.location.href = '/';
		}
	}, []);
	return <div {...props} />;
};

export default atomize(TgLoginHandler)({
	name: "TgLoginHandler",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		// paste here description for your component
		en: "TgLoginHandler — my awesome component"
	},
	propInfo: {
		// paste here props description for your component
		yourCustomProps: {
			control: "input"
		}
	}
});