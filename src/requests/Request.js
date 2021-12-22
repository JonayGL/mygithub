class Request {

    constructor() {
        this.API_URL = "https://api.github.com"
    }

    async getRepo(username, repository){
       const res = await fetch(this.API_URL + '/repos/' + username + '/' + repository);
        return await res.json();
    }

    async getRepoIssues(username, repository, page, per_page){
        const res = await fetch(this.API_URL + '/repos/' + username + '/' + repository + '/issues?page=' + page + '&per_page=' + per_page);
         return await res.json();
    }

    async getIssue(username, repository, id){
        const res = await fetch(this.API_URL + '/repos/' + username + '/' + repository + '/issues/' + id);
         return await res.json();
    }

    async getIssueComments(url){
        const res = await fetch(url);
         return await res.json();
    }
}

export default Request;