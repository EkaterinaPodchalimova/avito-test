import React from "react";
import {withRouter, Link} from 'react-router-dom';
import api from '../utils/api';

function NewsPage(props) {
    const [commentLowLost, editCommentLowList] = React.useState(false);
    const he = require('he');

    React.useEffect(() => {
    },[commentLowLost])

    const getDate = (time) => {
        return new Date(time * 1000).toLocaleString()
    }

    function getCommitLow(el) {
        props.editPopupLoading(true);
        if (el.kids === undefined) {
            if(props.commentLowList[el.id] === undefined) {
                props.commentLowList[el.id] = [{by: 'Автора нет', text: 'Комментарии отсутствуют'}];
                props.editPopupLoading(false);
                editCommentLowList(!commentLowLost);
            } else {
                delete props.commentLowList[el.id];
                props.editPopupLoading(false);
                editCommentLowList(!commentLowLost)
            }
        } else {
            if (el.kids.length !== 0) {
                if (props.commentLowList[el.id] === undefined) {
                    const commentApiList = el.kids.map(el => {
                        return api.getCommentsById(el)
                    })
                    Promise.all(commentApiList)
                        .then((res) => {
                            props.commentLowList[el.id] = res.filter(function (f) {
                                return f.by !== null && f.deleted !== true
                            })
                        })
                        .catch((err) => console.log(err))
                        .finally(() => {
                            props.editPopupLoading(false);
                            editCommentLowList(!commentLowLost);
                        })
                } else {
                    delete props.commentLowList[el.id];
                    props.editPopupLoading(false);
                    editCommentLowList(!commentLowLost)
                }
            }
        }

    }

        return (
            <div className='news-page' key={props.newsSelectors.id}>
                <Link className='news-page__button' to='/' onClick={props.comeBack}>Вернуться к новостям</Link>
                <h2 className='news-page__title'>{props.newsSelectors.title}</h2>
                {props.newsSelectors.url ?
                    (<a className='news-page__link' href={props.newsSelectors.url}
                        target='_blank'>{props.newsSelectors.url}</a>)
                    : (<p className='news-page__text'>Текст: {he.decode(props.newsSelectors.text.replace(/(<\/?[a-zA-Z]+>)/gi,''))}</p>)}
                <p className='news-page__text'>Автор статьи: {props.newsSelectors.by}</p>
                <p className='news-page__text'>Дата и время: {getDate(props.newsSelectors.time)}</p>
                <p className='news-page__text'>Колличество комментариев : {props.commentList.length}
                    <button className='news-page__comments-button' onClick={() => {
                        props.getComment(props.newsSelectors.id);
                        props.editCommentLow({})
                    }}/>
                </p>
                {props.commentList.length !== 0 && (
                    <h3 className='news-page__comments' key={props.commentList.length}>Комментарии:</h3>)}
                {props.commentList.map(el => (
                    <>
                        <div className='news-page__comment' key={el.id} onClick={() => getCommitLow(el)}>
                            <p className='news-page__text'>Автор: {el.by}</p>
                            <p className='news-page__text'>{el.text.replace(/<\/?[a-zA-Z]+>/gi,'')}</p>
                        </div>
                        <div className='news-page__comment-object' key={el.by + ',' + el.id}>
                            {props.commentLowList[el.id] &&
                                props.commentLowList[el.id].map(elLow => (
                                    <div className='news-page__comment news-page__comment_low' key={elLow.id}>
                                        <p className='news-page__text'>Автор: {elLow.by}</p>
                                        <p className='news-page__text'>{elLow.text.replace(/<\/?[a-zA-Z]+>/gi,'')}</p>
                                    </div>))
                            }
                        </div>
                    </>)
                )}
            </div>
        )
    }

    export default withRouter(NewsPage);