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
exports.LocalPaginate = void 0;
// main function
function LocalPaginate(model, page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const response = model.slice(startIndex, endIndex);
        return {
            results: response,
            hasMore: endIndex < model.length,
            totalFound: model.length,
            currentPage: page,
            limit: limit
        };
    });
}
exports.LocalPaginate = LocalPaginate;
