console.log("hiii")

if (window.navigation) {
  window.navigation.addEventListener("navigate", (event) => {
    const destinationUrl = new URL(event.destination.url);
    console.log("URL changed to:", destinationUrl.href);

    const bannedChannels = [
      "big5 türkiye",
      "trt spor",
      "perma band",
      "bein sports türkiye",
      "a spor",
      "s sport",
      "katseye",
      "jisoo",
      "crush"
    ]

    setTimeout(() => {
      console.log("timeout executed")

      const channelNameSelector = document.querySelectorAll('ytd-channel-name[id="channel-name"][class="style-scope ytd-video-owner-renderer"] div[id="container"][class="style-scope ytd-channel-name"] div[id="text-container"][class="style-scope ytd-channel-name"] yt-formatted-string[id="text"][class="style-scope ytd-channel-name complex-string"][dir="auto"][style="text-align: left;"] a[class="yt-simple-endpoint style-scope yt-formatted-string"][spellcheck="false"]');

      const first = channelNameSelector[0];
      const channelName = first.innerText;
      const lowercase = channelName.toLowerCase();

      console.log({
        channelNameSelector,
        first,
        channelName,
        lowercase
      });

      if (bannedChannels.find(chName => chName.toLowerCase() === lowercase)) {
        window.location.href = "https://www.youtube.com"
      };
    }, 1000);
  });
} else {
  console.warn("navigation api not supported");
}