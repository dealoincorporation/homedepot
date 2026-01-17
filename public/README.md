# Public Assets

This folder contains static assets that are served directly by Next.js.

## Images
- Place images in `/public/images/`
- Access them in your components using `/images/filename.ext`
- Example: `<img src="/images/logo.png" alt="Logo" />`

## Usage Examples

```jsx
// In a component
import Image from 'next/image';

<Image
  src="/images/hero-background.jpg"
  alt="Hero background"
  fill
  className="object-cover"
/>
```

```jsx
// Regular img tag
<img src="/images/logo.png" alt="Home Depot Logo" />
```

## File Structure
```
public/
├── images/
│   ├── hero/
│   ├── products/
│   └── team/
└── README.md
```