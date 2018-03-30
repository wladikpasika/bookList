new Vue({
    el: '#tbody',
    data: {
        books:[]
    },
    methods:{
        remove(e){
            e.preventDefault();
            Vue.http.headers.common['X-Requested-With'] = "XMLHttpRequest"; //указываем, что это ajax
            Vue.http.get(e.target.href).then(response => {
            //сообщение, что книга удалена
                this.message(false,true, response.bodyText);
            return  this.findBooks(response.bodyText)}).catch(err => {
                return  this.message(true,false, 'Ошибка удаления данных');
            });
        },
        findBooks(){
            Vue.http.headers.common['X-Requested-With'] = "XMLHttpRequest"; //указываем, что это ajax
            return Vue.http.get('/book/list').then(result => {
                if(Array.isArray(result.body)) {
                    return this.books = result.body};
            }).catch(err => {
                alert('Ошибка обновления данных в таблице', err);
            })
        },
        message(err, success, message){
            let errElem = document.querySelector('#VueDanger');
            let successElem = document.querySelector('#VueSuccess');

            document.querySelectorAll('.alert').forEach(item =>{
                item.style.display = 'none';
            });
            if(err&&message){
                errElem.innerHTML = message;
                errElem.style.display = 'block';
                setTimeout(function(){
                    errElem.style.display = 'none';},5000)
            }
            else if(success&&message){
                successElem.innerHTML = message;
                successElem.style.display = 'block';
                setTimeout(function(){
                    successElem.style.display = 'none';},5000)
            }
        }
    },
    mounted(){
        this.findBooks();
    }
});