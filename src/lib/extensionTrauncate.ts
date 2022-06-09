


export default function extensionTruncate(mimeType: string) {

     const file = mimeType.split('/');

     if (!file[1]) return ''

     return file[1];
}