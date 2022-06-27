import React from "react";
import theme from "theme";
import { Theme } from "@quarkly/widgets";
import { Helmet } from "react-helmet";
import { GlobalQuarklyPageStyles } from "global-page-styles";
import { RawHtml, Override } from "@quarkly/components";
import * as Components from "components";
export default (() => {
	return <Theme theme={theme}>
		<GlobalQuarklyPageStyles pageUrl={"index"} />
		<Helmet>
			<title>
				Quarkly export
			</title>
			<meta name={"description"} content={"Web site created using quarkly.io"} />
			<link rel={"shortcut icon"} href={"https://uploads.quarkly.io/readme/cra/favicon-32x32.ico"} type={"image/x-icon"} />
		</Helmet>
		<Components.EmbedHTML />
		<Components.App>
			<Components.AuthWrapper
				showAuthBlock
				showLoadingBlock
				showWithoutAuthBlock
				showLoadingConstructor={false}
				showWithoutAuthConstructor={false}
				showAuthConstructor={false}
			>
				<Override slot="Without auth">
					<Components.TelegramButton />
				</Override>
				<Override slot="With auth">
					<Components.UserInfo />
					<Components.LogoutButton />
				</Override>
				<Components.UserInfo />
			</Components.AuthWrapper>
		</Components.App>
		<RawHtml>
			<style place={"endOfHead"} rawKey={"62b6b51221e43d0020963a85"}>
				{":root {\n  box-sizing: border-box;\n}\n\n* {\n  box-sizing: inherit;\n}"}
			</style>
		</RawHtml>
	</Theme>;
});