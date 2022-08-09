const isLoggedIn = () => {
  const user = localStorage.getItem('user');
  if(user){
    const data = JSON.parse(user);
    if(data.role !== 'admin'){
      window.open('index.html', '_self');
    }
  }else{
    window.open('login.html', '_self');
  }
}

isLoggedIn()
