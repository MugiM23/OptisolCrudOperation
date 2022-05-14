import { isBlank } from './validationClasses'


export const newUserValidation = (userObj) => {
    let validationObj = { isValid: true, fieldName: '' }
    let phoneFieldName = userObj.phoneNumber.length <= 3 ? 'phoneColumn1' : userObj.phoneNumber.length <= 6 ? "phoneColumn2" : 'phoneColumn3'
    if (isBlank(userObj.firstName)) {
        validationObj = { isValid: false, fieldName: 'firstName' }
    }
    else if (isBlank(userObj.lastName)) {
        validationObj = { isValid: false, fieldName: 'lastName' }
    }
    else if (isBlank(userObj.email)) {
        validationObj = { isValid: false, fieldName: 'email' }
    }
    else if (isBlank(userObj.phoneNumber)) {
        validationObj = { isValid: false, fieldName: phoneFieldName }
    }
    else if (isBlank(userObj.address1)) {
        validationObj = { isValid: false, fieldName: 'address1' }
    }
    else if (isBlank(userObj.address2)) {
        validationObj = { isValid: false, fieldName: 'address2' }
    }
    else if (isBlank(userObj.city)) {
        validationObj = { isValid: false, fieldName: 'city' }
    }
    else if (isBlank(userObj.state)) {
        validationObj = { isValid: false, fieldName: 'state' }
    }
    else if (isBlank(userObj.zipCode)) {
        validationObj = { isValid: false, fieldName: 'zipCode' }
    }
    else if (isBlank(userObj.country)) {
        validationObj = { isValid: false, fieldName: 'country' }
    }
    else if (isBlank(userObj.qualification)) {
        validationObj = { isValid: false, fieldName: 'qualification' }
    }
    else if (isBlank(userObj.comments)) {
        validationObj = { isValid: false, fieldName: 'comments' }
    }
    return validationObj
}