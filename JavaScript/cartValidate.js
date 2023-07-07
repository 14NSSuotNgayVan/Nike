const nameRegex = '^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$';
const emailRegex = '^[a-zA-Z0-9%+-\.\_]+@[a-zA-Z0-9\.\_]+\.[a-zA-Z]{2,}$';
const phoneRegex = '(84|03|05|07|08|09)+([0-9]{8})\\b';

function validateFirstName() {
    const firstName = document.querySelector('#first-name');
    firstName.pattern = nameRegex;
    firstName.required = true;
    const validityState = firstName.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng điền!';
    } else
        if (validityState.patternMismatch) {
            message = 'Họ không được chứa số hoặc kí tự đặc biệt!';
        }
    firstName.setCustomValidity(message);
}

function validateLastName() {
    const lastName = document.querySelector('#last-name');
    lastName.pattern = nameRegex;
    lastName.required = true;
    const validityState = lastName.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng điền!';
    } else
        if (validityState.patternMismatch) {
            message = 'Họ không được chứa số hoặc kí tự đặc biệt!';
        }
    lastName.setCustomValidity(message);
}

function validateEmail() {
    const email = document.querySelector('#email');
    email.pattern = emailRegex;
    email.required = true;
    const validityState = email.validity;

    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng điền!'
    } else
        if (validityState.patternMismatch) {
            message = `Email phải có dạng {tên email}@{tên miền}!`;
        }
    email.setCustomValidity(message);

}

function validatePhoneNumber() {
    const phoneNumber = document.querySelector('#phone-number');
    phoneNumber.pattern = phoneRegex;
    phoneNumber.required = true;
    phoneNumber.minLength = 10;
    phoneNumber.maxLength = 10;
    const validityState = phoneNumber.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng điền!'
    } else
        if (validityState.tooShort) {
            message = 'Số điện thoại phải bao gồm 10 chữ số';
        } else
            if (validityState.patternMismatch) {
                message = 'Số điện thoại không hợp lệ! Phải là số và bắt đầu bằng (84|03|05|07|08|09)'
            }
    phoneNumber.setCustomValidity(message);

}

function validateProvince() {
    const provinceSelectBox = document.querySelector('#provinces');
    provinceSelectBox.pattern = phoneRegex;
    provinceSelectBox.required = true;
    const validityState = provinceSelectBox.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng chọn tỉnh/ thành phố!'
    }
    provinceSelectBox.setCustomValidity(message);

}

function validateDistrict() {
    const districtSelectBox = document.querySelector('#districts');
    districtSelectBox.pattern = phoneRegex;
    districtSelectBox.required = true;
    const validityState = districtSelectBox.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng chọn huyện/ quận!'
    }
    districtSelectBox.setCustomValidity(message);

}

function validateWard() {
    const wardSelectBox = document.querySelector('#wards');
    wardSelectBox.pattern = phoneRegex;
    wardSelectBox.required = true;
    const validityState = wardSelectBox.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng chọn phường/ xã!'
    }
    wardSelectBox.setCustomValidity(message);

}

function validateHomeAddress() {
    const homeAddress = document.querySelector('#home-address');
    homeAddress.required = true;
    const validityState = homeAddress.validity;
    let message = '';

    if (validityState.valueMissing) {
        message = 'Vui lòng điền!'
    }
    homeAddress.setCustomValidity(message);

}

function validateForm() {

    validateFirstName()
    validateLastName()
    validateEmail()
    validatePhoneNumber()
    validateProvince()
    validateDistrict()
    validateWard()
    validateHomeAddress()
    return document.forms[0].checkValidity()
}


