import type { ComponentStory, ComponentMeta } from '@storybook/react'
import ProductRating from './ProductRating'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ProductRating',
  component: ProductRating,
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
} as ComponentMeta<typeof ProductRating>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProductRating> = (args) => <ProductRating {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
