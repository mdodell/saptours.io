import { openNotification } from "../../common/utils/openNotification";
import { TOUR_GUIDE, HOST, CHATTER } from "../../common/constants";

export const registerUser = (user) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            let createdUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.passwordOne);
            await createdUser.user.updateProfile({
                displayName: user.firstName + ' ' + user.lastName
            });
            let newUser = {
                fullName: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phoneNumber: '',
                roles: {
                    tourGuide: user.role.includes(TOUR_GUIDE),
                    host: user.role.includes(HOST),
                    chatter: user.role.includes(CHATTER),
                    admin: false
                },
                tourStatistics: {
                    droppedTours: 0,
                    claimedTours: 0,
                    noShows: 0,
                    totalTours: 0
                },
                tourAvailability: {
                    minTours: 0,
                    maxTours: 2,
                    activeStatus: true,
                    flexibility: true
                },
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

export const forgotPassword = (email) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    openNotification('success', 'bottomRight', 'Success', 'You should be receiving a password reset email soon!', 3)
                })
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const updatePassword = (updatePasswordForm) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            updatePasswordForm.oldPassword
        );
        try {
            await firebase.auth().currentUser.reauthenticateWithCredential(credential)
                .then(() => {
                    user.updatePassword(updatePasswordForm.newPassword).then(() => {
                        openNotification('success', 'bottomRight', 'Success', 'Your password has been updated!', 3)
                    });
                })
        } catch (error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    };
};

export const promoteToAdmin = (userToPromote, profile) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            if (profile.roles.admin) {
                firestore.update({collection: 'users', doc: userToPromote.id}, {
                    "roles.admin": true
                }).then(() => {
                    openNotification('success', 'bottomRight', 'Success', `${userToPromote.fullName} was promoted to admin!`, 3);
                })
            }
        } catch(error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);

        }
    }
}

export const deleteUser = (userToDelete, profile) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        try {
                if(profile.roles.admin || userToDelete.id === userId) {
                    firestore.get({collection: 'tours', where: ['assignedGuideIds', 'array-contains', userToDelete.id]}).then(result => result.docs.forEach(document =>
                        firestore.update({collection: 'tours', doc: document.id}, {
                            assignedGuides: document.data().assignedGuides.filter(guide => guide.id !== userId),
                            assignedGuideIds: firestore.FieldValue.arrayRemove(userId)
                        })
                    )).then(() => {
                        firestore.get({collection: 'tourAvailability', where: ['guideIds', 'array-contains', userToDelete.id]}).then(result => result.docs.forEach(document =>
                            firestore.update({collection: 'tourAvailability', doc: document.id}, {
                                guides: document.data().guides.filter(guide => guide.id !== userId),
                                guideIds: firestore.FieldValue.arrayRemove(userId)
                            })
                        )).then(() => {
                            firestore.delete({collection: 'users', doc: userToDelete.id}).then(() => {
                                if(userToDelete.id === userId) {
                                    firebase.auth().signOut();
                                } else {
                                    openNotification('success', 'bottomRight', 'Success', `${userToDelete.fullName} was deleted!`, 3);
                                }
                            })
                        });
                    });
                }

        //        TODO: Remove guide from tour availability and any future tours
        } catch(error) {
            openNotification('error', 'bottomRight', 'Error', error.message, 3);
        }
    }
};
