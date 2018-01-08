declare let window: any;
declare let global: any, jasmine: any, describe: any, clearTest: any, it: any, expect: any;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

import {DynaFieldWrapper} from '../../src/index';

// help: https://facebook.github.io/jest/docs/expect.html

describe('Button simple etst', () => {
	it('should load the button', () => {
		expect(DynaFieldWrapper).not.toBe(undefined);
	});
});
