chrome.browserAction.onClicked.addListener(function (tab) {
  const input = tab.url;
  const formattedInput = doubleEncodeURL(input);
  const link = formattedInput ? `https://www.virustotal.com/gui/search/${formattedInput}` : null;

  if (link) {
    openInNewTab(link);
  }
});

const openInNewTab = (url) => {
  chrome.tabs.create({ url: url });
};

const doubleEncodeURL = (input) => {
  try {
    const url = new URL(input);
    return encodeURIComponent(encodeURIComponent(url.href));
  } catch (error) {
    return null;
  }
};

// Listen for install event to show the consent page
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install" || details.reason === "update") {
    chrome.tabs.create({ url: "welcome.html" });
  }
});

// Listen for the message from the consent page to uninstall the extension
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "uninstall") {
    chrome.management.uninstallSelf(() => {
      console.log("The extension has been uninstalled.");
    });
  }
});
