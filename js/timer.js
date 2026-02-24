// Define timer expiration
const endHour = 10;
const endMinute = 30;
const endSecond = 0;

// Define transition time
const colorMinute = 10;
const colorSecond = 0;

// Create timer expirate date object
const currentDate = new Date();
const endTime = new Date(currentDate.getFullYear(),currentDate.getMonth(),
  currentDate.getDate(),endHour,endMinute,endSecond);

// Create DOM elements
let subtitleElement;

let countdownLabelElement;

let countdownHoursElement;
let hoursElement;
let countdownMinutesElement;
let minutesElement;
let countdownSecondsElement;

let countdownMessageElement;
let announcementElement;

// Create expiration and transition flags
let countdownTimerExpired = false;
let countdownTimerColor = false;

// Create global counter and define rotation time
let counter = 0;
const rotationSeconds = 30;

// Define subtitle array
let subtitleIndex = 0;
const subtitle = [
  "Exalting Jesus in passionate worship",
  "Equipping Christians for life and service",
  "Encouraging one another in meaningful fellowship",
  "Engaging the world with the gospel"
];

// Define announcement array
let announcementIndex = 0;
const announcement = [
  "/assets/images/announcements/Slide3.jpg",
  "/assets/images/announcements/Slide4.jpg",
  "/assets/images/announcements/Slide5.jpg",
  "/assets/images/announcements/Slide6.jpg",
  "/assets/images/announcements/Slide7.jpg",
  "/assets/images/announcements/Slide8.jpg",
  "/assets/images/announcements/Slide9.jpg",
  "/assets/images/announcements/Slide10.jpg"
];

// Create setInterval Object
let countdown;

// Functions
function calculateDiffTime() {

  const now = new Date();
  const diffMs = endTime - now;

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const diffHour = Math.floor(totalSeconds / 3600);
  const diffMinute = Math.floor((totalSeconds % 3600) / 60);
  const diffSecond = totalSeconds % 60;

  // Set timer flags
  if (!countdownTimerColor) {
    countdownTimerColor = diffHour === 0 && diffMinute === colorMinute && diffSecond === colorSecond;
  }
  if (!countdownTimerExpired) {
    countdownTimerExpired = totalSeconds === 60;
  }

  // Return diffTime
  let diffTime = 
    {
      hour: diffHour.toString(),
      minute: diffMinute.toString(),
      second: diffSecond.toString()
    };

  return diffTime;
}

function updateCounter() {

  counter++;

  if (counter >= rotationSeconds) {

    counter = 0;
    subtitleIndex++;
    announcementIndex++;

    if (subtitleIndex >= subtitle.length - 1) {
      subtitleIndex = 0;
    }

    if (announcementIndex >= announcement.length - 1) {
      announcementIndex = 0;
    }
  }

  return true;
}

function updateDOM() {

  subtitleElement.innerHTML = subtitle[subtitleIndex];
  announcementElement.src = announcement[announcementIndex];

  if (countdownTimerExpired) {
    // Update Countdown Label
    countdownLabelElement.innerHTML = "";

    // Update Countdown Timer
    countdownHoursElement.innerHTML = "";
    hoursElement.innerHTML = "";
    countdownMinutesElement.innerHTML = "";
    minutesElement.innerHTML = "";
    countdownSecondsElement.innerHTML = "";

    // Update Countdown Message
    countdownMessageElement.innerHTML = "";
    countdownMessageElement.classList.add("countdown-color");
    countdownMessageElement.innerHTML = "Service will begin momentarily, please find a seat";

    clearInterval(countdown);

  } else {

    let diffTime = calculateDiffTime();

    if (countdownTimerColor) {

      // Hide hours and minutes labels
      hoursElement.innerHTML = "";
      minutesElement.innerHTML = "";

      // Update Countdown Timer to clock style format
      countdownHoursElement.innerHTML = "";
      countdownMinutesElement.innerHTML = diffTime.minute.padStart(2, "0") + ":";
      countdownSecondsElement.innerHTML = diffTime.second.padStart(2, "0");
      countdownMinutesElement.classList.add("countdown-color");
      countdownSecondsElement.classList.add("countdown-color");

      // Set Countdown Message
      countdownMessageElement.innerHTML = "please find a seat"

    } else {

      // Update Countdown Timer
      countdownHoursElement.innerHTML = (diffTime.hour != "0") ? diffTime.hour : "";
      hoursElement.innerHTML = (diffTime.hour == "1") ? "&nbsp;hour&nbsp;" : (diffTime.hour != "0") ? "&nbsp;hours&nbsp;" : "";
      countdownMinutesElement.innerHTML = (diffTime.minute != "0") ? diffTime.minute : "";
      minutesElement.innerHTML = (diffTime.minute == "1") ? "&nbsp;minute&nbsp;" : (diffTime.minute != "0") ? "&nbsp;minutes" : "";

    }
  }
}

function main() {

  updateDOM();
  updateCounter();

}

function init() {

  // Define DOM elements
  subtitleElement = document.getElementById("subtitle");
  subtitleElement.innerHTML = subtitle[subtitleIndex];

  countdownLabelElement = document.getElementById("countdown-label");

  countdownHoursElement = document.getElementById("countdown-hours");
  hoursElement = document.getElementById("hours");
  countdownMinutesElement = document.getElementById("countdown-minutes");
  minutesElement = document.getElementById("minutes");
  countdownSecondsElement = document.getElementById("countdown-seconds");

  countdownMessageElement = document.getElementById("countdown-message");

  announcementElement = document.getElementById("announcement");
  announcementElement.src = announcement[announcementIndex];

  // Run main loop
  countdown = setInterval(main, 1000);
}

// Initialize when page is loaded
document.addEventListener('DOMContentLoaded', init);
