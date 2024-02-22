(function () {
    const USER_ID = myFunction.getUserIdFromLocal() 
    const sidenav = document.querySelector('.main-menu');
    if (sidenav) {
        sidenav.innerHTML = `<ul>
    <li>
        <a href="./home.html">
            <i class="fa fa-home fa-2x"></i>
            <span class="nav-text">
               Home
            </span>
        </a>
      
    </li>
    <li>
        <a href="./home.html#new-wrapper">
            <i class="fa fa-star-o fa-2x"></i>
            <span class="nav-text">
               New
            </span>
        </a>
      
    </li>
    <li>
        <a href="./home.html#bestselling-wrapper">
            <i class="fa fa-heart-o fa-2x"></i>
            <span class="nav-text">
                Best selling
            </span>
        </a>
      
    </li>
    <li>
        <a href="./home.html#sale-wrapper">
            <i class="fa fa-bell-o fa-2x"></i>
            <span class="nav-text">
                On sale
            </span>
        </a>
      
    </li>

</ul>
<ul class="account">
${USER_ID ? `
    <li onClick="showRepasswordModal()">
        <a href="#">
            <i class="fa fa-unlock-alt fa-2x"></i>
            <span class="nav-text">
                Change Password
            </span>
        </a>
    </li>`:''}
    <li onClick ="handleClickLogin()">
       <a href="#">
             <i class="fa fa-sign-out fa-2x"></i>
            <span class="nav-text logout">
                Logout
            </span>
        </a>
    </li>  
</ul>`;
    }
    const footer = document.querySelector('.footer-distributed');
    footer.innerHTML = `
    <div class="footer-right">
    <a href="#"><i class="fa fa-facebook"></i></a>
    <a href="#"><i class="fa fa-twitter"></i></a>
    <a href="#"><i class="fa fa-linkedin"></i></a>
    <a href="#"><i class="fa fa-github"></i></a>
    </div>
    <div class="footer-left">
        <p class="footer-links">
            <a class="link-1" href="./home.html">Home</a>

            <a href="./contact.html">contact</a>
            <a  onClick="handleNavigation('../html/bills.html')">Bill</a>
            <a  onClick="handleNavigation('../html/cart.html')">Cart</a>
        </p>
        <p>Đàm Văn Anh 03/11/2002 &copy; 2023</p>
    </div>`;
})();