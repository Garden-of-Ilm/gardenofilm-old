export const formatAddinionalReferance = (reference?: string) => {

  if (!reference) return ""
  const userInput = reference.trim();

  const containsLinks = /https?:\/\/\S+/gi.test(userInput);

  const formattedHTML = containsLinks
      ? userInput.replace(/(https?:\/\/\S+)/gi, '<a href="$1" style="color: blue;">$1</a>') // Replace links with <a> tags
      : '<p>' + userInput?.replace(/\n/g, '<br>') + '</p>'; // Wrap the input in <p> tags and handle line breaks


  return formattedHTML;
};
