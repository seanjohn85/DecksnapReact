//function to register new user on server
export function RegisterPost(type, cardsRequested) {

    //server api address
    let url = 'http://www.decksnaps.com/decksnap/loginregister/register.php';

    //sets a promise to ensure function has a return... needed as function is async
    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'POST',
                //this data was passed in to this function
                body: cardsRequested,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            //returns the response
            .then(response => resolve(response))
            .catch(error => reject(error))
    });

}
