export function isURL (str) {
    // Regular expression to match URLs
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlPattern.test(str);
}