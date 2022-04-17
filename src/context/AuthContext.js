import createDataContext from "./createDataContext";
import {Auth} from "aws-amplify"




const signIn = (dispatch) => async ({ email, password }) => {

  try {
    const response = await Auth.signIn(email,password);
    dispatch({ type: "signin", payload: response });
  } catch (err) {
    alert(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};


const confirmEmail = (dispatch) => async ({ email, code }) => {
  try {

    const response = await Auth.confirmSignUp(email,code);


    console.log("confirm response" , response);
    alert("You have successfully registered!");
    dispatch({ type: "confirmemail", payload: response });
  } catch (err) {
    console.log(err);
    alert("Can not confirm email, please check the code");
    dispatch({
      type: "add_error",
      payload: "Something went wrong with confirm",
    });
  }
};



const authReducer = (state, action) => {

  switch (action.type) {
    case "signin":
        return { ...state, isSignedIn: true };
    case "signout":
      return { ...state, isSignedIn: false };
    case "signup":
      return { ...state, isSignedIn: false,isSignUp:true };
    case "confirmemail":
      return { ...state, isSignedIn: false,isSignUp:true,isConfirmed:true };
    default:
      return state;
  }
};


const signUp = (dispatch) => async ({ email, password,username }) => {

  try {
    const response = await Auth.signUp(
        {
          username:email,
          password:password,
          attributes:{email:email},
        });


    dispatch({ type: "signup", payload: response });
  } catch (err) {
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
  { signIn, signout, signUp,confirmEmail},
  { isSignedIn: false,isSignUp:false,isConfirmed:false, errorMessage: "" }
);
