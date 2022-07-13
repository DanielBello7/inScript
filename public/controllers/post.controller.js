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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_config_1 = __importDefault(require("../config/bunyan.config"));
class PostController {
    constructor(connection) {
        this.NewPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                createdBy: req.user._id,
                postType: req.body.postType,
                text: req.body.text,
                likes: 0,
                media: req.body.media,
                reposts: 0,
                mediaType: 'image'
            };
            try {
                const response = yield this.conn.NewPost(newPost);
                if (!response)
                    return res.status(400).json({ msg: 'error making post' });
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetSinglePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postID = req.params.postID;
            try {
                const response = yield this.conn.GetPost(postID);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetAllPost(page ? page : 1, limit ? limit : 5);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUserPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.userID;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetUserPosts(user, page ? page : 1, limit ? limit : 5);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUserLikedPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.userID;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetUserLikedPosts(user, page ? page : 1, limit ? limit : 5);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetUserRepostedPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.userID;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetUserRepostedPosts(user, page ? page : 1, limit ? limit : 5);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.LikePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postID = req.params.postID;
            try {
                const response = yield this.conn.LikePost(postID, req.user._id);
                if (!response)
                    return res.status(400).json({ msg: 'error liking post' });
                return res.json({ msg: 'successful', success: 1 });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.UnlikePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postID = req.params.postID;
            try {
                const response = yield this.conn.UnlikePost(postID, req.user._id);
                if (!response)
                    return res.status(400).json({ msg: 'error unliking post' });
                return res.json({ msg: 'successful', success: 1 });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.RepostPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postID = req.params.postID;
            try {
                const response = yield this.conn.RepostPost(postID, req.user._id);
                if (!response)
                    return res.status(400).json({ msg: 'error reposting' });
                return res.json({ msg: 'repost successful', success: 1 });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.UnRepostPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postID = req.params.postID;
            try {
                const response = yield this.conn.UnRepostPost(postID, req.user._id);
                if (!response)
                    return res.status(400).json({ msg: 'error unreposting' });
                return res.json({ msg: 'successful', success: 1 });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetRandomPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.conn.GetARandomPost();
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.conn = connection;
    }
}
// main export
exports.default = PostController;
