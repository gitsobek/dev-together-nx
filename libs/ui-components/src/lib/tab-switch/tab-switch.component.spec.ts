import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TabSwitchComponent } from './tab-switch.component';
import { TabSwitchConfig } from '@dev-together/ui-components';
import { ListType } from '@dev-together/blog';

describe('TabSwitchComponent', () => {
  let comp: TabSwitchComponent;
  let compFixture: ComponentFixture<TabSwitchComponent>;

  let tabConfig: TabSwitchConfig[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabSwitchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    tabConfig = [
      {
        name: 'All',
        type: 'ALL',
      },
      {
        name: 'Personal',
        type: 'PERSONAL',
      },
    ];
    
    compFixture = TestBed.createComponent(TabSwitchComponent);
    comp = compFixture.componentInstance;
    comp.tabConfig = tabConfig;
    compFixture.detectChanges();
  });

  it("should set first tab to active and properly set value for attribute 'type'", () => {
    const tabs: DebugElement = compFixture.debugElement;
    const firstTab: HTMLElement = tabs.query(By.css('.tab:first-child'))
      .nativeElement;
    expect(Array.from(firstTab.classList)).toContain('active');
    expect(firstTab.getAttribute('type')).toEqual('ALL');
  });

  it(
    'should switch to second tab on click and emit event',
    <any>fakeAsync(() => {
      const expectedType = comp.tabConfig[1].type;

      const tabs: DebugElement = compFixture.debugElement;
      const secondTab: HTMLElement = tabs.query(By.css('.tab:last-child'))
        .nativeElement;

      secondTab.click();
      compFixture.detectChanges();

      tick(50);

      expect(Array.from(secondTab.classList)).toContain('active');

      comp.setType.subscribe((type: ListType) =>
        expect(type).toEqual(expectedType)
      );
    })
  );
});
