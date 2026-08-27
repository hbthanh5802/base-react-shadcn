import { Button } from '@/shared/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      {(['default', 'filled', 'elevated'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>Mô tả ngắn về thẻ này.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-2-rg text-gray-600">Nội dung thẻ.</p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" size="small">
              Huỷ
            </Button>
            <Button size="small">Xác nhận</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
