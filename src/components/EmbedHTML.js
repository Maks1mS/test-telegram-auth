import React, { useRef, useLayoutEffect } from "react";
import atomize from "@quarkly/atomize"; // Put your HTML here:

const customHtml = `
	<script async src="https://telegram.org/js/telegram-widget.js?19" data-telegram-login="maks1ms_test_1_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
	<script type="text/javascript">
	  function onTelegramAuth(user) {
    	alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  	}
	</script>
`;

const EmbedHTML = ({
	children,
	...props
}) => {
	const ref = useRef(null);
	useLayoutEffect(() => {
		ref.current.innerHTML = customHtml;
	}, []);
	return <div {...props} ref={ref} />;
};

export default atomize(EmbedHTML)({
	name: "EmbedHTML",
	normalize: true,
	mixins: true
});