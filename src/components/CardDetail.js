import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Request from '../requests/Request';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

function CardDetail() {
    const { user, repo, id } = useParams();
    const [data, setData] = useState({issue: {}})

    useEffect( () => {
      new Request().getIssue(user,repo,id)
      .then(res => {
        setData({issue: res});
      });
    }, []);
    
    console.log(data);

    let pullRequestItem  = data.issue.pull_request ? <span className="inline-block bg-green-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Pull Request</span>
    : <span className="inline-block bg-red-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Issue</span>;
    
  return (<div className='container mx-auto'>
  <div className="w-100 rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className='flex flex-wrap'>
          <div className="flex-1 font-bold text-xl mb-2">
            {data.issue.title}
          </div>
          <div className="flex-1 text-right text-md mb-2">
          </div>
        </div>
        {pullRequestItem}
        <div className=''>
          <ReactMarkdown rehypePlugins={[rehypeRaw]} children={data.issue.body}/>
        </div>
      </div>
      <div className='text-sm'>
          Comments: ({data.issue.comments})
        </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap">
        <div className="flex-auto text-left text-xs">
            Comments: 
        </div>
      </div>
    </div>
    </div>
  );
}

export default CardDetail;
