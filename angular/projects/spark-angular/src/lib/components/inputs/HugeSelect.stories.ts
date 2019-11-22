import { storyWrapper } from '../../../../../../.storybook/helpers/storyWrapper';
import { SprkLabelModule } from '../../directives/inputs/sprk-label/sprk-label.module';
import { SprkSelectionContainerModule } from './sprk-selection-container/sprk-selection-container.module';
import { SprkSelectionItemContainerModule } from './sprk-selection-item-container/sprk-selection-item-container.module';
import { SprkSelectionContainerComponent} from './sprk-selection-container/sprk-selection-container.component';
import { SprkSelectionLabelModule } from '../../directives/inputs/sprk-selection-label/sprk-selection-label.module';
import { SprkIconModule } from '../sprk-icon/sprk-icon.module';
import { SprkIconInputContainerModule } from './sprk-icon-input-container/sprk-icon-input-container.module';
import { SparkInputContainerModule } from './sprk-input-container/sprk-input-container.module';
import { SprkHugeInputContainerModule } from './sprk-huge-input-container/sprk-huge-input-container.module';
import { SprkInputModule } from '../../directives/inputs/sprk-input/sprk-input.module';

export default {
  title: 'Components/Input/Huge Select',
  component: SprkSelectionContainerComponent,
  decorators: [
    storyWrapper(
      storyContent => (
        `<div class="sprk-o-Box">
          <form (submit)="onSubmit($event)" #sampleForm="ngForm">
            ${storyContent}
          </form>
        <div>`
      )
    )
  ],
  props: {
    onSubmit(event): void {
      this.form_submitted = true;
    }
  },
  parameters: {
    info: `
##### For design and usage information check out the [documentation.](https://spark-docs.netlify.com/using-spark/components/input)
    `,
    docs: { iframeHeight: 200 },
  }
};

const modules = {
  imports: [
    SprkHugeInputContainerModule,
    SparkInputContainerModule,
    SprkIconInputContainerModule,
    SprkLabelModule,
    SprkSelectionContainerModule,
    SprkSelectionItemContainerModule,
    SprkSelectionLabelModule,
    SprkIconModule,
    SprkInputModule,
  ],
};

export const hugeSelectBox = () => ({
  moduleMetadata: modules,
  template: `
    <sprk-huge-input-container>
      <select
        id="select-huge-1"
        aria-describedby="select-normal--error-container"
        data-id="select-huge-1"
        data-sprk-input="huge"
        sprkInput
      >
        <option
          value=""
          disabled
          selected
          hidden
        ></option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <optgroup label="Grouped Options">
          <option value="g1">Grouped Option 1</option>
          <option value="g2">Grouped Option 2</option>
          <option value="g3">Grouped Option 3</option>
        </optgroup>
      </select>
      <label sprkLabel for="select-huge-1">Huge Select Box Label</label>
      <sprk-icon
        iconType="chevron-down"
        additionalClasses="sprk-c-Icon--stroke-current-color sprk-b-SelectContainer__icon"
        sprk-select-icon
      ></sprk-icon>
    </sprk-huge-input-container>
  `,
});

hugeSelectBox.story = {
  name: 'Default',
};

