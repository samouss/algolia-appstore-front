import React from 'react';
import { shallow } from 'enzyme';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import Provider from '../Provider';

jest.mock('algoliasearch', () => jest.fn(() => ({
  name: 'algolia-client',
})));

jest.mock('algoliasearch-helper', () => jest.fn(() => ({
  name: 'algolia-helper',
})));

describe('algolia', () => {
  describe('<Provider />', () => {
    const defaultProps = {
      appId: 'ALGOLIA_APP_ID',
      apiKey: 'ALGOLIA_API_KEY',
      indexName: 'ALGOLIA_INDEX_NAME',
    };

    it('expect to render', () => {
      const props = {
        ...defaultProps,
      };

      const component = shallow(
        <Provider
          {...props}
        >
          <div>Content</div>
        </Provider>,
      );

      expect(component).toMatchSnapshot();
    });

    it('expect to instanciate client and helper', () => {
      const props = {
        ...defaultProps,
      };

      shallow(
        <Provider
          {...props}
        >
          <div>Content</div>
        </Provider>,
      );

      expect(algoliasearch).toHaveBeenCalledWith(
        props.appId,
        props.apiKey,
      );

      expect(algoliasearchHelper).toHaveBeenCalledWith(
        { name: 'algolia-client' },
        props.indexName,
      );
    });

    it('expect to bind client and helper to context', () => {
      const props = {
        ...defaultProps,
      };

      const component = shallow(
        <Provider
          {...props}
        >
          <div>Content</div>
        </Provider>,
      );

      const expectation = {
        algoliaClient: { name: 'algolia-client' },
        algoliaHelper: { name: 'algolia-helper' },
      };

      const actual = component.instance().getChildContext();

      expect(actual).toEqual(expectation);
    });

    it('expect to call search function onDidMount', () => {
      const props = {
        ...defaultProps,
      };

      algoliasearchHelper.mockImplementationOnce(() => ({
        search: jest.fn(),
      }));

      const component = shallow(
        <Provider
          {...props}
        >
          <div>Content</div>
        </Provider>,
      );

      component.instance().componentDidMount();

      expect(component.instance().helper.search).toHaveBeenCalled();
    });
  });
});
