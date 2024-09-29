localStorage.clear()

import {

    getAuth,
    signInWithEmailAndPassword,

} from "./firebase.js"

const log = _ => {

    let mail = document.getElementById("mail")
    let pass = document.getElementById("pass")
    let error1 = document.getElementById("error1")
    let error2 = document.getElementById("error2")

    if (!mail.value) {
        error1.style.display = "block"
        return
    }

    if (mail.value) {
        error1.style.display = "none"
    }

    if (!pass.value) {
        error2.style.display = "block"
        return
    }

    if (pass.value.length <= 7) {
        error2.innerHTML = "Password Must Be 8 Characters"
        return
    }

    if (pass.value) {
        error2.style.display = "none"
    }

    localStorage.setItem("Email", mail.value)
    localStorage.setItem("Password", pass.value)
    
    const exauth = _ => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, mail.value, pass.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                localStorage.setItem('User ID', user.uid)
                window.location.replace("../pages/feed.html")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)

                if (errorMessage) {
                    alert("Incorrect email or password click forgot password to change or create new account by sign-up")
                    window.location.reload()
                }
            });
    };

    exauth()
};

const sign = _ => {
    window.location.replace("../pages/sign.html")
};

const forgot = _ => {
    alert("Unavailable")
};

const app = _ => {
    alert("Unavailable")
};

const mic = _ => {
    alert("Unavailable")
};

window.sign = sign
window.log = log
window.forgot = forgot
window.mic = mic
window.app = app