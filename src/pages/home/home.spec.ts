import {async, ComponentFixture} from '@angular/core/testing';
import {HomePage} from "./home";
import {TestUtils} from "../../../test-config/test-utils";

let fixture: ComponentFixture<HomePage>;
let instance: any = null;

describe('HomePage', function () {

  beforeEach(async(() => TestUtils.beforeEachCompiler({components: [HomePage]}).then(compiled => {
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
});
