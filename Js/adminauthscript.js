let user = document.getElementById('user').value;
let pass = document.getElementById('pass').value;
  function verify()
  {
    let u = document.getElementById('user').value;
    let p = document.getElementById('pass').value;
    if(u == 'earningpanel' && p == '663211')
    {
        location.assign('mainDashboard.html');
    }
    else
    {
        alert('Invalid Login. Try Again!')
    }
  }