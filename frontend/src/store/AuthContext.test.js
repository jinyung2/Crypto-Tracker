import React, { useContext } from 'react';

import {AuthContext, AuthContextProvider} from './AuthContext';
import TestRenderer from 'react-test-renderer';


describe('AuthContextProvider', () => {
    let providerCtx = null;
    let mount = null;
    let unmount = null;
  
    beforeEach(() => {
      jest.useFakeTimers();
  
      const ProviderChild = function() {
        providerCtx = useContext(AuthContext);
        return null;
      };
  
      mount = () => {
        const renderer = TestRenderer.create(
          <AuthContextProvider>
            <ProviderChild />
          </AuthContextProvider>
        );
        unmount = () => {
          renderer.unmount();
        };
        return renderer;
      };
    });
  
    afterEach(() => {
      if (unmount) {
        unmount();
      }
    });
  
    it('should be in loading state at first render', () => {
        mount();

        expect(providerCtx.active).toBe(false);
        expect(providerCtx.token).toBe(null);
    });
})