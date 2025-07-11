import React from 'react';

export const StyleDeclarationType = [
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',

  // ... (other style declarations)
] as const;

export type StylePropValueType =
    | typeof AlignItems
    | typeof AlignItemsArray
    | typeof BackgroundColor
    | typeof BackgroundColorArray
    | typeof BlockSize
    // ... (other types)

export type ClassNamesObject = Record<string, any>;

// Type definitions for arrays omitted for brevity

type SizeNumber = number;

type SizeNumberAndAuto = SizeNumber | "auto";

type ResponsiveProp<T> = T | Array<T?>;

// Polymorphic props section optimized into more concise types

type PolymorphicRef<C extends React.ElementType> =
    React.ComponentPropsWithRef<C>['ref'];

interface AsProp<C extends React.ElementType> {
    as?: C;
}

const omitKeysOfProps<P1, P2>(props: P1): Omit<P1, keyof P2>;

export type PolymorphicComponentProp<
C extends React.ElementType,
P extends {}
> =
React.PropsWithChildren<Props & AsProp<C>>
& omitKeysOfProps<React.ComponentPropsWithoutRef<C>, PropsToOmit>();

export type PolymorphicComponentPropWithRef<
C extends React.ElementType,
P extends {}
> =
PolymorphicComponentProp<C, Props>
& { ref?: PolymorphicRef };

interface StyleUtilityProps {
flexDirection?: ResponsiveProp<FlexDirection>;
flexWrap?: ResponsiveProp<FlexWrap>;
gap?: ResponsiveProp<SizeNumber>;
// ... (other styles with responsive props)
};

interface BoxPropTypes extends StyleUtilityProps {
children?: React.ReactNode;
className?: string;
'data-testid'?: string;  
}

// Generic box component prop declaration and export 
```
