// ==UserScript==
// @name         Clicker boi
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  free cookies
// @author       jmdeejay
// @match        https://orteil.dashnet.org/cookieclicker/
// @icon         https://www.google.com/s2/favicons?domain=dashnet.org
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jmdeejay/clicker-boi/master/clicker-boi.js
// @downloadURL  https://raw.githubusercontent.com/jmdeejay/clicker-boi/master/clicker-boi.js
// ==/UserScript==

window.addEventListener("load", function() {
    'use strict';

    var clickerboiEnabled = false;

    // Add clicker boi button
    setInterval(function() {
        if(Game.ready) {
            var buttonBar = document.querySelector("#comments .separatorBottom");
            if (buttonBar) {
                if (!document.getElementById("clicker-boi")) {
                    console.log("Clicker boi loaded");
                    var enableBtn = document.createElement('div');
                    enableBtn.id="clicker-boi";
                    enableBtn.classList.add("productButton");
                    enableBtn.classList.add("productMinigameButton");
                    enableBtn.style = "display: block; right: 16px; top: -5px; z-index: 99999;";
                    enableBtn.innerHTML = "🔴 clicker boi";
                    enableBtn.onclick = function(event) {
                        event.stopPropagation();
                        clickerboiEnabled = !clickerboiEnabled;
                        event.target.innerHTML = (clickerboiEnabled) ? "🟢 clicker boi" : "🔴 clicker boi";
                    }
                    buttonBar.appendChild(enableBtn);
                }
            }
        }
    }, 1000);

    // Click cookie (each 4ms)
    var autoClickCookie = setInterval(function() {
        if (Game.ready && clickerboiEnabled) Game.ClickCookie();
    }, 4);

    // Golden cookies (each 0.5s)
    var autoPopGoldenCookies = setInterval(function() {
        if (Game.ready && clickerboiEnabled) {
            Game.shimmers.forEach(function(shimmer) {
                if(shimmer.type == "golden" && shimmer.wrath == 0)
                {
                    shimmer.pop()
                }
            })
        }
    }, 500);

    // Reindeers (each 0.1s)
    var autoPopReindeer = setInterval(function() {
        if (Game.ready && clickerboiEnabled) {
            for (var h in Game.shimmers){
                if(Game.shimmers[h].type=="reindeer"){
                    Game.shimmers[h].pop();
                }
            }
        }
    }, 100);

    // Click on fortune news (each 5s)
    var autoPopFortuneNews = setInterval(function() {
        if (Game.ready && clickerboiEnabled) {
            var fortuneNews = document.querySelector("#commentsText #commentsText1 span.fortune");
            if(fortuneNews) fortuneNews.click();
        }
    }, 5000);

    function getMaxWrinklerValue() {
        var maxWrinkler = 10;
        var prestigeElderSpice = Game.PrestigeUpgrades.find(obj => (obj.id == 364));
        if (prestigeElderSpice && prestigeElderSpice.bought) {
            maxWrinkler = 12;
        }
        return maxWrinkler;
    }

    // Wrinklers (each 60s)
    var autoPopTwelvethWrinkler = setInterval(function() {
        if (Game.ready && clickerboiEnabled) {
            var maxWrinklerValue = getMaxWrinklerValue();
            var wrinkCount = 0,
                wrinkEaten = 0,
                wrinkIndex = maxWrinklerValue; // value for shinies test

            for (var i in Game.wrinklers) {
                // count number of eating wrinks
                if (Game.wrinklers[i].sucked > 0) {
                    wrinkCount += 1;
                }
                // find top wrink index, ignoring shiny wrinklers
                if (Game.wrinklers[i].sucked > wrinkEaten && Game.wrinklers[i].type == 0) {
                    wrinkEaten = Game.wrinklers[i].sucked;
                    wrinkIndex = i;
                }
            }
            // pop top wrinkler if maximum allowed amount of wrinklers are eating, unless all of them are shiny
            if (wrinkCount >= maxWrinklerValue && wrinkIndex != maxWrinklerValue) {
                Game.wrinklers[wrinkIndex].hp = 0;
            }
        }
    }, 60000);

    // Pet dragon (each 10 minutes)
    var autoPetDragon = setInterval(function() {
        if (Game.ready && clickerboiEnabled) {
            if (document.getElementById("specialPic")) { Game.ClickSpecialPic(); }
        }
    }, 600000);

});
