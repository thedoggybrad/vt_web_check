document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("acceptBtn").addEventListener("click", function() {
    window.close(); // Close the consent window
  });

  document.getElementById("declineBtn").addEventListener("click", function() {
    // Send a message to the background script to uninstall the extension
    chrome.runtime.sendMessage({ action: "uninstall" }, function(response) {
      console.log("Uninstall request sent.");
    });
    window.close(); // Close the consent window after the uninstall request
  });
});
