import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.config";

const uploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage, `rad-quiz/${fileName}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => resolve(url))
      .catch((err) => reject(err));
  });
};

export default uploadImage;
