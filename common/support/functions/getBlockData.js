/**
 * Get text content contained within the selected block
 * @param {string} selector selector for finding the block on the page to retrieve the text content.
 * @param {string} selectorType selector type used for finding the block. Choices available: className, id, tag, nameAttr, cssSelector.
 *
 * */
export function getBlockText(selector, selectorType) {
    switch (selectorType) {
        case className:
            return $('[class="' + selector + '"]').getText();
        case id:
            return $('#' + selector + '').getText();
        case tag:
            return $('<' + selector + '/>').getText();
        case nameAttr:
            return $('[name="' + selector + '"]').getText();
        default:
            return $('' + selector + '').getText();
    }
}