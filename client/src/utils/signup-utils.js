function validateUserId(userId) {
    return (containsLowerCase(userId) || containsUppercase(userId)) && 
        withinVarchar255(userId);
}

function validateUsername(username) {
    return ((containsUppercase(username) ||
        containsLowerCase(username)) && 
        !containsSpecialCharacter(username) &&
        withinVarchar255(username));
}

function validatePassword(password) {
    return (containsLowerCase(password) &&
        containsUppercase(password) &&
        containsSpecialCharacter(password) &&
        containsNumber(password) &&
        withinVarchar255(password));
}

function containsLowerCase(string) {
    return /[a-z]/.test(string);
}

function containsUppercase(string) {
    return /[A-Z]/.test(string);
}

function containsNumber(string) {
    return /[1-9]/.test(string);
}

function containsSpecialCharacter(string) {
    return /[!@#$%^&*()_+\-=\[\]{}|;:'",.<>\/?]/.test(string);
}

function withinVarchar255(string) {
    return string.length <= 255 && string.length > 2;
}

export { validateUserId, validateUsername, validatePassword }
