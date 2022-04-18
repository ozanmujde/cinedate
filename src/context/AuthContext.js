import createDataContext from "./createDataContext";
import { Auth } from "aws-amplify";
import axios from "axios";

const signIn =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await Auth.signIn(email, password);
      // const userMail = response.payload.email;
      const res = await axios.get(
        "https://wlobby-backend.herokuapp.com/get/users/"
      );
      res.data.Items.map((item) => {
        // console.log("item", item);
        // console.log("email", email);
        if (item.Email === email) {
          dispatch({ type: "signin", payload: item.UserID });
        }
      });
      // dispatch({ type: "signin", payload: "response" });
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
      return { ...state, isSignedIn: true, userID: action.payload };
    case "signout":
      return { ...state, isSignedIn: false };
    case "signup":
      console.log("signup");
      return { ...state, isSignedIn: false, isSignUp: true };
    default:
      return state;
  }
};

const signUp = (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await Auth.signUp({
        username: email,
        password: password,
        attributes: { email: email },
      });
      dispatch({ type: "signup", payload: response });
    } catch (err) {
        const res = await axios.get(
            "https://wlobby-backend.herokuapp.com/get/users/"
        );
        res.data.Items.map((item) => {
            // console.log("item", item);
            // console.log("email", email);
            if (item.Email === email) {
                console.log(item.UserID);
                axios.post('https://wlobby-backend.herokuapp.com/delete/user/?UserID=' + item.UserID)
                    .then((response) => {
                    });
            }
        });

      alert(err);

      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

const signout = (dispatch) => async () => {
      try {
          const response = await Auth.signOut();
          dispatch({type: "signout", payload: {}});

      }catch (err){
          alert(err);
          dispatch({
              type: "add_error",
              payload: "Something went wrong with sign up",
          });
      }

  };


export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signout, signUp },
  {
    isSignedIn: false,
    isSignUp: false,
    errorMessage: "",
    userID: 0,
  }
);
