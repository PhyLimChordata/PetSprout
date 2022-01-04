import { ScaledSize } from "react-native";
declare type EffectParams = {
    screen: ScaledSize;
    window: ScaledSize;
};
declare type EffectCallback = ((opts: EffectParams) => () => any) | ((opts: EffectParams) => undefined) | ((opts: EffectParams) => void);
export declare const useDimensionsChange: (effect: EffectCallback) => void;
export declare const responsiveHeight: (h: number) => number;
export declare const responsiveWidth: (w: number) => number;
export declare const responsiveFontSize: (f: number) => number;
export declare const responsiveScreenHeight: (h: number) => number;
export declare const responsiveScreenWidth: (w: number) => number;
export declare const responsiveScreenFontSize: (f: number) => number;
export declare const useResponsiveHeight: (h: number) => number;
export declare const useResponsiveWidth: (w: number) => number;
export declare const useResponsiveFontSize: (f: number) => number;
export declare const useResponsiveScreenHeight: (h: number) => number;
export declare const useResponsiveScreenWidth: (w: number) => number;
export declare const useResponsiveScreenFontSize: (f: number) => number;
export {};
//# sourceMappingURL=index.d.ts.map