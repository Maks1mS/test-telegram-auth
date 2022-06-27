import React from 'react';
import atomize from "@quarkly/atomize";
import { Box, Text } from '@quarkly/widgets';
import { useUser } from './App';

const UserInfo = props => {
	const [user] = useUser();
	return <div {...props}>
		    
		<Text>
			ID: 
			{user.id}
		</Text>
		    
		<Text>
			Оплатил: 
			{user.isPaid ? '+' : '-'}
		</Text>
		  
	</div>;
};

export default atomize(UserInfo)({
	name: "UserInfo",
	effects: {
		hover: ":hover"
	},
	normalize: true,
	mixins: true,
	description: {
		// paste here description for your component
		en: "UserInfo — my awesome component"
	},
	propInfo: {
		// paste here props description for your component
		yourCustomProps: {
			control: "input"
		}
	}
});