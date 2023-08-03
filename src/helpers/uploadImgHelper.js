const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const moment = require("moment");

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
multer({ storage: multer.memoryStorage() });

const uploadImgHelper = async (file) => {
    const dateTime = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");

    const storageRef = ref(storage, `files/${file.originalname + " - " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL
};

module.exports = uploadImgHelper;
