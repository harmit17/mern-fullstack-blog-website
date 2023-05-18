import { useState, useEffect } from 'react';
import {useParams}  from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import articles from './article-content';
import useUser from '../hooks/useUser';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = () => {

    // using destructuring assignment to extract the articleId parameter value from the current route using the useParams()
    const {articleId} = useParams();
    const [articleInfo, setArticleInfo] =   useState({ upvotes: 0, comments: [], canUpvote: false });
    const { canUpvote  }    = articleInfo;
    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authToken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`,{headers});
            const newArticleInfo = response.data;

            setArticleInfo(newArticleInfo)
            
        };

        if(isLoading){
            loadArticleInfo();
        }
    }, [isLoading, user, articleId]);
   
    // used the .find() method on the articles array, which returns the first element in the array that satisfies the provided testing function.
    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authToken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
        const updatedArticleInfo = response.data;
        setArticleInfo(updatedArticleInfo);
    };

    if(!article) {

        return <NotFoundPage />;
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
            {   user ? (
                <button onClick={addUpvote}>
                    {canUpvote ? 'Upvote' : 'Already Upvoted'}
                </button> 
                ) : (
                <button>Log in to upvote</button>
            )}
                <p>  This article has {articleInfo.upvotes} upvote(s).</p>
            </div>
            {/* the .map() method is called on the article.content array, and for each paragraph in the array, it returns a <p> element with the paragraph as its content */}
            {article.content.map((paragraph, i) => (  
                <p key={i}>{paragraph}</p>
            ))}
            {user
                ?<AddCommentForm articleName={articleId} onArticleUpdate={updatedArticle => setArticleInfo(updatedArticle)} />
                :<button>Log in to add a comment</button>
            }
            
            <CommentsList comments={articleInfo.comments} />
        </div>
    );
};

export default ArticlePage;