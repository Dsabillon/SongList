//Song Class: Representa cada canción
class Song{
    constructor(title, author, year){
        this.title = title;
        this.author = author;
        this.year = year;
    }
}


//UI CLASS: Manejo de tareas del UI
class UI {
    static addSongToList(song){
        const list = document.querySelector('#song-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${song.title}</td>
        <td>${song.author}</td>
        <td>${song.year}</td>
        <td><a href="#>X</td>`;
        list.appendChild(row);
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#song-form');
        container.insertBefore(div, form);

        //Para que desaparezca en 3segundos
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#year').value = '';
    }
}

//Store Class: Manejo del guardado de canciones

class Store {

    static getSongs(){
        let songs;
        if (localStorage.getItem('songs') === null){
            songs = [];
        } else {
            songs = JSON.parse(localStorage.getItem('songs'));
        }
        return songs;
    }

    static addSong(song){
        const songs = Store.getSongs();
        songs.push(song);
        localStorage.setItem('songs', JSON.stringify(songs));
    }
}


//Event: Agregar una canción
document.querySelector("#song-form").addEventListener('submit' , (e) => {
    e.preventDefault();
    //Tomando los valores del formulario
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    

    //Validación
    if (title === '' || author === '' || year === ''){
        alert('Porfavor llenar todos los campos');
    } else {
        //Inicializando un nuevo libro
        const song = new Song(title, author, year);
        console.log(song);

        //Mostrando en el UI
        UI.addSongToList(song);

        //Mostrar mensaje de success
        UI.showAlert('Canción agregada', 'success');

        //Limpiar campos
        UI.clearFields();
    };

});