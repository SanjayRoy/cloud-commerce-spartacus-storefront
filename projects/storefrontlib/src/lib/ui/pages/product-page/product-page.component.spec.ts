import { ComponentsModule } from './../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductPageComponent } from './product-page.component';
import { ProductDetailsPageLayoutComponent } from '../../layout/product-details-page-layout/product-details-page-layout.component';
import { ProductDetailsComponent } from '../../../product/components/product-details/container/product-details.component';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { ProductImagesComponent } from '../../../product/components/product-details/product-images/product-images.component';
import { ProductSummaryComponent } from '../../../product/components/product-details/product-summary/product-summary.component';
import { ProductAttributesComponent } from '../../../product/components/product-details/product-attributes/product-attributes.component';
import { ProductReviewsComponent } from '../../../product/components/product-details/product-reviews/product-reviews.component';
import { ComponentMapperService } from '../../../cms/services';
import {
  CmsModuleConfig,
  defaultCmsModuleConfig
} from '../../../cms/cms-module-config';
import { AddToCartComponent } from '../../../cart/components/add-to-cart/add-to-cart.component';
import { CartService } from '../../../cart/services';
import { ProductService } from '../../../product/facade';
import {
  NgbTabsetModule,
  NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';
import { OutletDirective } from '../../../outlet';
import { RoutingService } from '@spartacus/core';

const routerState = {
  state: {
    params: {
      productCode: 'mockProductCode'
    }
  }
};
const mockRoutingService = {
  routerState$: of(routerState)
};
describe('ProductPageComponent in pages', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        NgbTabsetModule,
        NgbAccordionModule,
        StoreModule.forRoot({}),
        ComponentsModule
      ],
      declarations: [
        ProductPageComponent,
        ProductDetailsPageLayoutComponent,
        ProductDetailsComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        ProductImagesComponent,
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductReviewsComponent,
        AddToCartComponent,
        OutletDirective
      ],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useValue: defaultCmsModuleConfig },
        CartService,
        ProductService,
        { provide: RoutingService, useValue: mockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    expect(component.productCode).toEqual('mockProductCode');
  });
});
