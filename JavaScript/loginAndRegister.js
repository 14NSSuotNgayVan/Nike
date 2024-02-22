let USER_ID = "";
const loginButton = document.querySelector('.account .logout');
const resetLoginButtonLabel = () => {
    USER_ID = myFunction.getUserIdFromLocal()
    if (USER_ID) {
        loginButton.innerHTML = "Logout";
    } else {
        loginButton.innerHTML = "Login";
    }
}
const showRegisterModal = () => {
    removeLoginModal();
    var newElement = document.createElement('div');
    newElement.classList.add('register-modal-container');
    newElement.innerHTML = `
    <form class="register-form">
        <button button type = "button" class="btn-close-modal" onClick = "removeRegisterModal()" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button >
        <h3>Register</h3>
                <label for="user-name">User name</label>
                <input id="user-name" type="text" name="user-name" placeholder="User name">
                <span class="user-name-err text--red"></span>
                <label for="display-name">Display name</label>
                <input type="text" placeholder="display name" id="display-name">
                <span class="display-name-err text--red"></span>
        <label for="email">Email</label>
        <input id="email" type="text" name="Email" placeholder="Email">
        <span class="email-err text--red"></span>
        <label for="phone-number">Phone number</label>
        <input id ="phone-number" type="text" name="phone-number" placeholder="Phone number">
        <span class="phone-number-err text--red"></span>
        <label>Address</label>
        <div class="address">
            <div>
                <select name="provinces" onChange="handleRenderDistricts(this.value)" id="provinces">
                    <option value="">--Chọn tỉnh/ Thành phố--</option>
                </select>
                <span class="provinces-err text--red"></span>
            </div>
            <div>
                <select name="districts" onChange="handleRenderWards(this.value)" id="districts">
                    <option value="">--Chọn huyện/ Quận--</option>
                </select>
                <span class="districts-err text--red"></span>
            </div>
            <div>
                <select name="wards" id="wards">
                    <option value="">--Chọn phường/ Xã--</option>
                </select>
                <span class="wards-err text--red"></span>
            </div>
        </div>
        <input id="home-address" type="text" name ="home-address" placeholder="House number">
        <span class="home-address-err text--red"></span>
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password">
        <span class="password-err text--red"></span>

        <label for="password">RePassword</label>
        <input type="password" placeholder="RePassword" id="rePassword">
        <span class="rePassword-err text--red"></span>
        <p class="register-error"></p>
        <button type ="button" class="btn btn-register" onClick="handleRegister()">Register</button>
        <div class="login-footer">
            <p class="register-login" onClick="backToLogin()">Back to login</p>
        </div>
    </form>
    `;
    const body = document.querySelector("body");
    body.appendChild(newElement);
    handleRenderProvinces();
    resetSelect();
    registerAddEventListener();
}
const showLoginModal = () => {
    var newElement = document.createElement('div');
    newElement.classList.add('login-modal-container');
    newElement.innerHTML = `
    <form class="login-form">
        <button button type = "button" class="btn-close-modal" onClick = "removeLoginModal()" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button >
        <h3>Login</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Username" id="username">
        <label for="email">Email</label>
        <input id="email" type="text" name="Email" placeholder="Email">
        <span class="email-err text--red"></span>
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password">
        <p class="login-error"></p>
        <button class="btn btn-login" onClick="handleLogin(event)">Log In</button>
        <div class="login-footer">
            <span class="login-register" onClick="showRegisterModal()">Don't have account? Register here.</span>
        </div>
    </form>
    `;
    const body = document.querySelector("body");
    body.appendChild(newElement);
}
const showRepasswordModal =()=>{
    var newElement = document.createElement('div');
    newElement.classList.add('repassword-modal-container');
    newElement.innerHTML = `
    <form class="login-form">
        <button button type = "button" class="btn-close-modal" onClick = "removeRePasswordModal()" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button >
        <h3>Change Password</h3>
        <label for="oldPassword">Old Password</label>
        <input type="password" placeholder="oldPassword" id="oldPassword">
        <span class="oldPassword-err text--red"></span>
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password">
        <span class="password-err text--red"></span>
        <label for="password">RePassword</label>
        <input type="password" placeholder="RePassword" id="rePassword">
        <span class="rePassword-err text--red"></span>
        <p class="register-error"></p>

        <button class="btn btn-login" onClick="handleRePassword(event)">Save change</button>
    </form>
    `;
    const body = document.querySelector("body");
    body.appendChild(newElement);
    resetSelect();
    rePasswordAddEventListener();
}
const removeRePasswordModal = () => {
    rePasswordRemoveEventListener();
    const loaderContainer = document.querySelector(".repassword-modal-container");
    loaderContainer.remove();
}
const handleRePassword =async (event)=>{
    event.preventDefault();
    resetSelect();
    const oldPassword = document.querySelector("#oldPassword");
    const oldPasswordErr = document.querySelector(".oldPassword-err");
    if(rePasswordValidateForm()){
        const user = await myFunction.getCurrentUser();
        if(user.password === oldPassword.value.trim()){
            if(oldPassword.value.trim() !== rePassword.value.trim()){
                myFunction.addLoader();
                myFunction.putDataToApi(myFunction.API_ENPOINT+'user.php',{username: user.name,password: password.value});
                alert("Success!");
                myFunction.removeLoader();
                removeRePasswordModal();
            }else{
                rePasswordErr.innerHTML="Duplicate with old password";
            }

        }else{
            oldPasswordErr.innerHTML ="Incorrect old password!";
        }
    }
}
const backToLogin =()=>{
    removeRegisterModal();
    showLoginModal();
}
const removeLoginModal = () => {
    const loaderContainer = document.querySelector(".login-modal-container");
    loaderContainer.remove();
}
const removeRegisterModal = () => {
    registerRemoveEventListener();
    const loaderContainer = document.querySelector(".register-modal-container");
    loaderContainer.remove();
}
const handleNavigation = (url) => {
    if(USER_ID){
        window.location.href = url;
    }else{
        showLoginModal();
    }
}
const handleClickLogin = () => {
    if (USER_ID) {
        if(confirm("Are you sure you want to logout?")){
            myFunction.removeDataFromLocal(myFunction.USER_ID);
            loginButton.innerHTML = "Login";
            resetLoginButtonLabel();
            myFunction.showCartLabel();
        window.location.href = '../html/home.html';
        }

    } else {
        showLoginModal();
    }
    
}
const handleLogin = async (event)=>{
    event.preventDefault();
    const userInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const loginError = document.querySelector('.login-error');
    const emailInput = document.querySelector('#email');
    myFunction.addLoader();
    const data = await myFunction.postDataToApi(myFunction.API_ENPOINT+"login.php",{name:userInput.value, password:passwordInput.value, email:emailInput.value});
    if(data.length > 0) {
        loginError.innerHTML ="";
        await myFunction.saveDataToLocal(myFunction.USER_ID,[Number(data[0].id)]);
        removeLoginModal();
        resetLoginButtonLabel();
        alert(`Login success user:  ${data[0].displayname}`);
        myFunction.showCartLabel();
        window.location.href = '../html/home.html';
    }else {
        loginError.innerHTML = "Incorrect username or password or email!"
    }
    myFunction.removeLoader();
}
const handleRegister = async ()=>{
    myFunction.addLoader();

    if (registerValidateForm()) {
        const data = await myFunction.getDataFromApi(myFunction.API_ENPOINT+"login.php",{name:userName.value.trim()});
        console.log(data)
        if(data.count>0){
            const registerErr = document.querySelector(".register-error");
            registerErr.innerHTML ="Tên đăng nhập đã tồn tại!";
        }else{
            await myFunction.postDataToApi(myFunction.API_ENPOINT+"user.php",{username:userName.value.trim(),displayname:displayname.value.trim(),email:email.value.trim(),phone:phoneNumber.value.trim(),address:userAddressPairing(),password:password.value.trim()});
            removeRegisterModal();
            alert("Register success!");
            showLoginModal();
        }

    }
    myFunction.removeLoader();

}
resetLoginButtonLabel();