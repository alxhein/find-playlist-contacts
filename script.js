/*
let list = the tbody element
for(let i=0; i<list.childElementCount; i++){
  let id = list.children[i].children[2].children[1].href;
  id=id.substring(id.lastIndexOf("playlist")+9);playlistIds[i] = id;
}

TODO:
- Make it a chrome extension
- Make it save average monthly listeners, last update, 28-day add ratio, and genres
- allow user to save spreadsheet
- make feature for scraping contacts from Spotify search results
*/

class Playlist{
    constructor()
    {
        this._id;
        this._name;
        this._owner;
        this._description;
        this._followers;
        this._images;
        this._tracks;
        this._contact;
    }
    set id(id){
        this._id = id;
    }
    set name(name){
        this._name = name;
    }
    set owner(owner){
        this._owner = owner;
    }
    set description(description){
        this._description = description;
    }
    set followers(followers){
        this._followers = followers;
    }
    set images(images){
        this._images = images;
    }
    set tracks(tracks){
        this._tracks = tracks;
    }
    set contact(contact){
      this._contact = contact;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get owner(){
        return this._owner;
    }
    get description(){
        return this._description;
    }
    get followers(){
        return this._followers;
    }
    get images(){
        return this._images;
    }
    get tracks(){
        return this._tracks;
    }
    get contact(){
      return this._contact;
    }
  }
  
  // Get the hash of the url
  const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
  
  // Set token
  let _token = hash.access_token;
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  
  // app's client ID, redirect URI and desired scopes
  const clientId = 'cefb70f60e364197b8a7e63b7d6836d9';
  const redirectUri = 'http://streamlinemusic.net';
  const scopes = [
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'playlist-read-private'
  ];
  
  //declare DOM elements as variables
  var authorizeButton = document.getElementById('authorize');
  var body = document.getElementById('body');
  var searchContainer = document.getElementsByClassName('search-container')[0];
  var mainContent = document.getElementById('main-content');
  var search = document.getElementById('playlist-search');
  var submit= document.getElementById('submit-button');
  var contacts = document.getElementById('contact-container');
  var table = document.getElementById('contact-table');
  var clear = document.getElementById('clear-button');
  var downloadCSVButton = document.getElementById('download-button');
  
  //authorize with Spotify
  authorizeButton.onclick = function(){
      location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  }
  
