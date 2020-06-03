const { strip_tags_except_markdown } = require('../../src/helpers');

describe('validate tags', () => {
    it('should verify script tag', () => {
        const string = '<script>alert</script>';
        const striped = string.match(/<script>/g, '');
        expect(striped.length).toBeTruthy();
    });

    it('should verify link tag', () => {
        const string =
            '<a href="<script>alert("teste")</script>">Clica aqui</a>';
        const striped = string.match(/<a[^>]*>|<\/a>/g);
        expect(striped.length).toBeTruthy();
    });

    it('should check inside code quotes', () => {
        const string =
            '``` <template></template> ``` <a href=""></a> teste <a>teste</a>';
        const striped = strip_tags_except_markdown(string);
        console.log(striped);
        expect(striped.length).toBeTruthy();
    });
});
