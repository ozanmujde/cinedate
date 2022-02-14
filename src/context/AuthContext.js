import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      if (
        action.payload.email === "admin" &&
        action.payload.password === "123"
      ) {
        return { ...state, isSignedIn: true };
      }
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return () => {};
  //   return async ({ email, password }) => {
  //     try {
  //       const response = await trackerApi.post("/signup", { email, password });
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err.response.data);
  //       dispatch({
  //         type: "add_error",
  //         payload: "xxxxx",
  //       });
  //     }
  //   };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    dispatch({ type: "signin", payload: { email, password } });
    // console.log('asd');
  };
};

const signout = (dispatch) => {
  return () => {
    // somehow sign out!!!
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { isSignedIn: false, errorMessage: "" }
);
