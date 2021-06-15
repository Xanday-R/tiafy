// Quote

function Quote(props) {      
    return (
        <div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                <p>{props.TextQuote}</p>
                <footer className="blockquote-footer"><cite>{props.author}</cite></footer>
                </blockquote>
                <h6><img src={props.src} className="rImg" style={{ "width": "1.65em", "height": "1.65em"}} />: {props.likes}</h6>
            </div>
            <div className="card-footer">Было добавлено пользователем <cite>{props.appendor} {props.time}</cite></div>
        </div>
    );
}

function Story(props) {
    let prehistory = '';
    for(let i = 0; i<=48; i++) {
        prehistory = prehistory + props.prehistory[i];
    }
    prehistory = prehistory + '...';
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <img src={props.img} className="card-img"></img>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{prehistory}</p>
                <a href={props.src} className="btn btn-primary">Читать дальше</a>
            </div>
        </div>
    );
}

// React

// Quote, Story

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
            $('.data').addClass('dataT');
            axios.get('http:/127.0.0.1:80/get')
                .then(result => {
                    let src;
                    if(res.data.auth === false)
                        src = "img/heart.svg"
                    else {
                        for(let a = 0; a < result.data.get.quote[0].length; a++)
                            for(let i = 0; i < res.data.liked.length; i++)
                                if(res.data.liked[i].idrecords == result.data.get.quote[0][a].id && res.data.liked[i].type == 'quote') {
                                    src = "img/heart-fill.svg";
                                    break;
                                }
                    }
                    ReactDOM.render(
                        <div className='row justify-content-center'>
                            <div className="card">
                                <Quote TextQuote={result.data.get.quote[0][0].text} src={src} likes={result.data.get.quote[0][0].likes} appendor={result.data.get.quote[1][0]} author={result.data.get.quote[0][0].author} time={result.data.get.quote[0][0].time}></Quote>
                                <Quote TextQuote={result.data.get.quote[0][1].text} src={src} likes={result.data.get.quote[0][1].likes} appendor={result.data.get.quote[1][1]} author={result.data.get.quote[0][1].author} time={result.data.get.quote[0][1].time}></Quote>
                                <Quote TextQuote={result.data.get.quote[0][2].text} src={src} likes={result.data.get.quote[0][2].likes} appendor={result.data.get.quote[1][2]} author={result.data.get.quote[0][2].author} time={result.data.get.quote[0][2].time}></Quote>
                            </div>
                            <Story title={result.data.get.story[0][0].name} prehistory={result.data.get.story[0][0].text} src="#" img={result.data.get.story[0][0].img}></Story>
                        </div>, 
                    $('.data')[0]);
                });
        }
        else if(res.data.result === false) {
            ReactDOM.render(<a className="nav-link" href="#">О сайте</a>, $('.navbar-nav')[0]);
            ReactDOM.render(<img src="img/htmlIcon.png"></img>, $('.navbar-brand')[0]);
            ReactDOM.render(<h3 className='alert-danger'>Сервер не отвечает. Попробуйте позже</h3>, $('.d-flex').eq(1)[0]);
        }
    });


// axios.get('http:/127.0.0.1:80/h')
//     .then(function (res) {
//         console.log(res);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });