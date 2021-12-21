import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Request from '../requests/Request';

function CardDetail() {
    const { user, repo, id } = useParams();

    console.log(user);
    console.log(repo);
    console.log(id);

    let issue = new Request().getIssue(user,repo,id).then(res => {
      console.log(res);
    });

  return (<div className='container mx-auto'>
  <div className="w-100 rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className='flex flex-wrap'>
          <div className="flex-1 font-bold text-xl mb-2">
          </div>
          <div className="flex-1 text-right text-md mb-2">
          </div>
        </div>
        <div className='text-sm'>
        </div>
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
