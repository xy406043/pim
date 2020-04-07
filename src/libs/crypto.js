const CryptoJS = require("crypto-js");
let KEY= "sjaksj12j1nm2128";
export default {

  encode : (word, keyStr) => {
    keyStr = keyStr ? keyStr : KEY;
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },

  decode: (word, keyStr) =>{
    keyStr = keyStr ? keyStr : this.keyStr;
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();

  }
}

