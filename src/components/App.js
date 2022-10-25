import {Switch, Route, withRouter} from 'react-router-dom';
import Header from './Header';
import PopupLoading from './PopupLoading';
import NewsCard from './NewsCard';
import NewsPage from "./NewsPage";
import api from '../utils/api.js';
import React from "react";

function App() {
    const [newsPageOpen, editPage] = React.useState(false);
    const [popupLoadingOpen, editPopupLoading] = React.useState(true);
    const [newsSelectors, editNewsSelectors] = React.useState({});
    const [newsList, createNews] = React.useState([]);
    const [commentList, getCommit] = React.useState([]);
    const [commentLowList, editCommentLow] = React.useState([]);

    setTimeout(() => {
        setInterval(() => {
            getTopNews()
        }, 60000);
    },60000);

    React.useEffect(() => {
        if (!newsPageOpen) {
            editPopupLoading(true);
            getTopNews();
        }
    },[]);

    function getTopNews() {
        api.getInitialNews()
            .then(res => {
                getNewsInformation(res)
            })
            .catch((err) => console.log(err))
    }

    function getNewsInformation(newsList) {
        let apiList = newsList.map(el => {
            return api.getNewsInformation(el)
        })

        Promise.all(apiList)
            .then((res) => {
                createNews(res.filter(function(f) { return f !== null }).sort((user1, user2) => user1.time > user2.time ? 1 : -1).slice(400, 500).reverse())
            })
            .catch((err) => console.log(err))
            .finally(() => {
                editPopupLoading(false);
            })
    }

    async function getComment(id) {
        editPopupLoading(true);
        const commentIdList = await api.getNewsInformation(id)
            .then(res => {
                if (res.kids) {
                    return res.kids
                } else {
                    return []
                }
            })
        if (commentIdList.length !== 0 ) {
            const commentApiList = commentIdList.map(el => {
                return api.getCommentsById(el)
            })
            Promise.all(commentApiList)
                .then((res) => {
                    getCommit(res.filter(function(f) { return f.deleted !== true }))
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    editPopupLoading(false)
                })
        } else {
            editPopupLoading(false)
        }
    }

    const comeBack = () => {
        editNewsSelectors({});
        editPage(false);
        getCommit([]);
        editCommentLow({})
    }

    return (
        <>
            <Header newsPageOpen={newsPageOpen} comeBack={comeBack} getTopNews={getTopNews} editPopupLoading={editPopupLoading}/>
            <Switch>
                <Route exact path='/'>
                    <NewsCard newsList={newsList} editNewsSelectors={editNewsSelectors} editPage={editPage}
                              getComment={getComment}/>
                </Route>
                <Route path='/news'>
                    <NewsPage newsSelectors={newsSelectors} getComment={getComment} commentList={commentList}
                              comeBack={comeBack} commentLowList={commentLowList} editCommentLow={editCommentLow} editPopupLoading={editPopupLoading}/>
                </Route>
            </Switch>
            <PopupLoading popupLoadingOpen={popupLoadingOpen}/>
        </>
    )
}

export default withRouter(App);
