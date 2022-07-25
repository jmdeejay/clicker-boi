// ==UserScript==
// @name         Clicker boi
// @namespace    http://tampermonkey.net/
// @version      2.2
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

    Game.registerMod("clicker boi mod", {
        init: function() {
            const pluginName = "Clicker boi";
            let clickerboiEnabled = true;
            const clickerOn = "🟢 " + pluginName;
            const clickerOff = "🔴 " + pluginName;

            Game.Notify(`${pluginName} loaded!`, `Boost your cookie production by at least 850%.`, [16, 5]);

            const buttonBar = document.querySelector("#comments .separatorBottom");
            if (buttonBar) {
                if (!document.getElementById("clicker-boi")) {
                    const enableBtn = document.createElement('div');
                    enableBtn.id="clicker-boi";
                    enableBtn.classList.add("productButton");
                    enableBtn.classList.add("productMinigameButton");
                    enableBtn.style = "display: block; right: 5px; top: -5px; z-index: 100;";
                    enableBtn.innerHTML = clickerOn;
                    enableBtn.onclick = function(event) {
                        event.stopPropagation();
                        clickerboiEnabled = !clickerboiEnabled;
                        event.target.innerHTML = (clickerboiEnabled) ? clickerOn : clickerOff;
                    }
                    buttonBar.appendChild(enableBtn);
                }
            }

            // Click cookie (each 4ms)
            const autoClickCookie = setInterval(function() {
                if (clickerboiEnabled) Game.ClickCookie();
            }, 4);

            // Golden cookies (each 0.5s)
            const autoPopGoldenCookies = setInterval(function() {
                if (clickerboiEnabled) {
                    Game.shimmers.forEach(function(shimmer) {
                        if(shimmer.type == "golden" && shimmer.wrath == 0)
                        {
                            shimmer.pop()
                        }
                    })
                }
            }, 500);

            // Reindeers (each 0.1s)
            const autoPopReindeer = setInterval(function() {
                if (clickerboiEnabled) {
                    for (let h in Game.shimmers){
                        if(Game.shimmers[h].type=="reindeer"){
                            Game.shimmers[h].pop();
                        }
                    }
                }
            }, 100);

            // Click on fortune news (each 5s)
            const autoPopFortuneNews = setInterval(function() {
                if (clickerboiEnabled) {
                    const fortuneNews = document.querySelector("#commentsText #commentsText1 span.fortune");
                    if(fortuneNews) fortuneNews.click();
                }
            }, 5000);

            function getMaxWrinklerValue() {
                let maxWrinkler = 10;
                const prestigeElderSpice = Game.PrestigeUpgrades.find(obj => (obj.id == 364));
                if (prestigeElderSpice && prestigeElderSpice.bought) {
                    maxWrinkler = 12;
                }
                return maxWrinkler;
            }

            // Wrinklers (each 60s)
            const autoPopTwelvethWrinkler = setInterval(function() {
                if (clickerboiEnabled) {
                    const maxWrinklerValue = getMaxWrinklerValue();
                    let wrinkCount = 0,
                        wrinkEaten = 0,
                        wrinkIndex = maxWrinklerValue; // value for shinies test

                    for (let i in Game.wrinklers) {
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
            const autoPetDragon = setInterval(function() {
                if (clickerboiEnabled) {
                    if (document.getElementById("specialPic")) { Game.ClickSpecialPic(); }
                }
            }, 600000);

        },
        save:function(){
            //
        },
        load:function(){
            //
        },
    });

});
