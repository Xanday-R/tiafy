function like(id) {
    return axios.post(`http:/127.0.0.1:80/likestory?id=${id}`)
}

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.src = "img/heart.svg";
        this.img = this.props.img;
        if(this.img == '#')
            this.img = "img/banner.png"
        this.likes = this.props.likes;
        if(this.props.liked == 'false')
            this.state = { liked: false };
        else {
            this.state = { liked: true }
            this.src = "img/heart-fill.svg";
        };
        console.log(this.props.idappendor)
    }
    render() {
        return (
            <div className="card" style={{ "width": "80rem" }}>
                <img src={this.img} className="card-img"></img>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.text}</p>
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
                <div className="card-footer"> <a href={`/users?id=${this.props.idappendor}`} style={{'textDecoration': 'none', 'color': '#212529'}}>Было добавлено пользователем <cite>{this.props.appendor} {this.props.time}</cite></a></div>
            </div>
        );
    }
}