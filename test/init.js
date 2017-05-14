import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);
global.expect = chai.expect;
global.spy = chai.spy;
