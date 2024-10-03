chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveSelectedText",
    title: "Translate",
    contexts: ["selection"], 
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId === "saveSelectedText" && info.selectionText) {
    chrome.storage.session.set({ selectedText: info.selectionText }, () => {
      console.log("Selected text saved:", info.selectionText);
    });
  }
});


