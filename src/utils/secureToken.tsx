export const decodeBase64 = (encodedString : any) => {
    try {
      if(encodedString) return atob(encodedString);
    } catch (e) {
      console.error("Failed to decode Base64 string:", e);
      return {error :"Something went worng!"};
    }
  }