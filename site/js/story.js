axios.get('http:/127.0.0.1:80/checkauth')
    .then(res => {
        if(res.data.result === true) {
            if(res.data.auth === true) {
                ReactDOM.render([<a className="nav-link" href="#">Профиль</a>, <a className="nav-link" href="#">О сайте</a>,], $('.navbar-nav')[0]);
                ReactDOM.render(<img src={res.data.photo}></img>, $('.navbar-brand')[0]);
            }else if(res.data.auth === false) {
                ReactDOM.render([<a className="nav-link" href="#">Авторизироваться</a>, <a className="nav-link" href="#">О сайте</a>], $('.navbar-nav')[0]);
                ReactDOM.render(<img src="img/htmlIcon.png"></img>, $('.navbar-brand')[0]);
            }
        }else if(res.data.result === false) {
            ReactDOM.render(<a className="nav-link" href="#">О сайте</a>, $('.navbar-nav')[0]);
            ReactDOM.render(<img src="img/htmlIcon.png"></img>, $('.navbar-brand')[0]);
            ReactDOM.render(<h3 className='alert-danger'>Сервер не отвечает. Попробуйте позже</h3>, $('.d-flex').eq(1)[0]);
        }
    });