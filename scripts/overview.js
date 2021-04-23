if (sessionStorage.getItem('firstSessionLoad')) {
    document.querySelector('img').classList.remove('slide-in-bottom'); 
  }
  sessionStorage.setItem('firstSessionLoad', false);