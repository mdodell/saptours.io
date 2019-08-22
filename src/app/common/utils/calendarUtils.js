import {openNotification} from "./openNotification";
import { createEvents }from 'ics';
import moment from "moment";

export const numberOfToursInMonth = (tours, guideId) => {
    let count = 0;
    tours.forEach(tour => {
        if(tour.assignedGuideIds.includes(guideId)){
            count++;
        }
    });
    return count;
};

export const downloadToursToGoogleCalendar = (tours, auth) => {
    let userTours = tours.filter(tour => tour.assignedGuideIds.includes(auth.uid));
    if(userTours.length === 0) {
        openNotification('error', 'bottomRight', 'Error', 'You have not been assigned any tours for this month!', 3)
    } else {
        userTours.forEach(tour => {
            const date = new Date(tour.date.seconds * 1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const startTime = date.toISOString().replace(/-|:|\.\d\d\d/g,"");
            let finishTime = new Date(moment(tour.date.seconds * 1000).add(75, 'minutes')).toISOString().replace(/-|:|\.\d\d\d/g,"");
            let tourString = 'https://www.google.com/calendar/render?action=TEMPLATE';
            tourString += `&text=${hours % 12 === 0 ? '12' : hours % 12}:${ minutes < 10 ? minutes + '0' : minutes} ${hours < 12 ? 'am' : 'pm'} - ${tour.eventType}`;
            tourString += `&dates=${startTime}/${finishTime}`;
            tourString += `&details=${buildCalendarDescription(tour, '<br>')}&location=415 South St, Waltham, MA 02453&sf=true&output=xml`;
            window.open(tourString);
        })
    }
};

const buildCalendarDescription = (tour, newLine) => {
    let tourDescription = `${tour.description !== '' ? tour.description + newLine + newLine : ''}`;
    tourDescription += `Please show up 15 minutes before the tour starts! The ${tour.assignedGuides.length === 1 ? 'guide' : 'guides'} giving this tour will be: ` + newLine;
    tour.assignedGuides.forEach(guide => {
        tourDescription += `${guide.user.fullName}, ${guide.user.email}${guide.user.phoneNumber ? `, ${guide.user.phoneNumber}` : ''}${newLine}`
    });
    return tourDescription;
};

export const downloadToursToICal = (tours, auth) => {
    let userTours = tours.filter(tour => tour.assignedGuideIds.includes(auth.uid));
    if (userTours.length === 0) {
        openNotification('error', 'bottomRight', 'Error', 'You have not been assigned any tours for this month!', 3)

    } else {
        let alarms = [];
        let events = [];
        alarms.push({
            action: 'audio',
            trigger: {hours: 24, minutes: 0, before: true},
            repeat: 2,
            attachType: 'VALUE=URI',
            attach: 'Glass'
        });
        alarms.push({
            action: 'audio',
            trigger: {hours: 1, minutes: 0, before: true},
            repeat: 2,
            attachType: 'VALUE=URI',
            attach: 'Glass'
        });

        userTours.forEach(tour => {
                let date = new Date(tour.date.seconds * 1000);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                events.push({
                    start: [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()], // make it start 10 minutes before the tour
                    duration: {hours: 1, minutes: 25},
                    title: `${hours % 12 === 0 ? '12' : hours % 12}:${ minutes < 10 ? minutes + '0' : minutes} ${hours < 12 ? 'am' : 'pm'} - ${tour.eventType}`,
                    description: buildCalendarDescription(tour, '\n'),
                    location: 'Shapiro Admissions Center, Brandeis University',
                    url: 'https://saptours-a24d1.firebaseapp.com', // TODO: Change this url when the application is officially deployed
                    status: 'CONFIRMED',
                    organizer: {name: 'Brandeis Undergraduate Admissions', email: 'brandeissap@gmail.com'},
                    alarms: alarms,
                    attendees: [{
                        name: auth.displayName,
                        email: auth.email
                    }],
                    geo: {lat: 42.365843, lon: -71.260153}
                });
            }
        );
        const {error, value} = createEvents(events);
        if (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        } else {
            window.open("data:text/calendar;charset=utf8," + encodeURI(value));
        }
    }
};