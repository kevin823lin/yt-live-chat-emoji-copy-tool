// ==UserScript==
// @name                YT Live Chat Emoji Copy Tool
// @name:zh             YT 直播聊天室貼圖複製工具
// @name:zh-TW          YT 直播聊天室貼圖複製工具
// @name:zh-CN          YT 直播聊天室贴图复制工具
// @namespace           https://github.com/kevin823lin
// @version             0.1
// @description         Make YouTube™ Live Chat's emoji can be copied.
// @description:zh      讓 YouTube™ 直播聊天室的貼圖可以被複製
// @description:zh-TW   讓 YouTube™ 直播聊天室的貼圖可以被複製
// @description:zh-CN   让 YouTube™ 直播聊天室的贴图可以被复制
// @author              kevin823lin
// @match               https://www.youtube.com/live_chat*
// @match               https://www.youtube.com/live_chat_replay*
// @icon                https://www.google.com/s2/favicons?domain=youtube.com
// @grant               none
// @date                2021-10-07
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('load', function () {
        if (!window.location.pathname.match('^/live_chat')) {
            return;
        }
        copy_alt_to_sharedTooltipText(document.querySelector("#chat"));
        setUpObserver();
    });

    function setUpObserver() {
        try {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.matches('img.emoji[shared-tooltip-text][alt]')) {
                            copy_alt_to_sharedTooltipText(node, "self");
                        }
                    })
                })
            });
            observer.observe(document.querySelector("#chat"), {
                childList: true,
                subtree: true
            });
        }
        catch (e) {
            console.error(`setUpObserver: ${e}`);
        }
    }

    async function copy_alt_to_sharedTooltipText() {
        try {
            let node;
            if (arguments[1] && arguments[1] == "self") {
                node = [arguments[0]];
            }
            else {
                node = arguments[0].querySelectorAll('img.emoji[shared-tooltip-text][alt]');
            }
            await wait(500); // wait for YouTube remove and add elements several times
            node.forEach(ele => {
                let alt = ele.alt;
                let sharedTooltipText = ele.getAttribute('shared-tooltip-text');
                if (document.contains(ele) && alt && sharedTooltipText && (alt != sharedTooltipText) && (sharedTooltipText.match(alt))) {
                    ele.alt = sharedTooltipText;
                }
            });
        }
        catch (e) {
            console.error(`copy_alt_to_sharedTooltipText: ${e}`);
        }
    }

    function wait(ms) {
        try {
            return new Promise(r => setTimeout(r, ms));
        } catch (e) {
            console.error(`wait: ${e}`);
        }
    }
})();