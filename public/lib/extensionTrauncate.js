"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extensionTruncate(mimeType) {
    const file = mimeType.split('/');
    if (!file[1])
        return '';
    return file[1];
}
exports.default = extensionTruncate;
