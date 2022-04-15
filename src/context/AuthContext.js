import createDataContext from "./createDataContext";
import {Auth} from "aws-amplify"




const signIn = (dispatch) => async ({ email, password }) => {

  try {
    console.log(email);
    const response = await Auth.signIn(email,password);
    console.log(response);
    dispatch({ type: "signin", payload: response });
  } catch (err) {
    alert(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};



const authReducer = (state, action) => {

  switch (action.type) {
    case "signin":
        return { ...state, isSignedIn: true };
    case "signout":
      return { ...state, isSignedIn: false };
      // }
    case "signup":
      return { ...state, isSignedIn: false,isSignUp:true };
    default:
      return state;
  }
};


const signUp = (dispatch) => async ({ email, password,username }) => {
  console.log("emaill signn uppp ",email,password,username);
  try {
    const response = await Auth.signUp(
        {
          username:email,
          password:password,
          attributes:{email:email},
        });

    console.log(response);
    dispatch({ type: "signup", payload: response });
  } catch (err) {
    alert(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};


const signout = (dispatch) => {
  return () => {
    dispatch({ type: "signout", payload: {} });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signout, signUp },
  { isSignedIn: false,isSignUp:false, errorMessage: "" }
);
