     let player = document.getElementById('vid');
    window.addEventListener('updateTime', function(){
        if(player.playerInfo.currentTime >= 1 * 10)
        {
         alert("Time is up");
        }
    });
