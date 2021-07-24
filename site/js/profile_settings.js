$(() => {
    $('.butPass').click(() => {
        axios.post(`http:/127.0.0.1:80/update-password?newPass=${$('#newPass').val()}&oldPass=${$('#oldPass').val()}`)
            .then(res => {
                if(res.data.status == 401)
                    window.location.href = '/auth';
                else if(res.data.result === false && res.data.description == 'Password mismatch')
                    alert('Введён неправильный пароль')
                else if(res.data.result === false && res.data.description == 'Cyrillic is present')
                    alert('Присутствует кириллица')
                else if(res.data.result === false && res.data.description == 'Less than 8 characters or more than 191 characters')
                    alert('В пароле меньше 8 символов или больше 191 символа!')
                else if(res.data.result === false && res.data.description == 'Passwords are the same')
                    alert('Введены одинаковые пароли');
                else if(res.data.result === true) {
                    alert('Пароль изменён')
                    window.location.href = '/profile-settings';
                }
            });
    })
    $('.butName').click(() => {
        axios.post(`http:/127.0.0.1:80/update-login?newLogin=${$('#newName').val()}`)
            .then(res => {
                if(res.data.status == 401)
                    window.location.href = '/auth';
                else if(res.data.result === false && res.data.description == 'Less than 4 characters or more than 191 characters')
                    alert('В логине меньше 4 символов или больше 191 символа!')
                else if(res.data.result === false && res.data.description == 'Logins are the same')
                    alert('Нынешний логин аналогичен введённому');
                else if(res.data.result === true) {
                    alert('Логин изменён')
                    window.location.href = '/profile-settings';
                }
            });
    });
});