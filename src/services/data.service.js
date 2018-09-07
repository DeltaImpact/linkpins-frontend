import axios from 'axios';
import cheerio from 'cheerio';


export const dataService = {
    parse,
};

function parse(url) {
    // return axios.get(url)
    fetch('url', {
        method: 'get',
        mode: 'no-cors',
    })
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
      })
      .then(function(html) {
        // Initialize the DOM parser
        var parser = new DOMParser();
        // Parse the text
        var doc = parser.parseFromString(html, "text/html");
        
        // You can now even select part of that html as you would in the regular DOM 
        // Example:
        // var docArticle = doc.querySelector('article').innerHTML;
      
        console.log(doc);
        debugger
      })

    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        mode: 'no-cors',
    })
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                let page = {};
                page.raw = response.data;
                page.url = url;
                page.title = $("title").text();
                // page.img = $('img').attr('src');
                // page.img = $(this).find('img').text();
                page.img = {};

                $('img').each(function () {
                    page.img = ($(this).prop('src'));
                });

                debugger

                let devtoList = [];
                $('.single-article').each(function (i, elem) {
                    devtoList[i] = {
                        title: "$(this).find('h3').text().trim(),",
                        url: $(this).children('.index-article-link').attr('href'),
                        tags: $(this).find('.tags').text().split('#')
                            .map(tag => tag.trim())
                            .filter(function (n) { return n != "" })
                    }
                });
                debugger
            }
        },
            error => console.log(error));



    // var casper = require('casper').create();
    // return casper.start(url).then(response => {
    //     let asd = response;
    //     debugger
    // });

    // return axios.get('http://httpbin.org/get', {
    //     url: url,
    // })
    //     .then(parseJSON)
    //     .then(response => {
    //         debugger
    //         if (response.token) {
    //             let tpm = jwtDecode(response.token);
    //             let user = {
    //                 username: tpm.unique_name,
    //                 email: tpm.email,
    //                 token: response.token
    //             }
    //             localStorage.setItem('user', JSON.stringify(user));
    //             debugger
    //             // axios.defaults.headers.common['Authorization'] =
    //             //     'Bearer ' + response.token;
    //             return user;
    //         }
    //         return error;
    //     },
    //         error => {
    //             let err = {};
    //             // response: {
    //             //     status: 503,
    //             //     statusText: 'User with that email already exists',
    //             // },
    //             // let errorMessage = "";
    //             if (error.response) {
    //                 err.response = error.response;
    //                 if (error.response.status === 400) {
    //                     logout();
    //                     err.status = error.response.status;
    //                     err.errorMessage = error.response.statusText;
    //                     err.info = error.response.data.message;
    //                 }

    //                 if (error.response.data.message) {
    //                     err.errorMessage = error.response.data.message;
    //                 }
    //             }

    //             if (error.message === "Network Error") {
    //                 err.status = 503;
    //                 err.errorMessage = "Network Error";
    //             }


    //             // debugger
    //             return Promise.reject(err);
    //         }



    //     );
}