const tabs = await chrome.tabs.query({});
const button = document.querySelector("button");
button.addEventListener("click", async () => {

    console.log(tabs);

    const tabGroups = {};

    for (const tab of tabs) {
        const urlObj = new URL(tab.url);
        let hostname = urlObj.hostname.split(".").splice(-2).join(".");
        hostname = hostname.split(".")[0];
        if (tabGroups[hostname]) {
            tabGroups[hostname].push(tab.id);
        } else {
            tabGroups[hostname] = [tab.id];
        }
    }
    const hostNames = Object.keys(tabGroups);
    for (const hostName of hostNames) {
        const tabIds = tabGroups[hostName];
        if (tabIds.length > 2) {
          const group = await chrome.tabs.group({ tabIds });
          await chrome.tabGroups.update(group, { title: hostName, collapsed: true });
        }
    }
});