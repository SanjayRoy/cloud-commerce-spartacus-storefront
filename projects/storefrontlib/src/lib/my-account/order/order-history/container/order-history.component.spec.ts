import { OrderDetailsComponent } from '../../order-details/order-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../../bootstap.module';
import { PaginationAndSortingComponent } from './../pagination-and-sorting/pagination-and-sorting.component';
import { OrderHistoryComponent } from './order-history.component';
import * as fromRoot from '../../../../routing/store';
import * as fromUserStore from '../../../../user/store';

const routes = [
  { path: 'my-account/orders/:id', component: OrderDetailsComponent }
];
const mockOrders = {
  orders: [
    { code: 1, placed: 1, statusDisplay: 'test', total: { formattedValue: 1 } }
  ],
  pagination: { totalResults: 1 },
  sorts: [{ code: 'byDate', selected: true }]
};

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let store: Store<fromUserStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          orders: combineReducers(fromUserStore.getReducers())
        }),
        NgSelectModule,
        BootstrapModule
      ],
      declarations: [
        OrderHistoryComponent,
        PaginationAndSortingComponent,
        OrderDetailsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the store', () => {
    spyOn(store, 'select').and.returnValues(
      of({ userId: 'test@sap.com' }),
      of(mockOrders)
    );

    component.ngOnInit();
    const action = new fromUserStore.LoadUserOrders({
      userId: 'test@sap.com',
      pageSize: 5
    });

    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(store.select).toHaveBeenCalledWith(fromUserStore.getOrders);
  });

  it('should redirect when clicking on order id', () => {
    spyOn(store, 'select').and.returnValues(
      of({ userId: 'test@sap.com' }),
      of(mockOrders)
    );

    fixture.detectChanges();
    const elem = fixture.debugElement.nativeElement.querySelector(
      '.y-order-history__table tbody tr'
    );
    elem.click();

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromRoot.Go({
          path: ['my-account/orders/', 1]
        })
      );
    });
  });

  it('should display No orders found page if no orders are found', () => {
    spyOn(store, 'select').and.returnValues(
      of({ userId: 'test@sap.com' }),
      of({ orders: [], pagination: { totalResults: 0 } }),
      of(true)
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-order-history__no-order'
      )
    ).not.toBeNull();
  });
  it('should return correct label', () => {
    const label = component.getLabel('byDate');
    const label2 = component.getLabel('byOrderNumber');

    expect(label).toBe('By date');
    expect(label2).toBe('By Order Number');
  });

  it('should set correctly sort code', () => {
    component.changeSortCode('byDate');
    fixture.detectChanges();
    expect(component.sortType).toBe('byDate');
    expect(component.page).toBe(0);
  });

  it('should set correctly page', () => {});
});
