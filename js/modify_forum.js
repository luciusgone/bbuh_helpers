(function () {
    function hideNode(node) {
        node.style.display = 'none';
    }

    function blockContentByBlacklist(node, blacklist) {
        if (node.nodeName.toLowerCase() == 'tbody' &&
            node.hasAttribute('id') &&
            node.getAttribute('id').match(/(stickthread|normalthread)(\_\d+)/)) {

            let post_title = node.getElementsByClassName('s xst')[0].innerText;
            let author = node.querySelectorAll('.by > cite > a')[0].innerText;

            if (blacklist[author] &&
                (blacklist[author] == 'user' || blacklist[author] == 'both')) {
                hideNode(node);
            }

            for (let kw in blacklist) {
                if (blacklist[kw] == 'keyword' && post_title.indexOf(kw) >= 0) {
                    hideNode(node);
                    break;
                }
            }

        }
    }

    function initObserver(blacklist) {
        let ob = new MutationObserver(function (mutationList, observer) {
            mutationList.forEach(function (mutation) {
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(function (node) {
                        blockContentByBlacklist(node, blacklist);
                    });
                }
            });
        });

        return ob;
    }

    function init() {
        chrome.storage.local.get('blacklist', function (items) {
            let ob = initObserver(items.blacklist);
            ob.observe(document, {childList: true, subtree: true});
        });
    }

    init();
})();