// ==UserScript==
// @name                YT Live Chat Emoji Copy Tool
// @name:zh             YT 直播聊天室貼圖複製工具
// @name:zh-TW          YT 直播聊天室貼圖複製工具
// @name:zh-CN          YT 直播聊天室贴图复制工具
// @namespace           https://github.com/kevin823lin
// @version             0.2
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

        document.addEventListener('selectionchange', () => {
            let cloneSelectedNode = getCloneSelectedNode();
            if (!cloneSelectedNode) {
                return;
            }
            let imgs = cloneSelectedNode.querySelectorAll('img.emoji[shared-tooltip-text][alt]:not([copyable])');
            imgs.forEach(img => {
                if (img.id && document.querySelector(`#${img.id}`)) {
                    copyAltToSharedTooltipText(document.querySelector(`#${img.id}`))
                }
            });
        });
    });

    function getCloneSelectedNode()
    {
        try {
            let selection = window.getSelection();
            if (!selection.rangeCount) {
                return;
            }
            let range = selection.getRangeAt(0);
            return range.cloneContents();
        }
        catch (e) {
            console.error(`getCloneSelectedNode: ${e}`);
        }
    }

    function copyAltToSharedTooltipText(ele) {
        try {
            let alt = ele.alt;
            let sharedTooltipText = ele.getAttribute('shared-tooltip-text');
            if (document.contains(ele) && alt && sharedTooltipText && (alt != sharedTooltipText)) {
                ele.setAttribute('copyable', true);
                if (sharedTooltipText.match(alt)) {
                    ele.setAttribute('alt', sharedTooltipText);
                }
            }
        }
        catch (e) {
            console.error(`copyAltToSharedTooltipText: ${e}`);
        }
    }
})();