import firebase from "firebase";

export default class FlaqService {
  setupFlagsListener(context) {
    const flagsUnscubscribe = firebase
      .firestore()
      .collection("flags")
      .doc("flags")
      .onSnapshot(
        doc => {
          const flags = doc.data();
          context.dispatch("onFlagsChanged", { flags, error: null });
        },
        error => {
          context.dispatch("onFlagsChanged", { flags: null, error });
        }
      );
    context.dispatch("addUnsubscribe", flagsUnscubscribe);
  }
}
