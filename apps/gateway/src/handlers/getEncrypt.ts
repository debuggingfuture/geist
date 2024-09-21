import { IRequest } from 'itty-router'
import { createKysely } from '../db/kysely'
import { Env } from '../env'
import zod from 'zod'
import { arrayBufferToBase64, encrypt, ENCRYPTION_KEY_JWK, importKeyFromJwk } from './functions/utils'


export async function getEncrypt(request: IRequest, env: Env) {

const schema = zod.object({
    hash: zod.string()
})
    const safeParse = schema.safeParse(request.params)
    
    if (!safeParse.success) {
        const response = { error: safeParse.error }
        return Response.json(response, { status: 400 })
      }

//   const db = createKysely(env)

console.log(safeParse.data.hash)
const message = "bafybeifr5olumz4wa4z2hvyhj2qh74z6q5uc2fw3tdhzaqqhk3jdxlc3se";

  const key = await importKeyFromJwk(ENCRYPTION_KEY_JWK);
//   // const key = await generateKey();
  const encrypted = await encrypt(message, key);

  const encryptedBase64 =  arrayBufferToBase64(encrypted);
  
//   const decrypted = await decrypt(encrypted, key);
//   // @ts-ignore
//   const exportedKey = await crypto.subtle.exportKey('jwk', key );

//   console.log('exportedKey', JSON.stringify(exportedKey));
  console.log('encrypted', encryptedBase64);
//   console.log('decrypted', decrypted);

  return Response.json({
    encryptedBase64
  }, {
    status: 200,
  })
}
