
// // // import { createUserWithEmailAndPassword } from "firebase/auth";
// // // import { auth } from "../../config/firebaseConfig";
// // // import { useNavigate } from "react-router";
// // // import { toast } from "react-toastify";
// // // import { CryptoState } from "../../CryptoContext"; // Import CryptoState
// // // import {
// // //   Container,
// // //   Paper,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // //   Box,
// // //   Link,
// // // } from "@mui/material";

// // // function Signup() {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const { setUser } = CryptoState(); // Use context to set user
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const result = await createUserWithEmailAndPassword(auth, email, password);
// // //       setUser(result.user); // Update user in context
// // //       console.log("User signed up successfully");

// // //       navigate("/");
// // //       toast.success("User registered successfully", { position: "top-center" });
// // //     } catch (error) {
// // //       console.error(error.message);
// // //       toast.error(error.message, { position: "bottom-center" });
// // //     }
// // //   };

// // //   return (
// // //     <Container maxWidth="sm">
// // //       <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
// // //         <Typography variant="h4" component="h1" gutterBottom align="center">
// // //           Sign Up
// // //         </Typography>
// // //         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
// // //           <TextField
// // //             margin="normal"
// // //             required
// // //             fullWidth
// // //             label="Email Address"
// // //             type="email"
// // //             value={email}
// // //             onChange={(e) => setEmail(e.target.value)}
// // //           />
// // //           <TextField
// // //             margin="normal"
// // //             required
// // //             fullWidth
// // //             label="Password"
// // //             type="password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //           />
// // //           <Button
// // //             type="submit"
// // //             fullWidth
// // //             variant="contained"
// // //             sx={{
// // //               mt: 3,
// // //               mb: 2,
// // //               backgroundColor: "#FFC107",
// // //               "&:hover": { backgroundColor: "#FFA000" },
// // //             }}
// // //           >
// // //             Sign Up
// // //           </Button>
// // //           <Box sx={{ textAlign: "center", mb: 2 }}>
// // //             <Typography variant="body2">
// // //               Already have an account?{" "}
// // //               <Link href="/login" underline="hover">
// // //                 Login
// // //               </Link>
// // //             </Typography>
// // //           </Box>
// // //         </Box>
// // //       </Paper>
// // //     </Container>
// // //   );
// // // }

// // // export default Signup;

// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../config/firebaseConfig";
// import { setDoc, doc } from "firebase/firestore";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Link,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import SignInwithGoogle from "./SigninWithGoogle";
// import { toast } from "react-toastify";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         firstName: fname,
//         lastName: lname,
//         photo: user.photoURL || "",
//         createdAt: new Date(),
//       });
      
//       navigate("/");
//       toast.success("User Registered Successfully!!", { position: "top-center" });
//     } catch (error) {
//       toast.error(error.message, { position: "bottom-center" });
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
//       <Paper
//         elevation={6}
//         sx={{
//           padding: 4,
//           borderRadius: 3,
//           backgroundColor: "#1E1E1E",
//           color: "white",
//           width: "100%",
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
//           <TextField
//             label="First Name"
//             variant="outlined"
//             fullWidth
//             value={fname}
//             onChange={(e) => setFname(e.target.value)}
//             required
//             InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
//             InputLabelProps={{ style: { color: "#bbb" } }}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Last Name"
//             variant="outlined"
//             fullWidth
//             value={lname}
//             onChange={(e) => setLname(e.target.value)}
//             InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
//             InputLabelProps={{ style: { color: "#bbb" } }}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Email Address"
//             type="email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
//             InputLabelProps={{ style: { color: "#bbb" } }}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
//             InputLabelProps={{ style: { color: "#bbb" } }}
//             sx={{ mb: 3 }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               backgroundColor: "#FFC107",
//               "&:hover": { backgroundColor: "#FFA000" },
//               color: "black",
//               mb: 2,
//             }}
//           >
//             Sign Up
//           </Button>
//           <SignInwithGoogle />
//           <Typography textAlign="center" variant="body2" mt={2}>
//             Already registered?{' '}
//             <Link to="/login" sx={{ color: "#FFC107" }}>Login</Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignInwithGoogle from "./SigninWithGoogle";
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: user.photoURL || "",
        createdAt: new Date(),
      });
      
      navigate("/");
      toast.success("User Registered Successfully!!", { position: "top-center" });
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#1E1E1E",
          color: "white",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 5 } }}
            InputLabelProps={{ style: { color: "#bbb" } }}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FFC107",
              "&:hover": { backgroundColor: "#FFA000" },
              color: "black",
              mb: 2,
            }}
          >
            Sign Up
          </Button>
          <SignInwithGoogle />
          <Box sx={{ textAlign: "center", mb: 2 }}>
                     <Typography variant="body2">
                     Already user?{" "}
                       <span 
               style={{ color: "#FFC107", cursor: "pointer", textDecoration: "underline" }} 
               onClick={() => navigate("/login")}
             >
           Login Now
             </span>
                     </Typography>
                   </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;

