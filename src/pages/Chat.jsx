import {
  addDoc,
  collection,
  doc,
  getDoc,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import { auth, db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CiImageOn } from "react-icons/ci";

const Chat = () => {
  const [displayName, setDisplayName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      orderBy("createdAt", "asc"),
      limitToLast(20)
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt) {
          // check if the createdAt property exists
          messages.push({ ...data, id: doc.id });
        }
      });
      setMessages(messages);
      setIsLoading(false);
    });

    const userData = async () => {
      const userRef = doc(db, "users", auth.currentUser?.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setDisplayName(docSnap.data().displayName);
      }
    };

    auth.currentUser?.uid && userData();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser?.uid]);

  const uploadImage = async () => {
    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const image = await uploadImage();

    if (newMessage === "" && imageFile === null) {
      return;
    }

    await addDoc(messagesRef, {
      uid: auth.currentUser.uid,
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName || displayName || "Guest",
      image,
    });

    setNewMessage("");
    setImageFile(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="text-white">
      <Header />
      <div className="flex min-h-[85vh] flex-col justify-between">
        <div>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-20 mb-4 flex w-full justify-center md:mb-8"
        >
          <input
            type="text"
            placeholder="Say something nice"
            className="w-2/3 rounded-l bg-neutral-700 px-2 pb-10 pt-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-indigo-600 md:w-1/3 md:pb-14"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <label className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden"
            />
            <CiImageOn
              size="3rem"
              className="md: absolute top-2 right-4 cursor-pointer text-indigo-500 md:top-4"
            />
          </label>

          <button
            type="Submit"
            className="rounded-r bg-indigo-600 px-4 text-white duration-500 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-indigo-600 md:px-8 md:text-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
