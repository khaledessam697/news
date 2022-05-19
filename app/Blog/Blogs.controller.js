const Services = require("./Blogs.Services");


module.exports.GetBlogById = async (req, res, next) => {
    try {
        const info = await Services.GetBlogById(req);
        return res.status(200).json({
            is_success: true,
            info
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
}
module.exports.GetBlog = async (req, res, next) => {
    try {
        const info = await Services.GetBlog(req);
        return res.status(200).json({
            is_success: true,
            info
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
}

module.exports.AddBlog = async (req, res, next) => {
    try {
        //await Services.validatePageInfo(req);
         await Services.AddBlog(req);
        return res.status(201).json({
            is_success: true,
            
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
}

module.exports.EditBlog = async (req, res, next) => {
    try {
        //await Services.validatePageInfo(req);
        const info = await Services.updateBlog(req);
        return res.status(201).json({
            is_success: true,
            info
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
}

module.exports.DeleteBlog = async (req, res, next) => {
    try {
        //await Services.validatePageInfo(req);
        const info = await Services.deleteBlog(req);
        return res.status(200).json({
            is_success: true,
            info
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
}