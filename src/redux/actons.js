
export const createAppFormAction = (id) =>{
    return({
        type: "CREATE_APP_FORM",
        id: id
    });
}

export const saveDateAction = (appNum, value) =>{
    return({
        type: "SAVE_DATE",
        appNum: appNum,
        value: value
    });
}

export const changeNameCompanyAction = (appNum, value) => {
    return({
        type: "CHANGE_NAME_COMPANY",
        appNum: appNum,
        value: value
    });
}

export const changeNameTransporterAction = (appNum, value) => {
    return({
        type: "CHANGE_NAME_TRANSPORTER",
        appNum: appNum,
        value: value
    });
}

export const changeNumberTransporterAction = (appNum, value) => {
    return({
        type: "CHANGE_NUMBER_TRANSPORTER",
        appNum: appNum,
        value: value
    });
}

export const changeCommentsAction = (appNum, value) => {
    return({
        type: "CHANGE_COMMENTS",
        appNum: appNum,
        value: value
    });
}

export const changeAtiCodeAction = (appNum, value) => {
    return({
        type: "CHANGE_ATI_CODE",
        appNum: appNum,
        value: value
    });
}

export const removeAppFormAction = (appNum) =>{
    return({
        type: "REMOVE_APP_FORM",
        appNum: appNum
    });
}

export const setCurrentStoreAction = (store) =>{
    return ({
        type: "SET_CURRENT_STORE",
        store: store
    });
}