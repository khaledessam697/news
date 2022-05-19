const Blog = require('../../../../models/Blog');
const Image = require('../../../../models/Image');
const InvalidInputError = require('../../../../errors/InvalidInputError');
const AWS = require('aws-sdk');
const awsCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const validations = require('./Blogs.validation');
//database services
const Lang = {
  En: 'En',
  Ar: 'Ar',
};
exports.GetBlog = async (req) => {
  return await Blog.find({})
    .sort('-date')
    .populate('coverPhoto')
    .populate('user', { password: 0, __v: 0, id: 0 });
};

exports.GetBlogById = async (req) => {
  const id = req.params.id;
  return await Blog.findById(id).populate('coverPhoto').populate('user');
};
exports.AddBlog = async (req) => {
  const validationResult = await validateBlog(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    throw new InvalidInputError(validationResult.error, 'Joi');
    // return apiResponse.ErrorResponse(res, validationResult.error);
  }
  console.log('userrr', req.user);
  const file = req.files[0];
  console.log(req.files.length);
  // console.log(file);
  const fileKeys = file.key.split('/');
  const filename = fileKeys[fileKeys.length - 1];
  const folder = fileKeys[0];
  newImage = new Image({
    filename: filename,
    name: file.originalname,
    size: file.size,
    path: file.location,
    folder: folder,
    key: file.key,
  });
  await newImage.save();

  req.body.coverPhoto = newImage._id;
  req.body.user = req.user._id;
  await Blog.create(req.body);
};

/*{
  coverPhoto :file[0], 
  category,
  title,
  content,

}
}*/
exports.updateBlog = async (req) => {
  const id = req.query.id;
  console.log(req.query);
  const newInfo = req.body;
  const file = req.files[0];

  if (req.files.length > 0) {
    console.log(req.files.length);
    // console.log(file);
    const fileKeys = file.key.split('/');
    const filename = fileKeys[fileKeys.length - 1];
    const folder = fileKeys[0];
    newImage = new Image({
      filename: filename,
      name: file.originalname,
      size: file.size,
      path: file.location,
      folder: folder,
      key: file.key,
    });
    await newImage.save();
  }

  console.log('xxxxxxxxxxxxx', req.body.coverPhoto);

  req.body.coverPhoto =
    req.files.length > 0 ? newImage._id : req.body.coverPhoto;
  await Blog.updateOne({ _id: id }, { ...req.body });
};

exports.deleteBlog = async (req, res) => {
  const id = req.query.id;
  const blog = await Blog.findByIdAndDelete({
    _id: id,
  });

  if (!blog) return apiResponse.ErrorResponse(res, 'something went wrong!');

  return blog;
};

//end of database services

//#region Joi Validation

const validateBlog = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};
