const path = require('path');
const { createWriteStream, unlinkSync, statSync } = require('fs');
const dir = path.resolve(__dirname, '../asset/image');
const { commonHelper } = require('./common');

exports.extractUpload = async function ({ file, size: fileSize }, userId) {
    console.log(file);
    const { createReadStream, filename } = await file;

    const sufName = '.' + commonHelper.getFileExtensions(filename);

    //圖片儲存路徑
    const targetPath = path.resolve(dir, userId + sufName);

    //將圖片存到本地端及上傳顯示進度
    return await new Promise((resolve, reject) => {
        let processRate = 0;
        const stream = createReadStream();
        const writeStream = createWriteStream(targetPath);
        stream
            .on('error', (err) => {
                if (stream.truncated)
                    // Delete the truncated file
                    unlinkSync(targetPath);
                reject(error);
            })
            .on('data', (chunk) => {
                processRate += chunk.length;
                const curProcessRate = (processRate / fileSize) * 100;
                console.log(`目前上傳進度 ${curProcessRate.toFixed(0)}%`);
            })
            .pipe(writeStream);

        writeStream
            .on('error', (error) => writeStream.destroy(error))
            .on('finish', () => {
                console.log(`檔案上傳成功`);
                const imageInfo = {
                    name: commonHelper.getFileName(filename),
                    path: targetPath,
                    size: fileSize,
                };
                resolve(imageInfo);
            });
    });
};
