import React from 'react';
import atomize from "@quarkly/atomize";
import TelegramLoginButton from 'react-telegram-login';
import { useLogin } from './App';

const TelegramButton = props => {
	const login = useLogin();

	const handleTelegramResponse = async response => {
		login(response);
	};

	return <div {...props}>
		    
		<TelegramLoginButton dataOnauth={handleTelegramResponse} botName="maks1ms_test_1_bot" />
		  
	</div>;
};

export default atomize(TelegramButton)({
	name: "TelegramButton",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		// paste here description for your component
		en: "TelegramButton — my awesome component"
	},
	propInfo: {
		// paste here props description for your component
		yourCustomProps: {
			control: "input"
		}
	}
});