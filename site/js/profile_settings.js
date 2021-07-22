$(() => {
    $('.butPass').click(() => {
        axios.post(`http:/127.0.0.1:80/update-password?newPass=${$('#newPass').val()}&oldPass=${$('#oldPass').val()}`)
            .then(res => {
                if(res.data.status == 401)
                    window.location.href = '/auth';
                else if(res.data.result === false && res.data.description == 'Password mismatch')
                    alert('Пароли несовпадают')
                else if(res.data.result === false && res.data.description == 'Cyrillic is present')
                    alert('Присутствует кириллица')
                else if(res.data.result === true) {
                    alert('Пароль изменён')
                    window.location.href = '/profile-settings';
                }
            });
    })
});