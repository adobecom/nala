const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');
const { requestPost } = require('../functions/request_sync');
const { requestGet } = require('../functions/request_sync');
const path = require('path');

class AemAuthor {
  constructor(url, auth) {
    this.options = {
      baseURL: url,
      auth
    };
  }

  createFolder(contentPath) {
    let paths = [];
    let res = null;
    while (true) {
      try {
        res = requestGet(contentPath + '/.1.json', this.options);
        break;
      } catch (err) {
        let folders = contentPath.split('/');
        paths.unshift(folders.pop());
        contentPath = folders.join('/');
        if (contentPath == '') {
          breark;
        }
      }
    }
    while (paths.length > 0) {
      contentPath = contentPath + '/' + paths.shift();
      res = requestPost(contentPath, 'jcr:primaryType=sling:Folder', this.options);
    }
    return res;
  }

  deletePage(contentPath) {
    return requestPost(contentPath, ':operation=delete', this.options);
  }

  getChildPages(contentPath) {
    let res = requestGet(contentPath + '/.1.json', this.options);
    return res.data;
  }

  uploadToAsset(contentPath, file) {
    let createAssetHtml = `${contentPath}.createasset.html`;
    let data = new FormData();
    data.append('file', fs.createReadStream(file));
    return requestPost(createAssetHtml, data, {
      ...this.options,
      headers: {
        ...data.getHeaders()
      }
    });
  }

  replicatePage(replicateStatus,contentPath) {
    let data = new FormData();
    data.append('cmd', replicateStatus);
    data.append('path', contentPath);
    return requestPost('/bin/replicate', data, {
      ...this.options,
      headers: {
        ...data.getHeaders()
      }
    });
  }
}

module.exports = {
  AemAuthor
};
