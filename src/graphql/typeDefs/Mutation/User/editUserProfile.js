const { User } = require('../../../../models');
const __ = require('lodash');
const { commonHelper } = require('../../../../utils/common');
module.exports = async (_, { input }, req) => {
    console.log('in....', _, input);
    const defulatValue = { name: '', age: 0, job: '', gender: 0, address: '' };
    const extractData = { ...defulatValue, ...__.omit(input, 'id') };
    const newData = await User.findOneAndUpdate({ _id: input.id }, { $set: { ...extractData } }, { new: true });
    return commonHelper.renameKey(newData, 'id', '_id');
};
