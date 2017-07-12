import escape from 'lodash.escape';

export const highlightPreTag = '__algolia__highlight__pre__tag__';
export const highlightPostTag = '__algolia__highlight__post__tag__';

export const escapeAndReplaceTag = value => {
  return escape(value)
    .replace(new RegExp(highlightPreTag, 'g'), '<em>')
    .replace(new RegExp(highlightPostTag, 'g'), '</em>');
};
