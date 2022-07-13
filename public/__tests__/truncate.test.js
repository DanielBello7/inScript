"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const extensionTrauncate_1 = __importDefault(require("../lib/extensionTrauncate"));
describe.only('Extension Trauncate', () => {
    it('should return file extension', () => {
        const result = (0, extensionTrauncate_1.default)('image/png');
        (0, chai_1.expect)(result).to.be.eql('png');
    });
    it('should throw error on error', () => {
        const result = (0, extensionTrauncate_1.default)('image');
        (0, chai_1.expect)(result).to.be.eq('');
    });
});
