// // server/utils.js
// function calculateStreaks(calendar) {
//   const days = Object.keys(calendar)
//     .map(Number)
//     .sort((a, b) => a - b);

//   let currentStreak = 0;
//   let maxStreak = 0;

//   for (let i = 0; i < days.length; i++) {
//     if (i === 0) {
//       currentStreak = 1;
//     } else {
//       const diff = (days[i] - days[i - 1]) / 86400;
//       currentStreak = diff === 1 ? currentStreak + 1 : 1;
//     }
//     maxStreak = Math.max(maxStreak, currentStreak);
//   }

//   
//   const today = Math.floor(Date.now() / 1000);
//   const lastDay = days[days.length - 1];

//   if (!lastDay || (today - lastDay) / 86400 > 1) {
//     currentStreak = 0;
//   }

//   return { currentStreak, maxStreak };
// }

// module.exports = { calculateStreaks };