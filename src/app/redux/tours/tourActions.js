import {openNotification} from "../../common/utils/openNotification";
import {
    DAYS, MONTHS,
} from "../../common/constants";
import moment from "moment";
import isEqual from 'lodash/isEqual';

export const createTour = (tourForm) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            firestore.get({
                collection: 'tourAvailability',
                where: [['day', '==',  DAYS[tourForm.date.day()]], ['hour', '==', tourForm.time.hour()]]
            }).then(availability => {
                for(let i = 0; i <= tourForm.repeatFor; i++ ){
                    const date = moment((tourForm.date.clone()).set({
                        h: tourForm.time.hour(),
                        m: tourForm.time.minute(),
                        s: tourForm.time.second()
                    }));
                    date.add(7 * i , 'days')
                    firestore.add('tours', {
                        eventType: tourForm.eventType,
                        numberOfGuidesRequested: tourForm.numberOfGuides,
                        date: firebase.firestore.Timestamp.fromDate(date.toDate()),
                        description: tourForm.description,
                        availableGuides: !availability.empty ? availability.docs[0].data().guides : [],
                        assignedGuideIds: [],
                        assignedGuides: [],
                        published: false
                    });
                }
            });
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

const updateGuidesInTour = (tourForm, firestore, firebase, tour, date) => {
    let newGuides = [];
    if(date){
        if(tourForm.guides.length > 0) {
            tourForm.guides.forEach(guideId => {
                firestore.get({collection: 'users', doc: guideId}).then(result => {
                    let userData = result.data();
                    newGuides.push({
                        id: guideId,
                        user: {
                            fullName: userData.fullName,
                            email: userData.email,
                            phoneNumber: userData.phoneNumber,
                            tourAvailability: userData.tourAvailability
                        }
                    })
                }).then(() => {
                    firestore.update({collection: 'tours', doc: tour.id}, {
                        date: firebase.firestore.Timestamp.fromDate(date.toDate()),
                        assignedGuideIds: tourForm.guides || [],
                        eventType: tourForm.eventType,
                        numberOfGuidesRequested: tourForm.numberOfGuides,
                        description: tourForm.description,
                        assignedGuides: newGuides
                    })
                });
            });
        } else {
            firestore.update({collection: 'tours', doc: tour.id}, {
                date: firebase.firestore.Timestamp.fromDate(date.toDate()),
                assignedGuideIds: tourForm.guides || [],
                eventType: tourForm.eventType,
                numberOfGuidesRequested: tourForm.numberOfGuides,
                description: tourForm.description,
                assignedGuides: newGuides
            })
        }
    } else {
        if(tourForm.guides.length > 0) {
            tourForm.guides.forEach(guideId => {
                firestore.get({collection: 'users', doc: guideId}).then(result => {
                    let userData = result.data();
                    newGuides.push({
                        id: guideId,
                        user: {
                            fullName: userData.fullName,
                            email: userData.email,
                            phoneNumber: userData.phoneNumber,
                            tourAvailability: userData.tourAvailability
                        }
                    })
                }).then(() => {
                    firestore.update({collection: 'tours', doc: tour.id}, {
                        assignedGuideIds: tourForm.guides || [],
                        eventType: tourForm.eventType,
                        numberOfGuidesRequested: tourForm.numberOfGuides,
                        description: tourForm.description,
                        assignedGuides: newGuides
                    })
                });
            });
        } else {
            firestore.update({collection: 'tours', doc: tour.id}, {
                assignedGuideIds: tourForm.guides || [],
                eventType: tourForm.eventType,
                numberOfGuidesRequested: tourForm.numberOfGuides,
                description: tourForm.description,
                assignedGuides: newGuides
            })
        }
    }
};

