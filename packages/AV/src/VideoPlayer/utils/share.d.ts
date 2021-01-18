export declare function checkBrowser(): "Opera" | "FF" | "Chrome" | "Safari" | "IE";
export declare const getTime: (seconds: any) => string;
export declare function throttle(func: any, wait: any, options?: any): (...arr: any[]) => any;
export declare function entryFullscreen(ele: any): void;
export declare function exitFullscreen(): void;
export declare function addFullscreenListener(listener: any): void;
export declare function removeFullscreenListener(listener: any): void;
