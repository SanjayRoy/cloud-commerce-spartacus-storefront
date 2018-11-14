import { NgModule } from '@angular/core';

import {
  ProductService,
  ProductSearchService,
  ProductReviewService
} from './facade';
import { ProductStoreModule } from './store/product-store.module';
import { ProductOccModule } from './occ';

@NgModule({
  imports: [ProductOccModule, ProductStoreModule],
  providers: [ProductService, ProductSearchService, ProductReviewService]
})
export class ProductModule {}