import { Link } from 'react-router-dom';

//make reusable component for the articles
//pass in the articles as a prop which allows us to use the articles in the component
const ArticleList = ({ articles }) => {

    return(
        <>
            {articles.map((article) => (
                <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                <div>
                    <h3>{article.title}</h3>
                    <p>{article.content[0].substring(0,150)}...</p>
                </div>
                </Link>
            ))}
        </>
    );
}

export default ArticleList;
