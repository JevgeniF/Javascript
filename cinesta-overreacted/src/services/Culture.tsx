export default class Culture {

    static GetCulture(): string {
        const lang = navigator.language
        return '?culture=' + lang;
    }

}
