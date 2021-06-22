function like(id) {
    return axios.post(`http:/127.0.0.1:80/likequote?id=${id}`)
}

class Quote extends React.Component { 
    constructor(props) {
        super(props);
        this.src = "img/heart.svg";
        this.likes = this.props.likes;
        if(this.props.liked === false)
            this.state = { liked: false };
        else {
            this.state = { liked: true }
            this.src = "img/heart-fill.svg";
        };
    }
    render() {
        return (
            <div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                    <p>{this.props.TextQuote}</p>
                    <footer className="blockquote-footer"><cite>{this.props.author}</cite></footer>
                    </blockquote>
                    <h6><img src={this.src} onClick={async() => {
                        if(this.state.liked === true) {
                            let result = await like(this.props.id);
                            if(result.data.auth === true) {
                                this.src = "img/heart.svg";
                                this.likes = this.likes - 1;
                                this.setState({ liked: false });
                            }else
                                alert('Зарегистрируйтесь!');
                        }
                        else {
                            let result = await like(this.props.id);
                            if(result.data.auth === true) {
                                this.src = "img/heart-fill.svg";
                                this.likes = this.likes + 1;
                                this.setState({ liked: true });
                            }else
                                alert('Зарегистрируйтесь!');
                        }
                    }} className="rImg" style={{ "width": "1.65em", "height": "1.65em"}} />: {this.likes}</h6>
                </div>
                <div className="card-footer">Было добавлено пользователем <cite>{this.props.appendor} {this.props.time}</cite></div>
            </div>
        );
    }
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
