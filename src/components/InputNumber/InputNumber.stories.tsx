import type { ComponentStory, ComponentMeta } from '@storybook/react'
import InputNumber from './InputNumber'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/InputNumber',
  component: InputNumber,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
   
  }
} as ComponentMeta<typeof InputNumber>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputNumber> = (args) => <InputNumber {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
