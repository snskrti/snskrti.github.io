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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
var PageNotFound = function () {
    var navigate = useNavigate();
    useEffect(function () {
        var timer = setTimeout(function () {
            navigate('/');
        }, 3000);
        return function () { return clearTimeout(timer); };
    }, [history]);
    return (_jsxs("div", __assign({ className: "text-center mt-12 pt-12" }, { children: [_jsx("h1", __assign({ className: "text-2xl font-bold" }, { children: "Oops! This page is still under builds" })), _jsx("p", __assign({ className: "mt-4" }, { children: "You will be redirected to the homepage in 3 seconds..." }))] })));
};
export default PageNotFound;
