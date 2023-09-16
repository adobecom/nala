import { head } from 'axios'; 

export async function isBranchURLValid(url) {
  try {
    const response = await head(url);
    if (response.status === 200) {
      console.log(`URL (${url}) returned a 200 status code. It is valid.`);
      return true;
    } else {
      console.log(`URL (${url}) returned a non-200 status code (${response.status}). It is invalid.`);
      return false;
    }
  } catch (error) {
    console.error(`Error checking URL (${url}):`, error);
    return false; // Handle any network errors or other issues as invalid
  }
}





