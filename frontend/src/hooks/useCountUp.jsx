// import { useEffect, useState } from "react";

// export default function useCountUp(target, duration = 800) {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const increment = target / (duration / 16);

//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setValue(target);
//         clearInterval(timer);
//       } else {
//         setValue(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [target, duration]);

//   return value;
// }