import '../App.css';
import Card from './Card';
import React from 'react';
import Request from '../requests/Request';

class ListView extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      username: '',
      repository: '',
      repo: null
    }
    
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeRepository = this.handleChangeRepository.bind(this);
    this.getRepoData = this.getRepoData.bind(this);
  }

  componentDidMount() {

  }

  getRepoData(event){
    if(event.key === 'Enter'){
      new Request().getRepoIssues(this.state.username,this.state.repository)
      .then(res => {
        console.log(res);
        this.setState({
          repo: res,
        })
      });
    }
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }
  
  handleChangeRepository(event) {
    this.setState({repository: event.target.value});
  }

  render () {

    var html = [];
    if(this.state.repo === null){
      let error = <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
      <div className="flex">
        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p className="font-bold">Are you looking for something?</p>
          <p className="text-sm">To search something type username and repository and press enter.</p>
        </div>
      </div>
    </div>
    html.push(error);
    }
    else if(this.state.repo.message !== '' && this.state.repo.message !== undefined){
      let error = <div className="bg-red-100 border-t-4 border-red-400 text-red-700 px-4 py-3 rounded-b shadow-md" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p className="font-bold">Something went wrong!</p>
          <p className="text-sm">{this.state.repo.message}</p>
        </div>
        </div>
      </div>
      html.push(error);
    }else{
      this.state.repo.forEach(issue => {
        html.push(<Card issue={issue} username={this.state.username} repository={this.state.repository}/>);  
      });
      
    }

    return <div className='container mx-auto'>
        <div className="flex flex-row"> 
            <input value={this.state.username} onChange={this.handleChangeUsername}  onKeyDown={this.getRepoData} type="text" placeholder="Username" className="px-3 py-3 my-5 mr-2 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
            <input value={this.state.repository} onChange={this.handleChangeRepository} onKeyDown={this.getRepoData} type="text" placeholder="Repository" className="px-3 py-3 my-5 ml-2 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
        </div>
        {html}
    </div>;
  }
}

export default ListView;
