export interface IAccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
        isAvailable: boolean;
    };
    pdf: {
        isAvailable: boolean;
        acsTokenLink: string;
    };
    searchInfo: {
        textSnippet: string;
    }
}