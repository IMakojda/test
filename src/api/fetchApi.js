import Notiflix from 'notiflix';
const axios = require('axios').default;

export default class ApiFetch{
    constructor(){
        this.searchQuery='';
        this.page=0;
        this.perPage=30;

    }


   async getApi() {
        try {
        const response = await axios.get(`https://pixabay.com/api/?key=24851883-9f712862249ea47cec284e68e&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`);
        return response.data;
        }
        catch (error) {
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
            return
        }
    } 

    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery=newQuery;
    }

    nextPage(){
        this.page += 1
    }
    resetPage(){
        this.page=1
    }
}
  