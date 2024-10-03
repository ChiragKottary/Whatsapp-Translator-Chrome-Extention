function setupContextMenu() {
  chrome.contextMenus.create({
    id: "define-word",
    title: "Define",
    contexts: ["selection"],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  chrome.storage.session.set({ lastWord: data.selectionText });
});