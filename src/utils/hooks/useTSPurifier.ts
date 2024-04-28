import DOMPurify from 'dompurify';

export const useTSPurifier = (input: string, config?: DOMPurify.Config) => {
    const defaultConfig: DOMPurify.Config = {
        ADD_TAGS: ['my-custom-tag'],
    };

    const mergedConfig: DOMPurify.Config = { ...defaultConfig, ...config };
    return DOMPurify.sanitize(input, mergedConfig);
};
