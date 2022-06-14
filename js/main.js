(function(){
  //mainmenu
  var toggle =  document.querySelector('.js-menu-burger');
  var nav = document.querySelector('.js-main-navigation');
  var menuShow = false;

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('is-active');

    if (this.classList.contains('is-active')) {
      menuShow = true;
    } else {
      menuShow = false;
    }

    if (menuShow) {
      nav.style.height = 'auto';
      var navHeight = nav.clientHeight;
      nav.style.height = '0';
      nav.classList.add('animating');
      nav.classList.add('opened');
      nav.style.height = navHeight + 'px';
      nav.addEventListener('transitionend', function (e){
        nav.classList.remove('animating');
        nav.classList.add('animated');
      })
    } else {
      nav.classList.add('animating');
      nav.classList.remove('opened')
      nav.style.height = '0px';
      nav.addEventListener('transitionend', function (e){
        nav.classList.remove('animating');
      })
    }
  })

  //smoothscrolling
  function scrollTo (target) {
    var header = document.querySelector('header');

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: target.offsetTop - header.clientHeight
    });
  }

  nav.addEventListener('click', function (event){

    if (event.target.classList.contains('js-menu-item')) {
      event.preventDefault();

      var target = document.querySelector(event.target.getAttribute('href'));

      if (target) {
        scrollTo (target)
      }
    }

  })


})();
