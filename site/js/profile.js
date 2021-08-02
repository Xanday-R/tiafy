$(() => {
    $('.quote, .diary, .story').click(async(e) => {
        let res = await axios.post(`http:/127.0.0.1:80/delete?id=${e.target.attributes.id.value}&&type=${e.target.attributes.type.value}`);
        if(res.data.auth === false) 
            alert('Авторизируйтесь!');
        else if(res.data.status == 403)
            alert('Записи не существует');
        else {
            $(`#${e.target.attributes.id.value}.${e.target.attributes.type.value}`).parent().parent().remove();
            alert('Удалено');
        }
    });
});