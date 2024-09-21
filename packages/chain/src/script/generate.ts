import { processDirectory } from "../lib/build-proof";

  
  async function main() {
    const rootDir = process.argv[2];
  
    if (!rootDir) {
      console.error('Please provide a directory path as an argument.');
      process.exit(1);
    }
  
    try {
      await processDirectory(rootDir);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  main();