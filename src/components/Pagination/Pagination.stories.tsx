import type { ComponentStory, ComponentMeta } from '@storybook/react'
import Pagination from './Pagination'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Pagination',
  component: Pagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    queryConfig: {
      description: 'truyền query param vào',
      defaultValue: ' page,limit, sort_by, order,exclude,rating_filter, price_max , price_'
    },
    pageSize:{
      description: 'trang số'
    }
  }
} as ComponentMeta<typeof Pagination>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
