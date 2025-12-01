import CryptoJS from "react-native-crypto-js";

const keyHex = "c8ad8e04a84dc70c6a382ac2fc515d6c8cce271bf83af1f09f4bea3fd5b28dd1";
const ivHex = "53715e675024f328aa1dc0e7e9fc44b3";

const key = CryptoJS.enc.Hex.parse(keyHex);
const iv = CryptoJS.enc.Hex.parse(ivHex);

const EncryptionUtil = {

  Encrypt(text: string) {
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return {
      iv: ivHex,
      encryptedData: encrypted.toString(),
    };
  },

  Decrypt(encryptedData: string, ivHex: string) {
    const ivParsed = CryptoJS.enc.Hex.parse(ivHex);

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: ivParsed,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  },

};

export default EncryptionUtil;
