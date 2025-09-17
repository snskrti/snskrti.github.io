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
export var SectionNavigation = function (_a) {
    var activeSection = _a.activeSection, sections = _a.sections;
    return (_jsx("div", __assign({ className: "fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700/50 backdrop-blur-md rounded-full p-4 flex space-x-4 z-50" }, { children: sections.map(function (section) { return (_jsx("a", __assign({ href: "#".concat(section.id), className: "p-2 rounded-full text-white transition-opacity duration-300 ".concat(activeSection === section.id ? 'opacity-100' : 'opacity-50') }, { children: section.icon }), section.id)); }) })));
};
