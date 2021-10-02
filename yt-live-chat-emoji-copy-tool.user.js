// ==UserScript==
// @name         YT Live Chat Emoji Copy Tool
// @namespace    https://github.com/kevin823lin
// @version      0.1
// @description  Make YouTube™ Live Chat's emoji can be copied.
// @author       kevin823lin
// @match        https://www.youtube.com/live_chat*
// @match        https://www.youtube.com/live_chat_replay*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @date         2021-10-03
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('load', function () {
        setUpObserver();
    });

    function setUpObserver() {
        try {
            if (!window.location.pathname.match('^/live_chat')) {
                return;
            }
            copyAltToSharedTooltipText();
            var observer = new MutationObserver(function (mutations) {
                copyAltToSharedTooltipText();
            });
            var config = {
                subtree: true,
                childList: true
            };
            observer.observe(document.querySelector("#chat"), config);
        }
        catch (e) {
            console.error(`setUpObserver: ${e}`);
        }
    }
    
    function copy_alt_to_sharedTooltipText() {
        try {
            document.querySelectorAll('[shared-tooltip-text]').forEach(ele => {
                let alt = ele.alt;
                let sharedTooltipText = ele.getAttribute('shared-tooltip-text');
                if (alt !=sharedTooltipText) {
                    ele.alt = sharedTooltipText;
                }
            });
        }
        catch (e) {
            console.error(`copy_alt_to_sharedTooltipText: ${e}`);
        }
    }
})();