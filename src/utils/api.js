class Api {
    constructor(props) {
        this._baseUrl = props.baseUrl;
    }

    getInitialNews() {
        return fetch(`${this._baseUrl}/newstories.json`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res));
    }

    getNewsInformation(id) {
        return fetch(`${this._baseUrl}/item/${id}.json?print=pretty`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res));
    }

    getCommentsById(id) {
        return fetch(`${this._baseUrl}/item/${id}.json?print=pretty`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export default new Api({
    baseUrl: 'https://hacker-news.firebaseio.com/v0'
});