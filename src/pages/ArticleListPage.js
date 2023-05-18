import ArticleList from '../components/ArticlesList';
import articles from './article-content';

const ArticleListPage = () => {
    return (
        <div>
            <h1>Articles</h1>
            {/* only specify which articles to render, and the ArticleList component will render them */}
            <ArticleList articles={articles} /> 
        </div>
    );
};

export default ArticleListPage;