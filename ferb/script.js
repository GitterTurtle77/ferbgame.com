fetch('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=2358230&count=5&format=json&key=977C4BAFD60F47D399E240291A2E95B9', {method: 'GET', mode: 'cors'})
    .then(response => response.json)
    .then(data => console.log(data));