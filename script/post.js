const now = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
console.log(formattedDate);


import {
    db,
    collection,
    addDoc,
    getStorage,
    getDocs,
    ref,
    uploadBytesResumable,
    getDownloadURL

} from "./firebase.js"

const uName = document.getElementById("name")
const prof = document.getElementById("img")
uName.innerHTML = localStorage.getItem("Name")
prof.src = localStorage.getItem("Profile")

const post = async _ => {

    const blogTitle = document.getElementById("title");
    const blogDescription = document.getElementById("exampleFormControlTextarea1");
    const blogPicture = document.getElementById("pic");
    const error1 = document.getElementById("error1");
    const error2 = document.getElementById("error2");
    const wholeBody = document.getElementById("body")

    if (blogTitle.value.length <= 10) {
        error1.style.display = "block";
        return;
    } else {
        error1.style.display = "none";
    }

    if (blogDescription.value.length <= 20) {
        error2.style.display = "block";
        return;
    } else {
        error2.style.display = "none";
    }

    if (!blogPicture.files.length) {
        alert("Please upload a blog image");
        return;
    }

    wholeBody.innerHTML = `    <div class="container wholeBody" align="center">
        <br>
        <br>
        <img height="50px" width="50px" src="https://i.gifer.com/ZKZg.gif">
        <br>
        <br>
        <h5>Uploading your blog please wait...</h5>
    </div>`

    // Make postImage return a Promise that resolves when the image upload is complete
    const postImage = () => {
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            const storageRef = ref(storage, blogPicture.files[0].name);
            const uploadTask = uploadBytesResumable(storageRef, blogPicture.files[0]);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                    reject(error); // Reject the promise on error
                },
                () => {
                    // On successful upload, get the download URL and resolve the promise
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        localStorage.setItem("Blog Image", downloadURL);
                        resolve(); // Resolve the promise once the image is uploaded
                    });
                }
            );
        });
    };

    // postText function
    const postText = async () => {
        const docRef = await addDoc(collection(db, "Blogs"), {
            post:
                `
            <div class="col">
                <div class="card" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">
                            <div class="info1">
                                <img style="border-radius:50%;" height="70px" id="postImg"
                                    src="${localStorage.getItem("Profile")}"
                                    alt="Profile picture">
                            </div>
                            <div class="info2">
                                <span>${localStorage.getItem("Name")}</span><br><span>Posted on ${formattedDate}</span>
                            </div>
                        </h5>
                        <hr>
                        <h3>${blogTitle.value}</h3>
                        <p class="card-text">${blogDescription.value}</p>
                        <img src="${localStorage.getItem("Blog Image")}" class="card-img-top" alt="...">
                    </div>
                </div>
            </div><br>

            `
        });
        console.log("Document written with ID: ", docRef.id);
        console.log("Document written with ID: " + docRef.id);
    };

    // First post the image, then post the text
    try {
        await postImage(); // Wait for the image upload to complete
        await postText(); // Once image upload is done, post the text
        await window.location.replace("./feed.html")
    } catch (error) {
        console.error("Error posting image or text: ", error);
    }
};

const home = _ => {
    window.location.replace("./feed.html")
}

window.post = post
window.close = close
window.home = home