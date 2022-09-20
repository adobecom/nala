var Confluence = require('confluence-api');
const { promisify } = require('util');
const convert = require('xml-js');

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return value;
  }
}

/** connection to Adobe wiki */
class AdobeWiki {
  constructor(space, username, password) {
    if (process.env.WIKICREDENTIALS) {
      let creds = process.env.WIKICREDENTIALS.split(':');
      username = username || creds[0];
      password = password || creds[1];
    }
    let config = {
      username,
      password,
      baseUrl: 'https://wiki.corp.adobe.com',
      version: 7 // Confluence major version, optional
    };
    this.space = space;
    this.confluence = new Confluence(config);
  }

  async getPageByTitle(title) {
    const getContentByPageTitle = promisify(
      this.confluence.getContentByPageTitle
    ).bind(this.confluence);

    let res = await getContentByPageTitle(this.space, title);

    return res.results;
  }

  normalizeContent(content) {
    let q = [content.elements[0]];
    while (q.length > 0) {
      let e = q.pop();
      if (e.attributes) {
        for (let attr in e.attributes) {
          // js2xml doesn't escape '&' in element attributes
          // Confluence doesn't like it
          if (e.attributes[attr] && e.attributes[attr].includes('&')) {
            e.attributes[attr] = e.attributes[attr].replace(/&amp;/g, '&');
            e.attributes[attr] = e.attributes[attr].replace(/&/g, '&amp;');
          }
        }
      }
      if (e.elements) {
        q.push(...e.elements);
      }
    }
    return content;
  }

  serializeContent(body) {
    let content = body;
    if (typeof content === 'object') {
      content = this.normalizeContent(content);
      content = convert.js2xml(content);
      let m = content.match(/^<root>([\s|\S]*)<\/root>$/);
      if (m) {
        content = m[1];
      }
    }
    return content;
  }

  async updatePage(page, body) {
    const putContent = promisify(this.confluence.putContent).bind(
      this.confluence
    );

    let id = page[0].id;
    let version = page[0].version.number;
    let title = page[0].title;
    let content = this.serializeContent(body);

    version++;
    let res = await putContent(this.space, id, version, title, content);

    return res;
  }

  async createPage(parent, title, body) {
    const postContent = promisify(this.confluence.postContent).bind(
      this.confluence
    );

    let parentId = parent[0].id;
    let content = this.serializeContent(body);

    let res = await postContent(this.space, title, content, parentId);

    return res;
  }

  getBody(page) {
    let rawContent = page[0].body.storage.value;
    // Need to add root and remove root when writing back
    return convert.xml2js(`<root>${rawContent}</root>`);
  }

  /**
   * Find children with name or macroName
   * @param {object} body Content body or element 
   * @param {string} filter.name Filtered by element name
   * @param {string} filter.macroName Filtered by macro name
   * @returns Array of elements
   */
  getElements(body, filter) {
    let elements = null;
    if ('name' in body) {
      elements = body.elements;
    } else {
      // elements[0] is root node
      elements = body.elements[0].elements;
    }
    if (filter) {
      if (filter.macroName) {
        elements = elements.filter(
          x =>
            x.name === 'ac:structured-macro' &&
            x.attributes['ac:name'] === filter.macroName
        );
      } else if (filter.name) {
        elements = elements.filter(x => x.name === filter.name);
      }
    }
    return elements;
  }

  getElementByIndex(body, index) {
    return this.getElements(body)[index];
  }

  getMacroTextBody(element) {
    let textBody = element.elements.find(x => x.name === 'ac:plain-text-body');
    return textBody.elements[0].cdata;
  }

  getMacroTextBodyAsJson(element) {
    return JSON.parse(this.getMacroTextBody(element));
  }

  setMacroTextBody(element, data) {
    let textBody = element.elements.find(x => x.name === 'ac:plain-text-body');
    if (!textBody) {
      textBody = {
        name: 'ac:plain-text-body',
        type: 'element',
        elements: [
          {
            type: 'cdata',
            cdata: null
          }
        ]
      };
      element.elements.push(textBody);
    }
    textBody.elements[0].cdata = data;
    return textBody.elements[0].cdata;
  }

  setMacroTextBodyAsJson(element, data) {
    return this.setMacroTextBody(element, JSON.stringify(data, null, 2));
  }

  /**
   * Extract data from a table
   * @param {object} table 
   * @returns data in the table
   */
  getTableData(table) {
    let obj = {};
    let tbody = this.getElements(table, { name: 'tbody' })[0];
    let count = 1;
    let isArray = false;
    for (let row of tbody.elements) {
      let header = this.getElements(row, { name: 'th' })[0];
      isArray = !header;
      let key = null;
      if (header) {
        key = header.elements[0].text;
      } else {
        key = count;
      }
      let data = this.getElements(row, { name: 'td' })[0];
      let value = null;
      if (data.elements[0].text) {
        value = data.elements[0].text;
        value = filterInt(value);
      } else {
        value = this.getTableData(this.getElements(data, { name: 'table' })[0]);
      }
      obj[key] = value;
      count++;
    }
    if (isArray) {
      obj = Object.keys(obj).map(x => parseInt(x)).sort().map(x => obj[x]);
    }
    return obj;
  }
  getTableCellText(cell) {
    let text = '';
    let q = [...cell.elements];
    while (q.length > 0) {
      let n = q.shift();
      if (n.text) {
        text += n.text;
      }
      if (n.elements) {
        q.unshift(...n.elements);
      }
    }
    return text;
  }
  getTableRowText(row) {
    return row.elements.map(x => this.getTableCellText(x));
  }
  getTableText(table) {
    let tbody = this.getElements(table, { name: 'tbody' })[0];
    return tbody.elements.map(x => this.getTableRowText(x));
  }
}

module.exports = {
  AdobeWiki
};
