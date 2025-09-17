import React from "react";

// Newsletter subscription is handled by Zoho
// This component is a simple wrapper for the Zoho subscription form
// To make any changes to the form, go to Zoho campaigns, and edit the form there
// Fetch the embed code of the form and replace the src of the iframe with the new embed code
// the embed code is stored in the public folder as subscribe-embed-code.html
export function NewsletterSubscribe() {
    return (
        <div className="w-full h-[500px]">
            <iframe
                src="/subscribe-embed-code.html"
                title="Zoho Newsletter Signup"
                className="w-full h-full rounded-lg overflow-hidden"
            />
    </div>
    );
}