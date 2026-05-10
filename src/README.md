# Modular Codebase Structure

This codebase has been fully modularized for better maintainability, reusability, and scalability.

## 📁 Folder Structure

```
src/
├── types/              # TypeScript interfaces and types
├── constants/          # Shared constants and data
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── components/
│   ├── common/         # Reusable UI components
│   ├── career/         # Career-related components
│   ├── store/          # Store-related components
│   └── layout/         # Layout components
├── app/                # Next.js app directory
├── index.ts           # Main entry point
└── README.md          # This file
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- Types are centralized in `types/`
- Business logic in `constants/` and `utils/`
- UI components are focused and reusable
- Custom hooks handle complex state logic

### 2. **DRY (Don't Repeat Yourself)**
- Common patterns extracted into utilities
- Shared constants prevent duplication
- Reusable components reduce code duplication

### 3. **Type Safety**
- Comprehensive TypeScript interfaces
- Strict type checking enabled
- Proper typing for all components and hooks

### 4. **Modularity**
- Each module has a single responsibility
- Clear import/export boundaries
- Easy to test and maintain individual pieces

## 📦 Key Modules

### Types (`src/types/`)
Contains all TypeScript interfaces and type definitions:
- `CareerArea`, `Store`, `CareerOption`
- Component prop types
- API response types
- Theme and styling types

### Constants (`src/constants/`)
Holds all shared data and configuration:
- `CAREER_AREAS`, `STORE_LOCATIONS`
- `NAVIGATION_ITEMS`, `SOCIAL_LINKS`
- Theme colors and breakpoints

### Utils (`src/utils/`)
Utility functions for common operations:
- `cn()` - Class name combination
- `debounce()` - Function debouncing
- `filterCareerAreas()` - Data filtering
- String manipulation helpers

### Hooks (`src/hooks/`)
Custom React hooks:
- `useWindowSize()` - Window dimensions
- `useLocalStorage()` - Local storage management
- `useForm()` - Form state management
- `useToggle()` - Boolean state toggling

### Components (`src/components/`)
Organized by feature:
- **common/** - Reusable UI components (`Card`, `Button`)
- **career/** - Career-specific components
- **store/** - Store-specific components
- **layout/** - Layout components (`Header`, `Footer`)

## 🚀 Usage Examples

### Importing Types
```typescript
import type { CareerArea, CardProps } from '@/types';
```

### Using Constants
```typescript
import { CAREER_AREAS, THEME_COLORS } from '@/constants';
```

### Utilizing Hooks
```typescript
import { useForm, useWindowSize } from '@/hooks';

const MyComponent = () => {
  const { values, handleChange, handleSubmit } = useForm(initialValues);
  const { width } = useWindowSize();
  // ...
};
```

### Common Components
```typescript
import { Card, Button } from '@/components/common';

<Card title="Example" href="/example" image="/image.jpg" />
<Button variant="primary" size="md">Click me</Button>
```

## 🔧 Development Guidelines

### Adding New Types
1. Add to `src/types/index.ts`
2. Export from the main types file
3. Use throughout the codebase

### Creating New Components
1. Place in appropriate feature folder
2. Use existing types for props
3. Export from feature index file
4. Add to main component exports if reusable

### Adding Utilities
1. Add to `src/utils/index.ts`
2. Write comprehensive tests
3. Document with JSDoc comments
4. Keep functions pure and focused

### Custom Hooks
1. Add to `src/hooks/index.ts`
2. Follow naming convention (`use*`)
3. Include proper TypeScript types
4. Handle cleanup in useEffect if needed

## 🧪 Testing Strategy

- **Unit Tests**: Utils, hooks, and pure components
- **Integration Tests**: Component interactions
- **E2E Tests**: Full user flows

## 📈 Benefits

- **Maintainability**: Easy to locate and modify code
- **Reusability**: Components and utilities can be shared
- **Scalability**: New features can be added without affecting existing code
- **Developer Experience**: Clear structure and consistent patterns
- **Type Safety**: Comprehensive TypeScript coverage
- **Performance**: Tree-shaking and code splitting friendly

## 🎯 Migration Notes

The codebase has been fully migrated to this modular structure. All imports have been updated to use the new path aliases (`@/types`, `@/constants`, etc.).

For any questions about the structure or how to add new features, refer to this documentation or ask the development team.