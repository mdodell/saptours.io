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

export const updateUserProfileImage = (file) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const currentUser = firebase.auth().currentUser;
        const storageRef = firebase.storage().ref(currentUser.displayName + '/profilePicture/' + file.file.name);
        try {
            await storageRef.put(file.file.originFileObj).then(() => {
                storageRef.getDownloadURL().then(url => {
                    firebase.updateProfile({
                        photoURL: url
                    }).then(() => {
                        openNotification('success', 'bottomRight', 'Success', 'You have updated your profile picture!', 3);
                    })
                });
            })
        } catch(error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    }
};

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
                    state: userForm.state,
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

const deleteTourAvailability = (firestore, day, time, user, userId) => {
    firestore.get({
        collection: 'tourAvailability',
        where: [['day', '==',  day.charAt(0).toUpperCase() + day.slice(1)], ['hour', '==', time.value]]
    })
        .then(result => result.docs.forEach(document =>
            firestore.update({collection: 'tourAvailability', doc: document.id}, {
                guides: document.data().guides.filter(guide => guide.id !== userId),
                guideIds: firestore.FieldValue.arrayRemove(userId)
            })
        ))
        .catch(error => {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        });
};

const createTourAvailability = (firestore, day, time, user, userId) => {
    firestore.get({
        collection: 'tourAvailability',
        where: [['day', '==',  day.charAt(0).toUpperCase() + day.slice(1)], ['hour', '==', time.value]]
    })
        .then(result => result.docs.forEach(document =>
            firestore.update({collection: 'tourAvailability', doc: document.id}, {
                guides: firestore.FieldValue.arrayUnion({
                    user: {
                        fullName: user.fullName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        tourAvailability: user.tourAvailability
                    },
                    id: userId
                }),
                guideIds: firestore.FieldValue.arrayUnion(userId)
            })
        ))
        .catch(error => {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        });
};

const updateTourShiftAvailability = (availability, day, firestore, user, userId) => {
    TOUR_SHIFTS.forEach(time => {
        if(availability[day]) {
            if (availability[day].some(tour => tour === time.value)) {
                createTourAvailability(firestore, day, time, user, userId);
            } else {
                deleteTourAvailability(firestore, day, time, user, userId);
            }
        } else {
            deleteTourAvailability(firestore, day, time, user, userId);
        }
    });
};

export const updateUserProfileAvailability = (availability) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser.uid;
        try {
            firestore.get({collection: 'users', doc: user}).then(result => {
                updateTourShiftAvailability(availability, 'monday', firestore, result.data(), user);
                updateTourShiftAvailability(availability, 'tuesday', firestore, result.data(), user);
                updateTourShiftAvailability(availability, 'wednesday', firestore, result.data(), user);
                updateTourShiftAvailability(availability, 'thursday', firestore, result.data(), user);
                updateTourShiftAvailability(availability, 'friday', firestore, result.data(), user);
                openNotification('success', 'bottomRight', 'Success', 'Availability was updated!', 3)
            });
        } catch(error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

