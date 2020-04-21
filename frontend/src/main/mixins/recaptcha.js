export default {
    methods: {
        recaptcha() {
            grecaptcha.ready(function() {
                grecaptcha
                    .execute('6Le-oOkUAAAAAKQWAbSdpnCS8xNlG5QcLyLqLxQF', {
                        action: 'homepage',
                    })
                    .then(function(token) {
                        if (document.getElementById('g-recaptcha-response')) {
                            document.getElementById(
                                'g-recaptcha-response'
                            ).value = token;
                        }
                    });
            });
        },
    },
};
