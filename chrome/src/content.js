(async () => {
  console.log("hiiiiiiiiiiiii");

  const data = await (
    await fetch(
      "https://raw.githubusercontent.com/aavsar10/youtube-channel-block/refs/heads/main/blocklist.json",
    )
  ).json();

  let counter = 3;

  console.log("fetched data: ", data);

  if (window.navigation) {
    window.navigation.addEventListener("navigate", (event) => {
      const destinationUrl = new URL(event.destination.url);
      console.log("URL changed to:", destinationUrl.href);

      if (
        data.find(
          ({ name, exactChannelURL }) =>
            destinationUrl.href === exactChannelURL,
        )
      ) {
        window.location.href = "https://www.youtube.com";
      }

      if (destinationUrl.href.includes("youtube.com/watch?v=")) {
        setTimeout(() => {
          console.log(`timeout executed with counter: ${counter} seconds`);

          try {
            const channelNameSelector = document.querySelectorAll(
              'ytd-channel-name[id="channel-name"][class="style-scope ytd-video-owner-renderer"] div[id="container"][class="style-scope ytd-channel-name"] div[id="text-container"][class="style-scope ytd-channel-name"] yt-formatted-string[id="text"][class="style-scope ytd-channel-name complex-string"][dir="auto"][style="text-align: left;"] a[class="yt-simple-endpoint style-scope yt-formatted-string"][spellcheck="false"]',
            );

            if (!channelNameSelector[0])
              throw new Error("Channel name not found");

            const first = channelNameSelector[0];
            const channelName = first.innerText;
            const lowercase = channelName.toLowerCase();

            console.log({
              channelNameSelector,
              first,
              channelName,
              lowercase,
            });

            if (data.find(({ name, exactChannelURL }) => name.toLowerCase() === lowercase)) {
              window.location.href = "https://www.youtube.com";
            }
          } catch (err) {
            console.log(err);
            counter += 1;
          }
        }, counter * 1000);
      }
    });
  } else {
    console.warn("navigation api not supported");
  }
})();
