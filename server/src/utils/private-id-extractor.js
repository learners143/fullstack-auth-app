function extractPublicId(url) {
  if (!url) {
    throw new Error('URL is undefined or null');
  }

  // Regex to match and extract the public ID
  const regex = /(?:https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|video|raw)\/upload\/(?:v\d+\/)?)(.*?)(\.[^.]*$|$)/;
  const matches = url.match(regex);

  if (matches && matches[1]) {
    return matches[1];
  } else {
    throw new Error('Invalid Cloudinary URL');
  }
}
export{ extractPublicId }