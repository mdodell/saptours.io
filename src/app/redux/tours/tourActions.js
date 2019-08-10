import {openNotification} from "../../common/utils/openNotification";
import {
    DAYS,
} from "../../common/constants";

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
                    let date = tourForm.date.set({
                        'hour': tourForm.time.hour(),
                        'minute': tourForm.time.minute(),
                        'second': tourForm.time.second()
                    });
                    if(i !== 0 ){
                        date.add(7, 'days')
                    }
                    firestore.add('tours', {
                        eventType: tourForm.eventType,
                        numberOfGuidesRequested: tourForm.numberOfGuides,
                        date: firebase.firestore.Timestamp.fromDate(date.toDate()),
                        description: tourForm.description,
                        availableGuides: !availability.empty ? availability.docs[0].data().guides : [],
                        assignedGuides: []
                    });
                }
            });
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
                }).then(result => console.log(result.data().fullName));
            });
            console.log(guides);
            return guides;
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const dropSelfFromTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            await firestore.update({collection: 'tours', doc: tour.id}, {
                assignedGuides: firestore.FieldValue.arrayRemove(user)
            });
            await firestore.update({collection: 'users', doc: user}, {
                "tourStatistics.droppedTours": firebase.firestore.FieldValue.increment(1)
            });
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const addSelfToTour = (tour) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            await firestore.update({collection: 'tours', doc: tour.id}, {
                assignedGuides: firestore.FieldValue.arrayUnion(user)
            });
            await firestore.update({collection: 'users', doc: user}, {
                "tourStatistics.claimedTours": firebase.firestore.FieldValue.increment(1),
                "tourStatistics.totalTours": firebase.firestore.FieldValue.increment(1)
            });
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};