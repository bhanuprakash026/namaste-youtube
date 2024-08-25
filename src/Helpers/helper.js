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

export const timeAgo = (timeString) => {
  const now = new Date();
  const past = new Date(timeString);
  const seconds = Math.floor((now - past) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  if (interval === 1) return '1 year ago';

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  if (interval === 1) return '1 month ago';

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  if (interval === 1) return '1 day ago';

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  if (interval === 1) return '1 hour ago';

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  if (interval === 1) return '1 minute ago';

  return 'Just now';
};

export const formatViewCount = (count) => {
  if (count < 1000) {
    return count;
  } else if (count >= 1000 && count < 1000000) {
    return (count / 1000).toFixed(1) + 'K';
  } else if (count >= 1000000 && count < 10000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 10000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else {
    return count;
  }
};
