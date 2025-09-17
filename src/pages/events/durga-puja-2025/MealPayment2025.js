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
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, ArrowLeft, Lock, CheckCircle } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { getPriceByDay, AGE_GROUPS } from '../../../utils/mealData';
import StripePayment from '../../../components/shared/payment/StripePayment';
function MealPayment2025() {
    var _this = this;
    var location = useLocation();
    var navigate = useNavigate();
    var reservation = location.state;
    var _a = useState(false), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var isFreeReservation = (reservation === null || reservation === void 0 ? void 0 : reservation.totalAmount) === 0;
    useEffect(function () {
        window.scrollTo(0, 0);
        // Redirect if no reservation data
        if (!reservation) {
            navigate('/events/durga-puja-2025/meal-reservation');
        }
    }, [reservation, navigate]);
    var handlePaymentSuccess = function (paymentId, invoiceDetails) {
        // Navigate to the shared payment confirmation page with payment details
        navigate('/payment-confirmation', {
            state: {
                paymentDetails: __assign({ paymentIntentId: paymentId, status: 'succeeded', isSuccessful: true }, invoiceDetails),
                eventInfo: {
                    eventName: "Durga Puja 2025 Meal Reservation",
                    eventPath: "/events/durga-puja-2025",
                    returnToEventText: "Back to Durga Puja Event"
                },
                // Pass the full reservation data for database saving
                reservationData: reservation
            }
        });
    };
    var handlePaymentError = function (error) {
        // Navigate to the shared payment confirmation page with error details
        navigate('/payment-confirmation', {
            state: {
                paymentDetails: {
                    status: 'failed',
                    isSuccessful: false,
                    errorMessage: error
                },
                eventInfo: {
                    eventName: "Durga Puja 2025 Meal Reservation",
                    eventPath: "/events/durga-puja-2025/meal-reservation",
                    returnToEventText: "Try Again"
                }
            }
        });
    };
    var handleFreeReservation = function () { return __awaiter(_this, void 0, void 0, function () {
        var isLocalDev, functionsBaseUrl, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    isLocalDev = process.env.NODE_ENV === 'development';
                    functionsBaseUrl = isLocalDev
                        ? 'http://localhost:8888/.netlify/functions'
                        : '/.netlify/functions';
                    return [4 /*yield*/, fetch("".concat(functionsBaseUrl, "/reservation-confirmation"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                // Use an empty string to indicate a free reservation
                                paymentIntentId: '',
                                reservationData: __assign(__assign({}, reservation), { isFreeReservation: true // Add flag to explicitly mark this as a free reservation
                                 })
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!data.success) {
                        throw new Error(data.error || 'Failed to save reservation');
                    }
                    // Navigate to confirmation page
                    navigate('/payment-confirmation', {
                        state: {
                            paymentDetails: {
                                paymentIntentId: '',
                                status: 'succeeded',
                                isSuccessful: true,
                                isFreeReservation: true // Add flag to explicitly mark this as a free reservation
                                // Free reservations don't have invoice details
                            },
                            eventInfo: {
                                eventName: "Durga Puja 2025 Meal Reservation",
                                eventPath: "/events/durga-puja-2025",
                                returnToEventText: "Back to Durga Puja Event"
                            },
                            reservationData: reservation
                        }
                    });
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error saving free reservation:', error_1);
                    handlePaymentError(error_1 instanceof Error ? error_1.message : 'Failed to save your reservation');
                    return [3 /*break*/, 6];
                case 5:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (!reservation) {
        return (_jsx("div", __assign({ className: "min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" }, { children: _jsxs("div", __assign({ className: "text-center" }, { children: [_jsx("h2", __assign({ className: "text-2xl font-bold text-gray-800 mb-4" }, { children: "Invalid Access" })), _jsx("p", __assign({ className: "text-gray-600 mb-4" }, { children: "Please start from the meal reservation page." })), _jsx("button", __assign({ onClick: function () { return navigate('/events/durga-puja-2025/meal-reservation'); }, className: "bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700" }, { children: "Go to Meal Reservation" }))] })) })));
    }
    return (_jsxs("div", __assign({ className: "min-h-screen bg-gradient-to-br from-orange-50 to-red-50" }, { children: [_jsx(SEOHead, { title: "Payment - Meal Reservation | Sanskriti Hamburg", description: "Complete your meal reservation payment for Durga Puja 2025", url: "/events/durga-puja-2025/meal-payment" }), _jsxs("main", __assign({ className: "container mx-auto px-4 py-8" }, { children: [_jsxs("div", __assign({ className: "text-center mb-8" }, { children: [_jsxs("button", __assign({ onClick: function () { return navigate(-1); }, className: "inline-flex items-center text-orange-600 hover:text-orange-700 mb-4" }, { children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }), "Back to Reservation"] })), _jsx("h1", __assign({ className: "text-2xl font-bold text-gray-800 mb-2" }, { children: isFreeReservation ? 'Confirm Your Reservation' : 'Complete Your Payment' })), _jsx("p", __assign({ className: "text-sm text-gray-600" }, { children: isFreeReservation
                                    ? 'Please review and confirm your free meal reservation'
                                    : 'Secure payment for your Durga Puja 2025 meal reservation' }))] })), _jsxs("div", __assign({ className: "max-w-4xl mx-auto grid md:grid-cols-2 gap-8" }, { children: [_jsxs("div", __assign({ className: "bg-white rounded-lg shadow-lg p-6" }, { children: [_jsxs("h2", __assign({ className: "text-lg font-bold text-gray-800 mb-4 flex items-center" }, { children: [_jsx(CreditCard, { className: "w-5 h-5 mr-2" }), "Order Summary"] })), _jsxs("div", __assign({ className: "space-y-4 mb-6" }, { children: [_jsxs("div", __assign({ className: "border-b pb-4" }, { children: [_jsx("h3", __assign({ className: "font-semibold text-gray-700 mb-2 text-sm" }, { children: "Customer Information" })), _jsxs("p", __assign({ className: "text-xs text-gray-600" }, { children: ["Name: ", reservation.customerInfo.name] })), _jsxs("p", __assign({ className: "text-xs text-gray-600" }, { children: ["Email: ", reservation.customerInfo.email] })), _jsxs("p", __assign({ className: "text-xs text-gray-600" }, { children: ["Status: ", reservation.customerInfo.isMember ? 'Member' : 'Non-member'] }))] })), _jsxs("div", __assign({ className: "border-b pb-4" }, { children: [_jsx("h3", __assign({ className: "font-semibold text-gray-700 mb-2 text-sm" }, { children: "Selected Meals" })), _jsxs("div", __assign({ className: "space-y-3" }, { children: [Object.entries(reservation.selectedItems)
                                                                .filter(function (_a) {
                                                                var compositeKey = _a[0];
                                                                return compositeKey.includes('anandamela');
                                                            })
                                                                .some(function (_a) {
                                                                var _ = _a[0], itemDetails = _a[1];
                                                                return itemDetails.quantity > 0;
                                                            }) && (_jsxs("div", __assign({ className: "bg-orange-50 p-3 rounded-lg mb-2 border border-orange-100" }, { children: [_jsx("div", __assign({ className: "font-medium text-sm text-orange-800 mb-1" }, { children: "Anandamela Attendance" })), _jsxs("div", __assign({ className: "text-xs text-orange-700 flex justify-between" }, { children: [_jsx("span", { children: "Expected Attendees:" }), _jsx("span", __assign({ className: "font-medium" }, { children: Object.entries(reservation.selectedItems)
                                                                                    .filter(function (_a) {
                                                                                    var compositeKey = _a[0];
                                                                                    return compositeKey.includes('anandamela');
                                                                                })
                                                                                    .reduce(function (sum, _a) {
                                                                                    var _ = _a[0], itemDetails = _a[1];
                                                                                    return sum + itemDetails.quantity;
                                                                                }, 0) }))] })), Object.entries(reservation.selectedItems)
                                                                        .filter(function (_a) {
                                                                        var compositeKey = _a[0];
                                                                        return compositeKey.includes('anandamela');
                                                                    })
                                                                        .map(function (_a) {
                                                                        var compositeKey = _a[0], itemDetails = _a[1];
                                                                        try {
                                                                            if (itemDetails.quantity === 0)
                                                                                return null;
                                                                            // Extract age group from composite key
                                                                            var parts = compositeKey.split('-');
                                                                            var ageGroupKey = parts[parts.length - 1];
                                                                            // Ensure we have a valid age group
                                                                            if (!AGE_GROUPS[ageGroupKey]) {
                                                                                return null;
                                                                            }
                                                                            var ageGroupInfo = AGE_GROUPS[ageGroupKey];
                                                                            return (_jsxs("div", __assign({ className: "text-xs text-orange-600 flex justify-between" }, { children: [_jsxs("span", { children: [ageGroupInfo.name, ":"] }), _jsx("span", { children: itemDetails.quantity })] }), compositeKey));
                                                                        }
                                                                        catch (error) {
                                                                            // Error handling for Anandamela item rendering
                                                                            return null;
                                                                        }
                                                                    }), _jsx("div", __assign({ className: "text-xs mt-2 text-orange-600 italic" }, { children: "Free registration - Pay for food at stalls" }))] }))), Object.entries(reservation.selectedItems)
                                                                .filter(function (_a) {
                                                                var compositeKey = _a[0];
                                                                return !compositeKey.includes('anandamela') && reservation.selectedItems[compositeKey].quantity > 0;
                                                            })
                                                                .map(function (_a) {
                                                                var _b;
                                                                var compositeKey = _a[0], itemDetails = _a[1];
                                                                try {
                                                                    // Parse item details from the composite key
                                                                    var parts = compositeKey.split('-');
                                                                    var itemId = parts[0] + (parts.length > 2 ? "-".concat(parts[1]) : '');
                                                                    var ageGroupKey = parts[parts.length - 1];
                                                                    // Ensure we have a valid age group
                                                                    if (!AGE_GROUPS[ageGroupKey]) {
                                                                        // Skip if age group is invalid
                                                                        return null;
                                                                    }
                                                                    var isVeg = itemId.includes('veg-');
                                                                    var dayNumber = (_b = itemId.match(/day(\d+)/)) === null || _b === void 0 ? void 0 : _b[1];
                                                                    var thaliType = isVeg && !itemId.includes('nonveg') ? 'Veg Thali' : 'Non-Veg Thali';
                                                                    // Get the date based on day number
                                                                    var dateDisplay = '';
                                                                    switch (dayNumber) {
                                                                        case '1':
                                                                            dateDisplay = 'Sept 28 - Shashti';
                                                                            break;
                                                                        case '2':
                                                                            dateDisplay = 'Sept 29 - Saptami';
                                                                            break;
                                                                        case '3':
                                                                            dateDisplay = 'Sept 30 - Ashtami';
                                                                            break;
                                                                        default: dateDisplay = 'TBD';
                                                                    }
                                                                    // Get price based on day, type, and age group using helper function
                                                                    var pricePerItem = getPriceByDay(dayNumber || '1', isVeg && !itemId.includes('nonveg'), ageGroupKey, reservation.customerInfo.isMember);
                                                                    // Make sure price is a valid number
                                                                    if (isNaN(pricePerItem)) {
                                                                        // Skip if price is invalid
                                                                        return null;
                                                                    }
                                                                    var totalPrice = pricePerItem * itemDetails.quantity;
                                                                    // Get the age group display name
                                                                    var ageGroupDisplay = 'Adult';
                                                                    switch (ageGroupKey) {
                                                                        case 'child':
                                                                            ageGroupDisplay = 'Child (8-12 years)';
                                                                            break;
                                                                        case 'infant':
                                                                            ageGroupDisplay = 'Infant (0-8 years)';
                                                                            break;
                                                                        default: ageGroupDisplay = 'Adult (12+ years)';
                                                                    }
                                                                    return (_jsx("div", __assign({ className: "bg-gray-50 p-3 rounded" }, { children: _jsxs("div", __assign({ className: "flex justify-between items-start" }, { children: [_jsxs("div", __assign({ className: "flex-1" }, { children: [_jsxs("div", __assign({ className: "font-medium text-gray-800 text-sm" }, { children: [thaliType, " (", dateDisplay, ")"] })), _jsxs("div", __assign({ className: "text-xs text-gray-600 mt-1" }, { children: ["Age Group: ", ageGroupDisplay] })), _jsx("div", __assign({ className: "text-xs text-gray-500 mt-1" }, { children: pricePerItem > 0 ? "\u20AC".concat(pricePerItem.toFixed(2), " per plate") : 'Free' }))] })), _jsxs("div", __assign({ className: "text-right" }, { children: [_jsxs("div", __assign({ className: "text-sm text-gray-600" }, { children: [itemDetails.quantity, " \u00D7 ", pricePerItem > 0 ? "\u20AC".concat(pricePerItem.toFixed(2)) : 'Free'] })), _jsx("div", __assign({ className: "font-semibold text-gray-800" }, { children: totalPrice > 0 ? "\u20AC".concat(totalPrice.toFixed(2)) : 'Free' }))] }))] })) }), compositeKey));
                                                                }
                                                                catch (error) {
                                                                    // Error handling for item rendering
                                                                    return null;
                                                                }
                                                            })] }))] })), _jsx("div", __assign({ className: "space-y-2" }, { children: _jsxs("div", __assign({ className: "flex justify-between" }, { children: [_jsx("span", { children: "Total:" }), _jsxs("span", __assign({ className: "text-orange-600 font-bold" }, { children: ["\u20AC", (reservation.totalAmount || 0).toFixed(2)] }))] })) }))] }))] })), _jsx("div", __assign({ className: "bg-white rounded-lg shadow-lg p-6" }, { children: isFreeReservation ? (
                                // Free Reservation Confirmation Section
                                _jsxs("div", { children: [_jsxs("h2", __assign({ className: "text-lg font-bold text-gray-800 mb-4 flex items-center" }, { children: [_jsx(CheckCircle, { className: "w-5 h-5 mr-2" }), "Confirm Reservation"] })), _jsxs("div", __assign({ className: "bg-green-50 p-4 rounded-lg mb-6 border border-green-100" }, { children: [_jsx("h3", __assign({ className: "font-semibold text-green-800 mb-2" }, { children: "Free Reservation" })), _jsx("p", __assign({ className: "text-sm text-green-700 mb-2" }, { children: "Your reservation does not require payment. Please confirm to save your reservation." }))] })), _jsx("button", __assign({ onClick: handleFreeReservation, disabled: isSubmitting, className: "w-full py-3 px-4 rounded-lg font-medium text-white \n                    ".concat(isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700', " \n                    transition-colors flex items-center justify-center") }, { children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { className: "w-5 h-5 mr-2" }), "Confirm Reservation"] })) }))] })) : (
                                // Paid Reservation - Stripe Payment Section
                                _jsxs("div", { children: [_jsxs("h2", __assign({ className: "text-lg font-bold text-gray-800 mb-4 flex items-center" }, { children: [_jsx(Lock, { className: "w-5 h-5 mr-2" }), "Secure Payment"] })), _jsx(StripePayment, { amount: reservation.totalAmount, currency: "EUR", customerInfo: reservation.customerInfo, reservationData: reservation, onSuccess: handlePaymentSuccess, onError: handlePaymentError, description: "Food - Durga Puja 2025(Sanskriti eV)", eventInfo: {
                                                eventName: "Durga Puja 2025 Meal Reservation",
                                                eventPath: "/events/durga-puja-2025",
                                                returnToEventText: "Back to Durga Puja Event"
                                            } })] })) }))] })), _jsx("div", __assign({ className: "max-w-2xl mx-auto mt-8 bg-blue-50 rounded-lg p-4" }, { children: isFreeReservation ? (_jsxs(_Fragment, { children: [_jsx("h3", __assign({ className: "font-semibold text-blue-900 mb-2" }, { children: "Reservation Information" })), _jsx("p", __assign({ className: "text-sm text-blue-800" }, { children: "By confirming, your free reservation will be recorded in our system. Please bring your confirmation email when attending the event." }))] })) : (_jsxs(_Fragment, { children: [_jsx("h3", __assign({ className: "font-semibold text-blue-900 mb-2" }, { children: "Secure Payment" })), _jsx("p", __assign({ className: "text-sm text-blue-800" }, { children: "Your payment is processed securely through Stripe. We never store your card information. You will receive a confirmation email once your payment is successful." }))] })) }))] })), _jsx(Footer, {})] })));
}
export default MealPayment2025;