  // check for access token, display buttonList
  if (_token){
    authorizeButton.style.display = 'none';
    mainContent.style.display = 'block';
    //let playlistIds = ["0Nfd1i1ofRRIXN8Kyk5ms1", "16gXsmg48MdRTqCLNnx9Cu", "1J2vYkrZaRh9mPoRAiVVmU", "7ozIozDp260fjNOZy1yzRG", "3Di88mvYplBtkDBIzGLiiM", "0Zarq4BVkFkZOWkmqsfrjA", "0Wc32Rbhqg6gXSZjxuTYKy", "0NCspsyf0OS4BsPgGhkQXM", "48Mt711afYOOYamgJTMaGF", "4PFT2iFEAmJVAKyS9t0toN", "0OdWlUFdB6Lio5dIdXY81O", "0rkxErbruAmcxwdLL6ZCz8", "6xGLprv9fmlMgeAMpW0x51", "7c8YrzHlapYbk3OpZYi31K", "5CLCReqqp7OTLDMcvB1oLw", "2dmXP0D8ivy0jF3IMuWdsx", "2NdDBIGHUCu977yW5iKWQY", "5Is7WWieaLqwfJ8H7CkcOh", "26zoCb1y8QqOdTXQXZQQFj", "0umA1dm59ONKCi5KIzLoz7", "3aR2n0XpRNlrWose8kx82S", "5JyM6mqPEDLcToVHY5HlY4", "0xrcpsSBNGorqGjSeIgvF6", "1MidghQfbi6j4zS03XTr7T", "6UGRY7ru8yUPoNLa0f4tWv", "2fS5bR8G8wlqt73xndQOGn", "5ffyoghiKFklTNHZIrPJ0q", "3gB2yMGJzoAkh1MVuVBsGA", "2Ps64TVbfmfX6jxWJnlX1j", "0za4lOIjPNqcKUDQqVCGlf", "0B8Wg0ODKFPHCD3lWM4j7P", "48sHE0nZIXRuvre0zhypbD", "782M4g8PfWvszFqPHVnsnR", "5AHH67GYsljwoB1q6UGvWg", "34HOeO7zgTVWsBC61Jea7f", "7zR1nV8comFTN4k97yunVN", "2LVvgP7VJN5xAkmPdl5J4q", "3gWAZPuNWpELIhKNbnpfwk", "54D1ql9kuxp5iDtjV0BNa3", "37D5MPyW7klBxB903ZiGya", "7sZbq8QGyMnhKPcLJvCUFD", "6TJtYZm7f40ed3xLBHN0p2", "7LDpUAjCFTJVKPikrKVSJy", "5Whb5YPTBJeHRoD69BU0ds", "6xUgVgOLgAIqLJ6oTeRXUY", "5RE37ytlCjGvttayQz9Pgj", "1CD11IKUrYwireDIW8oSZi", "2cwdsupS9pMyxb8YMoiOp3", "4rapqxvOH5KKfyhHZDB7lA", "5s3XqdvKhYaepQNQuc6uTe", "5ABMzUESx7K7EyowE5kFCl", "2lfAwrTGw2rbXLJf7elpo9", "6hzruhirL980WrXCGmMxQ3", "7gc654Mavvu8118c6fii6J", "1Jl4zMXcGWW9Qf5rzBQkns", "1pRbBtxQySnKaYh9kA5bwb", "4MGrGUQoW0vgaiDkrwCsjg", "62bReXvmroQzQfEUuTNe3Y", "14q2LelQYB2eqdTLeLbCq7", "30zschNd31QTmpu6qtTOAH", "5Udnh472z0CeexGPSpdIw9", "25WpoeeyHdUYtahseE87dt", "33PyRULhtc4SRrUE1wbbmp", "5ARGJCUqvGavr7y0TFOO18", "0XiPwB7os3uvLvWt2VaJeh", "6uJCrt33VwqvyLf39pcyo5", "73sjn2t4maF758R8bpQFOL", "2GEXzPeksIINQMTivWQ2el", "0C1UDx8LPfsELF6Gu6U5zM", "31oAk1yzLkZajF6gRhqRNV", "6R5Tq68DMutm76RCND9RoT", "25rGszOljOSjPxS5CNVJe0", "4ycIAGqf9BoQMHiNobxGUc", "2sUnJwjAHuUU9Ums6jp6aA", "7nppx7uLgcmkZHg70HNfOk", "3uGGl9F4danv311ezFKerP", "2jcDdyoAdFzRvCdd1jIVWk", "5VmXypMC2ufuwFBwuMkuur", "3SnPVgCtVHMgzcGMsXKuV4", "6Sj2mRpBwLxfHxuQF2lWBG", "6FeRrOVfaeNXlDFfB36jHI", "0VjZFIIqCadnpPBe1quxJo", "2XzbMrcmW3Ka37fVr4V5v9", "333xuRZr7WYZUlsXes8v5p", "3s9XQLSPcI5GdfwB8IsNC7", "549lx4U7hl7dSSRMoGIUga", "0EMTofe0yg487MbIxogliJ", "13BfJYtioEdIE9XRtKZH4h", "3VuM2IVll3qTJOArVERazL", "59aEvelmx0YFKc5WXuric6", "3RKYyyC0t3bOa8m1NpB2c5", "4sgUux9hmykyWYmVoe4W6p", "3JuTvfsK2HEAEkHyuKtza7", "4AycmXrcVLcW0tuDAjGSHo", "2xTej0cHbqpDUG5QHdWVs6", "23qf2c5jdlRAb5WKZANJHA", "1E5vR0mEzAOtisOZfA1Aur", "6mHT3gP1cb5gnQ4O61wC6Y", "3eNKBpYXA6dvARYXGIAIlr"];
    //getEmails(playlistIds, _token);
    
    //submit button searches for playlists and gets contacts
    submit.onclick = function(){
  
      let searchInput = search.value;
      getEmailsFromSearch(searchInput, _token);
    }
    
    //clear button clears the table
    clear.onclick = function(){
      
      while(table.childElementCount > 1){
        table.children[1].outerHTML = '';
      }
    }
  
    downloadCSVButton.onclick = function(){
      return exportTableToCSV('playlist-contacts.csv');
    }
  }
  
  //searches spotify iteratively with offset and performs getEmails on each playlist
  async function getEmailsFromSearch(query, _token){
    let offset = 0;
    let playlistIds = [];
    let idSet = [];;
    for(let i=0; i<20; i++){
      idSet = await searchSpotify(query, _token, offset);
      playlistIds = playlistIds.concat(idSet);
      console.log(playlistIds);
      offset+=20;
    }
    getEmails(playlistIds, _token);
  }
  
