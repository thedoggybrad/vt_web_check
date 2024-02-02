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
