const { User, Image } = require('../../../../models');
const __ = require('lodash');
const { extractUpload } = require('../../../../utils/extractUpload');
const path = require('path');

module.exports = async (_, args, req) => {
    try {
        const imageInfo = await extractUpload(args, req.user.id);
        imageInfo._user = req.user.id;
        const image = await Image.findOneAndUpdate(
            { _user: req.user.id },
            { $set: imageInfo },
            { upsert: true, new: true }
        );
        console.log(image, 'image');
        return args.file;
    } catch (e) {
        console.log(e);
    }
    // const { createReadStream, filename } = await file;

    // const storedFileName = `${shortId.generate()}-${filename}`;
    // const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);
};
