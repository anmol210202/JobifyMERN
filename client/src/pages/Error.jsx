import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFound from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if(error.status === 404){
    return(
      <Wrapper>
        <div>
          <img src={notFound} alt={"not found"} />
          <h3>Oops! Page Not Found</h3>
          <p>Sorry, we can't find the page you're looking for</p>
          <Link to={"/dashboard"}>Back Home</Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="">
        <h3>Oops! An error occurred</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
