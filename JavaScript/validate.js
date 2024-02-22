let userName;
let displayname;
let email;
let phoneNumber;
let provinceSelectBox;
let districtSelectBox;
let wardSelectBox;
let homeAddress;
let password;
let rePassword;

let userNameErr;
let displaynameErr;
let lastNameErr;
let emailErr;
let phoneNumberErr;
let provinceSelectBoxErr;
let districtSelectBoxErr;
let wardSelectBoxErr;
let homeAddressErr;
let passwordErr;
let rePasswordErr;

const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
const emailRegex = /^[a-zA-Z0-9%+-._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /(84|03|05|07|08|09)+([0-9]{8})\b/;
const passwordRegex = /^(?!.*\s)[\S]{6,12}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

const resetSelect = () => {
    userName = document.querySelector("#user-name");
    displayname = document.querySelector("#display-name");
    email = document.querySelector("#email");
    phoneNumber = document.querySelector("#phone-number");
    provinceSelectBox = document.querySelector("#provinces");
    districtSelectBox = document.querySelector("#districts");
    wardSelectBox = document.querySelector("#wards");
    homeAddress = document.querySelector("#home-address");
    password = document.querySelector("#password");
    rePassword = document.querySelector("#rePassword");

    userNameErr = document.querySelector(".user-name-err");
    displaynameErr = document.querySelector(".display-name-err");
    lastNameErr = document.querySelector(".last-name-err");
    emailErr = document.querySelector(".email-err");
    phoneNumberErr = document.querySelector(".phone-number-err");
    provinceSelectBoxErr = document.querySelector(".provinces-err");
    districtSelectBoxErr = document.querySelector(".districts-err");
    wardSelectBoxErr = document.querySelector(".wards-err");
    homeAddressErr = document.querySelector(".home-address-err");
    passwordErr = document.querySelector(".password-err");
    rePasswordErr = document.querySelector(".rePassword-err");
}
resetSelect();
function validateDisplayName() {
    let message = "";
    let check = false;
    if (!displayname.value.trim()) {
        message = "Please enter!";
    } else if (!nameRegex.test(displayname.value.trim())) {
        message = "Name do not have special character!";
    } else check = true;

    displaynameErr.innerHTML = message;
    return check;
}
function validateUserName() {
    let message = "";
    let check = false;
    if (!userName.value.trim()) {
        message = "Please enter!";
    } else if (!usernameRegex.test(userName.value.trim())) {
        message = "Name do not have special character!";
    } else check = true;

    userNameErr.innerHTML = message;
    return check;
}

function validateEmail() {
    let message = "";
    let check = false;
    if (!email.value.trim()) {
        message = "Please enter!";
    } else if (!emailRegex.test(email.value.trim())) {
        message = `Email must type of {anh123}@{gmail.com}!`;
    } else check = true;

    emailErr.innerHTML = message;
    return check;
}

function validatePhoneNumber() {
    phoneNumber.minLength = 10;
    phoneNumber.maxLength = 10;
    let message = "";
    let check = false;
    if (!phoneNumber.value.trim()) {
        message = "Please enter!";
    } else if (!phoneNumber.value.trim().length === 0) {
        message = "Phone number must have 10 characters";
    } else if (!phoneRegex.test(phoneNumber.value.trim())) {
        message = "In valid phone number!";
    } else check = true;

    phoneNumberErr.innerHTML = message;
    return check;
}

function validateProvince() {
    console.log("fff");
    let message = "";
    let check = false;
    if (!provinceSelectBox.value.trim()) {
        console.log(!provinceSelectBox.value.trim());
        message = "Please choose provinces!";
    } else check = true;

    provinceSelectBoxErr.innerHTML = message;
    return check;
}

function validateDistrict() {
    let message = "";
    let check = false;
    if (!districtSelectBox.value.trim()) {
        message = "Please choose district!";
    } else check = true;

    districtSelectBoxErr.innerHTML = message;
    return check;
}

function validateWard() {
    let message = "";
    let check = false;
    if (!wardSelectBox.value.trim()) {
        message = "Please choose ward!";
    } else check = true;

    wardSelectBoxErr.innerHTML = message;
    return check;
}

function validateHomeAddress() {
    let message = "";
    let check = false;
    if (!homeAddress.value.trim()) {
        message = "Please enter!";
    } else check = true;
    homeAddressErr.innerHTML = message;
    return check;
}
function validatePassword() {
    let message = "";
    let check = false;
    if (!password.value.trim()) {
        message = "Please enter!";
    } else{
        if (!passwordRegex.test(password.value.trim())) {
            message = "Mật khẩu không được chứa khoảng trắng và có độ dài 6-12 kí tự!";
        }else check = true;
    }
    passwordErr.innerHTML = message;
    return check;
}
function validateRePassword() {
    let message = "";
    let check = false;
    if (!rePassword.value.trim()) {
        message = "Please enter!";
    } else
        if (password.value.trim() !== rePassword.value.trim()) {
            message = "Mật khẩu nhập lại không trùng khớp!"
        }else check = true;
    rePasswordErr.innerHTML = message;
    return check;
}


const cartAddEventListener = () => {
    displayname.addEventListener("change", validateDisplayName);
    email.addEventListener("change", validateEmail);
    phoneNumber.addEventListener("change", validatePhoneNumber);
    provinceSelectBox.addEventListener("change", validateProvince);
    districtSelectBox.addEventListener("change", validateDistrict);
    wardSelectBox.addEventListener("change", validateWard);
    homeAddress.addEventListener("change", validateHomeAddress);
}
const cartRemoveEventListener = () => {
    displayname.removeEventListener("change", validateDisplayName);
    email.removeEventListener("change", validateEmail);
    phoneNumber.removeEventListener("change", validatePhoneNumber);
    provinceSelectBox.removeEventListener("change", validateProvince);
    districtSelectBox.removeEventListener("change", validateDistrict);
    wardSelectBox.removeEventListener("change", validateWard);
    homeAddress.removeEventListener("change", validateHomeAddress);

}
const contactAddEventListener = () => {
    displayname.addEventListener("change", validateDisplayName);
    email.addEventListener("change", validateEmail);
    phoneNumber.addEventListener("change", validatePhoneNumber);
}
const contactRemoveEventListener = () => {
    displayname.removeEventListener("change", validateDisplayName);
    email.removeEventListener("change", validateEmail);
    phoneNumber.removeEventListener("change", validatePhoneNumber);
    provinceSelectBox.removeEventListener("change", validateProvince);

}
const registerAddEventListener = () => {
    userName.addEventListener("change", validateUserName);
    displayname.addEventListener("change", validateDisplayName);
    email.addEventListener("change", validateEmail);
    phoneNumber.addEventListener("change", validatePhoneNumber);
    provinceSelectBox.addEventListener("change", validateProvince);
    districtSelectBox.addEventListener("change", validateDistrict);
    wardSelectBox.addEventListener("change", validateWard);
    homeAddress.addEventListener("change", validateHomeAddress);
    password.addEventListener("change", validatePassword);
    rePassword.addEventListener("change", validateRePassword);
}
const registerRemoveEventListener = () => {
    userName.removeEventListener("change", validateUserName);
    displayname.removeEventListener("change", validateDisplayName);
    email.removeEventListener("change", validateEmail);
    phoneNumber.removeEventListener("change", validatePhoneNumber);
    provinceSelectBox.removeEventListener("change", validateProvince);
    districtSelectBox.removeEventListener("change", validateDistrict);
    wardSelectBox.removeEventListener("change", validateWard);
    homeAddress.removeEventListener("change", validateHomeAddress);
    password.removeEventListener("change", validatePassword);
    rePassword.removeEventListener("change", validateRePassword);
}
const rePasswordAddEventListener = () => {
    password.addEventListener("change", validatePassword);
    rePassword.addEventListener("change", validateRePassword);
}
const rePasswordRemoveEventListener = () => {
    password.removeEventListener("change", validatePassword);
    rePassword.removeEventListener("change", validateRePassword);
}

function cartValidateForm() {
    if (
        validateDisplayName() &&
        validateEmail() &&
        validatePhoneNumber() &&
        validateProvince() &&
        validateDistrict() &&
        validateWard() &&
        validateHomeAddress()
    ) {
        return true;
    } else return false;
}
function rePasswordValidateForm() {
    if (
        validatePassword() &&
        validateRePassword()
    ) {
        return true;
    } else return false;
}
function registerValidateForm() {
    if (
        validateUserName() &&
        validateDisplayName() &&
        validateEmail() &&
        validatePhoneNumber() &&
        validateProvince() &&
        validateDistrict() &&
        validateWard() &&
        validateHomeAddress() &&
        validatePassword() &&
        validateRePassword()
    ) {
        return true;
    } else return false;
}
function contactValidateForm() {
    if (
        validateDisplayName() &&
        validateEmail() &&
        validatePhoneNumber()
    ) {
        return true;
    } else return false;
}
