var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
// Newsletter subscription is handled by Zoho
// This component is a simple wrapper for the Zoho subscription form
// To make any changes to the form, go to Zoho campaigns, and edit the form there
// Fetch the embed code of the form and replace the src of the iframe with the new embed code
// the embed code is stored in the public folder as subscribe-embed-code.html
export function NewsletterSubscribe() {
    return (_jsx("div", __assign({ className: "w-full h-[500px]" }, { children: _jsx("iframe", { src: "/subscribe-embed-code.html", title: "Zoho Newsletter Signup", className: "w-full h-full rounded-lg overflow-hidden" }) })));
}
