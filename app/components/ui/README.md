# Glass UI Components

这些是为JuheAPI Console创建的玻璃态UI组件库。

## GlassCard 组件

一个可复用的玻璃态卡片组件，支持多种变体和渐变边框。

### 基本用法

```tsx
import { GlassCard } from '@/components/ui';

// 基本用法
<GlassCard>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here...</p>
  </div>
</GlassCard>

// 带渐变边框
<GlassCard gradientBorder="primary" hover>
  <div className="p-6">
    <h3>Card with gradient border</h3>
  </div>
</GlassCard>

// 增强玻璃效果
<GlassCard variant="enhanced" gradientBorder="blue">
  <div className="p-6">
    <h3>Enhanced glass effect</h3>
  </div>
</GlassCard>
```

### Props

- `variant`: `'default' | 'enhanced' | 'subtle'` - 玻璃效果强度
- `gradientBorder`: `'primary' | 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'none'` - 顶部渐变边框颜色
- `hover`: `boolean` - 是否启用hover阴影效果
- `onClick`: `() => void` - 点击事件处理器
- `className`: `string` - 额外的CSS类名

## GradientButton 组件

一个可复用的渐变按钮组件，支持多种样式和hover效果。

### 基本用法

```tsx
import { GradientButton } from '@/components/ui';

// 主要渐变按钮
<GradientButton>
  Click me
</GradientButton>

// 次要渐变按钮
<GradientButton variant="secondary">
  Secondary Button
</GradientButton>

// 轮廓按钮
<GradientButton variant="outline">
  Outline Button
</GradientButton>

// 幽灵按钮
<GradientButton variant="ghost">
  Ghost Button
</GradientButton>

// 自定义渐变方向
<GradientButton gradientDirection="br" reverseOnHover={false}>
  Custom Gradient
</GradientButton>
```

### Props

- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'` - 按钮样式变体
- `gradientDirection`: `'r' | 'l' | 'br' | 'bl'` - 渐变方向
- `reverseOnHover`: `boolean` - hover时是否反转渐变方向
- 继承所有标准Button组件的props

## 颜色系统

组件使用统一的品牌色彩系统：

- **Primary**: `#6681FC` → `#25A0FC`
- **Text**: `#39424D`
- **Light Blue**: `#BCD8FC`
- **Background**: `#FFFFFF` / `#EFF1F8`

## 使用建议

1. **一致性**: 在整个应用中使用这些组件来保持设计一致性
2. **性能**: 组件已优化，包含适当的transition效果
3. **可访问性**: 组件遵循可访问性最佳实践
4. **响应式**: 所有组件都支持响应式设计

## 示例页面

查看 `/demo/ui-elements` 页面来看这些组件的实际效果。