export const updateTour = (tourForm, tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            // If the date didn't change
            if((new Date(tour.date.seconds * 1000).getUTCHours() === (tourForm.time.clone().utc()).hour()) && (new Date(tour.date.seconds * 1000).getUTCDate() === (tourForm.date.clone().utc()).date())){
                // If the date is the same, and the guides didn't change
                if(isEqual(tourForm.guides, tour.assignedGuideIds)){
                    firestore.update({collection: 'tours', doc: tour.id}, {
                        eventType: tourForm.eventType,
                        numberOfGuidesRequested: tourForm.numberOfGuides,
                        description: tourForm.description,
                        assignedGuideIds: tourForm.guides || [],
                    });
                } else {
                    updateGuidesInTour(tourForm, firestore, firebase, tour);
                }
            // The date or time changed, so we need to get new availability
            } else {
                firestore.get({
                    collection: 'tourAvailability',
                    where: [['day', '==',  DAYS[tourForm.date.day()]], ['hour', '==', (tourForm.time.hour())]]
                }).then(availability => {
                    let date = moment(tourForm.date.set({
                        h: tourForm.time.hour(),
                        m: tourForm.time.minute(),
                        s: tourForm.time.second()
                    }));
                    if(isEqual(tourForm.guides, tour.assignedGuideIds)) {
                        firestore.update({
                            collection: 'tours',
                            doc: tour.id
                        }, {
                            date: firebase.firestore.Timestamp.fromDate(date.toDate()),
                            eventType: tourForm.eventType,
                            numberOfGuidesRequested: tourForm.numberOfGuides,
                            description: tourForm.description,
                            availableGuides: !availability.empty ? availability.docs[0].data().guides : [],
                        });
                    } else {
                        updateGuidesInTour(tourForm, firestore, firebase, tour, date);
                    }
                })
            }
            openNotification('success', 'bottomRight', 'Success', `The tour on ${new Date(tour.date.seconds * 1000).toDateString()} was successfully updated.`, 3);
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const getAssignedTourGuides = (tour) => {
    let guides = [];
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            tour.assignedGuides.forEach(guideId => {
                firestore.get({
                    collection: 'users',
                    doc: guideId
                }).then(result => guides.push(result.data().fullName));
            });
            return guides;
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const publishTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            await firestore.update({collection: 'tours', doc: tour.id}, {
                published: true
            })
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const deleteTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        try {
            await firestore.delete({collection: 'tours', doc: tour.id});
            tour.assignedGuideIds.forEach(guideId =>
                firestore.update({
                    collection: 'users',
                    doc: guideId
                }, {
                    "tourStatistics.totalTours": firebase.firestore.FieldValue.increment(-1)
                })
            );
            openNotification('success', 'bottomRight', 'Success', `The tour on ${new Date(tour.date.seconds * 1000).toDateString()} was successfully deleted.`, 3);
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const unpublishTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            await firestore.update({collection: 'tours', doc: tour.id}, {
                published: false
            });
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const dropSelfFromTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const userId = firebase.auth().currentUser.uid;
        try {
            firestore.get({collection: 'tours', doc: tour.id}).then(result => {
                firestore.update({collection: 'tours', doc: tour.id}, {
                    assignedGuides: result.data().assignedGuides.filter(guide => guide.id !== userId),
                    assignedGuideIds: firestore.FieldValue.arrayRemove(userId)
                });
            });

            firestore.update({collection: 'users', doc: userId}, {
                "tourStatistics.droppedTours": firebase.firestore.FieldValue.increment(1),
                "tourStatistics.totalTours": firebase.firestore.FieldValue.increment(-1)
            });
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const publishAllToursInRange = (startDate, endDate) => {
    return async (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        try {
            firestore.get({collection: 'tours', where: [['date', '>=', startDate], ['date', '<=', endDate]]}).then((tours) => {
                tours.forEach(tour => {
                    firestore.update({collection: 'tours', doc: tour.id}, {
                        published: true
                    });
                });
                openNotification('success', 'bottomRight', 'Success', `All tours for ${MONTHS[startDate.getUTCMonth()]} have been published!`, 3);
            });
        } catch(error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    }
};

export const addSelfToTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const userId = firebase.auth().currentUser.uid;
        try {
            await firestore.get({collection: 'users', doc: userId}).then(result => {
                let user = result.data();
                firestore.update({collection: 'tours', doc: tour.id}, {
                    assignedGuides: firestore.FieldValue.arrayUnion({
                        user: {
                            fullName: user.fullName,
                            email: user.email,
                            phoneNumber: user.phoneNumber || '',
                            tourAvailability: user.tourAvailability
                        },
                        id: userId
                    }),
                    assignedGuideIds: firestore.FieldValue.arrayUnion(userId)
                });

                firestore.update({collection: 'users', doc: userId}, {
                    "tourStatistics.claimedTours": firebase.firestore.FieldValue.increment(1),
                    "tourStatistics.totalTours": firebase.firestore.FieldValue.increment(1)
                });
            });
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};