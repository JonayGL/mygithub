import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Card extends React.Component {

  constructor(props){
    super(props)

  this.showDetails = this.showDetails.bind(this);
  }

  showDetails(event){
    console.log(event)
  }

  render() {

    let labels = []

    this.props.issue.labels.forEach(label => {
      var element = <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">{label.name}</span>
      labels.push(element);
    });
    let pullRequestItem  = this.props.issue.pull_request ? <span className="inline-block bg-green-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Pull Request</span>
    : <span className="inline-block bg-red-400 rounded px-3 py-1 text-sm font-semibold text-gray-700 mb-2">Issue</span>;

    let url = this.props.username+'/'+this.props.repository+'/issue/'+this.props.issue.number;
    return <Link to={url}><div className="w-100 rounded overflow-hidden shadow-lg" onClick={this.showDetails}>
      <div className="px-6 py-4">
        <div className='flex flex-wrap'>
          <div className="flex-1 font-bold text-xl mb-2">
            {this.props.issue.title}
          </div>
          <div className="flex-1 text-right text-md mb-2">
            {this.props.issue.created_at}
          </div>
        </div>
        {pullRequestItem}
        <div className='text-sm'>
          {this.props.issue.user.login}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap">
        <div className="flex-auto text-left text-xs">
            Comments: {this.props.issue.comments}
        </div>
        {labels}
      </div>
    </div>
    </Link>
  }
}

export default Card;
