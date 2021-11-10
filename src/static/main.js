const form = document.getElementById("form");
const __authentication_url__ = '/login';

function getCSRFToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


class UserService{
    username;
    password;
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    get getUsername(){
        return this.username;
    }
    get getPassword(){
        throw "You are not allowed to get password";
    }
    static authenticate_user({username, password}){
        let data = {password:password, username:username};
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if(this.response === 'true'){
                    document.location.href = '/';
                }
                else{alert("You didn't log in!, try again")}
            }
        }
        ;
        xhr.open('POST', __authentication_url__, true);
        xhr.setRequestHeader("X-CSRFToken", getCSRFToken('csrftoken'));
        xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
}

form.onsubmit = (event)=>{
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let obj = new UserService(username, password);
    UserService.authenticate_user(obj);
}
