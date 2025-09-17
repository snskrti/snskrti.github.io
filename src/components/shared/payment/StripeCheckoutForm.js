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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, CheckCircle } from 'lucide-react';
var StripeCheckoutForm = function (_a) {
    var amount = _a.amount, customerInfo = _a.customerInfo, clientSecret = _a.clientSecret, onSuccess = _a.onSuccess, onError = _a.onError, eventInfo = _a.eventInfo;
    var stripe = useStripe();
    var elements = useElements();
    var _b = useState(false), isProcessing = _b[0], setIsProcessing = _b[1];
    var _c = useState(null), paymentError = _c[0], setPaymentError = _c[1];
    var _d = useState(false), paymentSuccess = _d[0], setPaymentSuccess = _d[1];
    // Pre-populate billing details from customer info
    var _e = useState(customerInfo.name), name = _e[0], setName = _e[1];
    var _f = useState(customerInfo.email), email = _f[0], setEmail = _f[1];
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!stripe || !elements) {
                        return [2 /*return*/];
                    }
                    if (!clientSecret) {
                        setPaymentError('Payment not initialized properly');
                        if (onError)
                            onError('Payment not initialized properly');
                        return [2 /*return*/];
                    }
                    setIsProcessing(true);
                    setPaymentError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, stripe.confirmPayment({
                            elements: elements,
                            confirmParams: {
                                // Use the shared payment confirmation component for all events
                                return_url: eventInfo
                                    ? "".concat(window.location.origin, "/payment-confirmation?eventName=").concat(encodeURIComponent(eventInfo.eventName), "&eventPath=").concat(encodeURIComponent(eventInfo.eventPath)).concat(eventInfo.returnToEventText ? "&returnToEventText=".concat(encodeURIComponent(eventInfo.returnToEventText)) : '')
                                    : "".concat(window.location.origin, "/payment-confirmation"),
                                payment_method_data: {
                                    billing_details: {
                                        name: name,
                                        email: email,
                                    },
                                },
                            },
                            redirect: 'if_required',
                        })];
                case 2:
                    result = _a.sent();
                    if (result.error) {
                        setPaymentError(result.error.message || 'Payment failed');
                        if (onError)
                            onError(result.error.message || 'Payment failed');
                    }
                    else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                        setPaymentSuccess(true);
                        if (onSuccess)
                            onSuccess(result.paymentIntent.id);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unexpected error occurred';
                    setPaymentError(errorMessage);
                    if (onError)
                        onError(errorMessage);
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (paymentSuccess) {
        return (_jsxs("div", __assign({ className: "text-center py-8" }, { children: [_jsx(CheckCircle, { className: "w-16 h-16 text-green-500 mx-auto mb-4" }), _jsx("h2", __assign({ className: "text-2xl font-bold text-green-700 mb-2" }, { children: "Payment Successful!" })), _jsx("p", __assign({ className: "text-gray-600 mb-4" }, { children: "Your payment has been confirmed. You will receive a receipt email shortly." }))] })));
    }
    return (_jsxs("form", __assign({ onSubmit: handleSubmit, className: "space-y-6 w-full" }, { children: [_jsxs("div", __assign({ className: "bg-gray-50 p-4 rounded-lg" }, { children: [_jsx("h3", __assign({ className: "font-semibold text-gray-800 mb-2" }, { children: "Billing Information" })), _jsxs("div", __assign({ className: "space-y-4" }, { children: [_jsxs("div", { children: [_jsx("label", __assign({ htmlFor: "name", className: "block text-sm font-medium text-gray-700" }, { children: "Name" })), _jsx("input", { type: "text", id: "name", value: name, onChange: function (e) { return setName(e.target.value); }, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", __assign({ htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, { children: "Email" })), _jsx("input", { type: "email", id: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm", required: true })] })] }))] })), _jsxs("div", __assign({ className: "bg-gray-50 p-4 rounded-lg" }, { children: [_jsx("h3", __assign({ className: "font-semibold text-gray-800 mb-2" }, { children: "Payment Details" })), _jsx("div", __assign({ className: "bg-white p-4 rounded border" }, { children: _jsx(PaymentElement, { options: {
                                layout: {
                                    type: 'tabs',
                                    defaultCollapsed: false,
                                },
                            } }) })), _jsx("p", __assign({ className: "text-xs text-gray-500 mt-2" }, { children: "Select your preferred payment method" }))] })), paymentError && (_jsx("div", __assign({ className: "bg-red-50 border border-red-200 rounded-lg p-4" }, { children: _jsx("p", __assign({ className: "text-red-600" }, { children: paymentError })) }))), _jsx("button", __assign({ type: "submit", disabled: !stripe || isProcessing, className: "w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center" }, { children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), "Processing Payment..."] })) : (_jsxs(_Fragment, { children: [_jsx(Lock, { className: "w-5 h-5 mr-2" }), "Pay \u20AC", (amount || 0).toFixed(2)] })) })), _jsx("p", __assign({ className: "text-xs text-gray-500 text-center" }, { children: "Your payment is secured by Stripe. We do not store your card information." }))] })));
};
export default StripeCheckoutForm;
