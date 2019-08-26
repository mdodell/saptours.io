const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.userProfileUpdated = functions.firestore.document('/users/{userId}').onUpdate(doc => {
    let userDataBefore = doc.before.data();
    let userDataAfter = doc.after.data();
    const userId = doc.before.id;
    try {
        // If the user changed their active status from true to false, delete them from the tour availability
        if (userDataBefore.tourAvailability.activeStatus && !userDataAfter.tourAvailability.activeStatus) {
            admin.firestore().collection('tourAvailability')
                .where('guideIds', 'array-contains', doc.before.id)
                .get()
                .then(result => {
                    result.docs.forEach(tour => {
                        admin.firestore().collection('tourAvailability').doc(tour.id).update({
                            guideIds: admin.firestore.FieldValue.arrayRemove(userId),
                            guides: tour.data().guides.filter(guide => guide.id !== userId)
                        })
                    })
                });
        }

        // If the user changes their min/max tours or flexibility
        if(
            userDataBefore.tourAvailability.flexibility !== userDataAfter.tourAvailability.flexibility
            || userDataBefore.fullName !== userDataAfter.fullName
            || userDataBefore.phoneNumber !== userDataAfter.phoneNumber
            || userDataBefore.tourAvailability.minTours !== userDataAfter.tourAvailability.minTours
            || userDataBefore.tourAvailability.maxTours !== userDataAfter.tourAvailability.maxTours
        ) {
            admin.firestore().collection('tourAvailability')
                .where('guideIds', 'array-contains', doc.before.id)
                .get()
                .then(result => {
                    result.docs.forEach(tour => {
                        admin.firestore().collection('tourAvailability').doc(tour.id).update({
                            guides: tour.data().guides.map(guide => guide.id !== userId ? guide : {
                                id: userId,
                                user: {
                                    email: userDataAfter.email,
                                    fullName: userDataAfter.fullName,
                                    phoneNumber: userDataAfter.phoneNumber,
                                    tourAvailability: {
                                        minTours: userDataAfter.tourAvailability.minTours,
                                        maxTours: userDataAfter.tourAvailability.maxTours,
                                        flexibility: userDataAfter.tourAvailability.flexibility,
                                        activeStatus: userDataAfter.tourAvailability.activeStatus
                                    }
                                }
                            })
                        })
                    })
                });
        }
        return userDataAfter;
    } catch(error){
        console.log('An error occurred in userProfileUpdated! The error was ' + error);
    }
});

exports.userProfileDeleted = functions.firestore.document('/users/{userId}').onDelete(doc => {
    try {
        return admin.auth().deleteUser(doc.id);
    } catch(error) {
        console.log('An error occured in userProfileDeleted! The error was ' + error);
    }
});


// TODO: On user update, if the fullName, phoneNumber, or email changed, update the guide availability.