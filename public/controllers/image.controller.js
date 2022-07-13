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
const extensionTrauncate_1 = __importDefault(require("../lib/extensionTrauncate"));
const path_1 = __importDefault(require("path"));
const cloudinaryImageSave_1 = __importDefault(require("../lib/cloudinaryImageSave"));
class ImageController {
    constructor(connection) {
        this.GetImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const imageID = req.params.img;
            try {
                const response = yield this.conn.GetImage(imageID);
                return res.json({ payload: response });
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.PostImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!req.files)
                return res.status(400).json({ msg: 'no file' });
            const check = req.files.image_file;
            if (check.length > 1)
                return res.status(413).json({ msg: 'max 1 file' });
            const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image_file;
            const newImage = {
                createdBy: '',
                data: '',
                extension: (0, extensionTrauncate_1.default)(file.mimetype),
                name: file.name,
                size: file.size
            };
            try {
                file.mv(path_1.default.join(__dirname, `../img/${file.name}`), (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        return res.status(400).json({ msg: 'error saving file' });
                    const response = yield this.conn.NewUpload(newImage);
                    return res.json({ payload: response });
                }));
            }
            catch (error) {
                bunyan_config_1.default.error(error);
                return res.status(500).json({ msg: error.message });
            }
        });
        this.CloudinarySave = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const saveImg = yield (0, cloudinaryImageSave_1.default)(req.body.image_file);
                const newImage = {
                    createdBy: req.user._id,
                    data: saveImg.url,
                    extension: req.body.extension,
                    name: req.body.name,
                    size: req.body.size
                };
                const response = yield this.conn.NewUpload(newImage);
                if (!response)
                    return res.status(400).json({ msg: 'error uploading image' });
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
exports.default = ImageController;
