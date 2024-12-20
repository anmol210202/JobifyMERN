import { Form, redirect, Link } from "react-router-dom";
import { FormRow, Logo, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

// form but from router-dom compatible with ACTION
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful");
    return redirect("/login"); // redirecting to login page
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // console.log(error);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name"  />
        <FormRow
          type="text"
          name="lastName"
          labelText="last Name"
          
        />
        <FormRow type="text" name="location"  />
        <FormRow type="email" name="email"  />
        <FormRow type="password" name="password"  />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
