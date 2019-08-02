import { openNotification } from "../../common/utils/openNotification";
import { TOUR_GUIDE, HOST, CHATTER, ADMISSIONS_STAFF } from "../../common/constants";

export const registerUser = (user) => { //curly braces are implied
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            let createdUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.passwordOne);
            await createdUser.user.updateProfile({
                displayName: user.firstName
            });
            let newUser = {
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                createdAt: firestore.FieldValue.serverTimestamp(), //we can set new fields in here, such as their user roles
                roles: {
                    tourGuide: user.role.includes(TOUR_GUIDE),
                    host: user.role.includes(HOST),
                    chatter: user.role.includes(CHATTER),
                    admissionsStaff: user.role.includes(ADMISSIONS_STAFF)
                }
            };
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const login = (creds) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};
