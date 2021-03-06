import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SprkStackItemModule } from '../../directives/sprk-stack-item/sprk-stack-item.module';
import { SprkIconModule } from '../sprk-icon/sprk-icon.module';
import { SprkLinkDirectiveModule } from '../../directives/sprk-link/sprk-link.module';
import { SprkStackModule } from '../sprk-stack/sprk-stack.module';
import { SprkToggleModule } from '../sprk-toggle/sprk-toggle.module';
import { SprkFooterComponent } from './sprk-footer.component';

@NgModule({
  imports: [
    CommonModule,
    SprkIconModule,
    SprkStackModule,
    SprkStackItemModule,
    SprkToggleModule,
    SprkLinkDirectiveModule
  ],
  declarations: [SprkFooterComponent],
  exports: [SprkFooterComponent]
})
export class SprkFooterModule {}
