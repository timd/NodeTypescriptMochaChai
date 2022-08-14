import "mocha";
import Sinon, * as sinon from "sinon";
import { expect } from 'chai';

import * as MyFunctions from "../myFunctions";

describe('The tests', () => {

  it('should work', () => {
    const result = MyFunctions.myFunction('name');
    expect(result).to.equal('name');
  });

});

describe('Mocking a function', () => {
  
  var sandbox: Sinon.SinonSandbox;
  var mockObj: any;

  beforeEach( () => {
    sandbox = sinon.createSandbox();
  });

  afterEach( () => {
    sandbox.restore();
  });

  it('should work and return the original value when it`s not overridden', () => {
    const result = MyFunctions.constReturnOne();
    expect(result).to.equal(1);
  });

  it('should work and return 55 when overriden', () => {
    mockObj = sandbox.stub(MyFunctions, "constReturnOne").returns(55);
    const result = MyFunctions.constReturnOne();
    expect(result).to.equal(55);
  });

  it('should work and return 33 when overridden again', () => {
    mockObj = sandbox.stub(MyFunctions, "constReturnOne").returns(33);
    const result = MyFunctions.constReturnOne();
    expect(result).to.equal(33);
  });

});

describe('Spying on functions', () => {

  var sandbox: Sinon.SinonSandbox;
  var spy: any;

  beforeEach( () => {
    sandbox = sinon.createSandbox();
  });

  afterEach( () => {
    sandbox.restore();
  });

  it('should work when the function isn\'t called at all', () => {
    var spy = sandbox.spy(MyFunctions, 'constReturnOne');
    expect(spy.callCount).to.equal(0);
  });

  it('should work when the function is called once', () => {
    var spy = sandbox.spy(MyFunctions, 'constReturnOne');
    MyFunctions.constReturnOne();
    expect(spy.callCount).to.equal(1);
  });

  it('should work when the function is called twice', () => {
    var spy = sandbox.spy(MyFunctions, 'constReturnOne');
    MyFunctions.constReturnOne();
    MyFunctions.constReturnOne();
    expect(spy.callCount).to.equal(2);
  });

});