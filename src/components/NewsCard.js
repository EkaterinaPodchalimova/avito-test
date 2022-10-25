import {Link} from 'react-router-dom';

function NewsCard(props) {

    const getDate = (time) => {
        return new Date(time*1000).toLocaleString()
    }

    const newsClick = (el) => {
        props.editPage(true)
        props.editNewsSelectors(el)
        props.getComment(el.id)
    }

    return (
        <div className='news'>
            {props.newsList.map(el => (
                <Link to='/news' className='news__card' key={el.id} onClick={() => newsClick(el)}>
                    <h2 className='news__card-title'>{el.title}</h2>
                    <p className='news__card-text'>Автор: {el.by}</p>
                    <p className='news__card-text'>Рейтинг: {el.score}</p>
                    <p className='news__card-text'>Дата: {getDate(el.time)}</p>
                </Link>
            ))}
        </div>
    )
}

export default NewsCard;