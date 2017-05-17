import {async, ComponentFixture} from '@angular/core/testing';
import {LogOutPage} from "./log-out";
import {LoginPage} from "../login/login";
import {TestUtils} from "../../../test-config/test-utils";

let fixture: ComponentFixture<LogOutPage>;
let instance: any = null;

describe('LogOutPage', function () {

  beforeEach(async(() => TestUtils.beforeEachCompiler({components: [LogOutPage]}).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.autoDetectChanges(true);
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(fixture).not.toBeNull();
    expect(instance).not.toBeNull();
  });

  it('ionViewDidLoad', () => {
    spyOn(instance['authService'], 'logout').and.callThrough();
    spyOn(instance['loaderService'], 'on').and.callThrough();
    instance.ionViewDidLoad();
    expect(instance['loaderService'].on).toHaveBeenCalled();
    expect(instance['authService'].logout).toHaveBeenCalled();
  });

  it('logoutSuccess', () => {
    spyOn(instance['loaderService'], 'off').and.callThrough();
    spyOn(instance['authorizationService'], 'removeCurrentSession').and.callThrough();
    spyOn(instance, 'goToLoginPage').and.callThrough();

    instance.logoutSuccess(true);

    expect(instance['loaderService'].off).toHaveBeenCalled();
    expect(instance['authorizationService'].removeCurrentSession).toHaveBeenCalled();
    expect(instance.goToLoginPage).toHaveBeenCalled();
  });

  it('logoutError', () => {
    spyOn(instance['loaderService'], 'off').and.callThrough();
    spyOn(instance['authorizationService'], 'removeCurrentSession').and.callThrough();
    spyOn(instance, 'goToLoginPage').and.callThrough();

    instance.logoutError(null);

    expect(instance['loaderService'].off).toHaveBeenCalled();
    expect(instance['authorizationService'].removeCurrentSession).toHaveBeenCalled();
    expect(instance.goToLoginPage).toHaveBeenCalled();
  });

  it('goToLoginPage', () => {
    spyOn(instance['navCtrl'], 'setRoot').and.callThrough();

    instance.goToLoginPage();

    expect(instance['navCtrl'].setRoot).toHaveBeenCalledWith(LoginPage);
  });
});
