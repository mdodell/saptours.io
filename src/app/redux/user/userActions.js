import {openNotification} from "../../common/utils/openNotification";
import {
    CHATTER,
    ED1,
    ED2,
    HOST,
    INTERNATIONAL_STUDENT, LEGACY_STUDENT,
    MIDYEAR,
    MKTYP,
    POSSE,
    REGULAR_DECISION,
    TOUR_GUIDE,
    TOUR_SHIFTS
} from "../../common/constants";

export const updateProfile = (user) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.updateProfile(user); //updates our profile in firestore, it is running against the firebase instance rather than the firebase user. Has nothing to do with firebase auth area.
            await firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(userCredential => {
                userCredential.user.updateProfile({
                    displayName: user.displayName,
                    // We can update photo url here too later
                });
                userCredential.user.updateEmail(user.email);
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateUserProfileInfo = (userForm) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            await firebase.updateProfile({
                fullName: `${userForm.firstName} ${userForm.lastName}`,
            });
            await firestore.update({collection: 'users', doc: user}, {
                    phoneNumber: userForm.phoneNumber,
                    birthday: firebase.firestore.Timestamp.fromDate(userForm.birthday.toDate()),
                    city: userForm.city,
                    tourAvailability: {
                        minTours: Number(userForm.minTours),
                        maxTours: Number(userForm.maxTours),
                        activeStatus: userForm.activeStatus === 'Yes' ? true : false
                    },
                    roles: {
                        tourGuide: userForm.roles.includes(TOUR_GUIDE),
                        host: userForm.roles.includes(HOST),
                        chatter: userForm.roles.includes(CHATTER),
                    }
                }).then(() =>  openNotification('success', 'bottomRight', 'Success!', "You have updated your profile!", 3))
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const updateUserProfileAcademics = (academicForm) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            await firestore.update({collection: 'users', doc: user}, {
                majors: academicForm.majors,
                minors: academicForm.minors,
                graduationYear: academicForm.graduationYear,
                decisionType: {
                    ED1: academicForm.decisionType.includes(ED1),
                    ED2: academicForm.decisionType.includes(ED2),
                    regularDecision: academicForm.decisionType.includes(REGULAR_DECISION),
                    midyear: academicForm.decisionType.includes(MIDYEAR),
                    POSSE: academicForm.decisionType.includes(POSSE),
                    MKTYP: academicForm.decisionType.includes(MKTYP),
                    international: academicForm.decisionType.includes(INTERNATIONAL_STUDENT),
                    legacy: academicForm.decisionType.includes(LEGACY_STUDENT)
                },
                graduationPlans: academicForm.postGraduationPlans
            }).then(() =>  openNotification('success', 'bottomRight', 'Success!', "You have updated your profile!", 3))
        } catch(error){
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const updateUserProfileExtracurriculars = (extracurricularForm) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            await firestore.update({collection: 'users', doc: user}, {
               clubs: extracurricularForm.clubs,
               jobs: extracurricularForm.jobs,
               internships: extracurricularForm.internships,
               research: extracurricularForm.research
            }).then(() => openNotification('success', 'bottomRight', 'Success!', "You have updated your profile!", 3))
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

const deleteTourAvailability = (firestore, day, time, user) => {
    firestore.get({
        collection: 'tourAvailability',
        where: [['day', '==',  day.charAt(0).toUpperCase() + day.slice(1)], ['hour', '==', time.value]]
    })
        .then(result => result.docs.forEach(document =>
            firestore.update({collection: 'tourAvailability', doc: document.id}, {
                guides: firestore.FieldValue.arrayRemove(user)
            })
        ))
        .catch(error => openNotification('error', 'bottomRight', 'Error', error.message, 3));
};

const createTourAvailability = (firestore, day, time, user) => {
    firestore.get({
        collection: 'tourAvailability',
        where: [['day', '==',  day.charAt(0).toUpperCase() + day.slice(1)], ['hour', '==', time.value]]
    })
        .then(result => result.docs.forEach(document =>
            firestore.update({collection: 'tourAvailability', doc: document.id}, {
                guides: firestore.FieldValue.arrayUnion(user)
            })
        ))
        .catch(error => openNotification('error', 'bottomRight', 'Error', error.message, 3));
};

const updateTourShiftAvailability = (availability, day, firestore, user) => {
    TOUR_SHIFTS.forEach(time => {
        if(availability[day]) {
            if (availability[day].some(tour => tour === time.value)) {
                createTourAvailability(firestore, day, time, user);
            } else {
                deleteTourAvailability(firestore, day, time, user);
            }
        } else {
            deleteTourAvailability(firestore, day, time, user);
        }
    });
};

export const updateUserProfileAvailability = (availability) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        console.log('running');
        try {
            updateTourShiftAvailability(availability, 'monday', firestore, user);
            updateTourShiftAvailability(availability, 'tuesday', firestore, user);
            updateTourShiftAvailability(availability, 'wednesday', firestore, user);
            updateTourShiftAvailability(availability, 'thursday', firestore, user);
            updateTourShiftAvailability(availability, 'friday', firestore, user);
            openNotification('success', 'bottomRight', 'Error', 'Availability was updated!', 3)
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

