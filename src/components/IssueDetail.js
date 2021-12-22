import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Request from '../requests/Request';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

function IssueDetail() {
    const { user, repo, id } = useParams();
    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState(null);
    const [pullRequestItem, setPullRequestItem] = useState(null);

    useEffect( () => {
      new Request().getIssue(user,repo,id)
      .then(res => {
        setIssue(res);
        return res;
      })
      .then(data => {
        new Request().getIssueComments(data.comments_url)
        .then(res => {
          setComments(res);
          let item  = data.pull_request !== undefined ? <span className="inline-block bg-green-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Pull Request</span>
        : <span className="inline-block bg-red-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Issue</span>;
          setPullRequestItem(item);
        });
      });

    }, []);

    function formatData(dateString){
      var date = new Date(dateString);
      let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return dateMDY;
    }

  if(issue){
    if(comments){
      var commentArray = [];
      comments.forEach(comment => {
        let element = <div className='container mx-auto my-1 bg-zinc-200 rounded'>
        <div className="w-100 rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className='flex flex-wrap'>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                </div>
                <div className="flex-1 text-left text-sm mb-2">
                  {comment.user.login}
                </div>
                <div className="flex-1 text-right text-sm mb-2">
                  {formatData(comment.created_at)}
                </div>
              </div>
              <div className=''>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={comment.body}/>
              </div>
            </div>
          </div>
          </div>
          commentArray.push(element);
      });
    }

    return (<div className='container mx-auto'>
    <div className="w-100 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className='flex flex-wrap'>
            <div className="flex-1 font-bold text-xl mb-2">
              {issue.title}
            </div>
          </div>
          <div className=''>
            {pullRequestItem}
            <div className='float-right'>
              {formatData(issue.created_at)}
            </div>
          </div>
          
          <div className=''>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={issue.body}/>
          </div>
        </div>
        <div className='text-sm mx-6'>
            Comments: ({issue.comments})
          </div>
        <div className="px-6 pt-4 pb-2 flex flex-wrap">
          {commentArray}
        </div>
      </div>
      </div>
    );
  }else {
    return <div></div>
  }
    
}

export default IssueDetail;
