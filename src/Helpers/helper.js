export default function generateRandomMessage(length) {
  // Define a character list containing alphanumeric characters and some symbols
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  // Initialize an empty string to store the random message
  let message = "";

  // Loop for the desired length of the message
  for (let i = 0; i < length; i++) {
    // Get a random index within the character list
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Append the character at the random index to the message
    message += characters.charAt(randomIndex);
  }

  // Return the generated random message
  return message;
}