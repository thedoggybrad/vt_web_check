chrome.browserAction.onClicked.addListener(function (tab) {
  const input = tab.url;
  const formattedInput = doubleEncodeURL(input);
  const link = formattedInput ? `https://www.virustotal.com/gui/search/${formattedInput}` : null;

  if (link) {
    // Show confirmation dialog
    const userConfirmed = window.confirm("By approving this action, the extension will check the current website you are in right now on VirusTotal which will require the extension to forward the request on VirusTotal's website. Do you want to proceeed?");
    
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

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "welcome.html" });
  }
});
