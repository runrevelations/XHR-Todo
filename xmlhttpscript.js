// To turn logging on or off set loggingAllowed = false;
var loggingAllowed = true;

if (loggingAllowed === false) {
    console.log = function(){};   
};



// Request settings
const url = 'https://realtor-api.herokuapp.com/api/v1/todos';
const urlEncoded = { first: 'Content-Type', last: 'application/x-www-form-urlencoded' };


// GET
function $httpGet(url, obj) {

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
    
        if(xhr.readyState === 4 && xhr.status === 200) {
	    var res = JSON.parse(xhr.responseText);
	    resFunction(res);
        };

    };

    xhr.open('GET', url, true);

    if (obj != null) {
        
        var setHeaders = {
            first: obj.first,
            last: obj.last
        };

        xhr.setRequestHeader(setHeaders.first, setHeaders.last);
    };

    xhr.send();
    
    return console.log(xhr)
};



// Append li to list
function resFunction(res) {

    document.getElementById('list').innerHTML = '';
    console.log(res)

    for (var i in res){
       var liElement = document.createElement('li');
       liElement.setAttribute('id', 'appendedLi')
       var name = document.createTextNode(res[i].name)
       liElement.appendChild(name);
       document.getElementById('list').appendChild(liElement);

       document.todos = []
       document.todos.push(res);
    };

};



// POST
function $httpPost(url, headerObj) {

    var todoName = document.getElementById('todoName');

    var formName = encodeURI(todoName.value );
    
    if (formName === ''){
        event.preventDefault();
        console.log('%cPost field ERROR!', 'color: red');
        return;
    };
    
    var xhr = new XMLHttpRequest();
    console.log(xhr)

    xhr.open('POST', url, true);

    xhr.onreadystatechange = function() {
        
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Success');      
            event.preventDefault();
        };

    };

    
    if (headerObj) { 

        var setPostHeaders = {
            first: headerObj.first,
            last: headerObj.last
        }; 

        xhr.setRequestHeader(setPostHeaders.first, setPostHeaders.last);
    };
    
    xhr.send('name=' + formName);
    
    setTimeout(function(){
    
        $httpGet(url, urlEncoded);
    
    }, 50)

    todoName.value = '';
    event.preventDefault();
};




// DELETE
function deleteTodo() {

    var deleteMe = document.getElementById('toDelete').value;
    
    
    if (deleteMe === '' || isNaN(deleteMe)) { 
        event.preventDefault(); 
        console.log('%cDelete box ERROR', 'color: red'); 
        document.getElementById('toDelete').value = '';
        return 
    };
    
    var toDelete = deleteMe - 1;
    console.log(deleteMe)
    console.log(document.todos[0][toDelete])
  
    var wipe = document.todos[0][toDelete]._id;
    
    var xhrDel = new XMLHttpRequest();
    
    xhrDel.open('DELETE', url + '/' + wipe);
    
    xhrDel.send('name=' + wipe);
    
    document.getElementById('toDelete').value = '';
    
    setTimeout(function(){
    
         $httpGet(url, urlEncoded);

    }, 130);
    

    event.preventDefault();

};
