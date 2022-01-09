
import Notiflix from 'notiflix';
import ApiFetch from './api/fetchApi';
import articlesTps from './templates/articles.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs={
  form:document.getElementById('search-form'),
  loadMoreBtn:document.querySelector('.load-more'),
  gallery:document.querySelector('.gallery')
}

refs.form.addEventListener('submit',onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

const apiFetch=new ApiFetch();
function onSearch(e){
  e.preventDefault();
  clearArticlesMarkup()
  apiFetch.query=e.currentTarget.searchQuery.value;
  if(apiFetch.query===""){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }
  apiFetch.resetPage();
  apiFetch.getApi().then(({hits,totalHits}) =>{
    if(totalHits===0){Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); return}
    Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
    apiFetch.nextPage();
    appendCardMarkUp (hits)
    // console.log(hits);
  });  
}
  

function onLoadMore(){
apiFetch.getApi().then(({hits}) =>{
  apiFetch.nextPage();
  appendCardMarkUp (hits);
  // console.log(hits);
});
}

function appendCardMarkUp (hits){
  refs.gallery.insertAdjacentHTML('beforeend',articlesTps(hits));
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh(); 
}

function clearArticlesMarkup(){
  refs.gallery.innerHTML="";
}


//   window.addEventListener("scroll", function(){
           
//     const block = document.querySelector('.gallery');
//     const counter = 1;
   
//     const yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
//     const contentHeight = block.offsetHeight;      // 1) высота блока контента вместе с границами
//     const window_height = window.innerHeight;      // 3) высота внутренней области окна документа
//     const y             = yOffset + window_height;
   
//     // если пользователь достиг конца
//     if(y >= contentHeight)
//     {
//         //загружаем новое содержимое в элемент
//         onLoadMore()
//         return
//     }
// });


