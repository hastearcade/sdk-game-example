import {
  GameService,
  Origin,
  ReceiveLeaderboardMessage,
  ReceivePlayMessage,
  ReceiveTransferHstMessage,
} from "haste-arcade-sdk";

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
      game.submitScore(score);
    });

  document
    .getElementById("getLeaderboardButton")
    ?.addEventListener("click", function () {
      game.getLeaderboard();
    });

  document
    .getElementById("hstTransferButton")
    ?.addEventListener("click", function () {
      game.transferHst(100);
    });

  game.on("play", (message: ReceivePlayMessage) => {
    console.log(message);
  });

  game.on("leaderboard", (message: ReceiveLeaderboardMessage) => {
    console.log(message.leaderboard);
  });

  game.on("transferHst", (message: ReceiveTransferHstMessage) => {
    console.log(message.txid);
  });
});
