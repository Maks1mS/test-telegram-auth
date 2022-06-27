import React from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Text } from '@quarkly/widgets';
import { useUser } from './App';
const overrides = {
	'Loading Text': {
		kind: 'Text',
		props: {
			children: 'Loading...'
		}
	},
	'With auth': {
		kind: 'Box'
	},
	'Without auth': {
		kind: 'Box'
	}
};

const AuthWrapper = ({
	showLoadingBlock,
	showAuthBlock,
	showWithoutAuthBlock,
	showLoadingConstructor,
	showAuthConstructor,
	showWithoutAuthConstructor,
	...props
}) => {
	const {
		override,
		ChildPlaceholder,
		rest
	} = useOverrides(props, overrides);
	const [user, loading, error] = useUser();
	const showLoading = showLoadingBlock && (loading || showLoadingConstructor);
	const showError = error;
	const showAuth = showAuthBlock && (user || showAuthConstructor);
	const showWithoutAuth = showWithoutAuthBlock && (!user || showWithoutAuthConstructor);
	return <Box min-height="32px" min-width="32px" {...rest}>
		    
		{showLoading && <Text {...override('Loading Text')} />}
		    
		{showError && <Text {...override('Error Text')}>
			        
			{error.message}
			      
		</Text>}
		    
		{showAuth && <Box {...override("With auth")}>
			        
			<ChildPlaceholder slot="With auth" />
			      
		</Box>}
		    
		{showWithoutAuth && <Box {...override("Without auth")}>
			        
			<ChildPlaceholder slot="Without auth" />
			      
		</Box>}
		  
	</Box>;
};

Object.assign(AuthWrapper, {
	title: 'AuthWrapper',
	overrides,
	propInfo: {
		showLoadingBlock: {
			control: "checkbox"
		},
		showAuthBlock: {
			control: "checkbox"
		},
		showWithoutAuthBlock: {
			control: "checkbox"
		},
		showLoadingConstructor: {
			control: "checkbox"
		},
		showAuthConstructor: {
			control: "checkbox"
		},
		showWithoutAuthConstructor: {
			control: "checkbox"
		}
	}
});
export default AuthWrapper;