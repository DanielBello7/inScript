


import { expect } from "chai";
import extensionTruncate from '../lib/extensionTrauncate';


describe.only('Extension Trauncate', () => {

     it('should return file extension', () => {
          const result = extensionTruncate('image/png');
          expect(result).to.be.eql('png');
     })

     it('should throw error on error', () => {
          const result = extensionTruncate('image');
          expect(result).to.be.eq('');
     })
});