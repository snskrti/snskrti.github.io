import { upcomingEvents } from '../types/events';
export var getEventByLink = function (link) {
    return upcomingEvents.find(function (event) { return event.link === link; });
};
export var getEventDate = function (link) {
    var event = getEventByLink(link);
    return event ? event.date : '';
};
export var getEventTitle = function (link) {
    var event = getEventByLink(link);
    return event ? event.title : '';
};
export var getEventDescription = function (link) {
    var event = getEventByLink(link);
    return event ? event.description : '';
};
