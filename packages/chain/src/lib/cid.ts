import { readdir } from 'node:fs/promises';
import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'
import path from 'path'

export const generateCID = async (content: any): Promise<string> => {
  // Encode the content
  const bytes = json.encode(content)

  // Hash the encoded content
  const hash = await sha256.digest(bytes)

  // Create a CID
  const cid = await CID.create(1, json.code, hash)

  // Return the CID as a string
  return cid.toString()
}

