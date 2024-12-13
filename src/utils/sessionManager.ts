import CryptoJS from "crypto-js";

// Secret key for encryption and decryption (should be securely stored)
const SECRET_KEY =
  "af06f7be0a7db3d9f4c8529ea1c28abd2fdaf83bbadd8401fbe4613438470c68 ​​";

// Method to create a session and store it in localStorage
export const createSession = (userDetails: any) => {
  const sessionData = JSON.stringify(userDetails);

  // Encrypt user details using the secret key
  const encryptedData = CryptoJS.AES.encrypt(
    sessionData,
    SECRET_KEY
  ).toString();

  // Store the encrypted data in localStorage
  localStorage.setItem("userSession", encryptedData);
};

// Method to retrieve and decrypt the session from localStorage
export const getSession = () => {
  const encryptedData = localStorage.getItem("userSession");

  if (!encryptedData) {
    return null;
  }

  // Decrypt the session data using the secret key
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    // Parse the decrypted data into a JavaScript object
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Failed to decrypt session data:", error);
    return null;
  }
};

// Method to clear session
export const clearSession = () => {
  localStorage.removeItem("userSession");
};
