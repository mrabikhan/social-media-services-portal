if(localStorage.getItem("token")){
    document.getElementById("Auth").innerHTML=`<a href="authentication.html" class="fa fa-user" onclick="Logout()">Logout</a>`;
}
else{
    document.getElementById("Auth").innerHTML=`<a href="authentication.html" class="fa fa-user">Login</a>`;
}


const WithoutLogout = () => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("account") == "Buyer") {
        window.open("buyer.html", "_self");
      } else {
        window.open("worker.html", "_self");
      }
    } else {
      window.open("authentication.html","_self");
    }
  };

const Logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('account');
}