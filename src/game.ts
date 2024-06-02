import {
  GameService,
  Origin,
  ReceiveLeaderboardMessage,
  ReceivePlayMessage,
  ReceiveTransferHstMessage,
} from "haste-arcade-sdk";

let playId = "";

const game = new GameService(
  "f8c22e6c-1086-4529-8800-2c72f98b9915",
  Origin.DEV
);

document.addEventListener("DOMContentLoaded", function () {
  game.init();

  document.getElementById("playButton")?.addEventListener("click", function () {
    game.play();
  });

  document
    .getElementById("submitScoreButton")
    ?.addEventListener("click", function () {
      const score = Math.floor(Math.random() * 100);
      game.submitScore(playId, score);
    });

  document
    .getElementById("getLeaderboardButton")
    ?.addEventListener("click", function () {
      game.getLeaderboard();
    });

  document
    .getElementById("hstTransferButton")
    ?.addEventListener("click", function () {
      game.transferHst(10);
    });

  game.on("play", (message: ReceivePlayMessage) => {
    console.log(message);
    playId = message.playId;
  });

  game.on("leaderboard", (message: ReceiveLeaderboardMessage) => {
    console.log(message.leaderboard);
    const leaderboardContainer = document.getElementById("leaderboard");
    if (leaderboardContainer) {
      leaderboardContainer.innerHTML = ""; // Clear the existing leaderboard
      message.leaderboard.forEach((entry, index) => {
        const listItem = document.createElement("li");
        // Create an img element for the avatar
        const avatarImg = document.createElement("img");
        avatarImg.src = entry.avatarUrl!;
        avatarImg.alt = `${entry.userId}'s avatar`;
        avatarImg.width = 30; // Set the width of the avatar image
        avatarImg.height = 30; // Set the height of the avatar image
        avatarImg.style.borderRadius = "50%"; // Make the avatar image circular
        avatarImg.style.marginRight = "10px"; // Add some margin

        // Create a span element for the entry text
        const entryText = document.createElement("span");
        entryText.textContent = `${index + 1}. ${entry.displayName}: ${
          entry.score
        }`;

        // Append the avatar and text to the list item
        listItem.appendChild(avatarImg);
        listItem.appendChild(entryText);

        // Append the list item to the leaderboard container
        leaderboardContainer.appendChild(listItem);
      });
    }
  });

  game.on("transferHst", (message: ReceiveTransferHstMessage) => {
    console.log(message.txid);
  });
});
