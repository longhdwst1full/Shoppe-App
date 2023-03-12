import type { ComponentStory, ComponentMeta } from '@storybook/react'
import Cart from './Cart'
export default {
  title: 'Layouts/Cart',
  component: Cart,
  argTypes: {}
} as ComponentMeta<typeof Cart>

const Template: ComponentStory<typeof Cart> = () => <Cart />

export const Primary = Template.bind({})
export const PageProductDetail = Template.bind({})
