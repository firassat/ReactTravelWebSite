import React from "react";
// import { FaPhotoVideo } from "react-icons/fa";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../Firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Register = () => {
  //   const [err, setErrr] = useState(false);
  //   const navigate = useNavigate();

  //   const handelSubmit = async (e) => {
  //     //لمنع تحديث الصفحة عند الارسال
  //     e.preventDefault();
  //     const displayName = e.target[0].value;
  //     const email = e.target[1].value;
  //     const password = e.target[2].value;
  //     const Photo = e.target[3].files[0];

  //     try {
  //       const res = await createUserWithEmailAndPassword(auth, email, password);

  //       const storageRef = ref(storage, displayName);
  //       const uploadTask = uploadBytesResumable(storageRef, Photo);

  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log("Upload is " + progress + "% done");
  //           switch (snapshot.state) {
  //             case "paused":
  //               console.log("Upload is paused");
  //               break;
  //             case "running":
  //               console.log("Upload is running");
  //               break;
  //             default:
  //               console.log("Upload is running");
  //               break;
  //           }
  //         },
  //         (error) => {
  //           setErrr(true);
  //         },
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //             await updateProfile(res.user, {
  //               displayName,
  //               photoURL: downloadURL,
  //             });
  //             await setDoc(doc(db, "users", res.user.uid), {
  //               uid: res.user.uid,
  //               displayName,
  //               email,
  //               photoURL: downloadURL,
  //             });
  //             await setDoc(doc(db, "userChats", res.user.uid), {});
  //             navigate("/");
  //           });
  //         }
  //       );
  //     } catch (err) {
  //       setErrr(true);
  //     }
  //   };

  return (
    <div className="mainWrap">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">
            <img src={Logo} alt="" />
          </span>
          <span className="title">Join to unlock the best of Travel</span>
          <form
          //</div>onSubmit={handelSubmit}
          >
            <div className="nameRegister">
              <div className="left">
                <label form="Fname">First name</label>
                <input type="text" placeholder="First name" id="Fname" />
              </div>
              <div className="right">
                <label form="Lname">Last name</label>
                <input type="text" placeholder="Last name" id="Lname" />
              </div>
            </div>

            <label form="email">Email address</label>
            <input type="email" placeholder="Email" id="email" />
            <label form="password">Password</label>
            <input type="password" placeholder="Password" id="password" />
            <button>Join</button>
            {/* {err && <span>Error somwthing</span>} */}
          </form>
          <p>
            Already a member?
            {/* You don't have an account? <Link to={"/register"}>Register</Link> */}
          </p>
          <p>
            <Link to={"/login"}>Sign in</Link> using your Tripadvisor account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
