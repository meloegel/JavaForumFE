import * as yup from "yup";

const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, "Please enter a valid username")
    .required("Please enter a valid username"),
  password: yup
    .string()
    .trim()
    .min(3, "Please enter your password")
    .required("Please enter your password"),
  email: yup.string().email("Must be a valid email address"),
}).required();

export default registrationSchema;
