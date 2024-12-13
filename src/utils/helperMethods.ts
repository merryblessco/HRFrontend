import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatMobileNumber(value: string): string {
  const countryCode = "+234";
  const firstCharacterOfValue = value.substring(1);

  return countryCode + firstCharacterOfValue;
}

export function getFirstLettersAfterSpace(sentence: string) {
  // Split the sentence into words
  var words = sentence?.split(" ");

  // Initialize an empty string to store the result
  var result = "";

  // Iterate over each word
  for (var i = 0; i < words?.length; i++) {
    // If the word is not empty, add its first letter to the result
    if (words[i].length > 0) {
      result += words[i][0];
    }
  }

  return result;
}

export function daysAgo(dateString: any) {
  // Parse the input string into a Date object
  const date = new Date(dateString);

  // Get the current date and time
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(now.getTime() - date.getTime());

  // Convert milliseconds to days
  let daysDiff = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (daysDiff < 1) {
    daysDiff = 1
  }

  // Return the result as "X days ago"
  return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`;
}

export function formatCurrencyRange(min: any, max: any) {
  const formattedMinSalary = formatter2(min);
  const formattedMaxSalary = formatter2(max);

  // Return the formatted salary range
  return `${formattedMinSalary} - ${formattedMaxSalary}`;
}

export function convertPhoneNumber(phoneNumber: any) {
  // Remove the leading '+' sign
  return phoneNumber?.replace("+234", "0");
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export function generate_uuidv4() {
  var dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var rnd = Math.random() * 16; //random number in range 0 to 16
    rnd = (dt + rnd) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? rnd : (rnd & 0x3) | 0x8).toString(16);
  });
}

export function shuffleArray(array: any[]) {
  let shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}

export function isEmptyString(str: string) {
  return str.trim().length === 0;
}

export function isEmpty(obj: any) {
  const isNullish = Object.values(obj).every((value) => {
    if (value === null) {
      return true;
    }

    return false;
  });
  return isNullish;
}

export function checkProperties(obj: any) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] != "") return false;
  }
  return true;
}

export function numberWithCommas(val: any) {
  return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NGN",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const isValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatter1 = (val: number) => {
  if (val === 0) {
    return `₦ 0.00`;
  }
  const amount = numberWithCommas(val);
  return `₦ ${amount}.00`;
};

export const formatter2 = (val: number) => {
  if (val === 0) {
    return `₦ 0.00`;
  }
  const amount = numberWithCommas(val);
  return `₦${amount}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStringToTime(dateTimeString: string) {
  const dateObj = new Date(dateTimeString);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function formatStringToDate(dateTimeString: string) {
  const dateObj = new Date(dateTimeString);
  return `${dateObj.toDateString()}`;
}

export function calculateAge(dateString: string): number {
  // Parse the input date string into a Date object
  const birthDate = new Date(dateString);

  // Get the current date
  const today = new Date();

  // Calculate the age difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust the age if the birthdate hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 1) return 1
  return age;
}

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeFirstLetterOfEachWord = (str: string): string => {
  if (!str) return str; // Handle empty strings
  return str
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(' '); // Join the array back into a string
};

export function formatDateTime(
  dateTimeString: any,
  formatString = "yyyy-MM-dd HH:mm:ss"
) {
  const date = new Date(dateTimeString);

  if (isNaN(date.getTime())) {
    // Handle invalid date string (optional)
    return ""; // Or return a default value
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return formatString
    .replace("yyyy", year.toString())
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

export function formatStringToLocaleDate(dateTimeString: string) {
  const dateObj = new Date(dateTimeString);
  return `${dateObj.toLocaleDateString()}`;
}

export function formatMomentDate(dateTimeString: any) {
  const dateObj = dateTimeString.format("YYYY-MM-DD HH:mm:ss")
  return dateObj;
}

export function assignVerifiedStatus(isVerified: boolean) {
  const VERIFIED = "Verified";
  const UNVERIFIED = "Unverified";

  if (isVerified) return VERIFIED;
  return UNVERIFIED;
}

export default function checkPasswordStrength(password: string) {
  const requirements = {
    minLength: 8,
    minLowerCase: 1,
    minUpperCase: 1,
    minDigit: 1,
    minNonWord: 1, // Special character
  };

  let score = 0;

  // Check password length
  if (password.length >= requirements.minLength) {
    score += 2;
  } else {
    score -= password.length - requirements.minLength;
  }

  // Check for lowercase letters
  const hasLowerCase = /[a-z]/.test(password);
  if (hasLowerCase) {
    score++;
  }

  // Check for uppercase letters
  const hasUpperCase = /[A-Z]/.test(password);
  if (hasUpperCase) {
    score++;
  }

  // Check for digits
  const hasDigit = /\d/.test(password);
  if (hasDigit) {
    score++;
  }

  // Check for non-word characters (special characters)
  const hasNonWord = /\W/.test(password);
  if (hasNonWord) {
    score++;
  }

  // Calculate strength based on score
  let strength;
  if (score <= 0) {
    strength = "Very Weak";
  } else if (score <= 2) {
    strength = "Weak";
  } else if (score <= 4) {
    strength = "Medium";
  } else {
    strength = "Strong";
  }

  return { score, strength };
}

export function checkStrength(pass: string) {
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  return regex.test(pass);
}
export function formatPhoneNumber(phoneNumber: string) {
  // Remove leading zeros
  phoneNumber = phoneNumber.replace(/^0+/, "");

  // Add country code if not present
  if (!phoneNumber.startsWith("+")) {
    phoneNumber = "+234" + phoneNumber;
  }

  return phoneNumber;
}

export function removeUnderscores(text: string) {
  // Use regular expression to replace underscores with spaces
  return text.replace(/_/g, " ");
}

export function titleCase(text: string) {
  // Split the text into words using a space as the delimiter
  const words = text.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the capitalized words back into a string with spaces
  return capitalizedWords.join(" ");
}

export function replaceUnderscoreWithSpaceAndTransformFirstLetterToUppercase(
  text: string
) {
  let initialStr = removeUnderscores(text);
  return (initialStr = titleCase(initialStr));
}

export function generatePaymentReferenceNumbersInList(
  count = 10,
  min = 1000000000,
  max = 9999999999
) {
  const referenceNumbers = [];
  for (let i = 0; i < count; i++) {
    // Generate a random integer within the specified range
    const referenceNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    referenceNumbers.push(referenceNumber);
  }
  return referenceNumbers;
}

export function generatePaymentReferenceNumbers(
  min = 1000000000,
  max = 9999999999
) {
  const referenceNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return referenceNumber;
}

export function arraysEqual(arr1: [] | any, arr2: [] | any) {
  // Check if arrays have the same length (different lengths imply difference)
  if (arr1.length !== arr2.length) return false;

  // Use every to check if all elements in arr1 strictly match corresponding elements in arr2
  return arr1.every((element: any, index: any) => element === arr2[index]);
}

export function transformDateFormat(originalDate: any) {
  // Split the original date string by '-'
  var parts = originalDate?.split("-");

  // Rearrange the parts
  var transformedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

  return transformedDate;
}

export function isAdult(dateOfBirth: any) {
  // Create a Date object from the input string, specifying the format
  const birthDate = new Date(dateOfBirth);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age in years
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust the age if the birthdate has not passed yet this year
  if (
    currentDate <
    new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    )
  ) {
    age--;
  }

  // Check if the age is greater than or equal to 18
  return age >= 18;
}

export function isAdult1(dob: any) {
  // Parse the DOB string to a Date object
  var dobDate = new Date(dob);

  // Calculate the current date
  var currentDate = new Date();

  // Calculate the age by subtracting the year of birth from the current year
  var age = currentDate.getFullYear() - dobDate.getFullYear();

  // Adjust age if the current date is before the birthday in the current year
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    age--;
  }

  // Check if the age is 18 or above
  return age >= 18;
}