  //parses the playlist descriptions to find contact information
  async function getEmails(playlistIds, _token){
      let playlists = [];
      let contact;
    for(let i=0; i<playlistIds.length; i++){
      isLink = false;
      playlists[i] = await getPlaylistInfo(playlistIds[i], _token);
      console.log(playlists[i]);
      if(playlists[i]){
        if(playlists[i].description){
        let atIndex = playlists[i].description.lastIndexOf("@");
        if(atIndex!=-1){
        let firstHalf = playlists[i].description.substring(0, atIndex);
        let secondHalf = playlists[i].description.substring(atIndex);
        
        if(playlists[i].description.substring(atIndex-1, atIndex) == ">"){
          firstHalf = firstHalf.substring(atIndex);
        }
        else if((firstHalf.lastIndexOf(">")!=-1) && (firstHalf.lastIndexOf(">")!=atIndex-1)){
          firstHalf = firstHalf.substring(firstHalf.lastIndexOf(">")+1);
        }
        else if(firstHalf.lastIndexOf(" ") !=-1){
          firstHalf = firstHalf.substring(firstHalf.lastIndexOf(" "));
        }
        
        if(secondHalf.indexOf(" ") != -1){
          secondHalf = secondHalf.substring(0, secondHalf.indexOf(" "));
        }
        if(secondHalf.indexOf(")") != -1){
          secondHalf = secondHalf.substring(0, secondHalf.indexOf(")"));
        }
        if(secondHalf.indexOf("]") != -1){
          secondHalf = secondHalf.substring(0, secondHalf.indexOf("]"));
        }
        if(secondHalf.substring(secondHalf.length-1) == "."){
          secondHalf = secondHalf.substring(0, secondHalf.length-1);
        }
  
        contact = firstHalf + secondHalf;
        contact = contact.trim();
        if(contact.length > 3){
          console.log(contact);
          playlists[i].contact = contact;
          addPlaylistTableRow(playlists[i]);
        }
      }
    }
      }
    }
  }
  
  //get information about the playlist
  async function getPlaylistInfo(playlistId, _token){
    let playlist = new Playlist();
    try{
        let result = await $.ajax({
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
        });
        let data = await result;
        
        playlist.id = data.id;
        playlist.name = data.name;
        playlist.images = data.images.map(item => item.url);
        playlist.followers = data.followers.total;
        playlist.description = data.description;
        playlist.owner = data.owner.display_name;
        playlist.tracks = data.tracks.items;
  
        return playlist;
        }
    catch(error){
        console.log(error);
    }
  }
  
  //OBSOLETE
  function addPlaylistDataHtml(p){
    let div = document.createElement("div");
    div.className = "playlist";
    let name = document.createElement("h3");
    name.innerHTML = p.name;
    div.appendChild(name);
    let owner = document.createElement("p");
    owner.innerHTML = "owner: " + p.owner;
    div.appendChild(owner);
    let followers = document.createElement("p");
    followers.innerHTML = "followers: " + p.followers;
    div.appendChild(followers);
    let contact = document.createElement("p");
    contact.innerHTML = "contact: " + p.contact;
    div.appendChild(contact);
  
    contacts.appendChild(div);
  }
  
  //Adds a row of playlist data + contact to the table
  function addPlaylistTableRow(p){
    //create row element
    let row = document.createElement("tr");
  
    //name, owner, followers, and contact cells
    let name = document.createElement("td");
    name.innerHTML = p.name;
    name.className = 'playlist-cell';
    row.appendChild(name);
    let owner = document.createElement("td");
    owner.innerHTML = p.owner;
    owner.className = 'owner-cell';
    row.appendChild(owner);
    let followers = document.createElement("td");
    followers.innerHTML = p.followers;
    followers.className = 'followers-cell';
    row.appendChild(followers);
    let contact = document.createElement("td");
    contact.innerHTML = p.contact;
    contact.className = 'contact-cell';
    row.appendChild(contact);
  
    //append to tbody element
    table.firstElementChild.appendChild(row);
  }
  
  //search spotify for playlists
  async function searchSpotify(query, _token, offset){
    query = encodeQueryString(query);
    var resultArray = [];
  
    try{
        let result = await $.ajax({
            url: `https://api.spotify.com/v1/search?q=${query}&type=playlist&offset=${offset}`,
            type: "GET",
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
        });
        let data = await result;
  
            for(let i=0; i<data.playlists.items.length; i++){
                resultArray.push(data.playlists.items[i].id);
            }
  
  
        return resultArray;
        
        }
    catch(error){
        console.log(error);
    }
  }
  
  //create query string for Spotify search
  function encodeQueryString(query){
    var array = query.split(' ');
    var string = '%22';
    for(let i=0; i<array.length; i++){
        if(i===array.length - 1){
            string+=array[i] + '%22';
        }
        else{
            string+=array[i] + '%20'
        }
    }
    return string;
  }
  
  //download table as CSV file
  function downloadCSV(csv, filename){
    var csvFile;
    var downloadLink;
  
    csvFile = new Blob([csv], {type:"text/csv"});
  
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
  
    document.body.appendChild(downloadLink);
  
    downloadLink.click();
  }
  
  //exports table to CSV file and executes downloadCSV
  function exportTableToCSV(filename){
    var csv=[];
    var rows = table.firstElementChild.querySelectorAll("tr");
  
    for(let i=0; i<rows.length; i++){
      var row = [], cols = rows[i].querySelectorAll("td, th");
      for(let j=0; j<cols.length; j++){
        let text = cols[j].innerHTML;
        text = text.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
        row.push(text);
      }
      csv.push(row.join(","));
    }
  
    downloadCSV(csv.join("\n"), filename)
  }