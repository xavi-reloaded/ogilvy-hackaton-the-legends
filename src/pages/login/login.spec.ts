import {async, ComponentFixture} from '@angular/core/testing';
import {LoginPage} from "./login";
import {Session} from "../../models/Session";
import {ServicesPage} from "../services/services";
import {RegisterPage} from "../register/register";
import {TestUtils} from "../../../test-config/test-utils";

let fixture: ComponentFixture<LoginPage>;
let instance: any = null;

describe('LoginPage', function () {

  beforeEach(async(() => TestUtils.beforeEachCompiler({components: [LoginPage]}).then(compiled => {
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


  it('ionViewWillEnter', () => {
    spyOn(instance["menu"], 'enable').and.callThrough();

    instance.ionViewWillEnter();

    expect(instance["menu"].enable).toHaveBeenCalledWith(false);
  });

  it('ionViewWillLeave', () => {
    spyOn(instance["menu"], 'enable').and.callThrough();

    instance.ionViewWillLeave();

    expect(instance["menu"].enable).toHaveBeenCalledWith(true);
  });

  it('makeLogin', () => {
    spyOn(instance["loaderService"], 'on').and.callThrough();
    spyOn(instance["keyboard"], 'close').and.callThrough();
    spyOn(instance["authService"], 'login').and.callThrough();

    instance.makeLogin();

    expect(instance["loaderService"].on).toHaveBeenCalled();
    expect(instance["keyboard"].close).toHaveBeenCalled();
    expect(instance["authService"].login).toHaveBeenCalled();
  });

  it('loginCorrect', () => {
    spyOn(instance["loaderService"], 'off').and.callThrough();
    spyOn(instance["authorizationService"], 'setCurrentSession').and.callThrough();
    spyOn(instance, 'goServicesPage').and.callThrough();
    let session: Session = new Session();

    instance.loginCorrect(session);

    expect(instance["loaderService"].off).toHaveBeenCalled();
    expect(instance["authorizationService"].setCurrentSession).toHaveBeenCalledWith(session);
    expect(instance.goServicesPage).toHaveBeenCalledWith();
  });

  it('loginError', () => {
    spyOn(instance["loaderService"], 'off').and.callThrough();

    instance.loginError();

    expect(instance["loaderService"].off).toHaveBeenCalledWith();
  });

  it('goToCreateAccountPage', () => {
    spyOn(instance["navCtrl"], 'push').and.callThrough();

    instance.goToCreateAccountPage();

    expect(instance["navCtrl"].push).toHaveBeenCalledWith(RegisterPage);
  });

  it('goServicesPage', () => {
    spyOn(instance["navCtrl"], 'setRoot').and.callThrough();

    instance.goServicesPage();

    expect(instance["navCtrl"].setRoot).toHaveBeenCalledWith(ServicesPage);
  });
});
