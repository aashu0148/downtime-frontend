const initialState = {
  auth: false,
  id: "",
  name: "",
  email: "",
  preloading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADED": {
      const myState = { ...state };
      myState.preloading = false;
      return myState;
    }

    case "LOGIN": {
      const myState = { ...state };
      myState.auth = true;
      myState.name = action.name;
      myState.id = action.id;
      myState.email = action.email;
      return myState;
    }
    case "LOGOUT": {
      const myState = { ...state };
      myState.auth = false;
      myState.name = "";
      myState.id = "";
      myState.email = "";
      localStorage.removeItem("downtime");
      return myState;
    }

    default:
      return state;
  }
};

export default reducer;
