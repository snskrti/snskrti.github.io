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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Calendar, ArrowLeft, Mail } from 'lucide-react';
import { Footer } from '../Footer';
import { SEOHead } from '../../SEO/SEOHead';
function PaymentConfirmation(_a) {
    var _this = this;
    var event = _a.event;
    var location = useLocation();
    var navigate = useNavigate();
    var _b = useState(null), paymentDetails = _b[0], setPaymentDetails = _b[1];
    var _c = useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = useState(false), isSavingToDb = _d[0], setIsSavingToDb = _d[1];
    var _e = useState('idle'), dbSaveStatus = _e[0], setDbSaveStatus = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    var _g = useState(null), eventInfo = _g[0], setEventInfo = _g[1];
    // Helper function to check if a reservation is free
    var isFreeReservation = function (details) {
        if (!details)
            return false;
        return (details.isFreeReservation === true ||
            details.paymentIntentId === '' ||
            (typeof details.paymentIntentId === 'string' && details.paymentIntentId.startsWith('free_reservation_')));
    };
    useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        window.scrollTo(0, 0);
        // Parse event info from query parameters or state
        var query = new URLSearchParams(location.search);
        var eventName = query.get('eventName') || (((_b = (_a = location.state) === null || _a === void 0 ? void 0 : _a.eventInfo) === null || _b === void 0 ? void 0 : _b.eventName) || (event === null || event === void 0 ? void 0 : event.eventName) || '');
        var eventPath = query.get('eventPath') || (((_d = (_c = location.state) === null || _c === void 0 ? void 0 : _c.eventInfo) === null || _d === void 0 ? void 0 : _d.eventPath) || (event === null || event === void 0 ? void 0 : event.eventPath) || '/');
        var returnToEventText = query.get('returnToEventText') || (((_f = (_e = location.state) === null || _e === void 0 ? void 0 : _e.eventInfo) === null || _f === void 0 ? void 0 : _f.returnToEventText) || (event === null || event === void 0 ? void 0 : event.returnToEventText) || 'Event Details');
        setEventInfo({
            eventName: eventName,
            eventPath: eventPath,
            returnToEventText: returnToEventText
        });
        // Check if we have payment intent data in the URL (from Stripe redirect)
        var paymentIntentId = query.get('payment_intent');
        var paymentIntentClientSecret = query.get('payment_intent_client_secret');
        // If we have the payment intent, retrieve details
        if (paymentIntentId && paymentIntentClientSecret) {
            fetchPaymentDetails(paymentIntentId);
        }
        // If we have state data from direct navigation (non-redirect flow)
        else if (location.state && location.state.paymentDetails) {
            // console.log('Direct navigation with payment details:', location.state.paymentDetails);
            // Set isSuccessful flag based on payment status if not explicitly provided
            var paymentDetailsWithStatus = __assign(__assign({}, location.state.paymentDetails), { 
                // If isSuccessful is undefined but status is 'succeeded', treat as successful
                isSuccessful: location.state.paymentDetails.isSuccessful !== undefined
                    ? location.state.paymentDetails.isSuccessful
                    : (location.state.paymentDetails.status === 'succeeded' || location.state.paymentDetails.status === 'processing') });
            // console.log('Processed payment details:', paymentDetailsWithStatus);
            setPaymentDetails(paymentDetailsWithStatus);
            // Check if payment failed
            if (paymentDetailsWithStatus.isSuccessful === false) {
                console.error('Payment failed from direct navigation:', paymentDetailsWithStatus.errorMessage);
                setError(paymentDetailsWithStatus.errorMessage || 'Payment could not be completed. Please try again or contact support.');
                setIsLoading(false);
                return;
            }
            // Check if we should save reservation data
            if (paymentDetailsWithStatus.isSuccessful && location.state.reservationData) {
                // Determine the base URL for Netlify Functions based on NODE_ENV
                var isLocalDev = process.env.NODE_ENV === 'development';
                var functionsBaseUrl = isLocalDev
                    ? 'http://localhost:8888/.netlify/functions'
                    : '/.netlify/functions';
                setIsSavingToDb(true);
                fetch("".concat(functionsBaseUrl, "/reservation-confirmation"), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentIntentId: paymentDetailsWithStatus.paymentIntentId || '',
                        reservationData: location.state.reservationData
                    }),
                })
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    if (data.success) {
                        setDbSaveStatus('success');
                    }
                    else {
                        console.error('Error from reservation-confirmation function:', data.error);
                        setDbSaveStatus('error');
                    }
                })
                    .catch(function (err) {
                    console.error('Error saving reservation data:', err);
                    setDbSaveStatus('error');
                })
                    .finally(function () {
                    setIsSavingToDb(false);
                    setIsLoading(false);
                });
            }
            else {
                setIsLoading(false);
            }
        }
        // No payment data, redirect to home
        else {
            setError('No payment information found');
            setIsLoading(false);
        }
    }, [location, event]);
    var fetchPaymentDetails = function (paymentIntentId) { return __awaiter(_this, void 0, void 0, function () {
        var isLocalDev, functionsBaseUrl, response, data, isLocalDev_1, functionsBaseUrl_1, response_1, saveResult, error_1, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    isLocalDev = process.env.NODE_ENV === 'development';
                    functionsBaseUrl = isLocalDev
                        ? 'http://localhost:8888/.netlify/functions'
                        : '/.netlify/functions';
                    return [4 /*yield*/, fetch("".concat(functionsBaseUrl, "/get-payment-details"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                paymentIntentId: paymentIntentId
                            }),
                        })];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to retrieve payment details');
                    }
                    // Set payment details
                    setPaymentDetails({
                        paymentIntentId: paymentIntentId,
                        status: data.status,
                        amount: data.amount,
                        customerName: data.customerName,
                        customerEmail: data.customerEmail,
                        invoiceId: data.invoiceId,
                        invoiceNumber: data.invoiceNumber,
                        invoiceUrl: data.invoiceUrl,
                        isSuccessful: data.isSuccessful,
                        errorMessage: data.errorMessage,
                    });
                    // If payment failed, set the error message
                    if (!data.isSuccessful && data.errorMessage) {
                        console.error('Payment failed with error in shared component:', data.errorMessage);
                        setError(data.errorMessage || 'Payment could not be completed. Please try again or contact support.');
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    if (!(data.isSuccessful && ((_a = location.state) === null || _a === void 0 ? void 0 : _a.reservationData))) return [3 /*break*/, 9];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 6, 7, 8]);
                    setIsSavingToDb(true);
                    isLocalDev_1 = process.env.NODE_ENV === 'development';
                    functionsBaseUrl_1 = isLocalDev_1
                        ? 'http://localhost:8888/.netlify/functions'
                        : '/.netlify/functions';
                    return [4 /*yield*/, fetch("".concat(functionsBaseUrl_1, "/reservation-confirmation"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                paymentIntentId: paymentIntentId,
                                reservationData: location.state.reservationData
                            }),
                        })];
                case 4:
                    response_1 = _b.sent();
                    return [4 /*yield*/, response_1.json()];
                case 5:
                    saveResult = _b.sent();
                    if (saveResult.success) {
                        setDbSaveStatus('success');
                    }
                    else {
                        console.error('Error from reservation-confirmation function:', saveResult.error);
                        setDbSaveStatus('error');
                    }
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _b.sent();
                    console.error('Error saving reservation data:', error_1);
                    setDbSaveStatus('error');
                    return [3 /*break*/, 8];
                case 7:
                    setIsSavingToDb(false);
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [3 /*break*/, 10];
                case 9:
                    // If no reservation data to save or we got here from a redirect, we're done loading
                    setIsLoading(false);
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_1 = _b.sent();
                    console.error('Error fetching payment details in shared component:', err_1);
                    setError('Could not retrieve payment details. Please contact support.');
                    setIsLoading(false);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    if (isLoading || isSavingToDb) {
        return (_jsx("div", __assign({ className: "min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center" }, { children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" }), _jsx("h2", __assign({ className: "text-xl font-semibold text-gray-800" }, { children: isLoading ? "Processing your payment..." : "Saving your reservation data..." })), _jsx("p", __assign({ className: "text-gray-600 mt-2" }, { children: isLoading ? "Please wait while we confirm your transaction." : "Please wait while we save your reservation details." }))] })) })));
    }
    if (error) {
        return (_jsx("div", __assign({ className: "min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center p-8 bg-white rounded-lg shadow-lg max-w-md" }, { children: [_jsx("div", __assign({ className: "text-red-500 mb-4" }, { children: _jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-16 w-16 mx-auto", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) })) })), _jsx("h2", __assign({ className: "text-2xl font-bold text-gray-800 mb-4" }, { children: "Payment Verification Failed" })), _jsx("p", __assign({ className: "text-gray-600 mb-6" }, { children: error })), _jsx("button", __assign({ onClick: function () { return navigate('/'); }, className: "bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700" }, { children: "Return to Home" }))] })) })));
    }
    return (_jsxs("div", __assign({ className: "min-h-screen bg-gradient-to-br from-orange-50 to-red-50" }, { children: [_jsx(SEOHead, { title: "Payment Confirmation | Sanskriti Hamburg", description: "Thank you for your ".concat((eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.eventName) || 'event', " payment"), url: "/payment-confirmation" }), _jsx("meta", { name: "robots", content: "noindex, nofollow" }), _jsx("main", __assign({ className: "container mx-auto px-4 py-12" }, { children: _jsxs("div", __assign({ className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" }, { children: [_jsxs("div", __assign({ className: "".concat((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100', " p-8 text-center border-b") }, { children: [(paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? (_jsx(CheckCircle, { className: "w-20 h-20 text-green-600 mx-auto mb-4" })) : (_jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", className: "w-20 h-20 text-red-600 mx-auto mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }))), _jsx("h1", __assign({ className: "text-2xl font-bold text-gray-800 mb-2" }, { children: isFreeReservation(paymentDetails)
                                        ? 'Reservation Successful!'
                                        : (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful)
                                            ? 'Payment Successful!'
                                            : 'Payment Failed' })), _jsx("p", __assign({ className: "text-gray-600" }, { children: isFreeReservation(paymentDetails)
                                        ? 'Your free reservation has been processed successfully.'
                                        : (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful)
                                            ? 'Your payment has been processed successfully.'
                                            : (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.errorMessage) || 'There was an issue processing your payment.' })), (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.eventName) && (_jsxs("p", __assign({ className: "text-gray-600 mt-2" }, { children: ["Event: ", _jsx("span", __assign({ className: "font-medium" }, { children: eventInfo.eventName }))] }))), dbSaveStatus === 'success' && (_jsx("p", __assign({ className: "text-green-600 mt-2 font-medium" }, { children: "Your reservation has been saved successfully!" }))), dbSaveStatus === 'error' && !isFreeReservation(paymentDetails) && (_jsx("p", __assign({ className: "text-orange-600 mt-2 font-medium" }, { children: "Note: We had trouble saving your reservation. Our team will follow up to ensure it's properly recorded." })))] })), _jsxs("div", __assign({ className: "p-8" }, { children: [_jsx("h2", __assign({ className: "text-lg font-semibold text-gray-800 mb-4" }, { children: "Payment Details" })), _jsxs("div", __assign({ className: "space-y-4 mb-8" }, { children: [(paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.customerName) && (_jsxs("div", __assign({ className: "flex justify-between border-b pb-2" }, { children: [_jsx("span", __assign({ className: "text-gray-600" }, { children: "Customer:" })), _jsx("span", __assign({ className: "font-medium text-gray-800" }, { children: paymentDetails.customerName }))] }))), (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.amount) && !isFreeReservation(paymentDetails) && (_jsxs("div", __assign({ className: "flex justify-between border-b pb-2" }, { children: [_jsx("span", __assign({ className: "text-gray-600" }, { children: "Amount Paid:" })), _jsxs("span", __assign({ className: "font-medium text-gray-800" }, { children: ["\u20AC", (paymentDetails.amount / 100).toFixed(2)] }))] }))), isFreeReservation(paymentDetails) && (_jsxs("div", __assign({ className: "flex justify-between border-b pb-2" }, { children: [_jsx("span", __assign({ className: "text-gray-600" }, { children: "Amount:" })), _jsx("span", __assign({ className: "font-medium text-green-600" }, { children: "Free" }))] }))), (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.invoiceNumber) && (_jsxs("div", __assign({ className: "flex justify-between border-b pb-2" }, { children: [_jsx("span", __assign({ className: "text-gray-600" }, { children: "Invoice Number:" })), _jsx("span", __assign({ className: "font-medium text-gray-800" }, { children: paymentDetails.invoiceNumber }))] }))), _jsxs("div", __assign({ className: "flex justify-between border-b pb-2" }, { children: [_jsx("span", __assign({ className: "text-gray-600" }, { children: "Payment Status:" })), _jsx("span", __assign({ className: "font-medium ".concat((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'text-green-600' : 'text-red-600') }, { children: isFreeReservation(paymentDetails)
                                                        ? 'Free Reservation'
                                                        : (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful)
                                                            ? ((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.status) === 'succeeded' ? 'Completed' : 'Processing')
                                                            : 'Failed' }))] })), _jsxs("div", __assign({ className: "flex justify-between border-b pb-2" }, { children: [_jsx("span", __assign({ className: "text-gray-600" }, { children: "Payment Date:" })), _jsx("span", __assign({ className: "font-medium text-gray-800" }, { children: new Date().toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) }))] }))] })), _jsxs("div", __assign({ className: "space-y-4" }, { children: [(paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) && (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.invoiceUrl) && !isFreeReservation(paymentDetails) && (_jsxs("a", __assign({ href: paymentDetails.invoiceUrl, target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors" }, { children: [_jsx(Download, { className: "w-5 h-5 mr-2" }), "View & Download Invoice"] }))), _jsxs("div", __assign({ className: "flex space-x-4" }, { children: [(paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) && (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.eventPath) && (_jsxs("button", __assign({ onClick: function () { return navigate(eventInfo.eventPath); }, className: "flex-1 flex items-center justify-center bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors" }, { children: [_jsx(Calendar, { className: "w-5 h-5 mr-2" }), eventInfo.returnToEventText || 'Event Details'] }))), !(paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) && (eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.eventPath) && (_jsxs("button", __assign({ onClick: function () { return navigate(eventInfo.eventPath); }, className: "flex-1 flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors" }, { children: [_jsx(Calendar, { className: "w-5 h-5 mr-2" }), "Try Again"] }))), _jsxs("button", __assign({ onClick: function () { return navigate('/'); }, className: "flex-1 flex items-center justify-center bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors" }, { children: [_jsx(ArrowLeft, { className: "w-5 h-5 mr-2" }), "Back to Home"] }))] }))] }))] })), _jsx("div", __assign({ className: "".concat((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100', " p-6 border-t") }, { children: _jsxs("div", __assign({ className: "flex items-start" }, { children: [_jsx(Mail, { className: "w-6 h-6 ".concat((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'text-blue-600' : 'text-gray-600', " mr-3 mt-0.5 flex-shrink-0") }), _jsxs("div", { children: [_jsx("h3", __assign({ className: "font-semibold ".concat((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'text-blue-900' : 'text-gray-900', " mb-1") }, { children: (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'Confirmation Email' : 'Need Help?' })), _jsxs("p", __assign({ className: "text-sm ".concat((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful) ? 'text-blue-800' : 'text-gray-800') }, { children: [isFreeReservation(paymentDetails)
                                                        ? "A confirmation has been sent to your email address. If you have any questions about your reservation, \n                        please contact us at "
                                                        : (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.isSuccessful)
                                                            ? "A receipt has been sent to your email address. If you have any questions about your payment, \n                          please contact us at "
                                                            : "If you're experiencing issues with your payment or need assistance, \n                          please contact us at ", _jsx("a", __assign({ href: "mailto:admin@sanskriti-hamburg.de", className: "underline" }, { children: "admin@sanskriti-hamburg.de" }))] }))] })] })) }))] })) })), _jsx(Footer, {})] })));
}
export default PaymentConfirmation;
