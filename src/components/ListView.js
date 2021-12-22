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
      repo: null,
      pageCount: 5,
      isLoaded: false,
      currentPage: 1,
    }
    
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeRepository = this.handleChangeRepository.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getRepoData = this.getRepoData.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  getRepoData(event){
    if(event.key === 'Enter'){
      this.fetchData();
    }
  }

  fetchData() {
    new Request().getRepoIssues(this.state.username,this.state.repository, this.state.currentPage, this.state.pageCount)
    .then(res => {
      console.log(res);
      this.setState({
        repo: res,
        isLoaded: true
      })
    });
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }
  
  handleChangeRepository(event) {
    this.setState({repository: event.target.value});
  }

  handlePageChange(event) {
    this.setState({currentPage: event.selected});
    this.fetchData();
  }

  handlePrevious(){
    let newPage = this.state.currentPage - 1;
    newPage = newPage < 1 ? 1 : newPage;
    this.setState({currentPage: newPage}, () => this.fetchData());
  }

  handleNext(){
    let newPage = this.state.currentPage + 1;
    this.setState({currentPage: newPage}, () => this.fetchData());
    this.fetchData();
  }

  render () {

    var html = [];
    if(this.state.repo === null){ //Show default info
      let error = <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 mx-2 shadow-md" role="alert">
      <div className="flex">
        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p className="font-bold">Are you looking for something?</p>
          <p className="text-sm">To search something type username and repository and press enter.</p>
        </div>
      </div>
    </div>
    html.push(error);
    }else if(this.state.repo.message !== '' && this.state.repo.message !== undefined){ //Show error searching repos
      let error = <div className="bg-red-100 border-t-4 border-red-400 text-red-700 px-4 py-3 rounded-b shadow-md mx-2" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p className="font-bold">Something went wrong!</p>
          <p className="text-sm">{this.state.repo.message}</p>
        </div>
        </div>
      </div>
      html.push(error);
    }else{ //Show results
      this.state.repo.forEach(issue => {
        html.push(<Card issue={issue} username={this.state.username} repository={this.state.repository}/>);  
      });
      
    }

    return <div className='container sm:mx-auto mx-1'>
        <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 m-2'>
            <input value={this.state.username} onChange={this.handleChangeUsername}  onKeyDown={this.getRepoData} type="text" placeholder="Username" 
            className="w-full p-3 relative bg-gray-200 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"/>
          
            <input value={this.state.repository} onChange={this.handleChangeRepository} onKeyDown={this.getRepoData} type="text" placeholder="Repository" 
            className="w-full p-3 relative bg-gray-200 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"/>
        </div>
        {html}
        {
          this.state.repo ?
          <div class="flex justify-center items-center space-x-1 mt-3">
          <div href="#" onClick={this.handlePrevious} class="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md">
              Previous
          </div>
          <div onClick={this.handleNext} class="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white">
              Next
          </div>
          </div>
          : <div></div>
        }
    </div>;
  }
}

export default ListView;
