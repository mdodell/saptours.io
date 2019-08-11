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
    TOUR_SHIFTS, TRANSFER_STUDENT
} from "../../common/constants";

export const updateUserProfileInfo = (userForm) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            await firebase.updateProfile({
                fullName: userForm.fullName,
            });
            await firestore.update({collection: 'users', doc: user}, {
                    fullName: userForm.fullName,
                    highSchool: userForm.highSchool,
                    phoneNumber: userForm.phoneNumber,
                    dietaryRestrictions: userForm.dietaryRestrictions,
                    birthday: firebase.firestore.Timestamp.fromDate(userForm.birthday.toDate()),
                    city: userForm.city,
                    tourAvailability: {
                        minTours: Number(userForm.minTours),
                        maxTours: Number(userForm.maxTours),
                        activeStatus: userForm.activeStatus === 'Yes' ? true : false,
                        flexibility: userForm.flexibility === 'Yes' ? true : false
                    },
                    "roles.tourGuide": userForm.roles.includes(TOUR_GUIDE),
                    "roles.host": userForm.roles.includes(HOST),
                    "roles.chatter": userForm.roles.includes(CHATTER)
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
                fellowships_scholarships: academicForm.fellowships_scholarships,
                decisionType: {
                    ED1: academicForm.decisionType.includes(ED1),
                    ED2: academicForm.decisionType.includes(ED2),
                    regularDecision: academicForm.decisionType.includes(REGULAR_DECISION),
                    midyear: academicForm.decisionType.includes(MIDYEAR),
                    POSSE: academicForm.decisionType.includes(POSSE),
                    MKTYP: academicForm.decisionType.includes(MKTYP),
                    international: academicForm.decisionType.includes(INTERNATIONAL_STUDENT),
                    legacy: academicForm.decisionType.includes(LEGACY_STUDENT),
                    transferStudent: academicForm.decisionType.includes(TRANSFER_STUDENT)
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
        try {
            updateTourShiftAvailability(availability, 'monday', firestore, user);
            updateTourShiftAvailability(availability, 'tuesday', firestore, user);
            updateTourShiftAvailability(availability, 'wednesday', firestore, user);
            updateTourShiftAvailability(availability, 'thursday', firestore, user);
            updateTourShiftAvailability(availability, 'friday', firestore, user);
            openNotification('success', 'bottomRight', 'Success', 'Availability was updated!', 3)
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

