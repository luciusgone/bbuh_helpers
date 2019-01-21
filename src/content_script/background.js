// show and hide page actions
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.indexOf("https://bbs.bbuhot.com/") == 0) {
        chrome.pageAction.show(tabId);
    } else {
        // TODO(luciusgone): BUG. no tab id error
        chrome.pageAction.hide(tabId);
    }
});

// setting up required info
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.local.get(['profiles', 'misc', 'settings'], function (items) {
        if (Object.keys(items).length == 0) {
            chrome.storage.local.set({
                'profiles': {},
                'misc': {
                    'hide_medals': false,
                    'hide_signs': false,
                    'hide_replies': false,
                    'min_level': 0,
                    'user_levels': [9, 32, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31]
                },
                'blacklist': {},
                'settings': {
                    'main_post_label': '基地',
                    'enable_auto_sign': true,
                    'enable_farm_kit': true,
                    'enable_blacklist': true
                }
            });
        }
    });
});
