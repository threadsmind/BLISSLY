var Visual=new Object({button:document.getElementById("blissly-toggle"),init:function(t){var n="";n=new RegExp("iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini","i").test(navigator.userAgent)?"touchstart":"click",this.button.addEventListener(n,t.togglePlay.bind(t))},display:function(){this.button.style.display="block",document.getElementById("loading").style.display="none"},play:function(){this.button.style.backgroundColor=Constants.playColor},stop:function(){this.button.style.backgroundColor=Constants.stopColor}});