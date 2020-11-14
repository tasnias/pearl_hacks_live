import fetchData from "./sheets_to_json";
import firebase from "firebase";

// TODO: REFACTOR THIS BITCH
export default class AuthService {
  getAllSponsors() {
    return fetchData("1biudrolhcYpl1ldsUFrGwR38bS3UaBWApW-ui1x1Gvc", "1");
  }

  sendSignInEmailLink(email, actionCodeSettings) {
    return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
  }

  async createUser(user) {
    // create user in firestore if they don't exist
    let document = await firebase
      .firestore()
      .collection("users")
      .doc(user.email)
      .get();

    if (document && document.exists) {
      alert("Error: Trying to create a user who already exists.");
    } else {
      // set their info in firestore
      let createdUser = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        organization: user.organization,
        isJudge: false
      };
      await document.ref.set(
        {
          ...createdUser
        },
        { merge: true }
      );

      return createdUser;
    }
  }

  isSignInWithEmailLink(url) {
    return firebase.auth().isSignInWithEmailLink(url);
  }

  signUserOut() {
    return firebase.auth().signOut();
  }

  firebaseAuthStateChanged() {
    return firebase.auth().onAuthStateChanged;
  }

  signInWithEmailLink(email, url) {
    return firebase.auth().signInWithEmailLink(email, url);
  }

  async getUserInFirestore(email) {
    let user_doc = await firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get();
    if (user_doc && user_doc.exists) {
      return user_doc.data();
    } else return null;
  }
}
