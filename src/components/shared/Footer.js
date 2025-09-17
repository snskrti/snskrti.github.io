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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mail, Home } from 'lucide-react';
export function Footer() {
    return (_jsx("footer", __assign({ className: "bg-gray-900 text-white py-6" }, { children: _jsxs("div", __assign({ className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, { children: [_jsxs("div", __assign({ className: "grid grid-cols-1 md:grid-cols-3 gap-8 text-xs" }, { children: [_jsx("div", __assign({ className: 'text-gray-400' }, { children: _jsxs("p", __assign({ className: 'text-xs text-gray-400' }, { children: ["Sanskriti e.V. is a registered non-profit organization based in Hamburg, Germany.", _jsx("br", {}), _jsx("br", {}), "Verein Nummer: VR 25931", _jsx("br", {}), _jsx("br", {}), "Bank Account: ", _jsx("br", {}), "IBAN: DE82200400000350026100 ", _jsx("br", {}), "Kontoinhaber: Sanskriti e.V. ", _jsx("br", {})] })) })), _jsx("div", __assign({ className: 'text-white-900' }, { children: _jsxs("div", __assign({ className: 'grid grid-cols-1 gap-8 justify-center' }, { children: [_jsx("div", { className: 'flex justify-center text-center' }), _jsx("div", { className: 'flex justify-center text-center' })] })) })), _jsx("div", __assign({ className: 'text-white-900' }, { children: _jsxs("div", __assign({ className: 'grid grid-cols-1 gap-2' }, { children: [_jsxs("div", __assign({ className: 'flex align-center items-center' }, { children: [_jsx(Home, { className: 'w-4 h-4 inline-block mr-2 text-gray-400' }), _jsx("span", __assign({ className: 'text-sm' }, { children: "Hamburg, Germany" }))] })), _jsxs("div", __assign({ className: 'flex align-center items-center' }, { children: [_jsx(Mail, { className: 'w-4 h-4 inline-block mr-2 text-gray-400' }), _jsx("span", __assign({ className: 'text-sm' }, { children: _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de" }, { children: "admin@sanskriti-hamburg.de" })) }))] }))] })) }))] })), _jsx("div", __assign({ className: "pt-4 mt-4 border-t border-gray-800" }, { children: _jsxs("div", __assign({ className: "flex justify-center space-x-6 text-gray-500 text-xs" }, { children: ["Sanskriti e.V. \u00A9 ", new Date().getFullYear(), " | All Rights Reserved"] })) }))] })) })));
}
