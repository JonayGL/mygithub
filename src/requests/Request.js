class Request {

    constructor() {
        this.API_URL = "https://api.github.com"
    }

    async getRepo(username, repository){
       const res = await fetch(this.API_URL + '/repos/' + username + '/' + repository);
        return await res.json();
    }

    async getRepoIssues(username, repository){
        const res = await fetch(this.API_URL + '/repos/' + username + '/' + repository + '/issues');
         return await res.json();
    }

    async getIssue(username, repository, id){
        const res = await fetch(this.API_URL + '/repos/' + username + '/' + repository + '/issues/' + id);
         return await res.json();
    }
}

export default Request;