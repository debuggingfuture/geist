import { Insertable, Selectable } from 'kysely'

import { Name, NameInKysely } from '../../models'

type SelectableKysely = Selectable<NameInKysely>
type InsertableKysely = Insertable<NameInKysely>

/**
 * Parse `texts` and `addresses` from the database into JSON.
 * @param flatName Name from the database
 */
export function parseNameFromDb(flatName: SelectableKysely): Name
export function parseNameFromDb(flatName: SelectableKysely[]): Name[]
export function parseNameFromDb(
  flatName: SelectableKysely | SelectableKysely[]
): Name | Name[] {
  if (Array.isArray(flatName)) {
    return flatName.map(parseName)
  }

  return parseName(flatName)

  function parseName(name: SelectableKysely) {
    return {
      name: name.name,
      owner: name.owner,
      addresses: name.addresses ? JSON.parse(name.addresses) : undefined,
      texts: name.texts ? JSON.parse(name.texts) : undefined,
      contenthash: name.contenthash || undefined,
      createdAt: name.createdAt,
      updatedAt: name.updatedAt,
    }
  }
}

/**
 * Stringify `texts` and `addresses` from JSON.
 * @param name Name to be inserted into the database
 */
export function stringifyNameForDb(name: Name): InsertableKysely
export function stringifyNameForDb(name: Name[]): InsertableKysely[]
export function stringifyNameForDb(
  name: Name | Name[]
): InsertableKysely | InsertableKysely[] {
  if (Array.isArray(name)) {
    return name.map(stringifyName)
  }

  return stringifyName(name)

  function stringifyName(name: Name) {
    return {
      name: name.name,
      owner: name.owner,
      addresses: name.addresses ? JSON.stringify(name.addresses) : null,
      texts: name.texts ? JSON.stringify(name.texts) : null,
      contenthash: name.contenthash || null,
      updatedAt: new Date().toISOString(),
    }
  }
}


export function arrayBufferToBase64(buffer:any) {
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(buffer)]));
}


function base64ToArrayBuffer(base64:string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}


export const ENCRYPTION_KEY_JWK = {
  "kty": "oct",
  "key_ops": [
      "encrypt",
      "decrypt"
  ],
  "alg": "A256GCM",
  "ext": true,
  "k": "O2URt6f4xF_pQDLAiT3VWWuLee-YQHDhOOFEJHv8SHE"
};

export async function importKeyFromJwk(jwk:any) {
  return await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// to quickly generate hash for demo
// export const encryptDemo = async ()=>{
//   const message = "bafybeifr5olumz4wa4z2hvyhj2qh74z6q5uc2fw3tdhzaqqhk3jdxlc3se";

//   const key = await importKeyFromJwk(ENCRYPTION_KEY_JWK);
//   // const key = await generateKey();
//   const encrypted = await encrypt(message, key);

//   const encryptedBase64 =  arrayBufferToBase64(encrypted);
  
//   const decrypted = await decrypt(encrypted, key);
//   // @ts-ignore
//   const exportedKey = await crypto.subtle.exportKey('jwk', key );

//   console.log('exportedKey', JSON.stringify(exportedKey));
//   console.log('encrypted', encryptedBase64);
//   console.log('decrypted', decrypted);
// }


// Function to convert string to Uint8Array
function str2ab(str:string) {
return new TextEncoder().encode(str);
}

// Function to convert Uint8Array to string
function ab2str(buf:any) {
return new TextDecoder().decode(buf);
}


// Encrypt function
export async function encrypt(plaintext:string, key:any) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = str2ab(plaintext);
  
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    encodedText
  );
  
  const encryptedData = new Uint8Array(iv.length + ciphertext.byteLength);
  encryptedData.set(iv);
  encryptedData.set(new Uint8Array(ciphertext), iv.length);
  
  return encryptedData;
}


