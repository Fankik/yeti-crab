let initialState = [];

if(JSON.parse(localStorage.getItem('saveStore')) !== null){
  initialState = JSON.parse(localStorage.getItem('saveStore'));
}


export const storeReducer = (state = initialState, action) => {

    switch (action.type) {
        case "CREATE_APP_FORM":
            state.push({ id: action.id, date: "", nameCompany: "", nameTransporter: "", numberTransporter: "", comments: "", ati: "" });
            return [...state];

        case "SAVE_DATE":
            state[action.appNum].date = action.value;
            return [...state];

        case "CHANGE_NAME_COMPANY":
            state[action.appNum].nameCompany = action.value;
            return [...state];

        case "CHANGE_NAME_TRANSPORTER":
            state[action.appNum].nameTransporter = action.value;
            return [...state];

        case "CHANGE_NUMBER_TRANSPORTER":
            state[action.appNum].numberTransporter = action.value;
            return [...state];

        case "CHANGE_COMMENTS":
            state[action.appNum].comments = action.value;
            return [...state];

        case "CHANGE_ATI_CODE":
            state[action.appNum].ati = action.value;
            return [...state];

        case "REMOVE_APP_FORM":
            state.splice(action.appNum, 1)
            return [...state];

        case "SET_CURRENT_STORE":
            return [...action.store];

        default:
    }

    return [...state];
}