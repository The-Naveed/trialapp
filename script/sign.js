import {
    db,
    getAuth,
    createUserWithEmailAndPassword,
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    collection,
    addDoc
} from "./firebase.js"

var wholeBody = document.getElementById("body")

const sign = async () => {

    // Clear any existing local storage
    localStorage.clear();

    // Get input elements by ID
    let mail = document.getElementById("mail");
    let firstName = document.getElementById("first");
    let lastName = document.getElementById("last");
    let pass = document.getElementById("pass");
    let picture = document.getElementById("load");

    // Get error elements by ID
    let error1 = document.getElementById("error1");
    let error2 = document.getElementById("error2");
    let error3 = document.getElementById("error3");
    let error4 = document.getElementById("error4");

    // Input validation
    if (!mail.value) {
        error1.style.display = "block";
        return;
    }
    error1.style.display = "none";

    if (!firstName.value) {
        error2.style.display = "block";
        return;
    }
    error2.style.display = "none";

    if (!lastName.value) {
        error3.style.display = "block";
        return;
    }
    error3.style.display = "none";

    if (!pass.value) {
        error4.style.display = "block";
        return;
    }
    if (pass.value.length <= 7) {
        error4.innerHTML = "Password Must Be 8 Characters";
        return;
    }
    error4.style.display = "none";

    if (!picture.files.length) {
        alert("Please upload your profile picture");
        return;
    }

    // Store user details locally
    localStorage.setItem("First Name", firstName.value);
    localStorage.setItem("Last Name", lastName.value);
    localStorage.setItem("Email", mail.value);

    wholeBody.innerHTML =
        `    
    <div class="container wholeBody" align="center">
        <br>
        <br>
        <img height="50px" width="50px" src="https://i.gifer.com/ZKZg.gif">
        <br>
        <br>
        <h5>Uploading your blog please wait...</h5>
    </div>
    `

    const uploadPicture = async () => {
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, mail.value, pass.value);
            const user = userCredential.user;

            localStorage.setItem("User ID", user.uid);

            const id = localStorage.getItem("User ID");
            const storage = getStorage();
            const storageRef = ref(storage, id);
            const uploadTask = uploadBytesResumable(storageRef, picture.files[0]);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done')
                        wholeBody.innerHTML =
                            `    
                    <div class="container wholeBody" align="center">
                        <br>
                        <br>
                        <img height="50px" width="50px" src="https://i.gifer.com/ZKZg.gif">
                        <br>
                        <br>
                        <h5>${'Upload is ' + progress + '% done'}</h5>
                    </div>
                    `
                            ;
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log
                                    ('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.error('Upload failed:', error);
                        reject(error); // In case of an error, reject the promise
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log('File available at ' + downloadURL);
                            localStorage.setItem('URL', downloadURL);
                            // alert('Congratulations! Your profile is created')
                            wholeBody.innerHTML =
                                `    
                        <div class="container wholeBody" align="center">
                            <br>
                            <br>
                            <img height="50px" width="50px" src="https://i.gifer.com/ZKZg.gif">
                            <br>
                            <br>
                            <h5>${'Congratulations! Your profile is created'}</h5>
                        </div>
                        `
                                ;
                            resolve(); // On success, resolve the promise
                        } catch (error) {
                            console.error('Failed to get download URL:', error);
                            reject(error);
                        }
                    }
                );
            });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorCode}, ${errorMessage}`);
            window.location.reload();
        }
    };

    const uploadText = async () => {
        try {
            const docRef = await addDoc(collection(db, localStorage.getItem('User ID')), {
                firstName: localStorage.getItem('First Name'),
                lastName: localStorage.getItem('Last Name'),
                Email: localStorage.getItem('Email'),
                Picture: localStorage.getItem('URL'),
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    try {
        await uploadPicture();  // Ensure picture upload finishes before proceeding
        await uploadText();     // Then upload text
        window.location.replace("../index.html");  // Redirect after success
    } catch (error) {
        console.log("Error:", error.message);
    }
};


const log = _ => {
    window.location.replace("../index.html")
};

const goo = _ => {
    alert("Unavailable")
};

const mic = _ => {
    alert("Unavailable")
};

window.sign = sign
window.log = log
window.mic = mic
window.goo = goo