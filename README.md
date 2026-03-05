# mediaLab1

This lab aims to build your first HTML5 live stream (HLS) player.

There are many open source alternatives. You can try to use as Video.js player as a startup: https://github.com/videojs/video.js
or try a live example: https://jsbin.com/gejugat/edit?html,output

# Requirements for repository
  - You have to clone this repository and make two branches (master and develop).
  - The develop branch should contain commits of every new feature of the player.
  - When all features will be ready you have to merge the development branch to the master.

# Requirements for player
  - You have to find an HLS player and embed it into index.html file.
  - The player should be able to run "Big Bunny" video from this URL: https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8
  - If player fails to play "Big Bunny" try this stream: https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8
  - Implement at least three features in the index.html (Play, Pause, Stop, Jump to 5 sec forward, Jump to 5 sec backward, Playlist, Shuffle).
  - Test player on at least two browsers and specify in README.md which version and browser it was.
  - Additional features are welcome and bonuses are available.
  - To pass this lab, you have to complete at least two points from the requirement list.

# Implemented player
- HLS player embedded in `src/index.html` using `hls.js` with native-HLS fallback.
- Default stream: `https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8`.
- Backup stream in playlist: `https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8`.

# Implemented features
- Play
- Pause
- Stop (pause + reset to 0 seconds)
- Jump to 5 sec forward
- Jump to 5 sec backward
- Playlist with two URLs and individual Load buttons
- Shuffle (loads a random playlist stream)

# Browser testing
Test date: 2026-03-05

- Mozilla Firefox `140.8.0esr`
- Brave Browser `145.1.87.192`
