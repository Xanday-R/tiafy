$(() => {
    $('.rImg').click(async(e) => {
        res = await axios.post(`http:/127.0.0.1:80/likequote?id=${e.target.attributes.id.value}`);
        if(res.data.auth === false) 
            alert('Авторизируйтесь!')
        else {
            if($(`#${e.target.attributes.id.value}`).attr('src') == 'img/heart-fill.svg') {
                $(`#${e.target.attributes.id.value}`).attr('likes', Number($(`#${e.target.attributes.id.value}`).attr('likes')) - 1);
                $(`#${e.target.attributes.id.value}`).attr('src', 'img/heart.svg')
                $(`.${e.target.attributes.id.value}`).html(`: ${$(`#${e.target.attributes.id.value}`).attr('likes')}`);
            }else {
                $(`#${e.target.attributes.id.value}`).attr('likes', Number($(`#${e.target.attributes.id.value}`).attr('likes')) + 1);
                $(`#${e.target.attributes.id.value}`).attr('src', 'img/heart-fill.svg')
                $(`.${e.target.attributes.id.value}`).html(`: ${$(`#${e.target.attributes.id.value}`).attr('likes')}`);
            }
        }
    });
});