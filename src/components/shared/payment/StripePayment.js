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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
// Initialize Stripe with publishable key
var stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');
export var StripePayment = function (props) {
    var _a = useState(""), clientSecret = _a[0], setClientSecret = _a[1];
    var _b = useState({}), paymentDetails = _b[0], setPaymentDetails = _b[1];
    var initializationRef = useRef(false);
    var _c = useState(null), error = _c[0], setError = _c[1];
    useEffect(function () {
        // Only initialize once using ref to prevent race conditions
        if (!initializationRef.current) {
            initializationRef.current = true;
            // Create payment intent
            createPaymentIntentFromServer();
        }
    }, [props.amount, props.currency, props.description, props.customerInfo, props.reservationData]);
    var createPaymentIntentFromServer = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isLocalDev, functionsBaseUrl, response, data, err_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    isLocalDev = window.location.hostname === 'localhost';
                    functionsBaseUrl = isLocalDev && window.location.port === '3000'
                        ? 'http://localhost:8888/.netlify/functions'
                        : '/.netlify/functions';
                    return [4 /*yield*/, fetch("".concat(functionsBaseUrl, "/create-payment-intent"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                amount: props.amount,
                                currency: props.currency.toLowerCase(),
                                customerInfo: props.customerInfo,
                                reservationData: props.reservationData,
                                description: props.description
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to create payment intent');
                    }
                    // Store client secret (required for payment)
                    setClientSecret(data.clientSecret);
                    // Store additional payment details for future reference
                    setPaymentDetails({
                        paymentIntentId: data.paymentIntentId,
                        invoiceId: data.invoiceId,
                        invoiceNumber: data.invoiceNumber,
                        invoiceUrl: data.invoiceUrl,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    errorMessage = err_1 instanceof Error ? err_1.message : 'Failed to initialize payment';
                    setError(errorMessage);
                    if (props.onError)
                        props.onError(errorMessage);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", __assign({ className: "w-full py-4" }, { children: clientSecret ? (_jsx("div", __assign({ className: "flex flex-col items-center justify-center w-full px-2 rounded-lg" }, { children: _jsx(Elements, __assign({ stripe: stripePromise, options: {
                    clientSecret: clientSecret,
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#16a34a',
                            colorBackground: '#ffffff',
                            colorText: '#1f2937',
                            colorDanger: '#ef4444',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            borderRadius: '0.375rem', // rounded-md
                        },
                    },
                } }, { children: _jsx(StripeCheckoutForm, { amount: props.amount, clientSecret: clientSecret, onSuccess: function (paymentId) {
                        // Pass both paymentId and additional details to parent component
                        if (props.onSuccess) {
                            props.onSuccess(paymentId, {
                                invoiceId: paymentDetails.invoiceId,
                                invoiceNumber: paymentDetails.invoiceNumber,
                                invoiceUrl: paymentDetails.invoiceUrl
                            });
                        }
                    }, onError: props.onError, customerInfo: props.customerInfo, eventInfo: props.eventInfo }) })) }))) : error ? (_jsx("div", __assign({ className: "bg-red-50 border border-red-200 rounded-lg p-4" }, { children: _jsx("p", __assign({ className: "text-red-600" }, { children: error })) }))) : (_jsxs("div", __assign({ className: "flex items-center justify-center py-8" }, { children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" }), _jsx("span", __assign({ className: "ml-2 text-gray-600" }, { children: "Initializing payment..." }))] }))) })));
};
export default StripePayment;
