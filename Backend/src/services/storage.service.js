import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFile({buffer, fileName, folder = "Arc"}) {
    try {
        const result = await client.files.upload({
            file: await ImageKit.toFile(buffer),
            fileName,
            folder,
        })
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}