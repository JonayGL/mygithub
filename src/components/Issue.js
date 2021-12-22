import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Issue extends React.Component {

  formatData(dateString){
    var date = new Date(dateString);
    let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return dateMDY;
  }

  render() {

    let labels = []

    this.props.issue.labels.forEach(label => {
      var element = <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2 mx-1">{label.name}</span>
      labels.push(element);
    });
    let pullRequestItem  = this.props.issue.pull_request ? <span className="inline-block bg-green-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Pull Request</span>
    : <span className="inline-block bg-red-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Issue</span>;

    let url = this.props.username+'/'+this.props.repository+'/issue/'+this.props.issue.number;
    return <Link to={url}><div className="w-100 rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className='flex flex-wrap'>
          <div className="flex-1 font-bold text-xl mb-2">
            {this.props.issue.title}
          </div>
          <div className="flex-1 text-right text-md mb-2">
            {this.formatData(this.props.issue.created_at)}
          </div>
        </div>
        {pullRequestItem}
        <div className='flex flex-row'>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div className='text-sm'>
          {this.props.issue.user.login}
        </div>
        </div>
        
      </div>
      <div className="flex-auto text-left text-xs mx-6">
            Comments: {this.props.issue.comments}
        </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap float-right">
        {labels}
      </div>
    </div>
    </Link>
  }
}

export default Issue;
