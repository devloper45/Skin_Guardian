export default function validation(values) {
    let errors = {};
  
    // Username validation
    
    if (!values.username.trim()) {
      errors.username = "Username is required";
    }
  
    // Email validation
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
  
    // Password validation
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must include at least one uppercase letter";
    } else if (!/[!@#$%^&*]/.test(values.password)) {
      errors.password = "Password must include at least one special character";
    }
  
    return errors;
  }
  
// export default function validation (handler){
//     const error = {}

//     const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordpattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

//     if(handler.name === ""){
//         error.name = "Name is required"
//     }

//     if(handler.password === ""){
//         error.password = "password is required"
//     }else if(!passwordpattern.test(handler.password)){
//         error.password = "min length 8 character one special one upppercase latter "
//     }

//     if(handler.email === ""){
//         error.email = "email is required"
//     }else if(!emailpattern.test(handler.email)){
//         error.email = "email did not match"
//     }

//     if(handler.reaptpassword !==  handler.password){
//         error.reaptpassword = "password not match"
//     }

//     return error
//  }