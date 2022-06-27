import React from 'react';
import atomize from "@quarkly/atomize";
import { Button } from '@quarkly/widgets';
import { useLogout } from './App';

const LogoutButton = props => {
	const logout = useLogout();
	return <div {...props}>
		<Button onClick={logout}>
			Выйти
		</Button>
	</div>;
};

export default atomize(LogoutButton)({
	name: "LogoutButton",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		// paste here description for your component
		en: "LogoutButton — my awesome component"
	},
	propInfo: {
		// paste here props description for your component
		yourCustomProps: {
			control: "input"
		}
	}
});