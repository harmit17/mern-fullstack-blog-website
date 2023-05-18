import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdate }) => {

    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authToken: token } : {};
        const reponse = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            comment : commentText
        }, {headers});

        const updatedArticleInfo = (await reponse).data;
        onArticleUpdate(updatedArticleInfo);

        setName('');
        setCommentText('');               
    }

    return(
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p> }
                <textarea value={commentText} rows="4" cols="50" onChange={(e)=> setCommentText(e.target.value)}/>

            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;