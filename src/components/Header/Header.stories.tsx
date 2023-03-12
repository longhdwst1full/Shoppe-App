import type { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from './Header'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Header',
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    errorMessage: {
      description: 'Hiển thị lỗi validate'
    },

    className: {
      description: 'class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    classNameHeader: {
      description: 'class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    }
  }
} as ComponentMeta<typeof Header>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
