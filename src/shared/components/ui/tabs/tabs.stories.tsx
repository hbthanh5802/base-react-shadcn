import { Tabs, TabsContent, TabsList, TabsTrigger } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/Tabs',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Underline: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-1">
          <p className="text-body-3-sb uppercase text-neutral-600">{size}</p>
          <Tabs defaultValue="a">
            <TabsList variant="underline">
              <TabsTrigger variant="underline" size={size} value="a">
                Tổng quan
              </TabsTrigger>
              <TabsTrigger variant="underline" size={size} value="b">
                Chi tiết
              </TabsTrigger>
              <TabsTrigger variant="underline" size={size} value="c">
                Lịch sử
              </TabsTrigger>
              <TabsTrigger variant="underline" size={size} value="d" disabled>
                Vô hiệu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="a">
              <p className="text-body-2-rg text-neutral-700">Nội dung A</p>
            </TabsContent>
            <TabsContent value="b">
              <p className="text-body-2-rg text-neutral-700">Nội dung B</p>
            </TabsContent>
            <TabsContent value="c">
              <p className="text-body-2-rg text-neutral-700">Nội dung C</p>
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const UnderlineFullWidth: Story = {
  name: 'Underline — Full width',
  render: () => (
    <div className="w-[600px] space-y-6 p-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-1">
          <p className="text-body-3-sb uppercase text-neutral-600">{size}</p>
          <Tabs defaultValue="a">
            <TabsList variant="underline" fullWidth>
              <TabsTrigger variant="underline" size={size} fullWidth value="a">
                Tổng quan
              </TabsTrigger>
              <TabsTrigger variant="underline" size={size} fullWidth value="b">
                Chi tiết
              </TabsTrigger>
              <TabsTrigger variant="underline" size={size} fullWidth value="c">
                Lịch sử
              </TabsTrigger>
            </TabsList>
            <TabsContent value="a">
              <p className="text-body-2-rg text-neutral-700">Nội dung A</p>
            </TabsContent>
            <TabsContent value="b">
              <p className="text-body-2-rg text-neutral-700">Nội dung B</p>
            </TabsContent>
            <TabsContent value="c">
              <p className="text-body-2-rg text-neutral-700">Nội dung C</p>
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const Contained: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-1">
          <p className="text-body-3-sb uppercase text-neutral-600">{size}</p>
          <Tabs defaultValue="a">
            <TabsList variant="contained">
              <TabsTrigger variant="contained" size={size} value="a">
                Tất cả
              </TabsTrigger>
              <TabsTrigger variant="contained" size={size} value="b">
                Đang xử lý
              </TabsTrigger>
              <TabsTrigger variant="contained" size={size} value="c">
                Hoàn thành
              </TabsTrigger>
              <TabsTrigger variant="contained" size={size} value="d" disabled>
                Vô hiệu
              </TabsTrigger>
            </TabsList>
            <TabsContent value="a">
              <p className="text-body-2-rg text-neutral-700">Tất cả</p>
            </TabsContent>
            <TabsContent value="b">
              <p className="text-body-2-rg text-neutral-700">Đang xử lý</p>
            </TabsContent>
            <TabsContent value="c">
              <p className="text-body-2-rg text-neutral-700">Hoàn thành</p>
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const WithBadge: Story = {
  name: 'With Badge (count)',
  render: () => (
    <div className="space-y-6 p-4">
      <Tabs defaultValue="a">
        <TabsList variant="underline">
          <TabsTrigger variant="underline" value="a" badge={12}>
            Tất cả
          </TabsTrigger>
          <TabsTrigger variant="underline" value="b" badge={3}>
            Đang xử lý
          </TabsTrigger>
          <TabsTrigger variant="underline" value="c" badge={0}>
            Hoàn thành
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="a">
        <TabsList variant="contained">
          <TabsTrigger variant="contained" value="a" badge={12}>
            Tất cả
          </TabsTrigger>
          <TabsTrigger variant="contained" value="b" badge={3}>
            Đang xử lý
          </TabsTrigger>
          <TabsTrigger variant="contained" value="c" badge={0}>
            Hoàn thành
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
};

export const ContainedFullWidth: Story = {
  name: 'Contained — Full width',
  render: () => (
    <div className="w-[600px] space-y-6 p-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="space-y-1">
          <p className="text-body-3-sb uppercase text-neutral-600">{size}</p>
          <Tabs defaultValue="a">
            <TabsList variant="contained" fullWidth>
              <TabsTrigger variant="contained" size={size} fullWidth value="a">
                Tất cả
              </TabsTrigger>
              <TabsTrigger variant="contained" size={size} fullWidth value="b">
                Đang xử lý
              </TabsTrigger>
              <TabsTrigger variant="contained" size={size} fullWidth value="c">
                Hoàn thành
              </TabsTrigger>
            </TabsList>
            <TabsContent value="a">
              <p className="text-body-2-rg text-neutral-700">Tất cả</p>
            </TabsContent>
            <TabsContent value="b">
              <p className="text-body-2-rg text-neutral-700">Đang xử lý</p>
            </TabsContent>
            <TabsContent value="c">
              <p className="text-body-2-rg text-neutral-700">Hoàn thành</p>
            </TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};
