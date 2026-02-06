import React from "react";

export default function getTimeLeftUtil(deadlineISO) {
  const now = Date.now();
  const target = new Date(deadlineISO).getTime();
  const difference = Math.max(target - now, 0);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const min = Math.floor((difference / (1000 * 60)) % 60);
  const sec = Math.floor((difference / 1000) % 60);
  // console.table({ difference, hours, min, sec, now, target });
  // console.log({
  //   nowUTC: new Date(now).toISOString(),
  //   nowIST: new Date(now).toString(),
  //   nowIST_1: new Date(now).toISOString(),
  //   targetUTC: new Date(target).toISOString(),
  // });

  return { difference, hours, min, sec, isExpired: difference === 0 };
}
