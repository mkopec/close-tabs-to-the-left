function onCreated(n) {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.contextMenus.create({
  id: "close_left",
  title: browser.i18n.getMessage("contextItemTitle"),
  contexts: ["tab"]
}, onCreated);

function closeTabs(sender, tabs) {
    for (var tab of tabs) {
        if (tab.id == sender.id) {
            break;
        }
        if (!tab.pinned) {
            browser.tabs.remove(tab.id);
        }
    }
}

browser.contextMenus.onClicked.addListener(function(info, sender) {
    var querying = browser.tabs.query({currentWindow: true});

    querying.then(closeTabs.bind(null, sender));
});
