chrome.browserAction.onClicked.addListener(function (tab) {
  const input = tab.url;
  const formattedInput = doubleEncodeURL(input);
  const link = formattedInput ? `https://www.virustotal.com/gui/search/${formattedInput}` : null;

  if (link) {
    // Show confirmation dialog
    const userConfirmed = window.confirm("By approving this action, the extension will check the current website you are in right now on VirusTotal, which will require the extension to forward the request on VirusTotal's website. Do you want to proceed?");
    
    if (userConfirmed) {
      openInNewTab(link);
    } else {
      console.log("Action canceled by the user.");
    }
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
