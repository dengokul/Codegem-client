export const setItem = async (key: string, value: any) => {
  try {
    await null;
    return localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getItem = async (key: string) => {
  try {
    await null;
    return localStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = () => {
  let accessToken = null;
  let isToken = localStorage.getItem("sk.token" || "");
  if (isToken !== null && isToken) {
    let tokenData = JSON.parse(isToken);
    if (tokenData !== null && tokenData.accessToken !== undefined) {
      accessToken = tokenData.accessToken;
    }
  }

  return accessToken;
};

export function validateFileExt(fileName: any, validFileExtensions: any[]) {
  if (fileName.length > 0) {
    let blnValid = false;
    for (let j = 0; j < validFileExtensions.length; j++) {
      let validExt = validFileExtensions[j];
      if (
        fileName
          .substr(fileName.length - validExt.length, validExt.length)
          .toLowerCase() === validExt.toLowerCase()
      ) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) return false;
  }
  return true;
}

