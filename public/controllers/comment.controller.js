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
class CommentController {
    constructor(connection) {
        this.PostComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newComment = {
                createdBy: req.user._id,
                for: req.body.for,
                text: req.body.text
            };
            try {
                const response = yield this.conn.CreateComment(newComment, req.body.type);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const commentID = req.params.commentID;
            try {
                const response = yield this.conn.GetComment(commentID);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetPostComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postID = req.params.postID;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetPostComments(postID, page ? page : 1, limit ? limit : 5);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.GetAllCommentsForComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const commentID = req.params.commentID;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            try {
                const response = yield this.conn.GetCommentComments(commentID, page ? page : 1, limit ? limit : 5);
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
// main exports
exports.default = CommentController;
