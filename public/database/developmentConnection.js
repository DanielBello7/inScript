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
Object.defineProperty(exports, "__esModule", { value: true });
const Paginate_1 = require("../middlewares/Paginate");
// import bcrypt from 'bcrypt';
class DevelopmentAPI {
    constructor() {
        this.users = [
            {
                _id: '224iuvae',
                firstName: 'Daniel',
                lastName: 'Benson',
                email: 'daniel@gmail.com',
                password: '$2b$10$5EgyJZGKB3ODP//HePhLGe97p8aZvJzyG2Fw5u2H.QOW2ZcHuikPa',
                // password: 'daniel'
            },
            {
                _id: '914jlaeov',
                firstName: 'David',
                lastName: 'Bello',
                email: 'david@gmail.com',
                password: '$2b$10$2qTzPR0PDkL0eah4b5.4reUsp7Y0KejI7hX2IjunAksWjl5KJmLy2',
                // password: 'david'
            },
            {
                _id: '0724lbae',
                firstName: 'Joshua',
                lastName: 'Badmius',
                email: 'joshua@gmail.com',
                password: '$2b$10$Y2DpDOx6Q6UMqZxnzkrg5OS.64k.oJdJg4rvjEV05xuqd3qt1kvjq',
                // password: 'joshua'
            },
        ];
        this.posts = [];
    }
    // Users
    GetUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, Paginate_1.LocalPaginate)(this.users, page, limit);
            return response;
        });
    }
    GetUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedUser = this.users.filter(user => user.email === id);
            return selectedUser;
        });
    }
    GetRandomUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // const selectedUser = this.users.filter(user => user.email === id);
            return [];
        });
    }
    CreateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = Math.random().toString();
            const newUser = Object.assign(Object.assign({}, user), { _id });
            this.users.push(newUser);
            return newUser;
        });
    }
    ModifyUser(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let changed = false;
            const newData = this.users.map(user => {
                if (user.email !== email)
                    return user;
                changed = true;
                if (data.firstName)
                    user.firstName = data.firstName;
                if (data.lastName)
                    user.lastName = data.lastName;
                return user;
            });
            this.users = newData;
            if (!changed)
                return false;
            return true;
        });
    }
    DeleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    AddConnection(email, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    GetConnections(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    RemoveConnection(email, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    GetProfileImg(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return "";
        });
    }
    // Posts
    NewPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // const newPost = {
            //    ...data,
            //    likedBy: [],
            //    repostedBy: [],
            //    comments: [],
            //    _id: `${Math.random()}`,
            //    createdAt: new Date()
            // }
            // this.posts.push(newPost);
            return {};
        });
    }
    GetPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.posts.filter(post => post._id === id);
            return result;
        });
    }
    GetARandomPost() {
        return __awaiter(this, void 0, void 0, function* () {
            // const result = this.posts.filter(post => post._id === id);
            return {};
        });
    }
    GetAllPost(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, Paginate_1.LocalPaginate)(this.posts, page, limit);
            return response;
        });
    }
    GetUserPosts(email, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPosts = this.users.find(user => user.email === email);
            const results = yield (0, Paginate_1.LocalPaginate)(userPosts === null || userPosts === void 0 ? void 0 : userPosts.posts, page, limit);
            return results;
        });
    }
    GetUserLikedPosts(email, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPosts = this.users.find(user => user.email === email);
            const results = yield (0, Paginate_1.LocalPaginate)(userPosts === null || userPosts === void 0 ? void 0 : userPosts.posts, page, limit);
            return results;
        });
    }
    GetUserRepostedPosts(email, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPosts = this.users.find(user => user.email === email);
            const results = yield (0, Paginate_1.LocalPaginate)(userPosts === null || userPosts === void 0 ? void 0 : userPosts.posts, page, limit);
            return results;
        });
    }
    LikePost(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    UnlikePost(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    RepostPost(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    UnRepostPost(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    // Comments
    CreateComment(data, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    GetComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return [{}];
        });
    }
    GetPostComments(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    GetCommentComments(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    // Uploads
    NewUpload(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    GetImage(imgId) {
        return __awaiter(this, void 0, void 0, function* () {
            return [{}];
        });
    }
    DeleteImage(imgId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    // Notifications
    GetNotifications(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    ChangeNotificationStatus(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    DeleteNotification(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    ClearAllNotifications(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    CreateNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
}
exports.default = DevelopmentAPI;
