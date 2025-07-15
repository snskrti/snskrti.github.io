import { events } from '../types/events';

export const getEventByLink = (link: string) => {
  return events.find(event => event.link === link);
};

export const getEventDate = (link: string): string => {
  const event = getEventByLink(link);
  return event ? event.date : '';
};

export const getEventTitle = (link: string): string => {
  const event = getEventByLink(link);
  return event ? event.title : '';
};

export const getEventDescription = (link: string): string => {
  const event = getEventByLink(link);
  return event ? event.description : '';
};
