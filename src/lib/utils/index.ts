/**
 * Clean leading and trailing slash from the given string.
 */
export function cleanSlashes(input: string) {
  return input.replace("^/", "").replace("/$", "");
}

/**
 * Clean trailing character with spaces (e.g. comma).
 */
export function cleanTrailingCharacter(input: string, character: string = ",") {
  const regex = new RegExp(`/${character}\\s*$/`)
  return input.replace(regex, "")
}

/**
 * Extract array from string based on give separator (e.g. comma).
 */
export function extractArrayfromString(input: string, separator = ",") {
  const cleaned = cleanTrailingCharacter(input, separator)
  return cleaned.split(separator)
}



