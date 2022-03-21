  // Barra de navegacion
  var documentElement = document.querySelector("html");
  var navb = document.querySelector('#navb');
  var menuIsOpen = navb.classList.contains("hidden");
  var burger = document.querySelector('#burger');
  var svgIcon = burger.getElementsByTagName('svg');

  documentElement.addEventListener('click', function (event) {
      if (menuIsOpen && !navb.contains(event.target) || burger.contains(event.target)) {
          svgIcon[0].classList.toggle('hidden');
          svgIcon[1].classList.toggle('hidden');
          navb.classList.toggle('h-40');
          menuIsOpen = !menuIsOpen;
      }
  });

  // Browser resize listener
  window.addEventListener("resize", menuResize);

  // Rezise menu if user changing the width with responsive menu opened
  function menuResize() {
      // first get the size from the window
      const window_size = window.innerWidth || document.body.clientWidth;
      if (window_size > 768) {
          navb.classList.remove('h-64');
      }
  }
  // Fin Barra de navegacion

  // Movimiento de background
  var banner = document.getElementById('bgBanner'),
      bgBox = banner.querySelector('.bg-fondoscz');

  bpTween = KUTE.to(bgBox, {
      backgroundPosition: ['50%', '50%']
  }, {
      duration: 4000,
      easing: 'easingCubicOut',
      delay: 0
  }).start();

  //   Se difumina el fondo 
  var tl = anime.timeline();
  tl.add({
      targets: bgBox,
      opacity: 0,
      duration: 2000,
      delay: 2000,
      easing: "linear",
  });

  var widthBanner = banner.offsetWidth,
      heightBanner = banner.offsetHeight,
      titulo = document.getElementById('titulo'),
      widthTitle = titulo.offsetWidth,
      widthCamion = document.getElementById('camion').offsetWidth,
      despCamion = (widthBanner + widthTitle) / 2 - widthCamion,
      escalaLogo = widthTitle / widthCamion;

    //   Se pone despues para que se alinee el camion
  titulo.classList.add("w-full");

  //   Avanza el camion
  tl.add({
      targets: '#camion',
      translateX: [-widthCamion, despCamion],
      duration: 4000,
      easing: "easeOutQuad",
  });

  //   Avanza titulo
  tl.add({
      targets: '#titulo',
      translateX: ['-100%', '0%'],
      duration: 4000,
      easing: "easeOutQuad",
  }, '-=4000');

  //   Morphing Camion con letras de Santa Cruz
  tl.add({
      targets: '#camion',
      translateX: function (el) {
          return widthBanner / 2 - widthCamion / 2;
      },
      translateY: -heightBanner * (2 / 5),
      duration: 3000,
      easing: "linear",
      scale: escalaLogo,
      begin: function (anim) {
          KUTE.to('#contorno', {
              path: '#anta',
              attr: {
                  fill: "#fff"
              }
          }, {
              duration: 3000,
          }).start();
          KUTE.to('#tanqueCabina', {
              path: '#ruz',
              attr: {
                  fill: "#fff"
              }
          }, {
              duration: 3000,
          }).start();
          KUTE.to('#llantas', {
              path: '#S',
              attr: {
                  fill: "#fff"
              }
          }, {
              duration: 3000,
          }).start();
          KUTE.to('#tanqueGas', {
              path: '#C',
              attr: {
                  fill: "#fff"
              }
          }, {
              duration: 3000,
          }).start();
      }
  });

  tl.add({
    targets: '#contratanos',
    opacity: [0,1],
    duration: 2000,
    easing: "linear",
},'-=3000');

tl.add({
    targets: '#wapp',
    translateY: ['-100%', '0%'],
    opacity: [0,1],
    duration: 1000,
})
