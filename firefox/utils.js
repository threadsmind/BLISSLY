var Random=new Object({generateRandomNumber:function(n,o){return Math.floor(Math.random()*(o-n+1))+n},generateRandomValue:function(n){return Math.floor(Math.random()*n)}}),Util=new Object({log:function(n){Blissly.doLogging&&console.log(n)}});