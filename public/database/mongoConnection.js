"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
const mongoose_1 = __importDefault(require("mongoose"));
const Comments_models_1 = __importDefault(require("../models/Comments.models"));
const Image_models_1 = __importDefault(require("../models/Image.models"));
const Post_models_1 = __importDefault(require("../models/Post.models"));
const User_models_1 = __importDefault(require("../models/User.models"));
const NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
class MongoConnection {
    constructor(url) {
        mongoose_1.default.connect(url, {}, () => {
            bunyan_config_1.default.info('connected to database');
        });
    }
    // Users
    GetUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.find({ email: email });
            if (response.length <= 0)
                return [];
            return [response[0]._doc];
        });
    }
    GetRandomUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.aggregate([
                { $match: { email: { $ne: email } } },
                { $sample: { size: 1 } }
            ]);
            return response[0];
            // const total = await UserModel.countDocuments();
            // const random = Math.floor(Math.random() * total);
            // const response = await UserModel.findOne({email: {$ne: email}}).skip(random);
            // console.log(response);
            // return response._doc;
        });
    }
    GetUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const total = yield User_models_1.default.countDocuments().exec();
            const response = yield User_models_1.default.find().limit(limit).skip(startIndex).exec();
            const resUsers = response.map(result => {
                const _a = result._doc, { password, comments, uploads } = _a, newResUser = __rest(_a, ["password", "comments", "uploads"]);
                return newResUser;
            });
            const payload = {
                currentPage: page,
                hasMore: endIndex < total,
                limit: limit,
                results: resUsers,
                totalFound: total
            };
            return payload;
        });
    }
    CreateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_models_1.default({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            });
            const response = yield newUser.save();
            if (!response)
                return false;
            return response;
        });
    }
    ModifyUser(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.updateOne({ email: email }, { $set: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profileImg: data.profileImg
                } });
            if (response.modifiedCount <= 0)
                return false;
            return true;
        });
    }
    DeleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.deleteOne({ email: email });
            if (response.deletedCount <= 0)
                return false;
            return true;
        });
    }
    GetConnections(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.findOne({ email: email })
                .select('connections')
                .populate('connections', ['_id', 'firstName', 'lastName', 'profileImg', 'email', 'connections']);
            return response.connections;
        });
    }
    AddConnection(email, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserConnections = yield User_models_1.default.updateOne({ email: email }, { $push: { connections: connection } });
            if (updateUserConnections.modifiedCount < 1)
                return false;
            return true;
        });
    }
    RemoveConnection(email, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUserConnections = yield User_models_1.default.updateOne({ email: email }, { $pull: { connections: connection } });
            if (updateUserConnections.modifiedCount < 1)
                return false;
            return true;
        });
    }
    GetProfileImg(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.findOne({ email: email });
            return response.profileImg;
        });
    }
    // Posts
    NewPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = new Post_models_1.default({
                text: data.text,
                createdBy: data.createdBy,
                likes: data.likes,
                reposts: data.reposts,
                postType: data.postType,
                mediaType: data.mediaType,
                media: data.media
            });
            const response = yield newPost.save();
            if (!response)
                return false;
            const updateUser = yield User_models_1.default.updateOne({ _id: data.createdBy }, { $push: { posts: response._id } });
            if (updateUser.matchedCount <= 0)
                return false;
            return response;
        });
    }
    GetPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield Post_models_1.default.findOne({ _id: id })
                .populate('createdBy', ['firstName', 'lastName', 'email', 'profileImg']);
            return [response];
        });
    }
    GetARandomPost() {
        return __awaiter(this, void 0, void 0, function* () {
            // const response = await PostModel.aggregate([
            //      {$sample: {size: 1}}
            // ])
            const total = yield Post_models_1.default.countDocuments();
            const random = Math.floor(Math.random() * total);
            const response = yield Post_models_1.default.findOne()
                .populate('createdBy', ['firstName', 'lastName', 'email', 'profileImg']).skip(random);
            return response;
        });
    }
    GetAllPost(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const total = yield Post_models_1.default.countDocuments().exec();
            const response = yield Post_models_1.default.find().populate('createdBy', ['firstName', 'lastName', 'email', 'profileImg']).limit(limit).skip(startIndex).exec();
            const payload = {
                currentPage: page,
                hasMore: endIndex < total,
                limit: limit,
                results: response,
                totalFound: total
            };
            return payload;
        });
    }
    GetUserPosts(email, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const count = yield User_models_1.default.find({ email: email });
            const total = count[0].posts.length;
            const response = yield User_models_1.default.findOne({ email: email })
                .select('posts')
                .populate([
                {
                    path: 'posts',
                    populate: {
                        path: 'createdBy',
                        select: ['firstName', 'lastName', 'email', 'profileImg']
                    }
                }
            ]);
            const selectedPoints = response.posts.slice(startIndex, endIndex);
            const payload = {
                currentPage: page,
                hasMore: endIndex < total,
                limit: limit,
                results: selectedPoints,
                totalFound: total
            };
            return payload;
        });
    }
    GetUserLikedPosts(email, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const count = yield User_models_1.default.find({ email: email });
            const total = count[0].likedPosts.length;
            const response = yield User_models_1.default.findOne({ email: email })
                .select('likedPosts')
                .populate([
                {
                    path: 'likedPosts',
                    populate: {
                        path: 'createdBy',
                        select: ['firstName', 'lastName', 'email', 'profileImg']
                    }
                }
            ]);
            const selectedPoints = response.likedPosts.slice(startIndex, endIndex);
            const payload = {
                currentPage: page,
                hasMore: endIndex < total,
                limit: limit,
                results: selectedPoints,
                totalFound: total
            };
            return payload;
        });
    }
    GetUserRepostedPosts(email, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const count = yield User_models_1.default.find({ email: email });
            const total = count[0].repostedPosts.length;
            const response = yield User_models_1.default.findOne({ email: email })
                .select('repostedPosts')
                .populate([
                {
                    path: 'repostedPosts',
                    populate: {
                        path: 'createdBy',
                        select: ['firstName', 'lastName', 'email', 'profileImg']
                    }
                }
            ]);
            const selectedPoints = response.repostedPosts.slice(startIndex, endIndex);
            const payload = {
                currentPage: page,
                hasMore: endIndex < total,
                limit: limit,
                results: selectedPoints,
                totalFound: total
            };
            return payload;
        });
    }
    LikePost(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateLikes = yield Post_models_1.default.updateOne({ _id: id }, { $inc: { likes: 1 } });
            if (updateLikes.matchedCount < 1)
                return false;
            const updateLikers = yield Post_models_1.default.updateOne({ _id: id }, { $push: { likedBy: user } });
            if (updateLikers.modifiedCount < 1)
                return false;
            const updateUser = yield User_models_1.default.updateOne({ _id: user }, { $push: { likedPosts: id } });
            if (updateUser.modifiedCount < 1)
                return false;
            return true;
        });
    }
    UnlikePost(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const dislike = yield Post_models_1.default.updateOne({ _id: id }, { $inc: { likes: -1 } });
            if (dislike.modifiedCount < 1)
                return false;
            const removeUserFromLikedList = yield Post_models_1.default.updateOne({ _id: id }, { $pull: { likedBy: user } });
            if (removeUserFromLikedList.modifiedCount < 1)
                return false;
            const updateUser = yield User_models_1.default.updateOne({ _id: user }, { $pull: { likedPosts: id } });
            if (updateUser.modifiedCount < 1)
                return false;
            return true;
        });
    }
    RepostPost(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateSelectedPost = yield Post_models_1.default.updateOne({ _id: id }, { $inc: { reposts: 1 } });
            if (updateSelectedPost.modifiedCount < 1)
                return false;
            const addUserToRepostList = yield Post_models_1.default.updateOne({ _id: id }, { $push: { repostedBy: user } });
            if (addUserToRepostList.modifiedCount < 1)
                return false;
            const updateUser = yield User_models_1.default.updateOne({ _id: user }, { $push: { repostedPosts: id } });
            if (updateUser.modifiedCount < 1)
                return false;
            return true;
        });
    }
    UnRepostPost(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatePostRepost = yield Post_models_1.default.updateOne({ _id: id }, { $inc: { reposts: -1 } });
            if (updatePostRepost.modifiedCount < 1)
                return false;
            const addUser = yield Post_models_1.default.updateOne({ _id: id }, { $pull: { repostedBy: user } });
            if (addUser.modifiedCount < 1)
                return false;
            const updateUser = yield User_models_1.default.updateOne({ _id: user }, { $pull: { repostedPosts: id } });
            if (updateUser.modifiedCount < 1)
                return false;
            return true;
        });
    }
    // Comments
    CreateComment(data, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = new Comments_models_1.default(Object.assign({}, data));
            const response = yield newComment.save();
            if (!response)
                return false;
            const commentID = response._id;
            const updateUser = yield User_models_1.default.updateOne({ _id: data.createdBy }, { $push: { comments: commentID } });
            if (updateUser.modifiedCount < 1)
                return false;
            if (type === 'post') {
                const updatePost = yield Post_models_1.default.updateOne({ _id: data.for }, { $push: { comments: commentID } });
            }
            else {
                const updateComment = yield Comments_models_1.default.updateOne({ _id: data.for }, { $push: { comments: commentID } });
            }
            return response;
        });
    }
    GetComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield Comments_models_1.default.findOne({ _id: id }).populate('createdBy', ['firstName', 'lastName', 'email', 'profileImg']);
            return [response];
        });
    }
    GetPostComments(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const total = yield Post_models_1.default.findOne({ _id: id });
            const mainTotal = total.comments.length;
            const response = yield Post_models_1.default.findOne({ _id: id })
                .select('comments')
                .populate([
                {
                    path: 'comments',
                    populate: {
                        path: 'createdBy',
                        select: ['firstName', 'lastName', 'email', 'profileImg']
                    }
                }
            ]);
            const selectedPoints = response.comments.slice(startIndex, endIndex);
            const payload = {
                currentPage: page,
                hasMore: endIndex < mainTotal,
                limit: limit,
                results: selectedPoints,
                totalFound: mainTotal
            };
            return payload;
        });
    }
    GetCommentComments(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const total = yield Comments_models_1.default.findOne({ _id: id });
            const mainTotal = total.comments.length;
            const response = yield Comments_models_1.default.findOne({ _id: id })
                .select('comments')
                .populate([
                {
                    path: 'comments',
                    populate: {
                        path: 'createdBy',
                        select: ['firstName', 'lastName', 'email', 'profileImg']
                    }
                }
            ]);
            const selectedPoints = response.comments.slice(startIndex, endIndex);
            const payload = {
                currentPage: page,
                hasMore: endIndex < mainTotal,
                limit: limit,
                results: selectedPoints,
                totalFound: mainTotal
            };
            return payload;
        });
    }
    // Image / Uploads
    NewUpload(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newImage = new Image_models_1.default(Object.assign({}, data));
            const response = yield newImage.save();
            if (!response)
                return false;
            const updateUser = yield User_models_1.default.updateOne({ _id: data.createdBy }, { $push: { uploads: response._id } });
            if (updateUser.modifiedCount < 1)
                return false;
            return response;
        });
    }
    GetImage(imgId) {
        return __awaiter(this, void 0, void 0, function* () {
            const getImage = yield Image_models_1.default.find({ _id: imgId });
            return getImage;
        });
    }
    DeleteImage(imgId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield Image_models_1.default.deleteOne({ _id: imgId });
            if (response.deletedCount <= 0)
                return false;
            return true;
        });
    }
    // Notifications
    GetNotifications(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.findOne({ email: email }).select('notifications').populate('notifications');
            return response.notifications;
        });
    }
    ChangeNotificationStatus(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield NotificationModel_1.default.updateOne({ _id: id }, { $set: { isRead: true } });
            if (response.modifiedCount < 1)
                return false;
            return true;
        });
    }
    DeleteNotification(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield User_models_1.default.updateOne({ email: email }, { $pull: { notifications: id } });
            const response = yield NotificationModel_1.default.deleteOne({ _id: id });
            if (response.deletedCount < 1)
                return false;
            return true;
        });
    }
    ClearAllNotifications(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User_models_1.default.updateOne({ email: email }, { $pullAll: { notifications: '' } });
            if (response.modifiedCount < 1)
                return false;
            return true;
        });
    }
    CreateNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new NotificationModel_1.default({
                title: data.title,
                content: data.content,
                isRead: false,
                createdFrom: data.createdBy,
                for: data.for
            });
            const submitResponse = yield response.save();
            if (!submitResponse)
                return false;
            const saveNotification = yield User_models_1.default.updateOne({ _id: data.for }, { $push: { notifications: submitResponse._id } });
            return submitResponse;
        });
    }
}
// main exports
exports.default = MongoConnection;
