$(() => {
    $('.butPass').click(() => {
        axios.post(`http:/127.0.0.1:80/update-password?newPass=${$('#newPass').val()}&oldPass=${$('#oldPass').val()}`)
            .then(res => {
                if(res.data.status == 401)
                    window.location.href = '/auth';
            });
    })
});