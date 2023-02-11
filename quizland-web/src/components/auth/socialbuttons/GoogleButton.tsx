import Script from "next/script";
import React, {FC} from "react";

export const GoogleButton: FC<{context?: string}> = ({context = ""}) => {
    return <>
        <Script src="https://accounts.google.com/gsi/client" strategy={"lazyOnload"}></Script>
        <div id="g_id_onload"
             data-client_id={process.env.GOOGLE_CLIENT_ID}
             data-context={context}
             data-ux_mode="redirect"
             data-login_uri="http://localhost:3000/api/auth/google"
             data-itp_support="true">
        </div>

        <div className="g_id_signin"
             data-type="standard"
             data-shape="rectangular"
             data-theme="outline"
             data-text="signin_with"
             data-size="large"
             data-logo_alignment="left">
        </div>
    </>
}