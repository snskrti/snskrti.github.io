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
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Plus, Minus, ShoppingCart, User, Mail, Utensils, Leaf, Users } from 'lucide-react';
import { Footer } from '../../../components/shared/Footer';
import { SEOHead } from '../../../components/SEO/SEOHead';
import { durgaPujaMeals2025, getPriceByDay, AGE_GROUPS } from '../../../utils/mealData';
function MealReservation2025() {
    var navigate = useNavigate();
    var _a = useState({}), selectedItems = _a[0], setSelectedItems = _a[1];
    var _b = useState({
        name: '',
        email: '',
        isMember: false
    }), customerInfo = _b[0], setCustomerInfo = _b[1];
    var _c = useState(false), isFormValid = _c[0], setIsFormValid = _c[1];
    var _d = useState(0), totalAmount = _d[0], setTotalAmount = _d[1];
    useEffect(function () {
        window.scrollTo(0, 0);
    }, []);
    useEffect(function () {
        calculateTotal();
        validateForm();
    }, [selectedItems, customerInfo]);
    var calculateTotal = useCallback(function () {
        var total = 0;
        Object.entries(selectedItems).forEach(function (_a) {
            var _b;
            var compositeKey = _a[0], itemDetails = _a[1];
            // Skip Anandamela items as they're free and just for headcount
            if (compositeKey.includes('anandamela')) {
                return;
            }
            try {
                // Parse item details from the composite key
                var parts = compositeKey.split('-');
                var itemId = parts[0] + (parts.length > 2 ? "-".concat(parts[1]) : '');
                var ageGroup = parts[parts.length - 1];
                // Ensure we have a valid age group
                if (!AGE_GROUPS[ageGroup]) {
                    return;
                }
                // Parse day number from item ID
                var isVeg = itemId.includes('veg-');
                var dayNumber = ((_b = itemId.match(/day(\d+)/)) === null || _b === void 0 ? void 0 : _b[1]) || '1';
                // Get the price based on day, type, age group, and membership status
                var price = getPriceByDay(dayNumber, isVeg && !itemId.includes('nonveg'), ageGroup, customerInfo.isMember);
                // Make sure price is a valid number
                if (isNaN(price)) {
                    return;
                }
                var itemTotal = price * itemDetails.quantity;
                total += itemTotal;
            }
            catch (error) {
                // Error handling for price calculation
            }
        });
        // Set the total amount
        setTotalAmount(total);
    }, [selectedItems, customerInfo.isMember]);
    var validateForm = useCallback(function () {
        // Check if any items are selected (either meals or Anandamela attendees)
        var hasSelectedItems = Object.entries(selectedItems).some(function (_a) {
            var _ = _a[0], item = _a[1];
            return item.quantity > 0;
        });
        // For Anandamela-only registration, we still need customer info
        var anandamelaOnly = Object.entries(selectedItems).every(function (_a) {
            var compositeKey = _a[0], item = _a[1];
            return compositeKey.includes('anandamela') || item.quantity === 0;
        });
        var hasAnandamelaAttendees = Object.entries(selectedItems)
            .filter(function (_a) {
            var compositeKey = _a[0];
            return compositeKey.includes('anandamela');
        })
            .some(function (_a) {
            var _ = _a[0], item = _a[1];
            return item.quantity > 0;
        });
        var hasValidCustomerInfo = customerInfo.name.trim() !== '' &&
            customerInfo.email.trim() !== '' &&
            customerInfo.email.includes('@');
        // Allow proceeding even with 0-value reservations as long as items are selected
        setIsFormValid(hasSelectedItems && hasValidCustomerInfo);
    }, [selectedItems, customerInfo.name, customerInfo.email]);
    var updateQuantity = function (itemId, change, ageGroup) {
        setSelectedItems(function (prev) {
            var _a;
            var _b;
            try {
                // Create a composite key that combines itemId and ageGroup
                var compositeKey = "".concat(itemId, "-").concat(ageGroup);
                var currentItem = prev[compositeKey] || { quantity: 0, ageGroup: ageGroup, price: 0 };
                // Calculate the new quantity
                var newQuantity = Math.max(0, currentItem.quantity + change);
                if (newQuantity === 0) {
                    // Remove the item completely if quantity is 0
                    var newItems = __assign({}, prev);
                    delete newItems[compositeKey];
                    return newItems;
                }
                // Get the price based on the item ID and age group
                var price = 0;
                if (!itemId.includes('anandamela')) {
                    // Parse day number from item ID
                    var isVeg = itemId.includes('veg-') && !itemId.includes('nonveg');
                    var dayNumber = ((_b = itemId.match(/day(\d+)/)) === null || _b === void 0 ? void 0 : _b[1]) || '1';
                    // Get the price based on day, type, and age group
                    price = getPriceByDay(dayNumber, isVeg, ageGroup, customerInfo.isMember);
                }
                // Update or add the item with the composite key
                return __assign(__assign({}, prev), (_a = {}, _a[compositeKey] = {
                    quantity: newQuantity,
                    ageGroup: ageGroup,
                    price: price
                }, _a));
            }
            catch (error) {
                // Error handling for quantity updates
                return prev;
            }
        });
    };
    var getSelectedItemsCount = function () {
        try {
            return Object.values(selectedItems).reduce(function (sum, item) {
                if (typeof item.quantity === 'number') {
                    return sum + item.quantity;
                }
                return sum;
            }, 0);
        }
        catch (error) {
            // Error handling for item count calculation
            return 0;
        }
    };
    var handleProceedToPayment = function () {
        if (!isFormValid)
            return;
        // Organize selected items by day for the new structure
        var daySelections = {};
        Object.entries(selectedItems).forEach(function (_a) {
            var _b;
            var compositeKey = _a[0], itemDetails = _a[1];
            if (!compositeKey.includes('anandamela')) {
                try {
                    // Parse item details to get the day number
                    var parts = compositeKey.split('-');
                    var itemId = parts[0] + (parts.length > 2 ? "-".concat(parts[1]) : '');
                    var dayNumber = ((_b = itemId.match(/day(\d+)/)) === null || _b === void 0 ? void 0 : _b[1]) || '1';
                    // Initialize the day array if it doesn't exist
                    if (!daySelections[dayNumber]) {
                        daySelections[dayNumber] = [];
                    }
                    // Add the item to the day's selections
                    daySelections[dayNumber].push(__assign({}, itemDetails));
                }
                catch (error) {
                    // Error handling for item organization
                }
            }
        });
        var reservationData = {
            selectedItems: selectedItems,
            daySelections: daySelections,
            customerInfo: customerInfo,
            totalAmount: totalAmount
        };
        navigate('/events/durga-puja-2025/meal-payment', { state: reservationData });
    };
    var renderMenuItem = function (item, isVeg) {
        var _a;
        // Special handling for Anandamela
        if (item.id === 'anandamela-info') {
            return (_jsx("div", __assign({ className: "bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm border border-orange-200 overflow-hidden" }, { children: _jsx("div", __assign({ className: "p-5" }, { children: _jsxs("div", __assign({ className: "text-center" }, { children: [_jsxs("div", __assign({ className: "inline-flex items-center space-x-2 mb-3 px-3 py-2 bg-orange-100 rounded-full" }, { children: [_jsx(Utensils, { className: "w-4 h-4 text-orange-600" }), _jsx("span", __assign({ className: "text-xs font-medium text-orange-700" }, { children: "Anandamela Style" }))] })), _jsx("h4", __assign({ className: "font-semibold text-gray-800 text-sm mb-2" }, { children: item.name })), _jsx("p", __assign({ className: "text-xs text-gray-600 mb-4 leading-relaxed" }, { children: item.description })), _jsxs("div", __assign({ className: "mb-4 bg-white p-4 rounded-lg border border-orange-100" }, { children: [_jsx("p", __assign({ className: "text-sm font-medium text-gray-700 mb-2" }, { children: "How many people will attend Anandamela?" })), _jsx("p", __assign({ className: "text-xs text-gray-500 mb-3" }, { children: "Free attendance - Please indicate expected attendees to help us plan" })), _jsx("div", __assign({ className: "flex justify-center space-x-4" }, { children: Object.entries(AGE_GROUPS).map(function (_a) {
                                            var ageKey = _a[0], ageInfo = _a[1];
                                            var ageGroupKey = ageKey;
                                            var anandamelaKey = "anandamela-".concat(ageGroupKey);
                                            var compositeKey = "".concat(anandamelaKey, "-").concat(ageGroupKey);
                                            var selectedItem = selectedItems[compositeKey];
                                            var quantity = selectedItem ? selectedItem.quantity : 0;
                                            return (_jsxs("div", __assign({ className: "inline-block" }, { children: [_jsx("div", __assign({ className: "text-xs mb-1 font-medium text-gray-600" }, { children: ageInfo.name })), _jsxs("div", __assign({ className: "flex items-center space-x-2" }, { children: [_jsx("button", __assign({ onClick: function () { return updateQuantity(anandamelaKey, -1, ageGroupKey); }, disabled: quantity === 0, className: "w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors" }, { children: _jsx(Minus, { className: "w-3 h-3 text-gray-600" }) })), _jsx("span", __assign({ className: "w-7 text-center font-semibold text-sm" }, { children: quantity })), _jsx("button", __assign({ onClick: function () { return updateQuantity(anandamelaKey, 1, ageGroupKey); }, className: "w-7 h-7 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center transition-colors" }, { children: _jsx(Plus, { className: "w-3 h-3" }) }))] }))] }), ageKey));
                                        }) }))] })), _jsx("div", __assign({ className: "bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-3" }, { children: _jsxs("p", __assign({ className: "text-xs text-yellow-800" }, { children: [_jsx("span", __assign({ className: "font-semibold block mb-1" }, { children: "\u26A0\uFE0F Important Notice" })), _jsx("span", __assign({ className: "block mt-1" }, { children: "Food payments will be accepted in cash, directly at the venue" }))] })) }))] })) })) }), item.id));
        }
        // Parse item details from the ID to get day number
        var dayNumber = ((_a = item.id.match(/day(\d+)/)) === null || _a === void 0 ? void 0 : _a[1]) || '1';
        return (_jsx("div", __assign({ className: "bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden" }, { children: _jsxs("div", __assign({ className: "p-5" }, { children: [_jsx("div", __assign({ className: "flex items-start justify-between mb-3" }, { children: _jsxs("div", __assign({ className: "flex items-center space-x-2 mb-2" }, { children: [isVeg ? (_jsx(Leaf, { className: "w-4 h-4 text-green-600" })) : (_jsx(Utensils, { className: "w-4 h-4 text-red-600" })), _jsx("span", __assign({ className: "text-xs font-medium px-2 py-1 rounded-full ".concat(isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') }, { children: isVeg ? 'Vegetarian' : 'Non-Vegetarian' }))] })) })), _jsx("h4", __assign({ className: "font-semibold text-gray-800 text-sm mb-2" }, { children: item.name })), _jsx("p", __assign({ className: "text-xs text-gray-600 mb-4 leading-relaxed" }, { children: item.description })), _jsx("div", __assign({ className: "mb-4 border-b border-gray-200" }, { children: _jsx("ul", __assign({ className: "flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500" }, { children: Object.entries(AGE_GROUPS).map(function (_a) {
                                var ageKey = _a[0], ageInfo = _a[1];
                                var ageGroupKey = ageKey;
                                var price = getPriceByDay(dayNumber, isVeg, ageGroupKey, customerInfo.isMember);
                                var compositeKey = "".concat(item.id, "-").concat(ageGroupKey);
                                var selectedItem = selectedItems[compositeKey];
                                var isSelected = selectedItem && selectedItem.quantity > 0;
                                return (_jsx("li", __assign({ className: "mr-2" }, { children: _jsx("div", __assign({ className: "inline-block p-3 rounded-t-lg border-b-2 ".concat(isSelected
                                            ? 'text-orange-600 border-orange-600'
                                            : 'border-transparent hover:text-gray-600 hover:border-gray-300') }, { children: _jsxs("div", __assign({ className: "flex flex-col items-center" }, { children: [_jsx("span", { children: ageInfo.name }), _jsx("span", __assign({ className: "text-xs text-gray-500" }, { children: ageInfo.description })), _jsx("span", __assign({ className: "font-bold mt-1 ".concat(price > 0 ? 'text-orange-600' : 'text-green-600') }, { children: price > 0 ? "\u20AC".concat(price.toFixed(2)) : 'Free' }))] })) })) }), ageKey));
                            }) })) })), _jsx("div", __assign({ className: "space-y-3" }, { children: Object.entries(AGE_GROUPS).map(function (_a) {
                            var ageKey = _a[0], ageInfo = _a[1];
                            var ageGroupKey = ageKey;
                            var compositeKey = "".concat(item.id, "-").concat(ageGroupKey);
                            var selectedItem = selectedItems[compositeKey];
                            var quantity = selectedItem ? selectedItem.quantity : 0;
                            var price = getPriceByDay(dayNumber, isVeg, ageGroupKey, customerInfo.isMember);
                            return (_jsxs("div", __assign({ className: "p-2 rounded-lg ".concat(quantity > 0 ? 'bg-orange-50' : 'bg-gray-50') }, { children: [_jsxs("div", __assign({ className: "flex items-center justify-between" }, { children: [_jsxs("div", { children: [_jsx("span", __assign({ className: "text-sm font-medium" }, { children: ageInfo.name })), _jsx("span", __assign({ className: "text-xs text-gray-500 block" }, { children: price > 0 ? "\u20AC".concat(price.toFixed(2)) : 'Free' }))] }), _jsxs("div", __assign({ className: "flex items-center space-x-3" }, { children: [_jsx("button", __assign({ onClick: function () { return updateQuantity(item.id, -1, ageGroupKey); }, disabled: quantity === 0, className: "w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors" }, { children: _jsx(Minus, { className: "w-4 h-4 text-gray-600" }) })), _jsx("span", __assign({ className: "w-8 text-center font-semibold text-sm" }, { children: quantity })), _jsx("button", __assign({ onClick: function () { return updateQuantity(item.id, 1, ageGroupKey); }, className: "w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 flex items-center justify-center transition-colors" }, { children: _jsx(Plus, { className: "w-4 h-4" }) }))] }))] })), quantity > 0 && (_jsxs("div", __assign({ className: "text-xs text-right mt-1 text-orange-600 font-medium" }, { children: ["Subtotal: \u20AC", (price * quantity).toFixed(2)] })))] }), ageKey));
                        }) }))] })) }), item.id));
    };
    return (_jsxs("div", __assign({ className: "min-h-screen bg-gradient-to-br from-orange-25 via-amber-25 to-yellow-25" }, { children: [_jsx(SEOHead, { title: "Meal Reservation - Durga Puja 2025 | Sanskriti Hamburg", description: "Reserve your meals for Durga Puja 2025 celebration in Hamburg. Authentic Bengali cuisine available for the four-day festival.", keywords: "Durga Puja 2025, Bengali food, meal reservation, Hamburg, Sanskriti, Bengali cuisine", url: "/events/durga-puja-2025/meal-reservation", type: "event", eventStartDate: "2025-09-28", eventEndDate: "2025-10-01", eventType: "Food Reservation", eventLocation: "Hamburg, Germany" }), _jsxs("main", __assign({ className: "container mx-auto px-4 py-6" }, { children: [_jsxs("div", __assign({ className: "text-center mb-8" }, { children: [_jsx("h1", __assign({ className: "text-3xl font-bold text-gray-800 mb-3" }, { children: "Durga Puja 2025 - Meal Reservation" })), _jsxs("div", __assign({ className: "flex justify-center items-center space-x-6 text-sm text-gray-600 mb-4" }, { children: [_jsxs("div", __assign({ className: "flex items-center" }, { children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), _jsx("span", { children: "September 28 - October 1, 2025" })] })), _jsxs("div", __assign({ className: "flex items-center" }, { children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), _jsx("span", { children: "Hamburg" })] }))] })), _jsx("p", __assign({ className: "text-sm text-gray-600 max-w-2xl mx-auto" }, { children: "Reserve your authentic Bengali thalis for the four-day Durga Puja celebration." }))] })), _jsxs("div", __assign({ className: "max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100" }, { children: [_jsxs("div", __assign({ className: "flex items-center mb-4" }, { children: [_jsx(Users, { className: "w-5 h-5 text-orange-600 mr-2" }), _jsx("h2", __assign({ className: "text-xl font-semibold text-gray-800" }, { children: "Age-Based Pricing" }))] })), _jsx("div", __assign({ className: "grid sm:grid-cols-3 gap-4" }, { children: Object.entries(AGE_GROUPS).map(function (_a) {
                                    var key = _a[0], info = _a[1];
                                    return (_jsxs("div", __assign({ className: "bg-gray-50 p-4 rounded-lg" }, { children: [_jsx("h3", __assign({ className: "font-medium text-lg mb-1" }, { children: info.name })), _jsx("p", __assign({ className: "text-sm text-gray-600 mb-2" }, { children: info.description })), _jsx("div", __assign({ className: "space-y-1 text-sm" }, { children: _jsxs("p", __assign({ className: key === 'infant' ? 'text-green-600 font-semibold' : '' }, { children: [key === 'infant' ? 'Free admission' : '', key === 'child' ? 'Reduced price' : '', key === 'adult' ? 'Full price' : ''] })) }))] }), key));
                                }) }))] })), _jsx("div", __assign({ className: "max-w-4xl mx-auto space-y-6 mb-8" }, { children: durgaPujaMeals2025.map(function (day, dayIndex) { return (_jsxs("div", __assign({ className: "bg-white rounded-2xl shadow-lg p-6 border border-gray-100" }, { children: [_jsxs("div", __assign({ className: "text-center mb-6" }, { children: [_jsx("h2", __assign({ className: "text-xl font-bold text-gray-800 mb-1" }, { children: day.day })), _jsx("p", __assign({ className: "text-sm text-gray-500" }, { children: new Date(day.date).toLocaleDateString('en-GB', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long'
                                            }) }))] })), _jsxs("div", __assign({ className: "grid gap-4 ".concat(day.day.includes('Day 4') ? 'grid-cols-1' : 'md:grid-cols-2') }, { children: [_jsx("div", { children: day.vegItems.map(function (item) { return renderMenuItem(item, true); }) }), day.nonVegItems && day.nonVegItems.length > 0 && (_jsx("div", { children: day.nonVegItems.map(function (item) { return renderMenuItem(item, false); }) }))] }))] }), dayIndex)); }) })), getSelectedItemsCount() > 0 && (_jsxs("div", __assign({ className: "max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100" }, { children: [_jsxs("h2", __assign({ className: "text-xl font-bold text-gray-800 mb-6 flex items-center" }, { children: [_jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }), "Complete Your Order"] })), _jsxs("div", __assign({ className: "grid md:grid-cols-2 gap-6" }, { children: [_jsxs("div", { children: [_jsx("h3", __assign({ className: "text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide" }, { children: "Your Information" })), _jsxs("div", __assign({ className: "space-y-4" }, { children: [_jsxs("div", { children: [_jsxs("label", __assign({ className: "block text-xs font-medium text-gray-700 mb-2" }, { children: [_jsx(User, { className: "w-3 h-3 inline mr-1" }), "Full Name *"] })), _jsx("input", { type: "text", value: customerInfo.name, onChange: function (e) { return setCustomerInfo(function (prev) { return (__assign(__assign({}, prev), { name: e.target.value })); }); }, className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent", placeholder: "Enter your full name", required: true })] }), _jsxs("div", { children: [_jsxs("label", __assign({ className: "block text-xs font-medium text-gray-700 mb-2" }, { children: [_jsx(Mail, { className: "w-3 h-3 inline mr-1" }), "Email Address *"] })), _jsx("input", { type: "email", value: customerInfo.email, onChange: function (e) { return setCustomerInfo(function (prev) { return (__assign(__assign({}, prev), { email: e.target.value })); }); }, className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent", placeholder: "Enter your email address", required: true })] })] }))] }), _jsxs("div", { children: [_jsx("h3", __assign({ className: "text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide" }, { children: "Order Summary" })), _jsxs("div", __assign({ className: "bg-gray-50 p-4 rounded-xl space-y-3" }, { children: [_jsxs("div", __assign({ className: "flex justify-between text-sm" }, { children: [_jsx("span", { children: "Total Items:" }), _jsx("span", __assign({ className: "font-semibold" }, { children: getSelectedItemsCount() }))] })), _jsxs("div", __assign({ className: "border-t border-b border-gray-200 py-3 space-y-2" }, { children: [Object.entries(selectedItems)
                                                                .filter(function (_a) {
                                                                var compositeKey = _a[0];
                                                                return compositeKey.includes('anandamela');
                                                            })
                                                                .some(function (_a) {
                                                                var _ = _a[0], itemDetails = _a[1];
                                                                return itemDetails.quantity > 0;
                                                            }) && (_jsxs("div", __assign({ className: "bg-orange-50 p-3 rounded-lg mb-2 border border-orange-100" }, { children: [_jsx("div", __assign({ className: "font-medium text-sm text-orange-800 mb-1" }, { children: "Anandamela Attendance" })), _jsxs("div", __assign({ className: "text-xs text-orange-700 flex justify-between" }, { children: [_jsx("span", { children: "Expected Attendees:" }), _jsx("span", __assign({ className: "font-medium" }, { children: Object.entries(selectedItems)
                                                                                    .filter(function (_a) {
                                                                                    var compositeKey = _a[0];
                                                                                    return compositeKey.includes('anandamela');
                                                                                })
                                                                                    .reduce(function (sum, _a) {
                                                                                    var _ = _a[0], itemDetails = _a[1];
                                                                                    return sum + itemDetails.quantity;
                                                                                }, 0) }))] })), Object.entries(selectedItems)
                                                                        .filter(function (_a) {
                                                                        var compositeKey = _a[0];
                                                                        return compositeKey.includes('anandamela');
                                                                    })
                                                                        .map(function (_a) {
                                                                        var compositeKey = _a[0], itemDetails = _a[1];
                                                                        if (itemDetails.quantity === 0)
                                                                            return null;
                                                                        // Extract age group from composite key
                                                                        var ageGroupKey = compositeKey.split('-')[2];
                                                                        var ageGroupInfo = AGE_GROUPS[ageGroupKey];
                                                                        return (_jsxs("div", __assign({ className: "text-xs text-orange-600 flex justify-between" }, { children: [_jsxs("span", { children: [ageGroupInfo.name, ":"] }), _jsx("span", { children: itemDetails.quantity })] }), compositeKey));
                                                                    }), _jsx("div", __assign({ className: "text-xs mt-2 text-orange-600 italic" }, { children: "Free registration - Pay for food at stalls" }))] }))), Object.entries(selectedItems)
                                                                .filter(function (_a) {
                                                                var compositeKey = _a[0];
                                                                return !compositeKey.includes('anandamela');
                                                            })
                                                                .map(function (_a) {
                                                                var _b;
                                                                var compositeKey = _a[0], itemDetails = _a[1];
                                                                if (itemDetails.quantity === 0)
                                                                    return null;
                                                                // Parse item details from composite key
                                                                var _c = compositeKey.split('-'), itemId = _c[0], ageGroupKey = _c[1];
                                                                var isVeg = itemId.includes('veg-');
                                                                var dayNumber = ((_b = itemId.match(/day(\d+)/)) === null || _b === void 0 ? void 0 : _b[1]) || '1';
                                                                var dayIndex = parseInt(dayNumber) - 1;
                                                                var itemType = isVeg && !itemId.includes('nonveg') ? 'vegItems' : 'nonVegItems';
                                                                var day = durgaPujaMeals2025[dayIndex];
                                                                var items = itemType === 'vegItems' ? day.vegItems : day.nonVegItems || [];
                                                                var item = items.find(function (i) { return i.id === itemId; });
                                                                if (!item)
                                                                    return null;
                                                                var ageGroupInfo = AGE_GROUPS[ageGroupKey];
                                                                var price = getPriceByDay(dayNumber, isVeg && !itemId.includes('nonveg'), ageGroupKey, customerInfo.isMember);
                                                                return (_jsxs("div", __assign({ className: "text-xs bg-white p-2 rounded" }, { children: [_jsxs("div", __assign({ className: "flex justify-between mb-1" }, { children: [_jsx("span", __assign({ className: "font-medium" }, { children: item.name })), _jsx("span", __assign({ className: "text-gray-600" }, { children: day.day }))] })), _jsxs("div", __assign({ className: "flex justify-between" }, { children: [_jsxs("span", __assign({ className: "text-gray-600" }, { children: [ageGroupInfo.name, " \u2022 ", itemDetails.quantity, " \u00D7 ", price > 0 ? "\u20AC".concat(price.toFixed(2)) : 'Free'] })), _jsx("span", __assign({ className: "font-medium" }, { children: price > 0 ? "\u20AC".concat((price * itemDetails.quantity).toFixed(2)) : 'Free' }))] }))] }), compositeKey));
                                                            })] })), _jsxs("div", __assign({ className: "flex justify-between text-sm" }, { children: [_jsx("span", { children: "Subtotal:" }), _jsxs("span", { children: ["\u20AC", totalAmount.toFixed(2)] })] })), customerInfo.isMember && (_jsxs("div", __assign({ className: "flex justify-between text-sm text-green-600" }, { children: [_jsx("span", { children: "Member Pricing:" }), _jsx("span", { children: "Applied" })] }))), _jsx("hr", { className: "my-2" }), _jsxs("div", __assign({ className: "flex justify-between text-lg font-bold" }, { children: [_jsx("span", { children: "Total:" }), _jsxs("span", __assign({ className: "text-orange-600" }, { children: ["\u20AC", totalAmount.toFixed(2)] }))] }))] })), _jsx("button", __assign({ onClick: handleProceedToPayment, disabled: !isFormValid, className: "w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg" }, { children: "Proceed to Payment" })), !isFormValid && (_jsx("p", __assign({ className: "text-xs text-gray-500 mt-3 text-center" }, { children: "Please select meals and fill in your information to continue" })))] })] }))] }))), _jsxs("div", __assign({ className: "max-w-4xl mx-auto bg-blue-50 rounded-xl p-4 mb-8 border border-blue-100" }, { children: [_jsx("h3", __assign({ className: "text-sm font-semibold text-blue-900 mb-2" }, { children: "Important Information" })), _jsxs("ul", __assign({ className: "space-y-1 text-xs text-blue-800" }, { children: [_jsx("li", { children: "\u2022 Meal reservations are required in advance for Days 1-3" }), _jsx("li", { children: "\u2022 Day 4 features Anandamela style food stalls - buy on spot" }), _jsx("li", { children: "\u2022 Children 0-8 years eat for free, 8-12 years at reduced price" }), _jsx("li", { children: "\u2022 You will receive a confirmation email after payment" }), _jsx("li", { children: "\u2022 For questions, contact us at admin@sanskriti-hamburg.de" })] }))] }))] })), _jsx(Footer, {})] })));
}
export default MealReservation2025;
