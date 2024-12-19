import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }

  try {
    // console.log(verifyJWT(token));
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "675ef651fd942e6bfd8ee60e";   // mongo id
    req.user = { userId, role , testUser};
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermission = (...roles) => {
  return (req,res,next)=>{                                               // returning because invoked this function while passing middleware in userRotes
    if(!roles.includes(req.user.role)) {
      throw new UnauthenticatedError("Unauthorized to access this route");
    }
    next();
  }
}
// test user
export const checkForTestUser = (req,res,next) =>{
  if(req.user.testUser){
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
}
