## When you need a backend, but can't wait for it. 
```
       (`.  : \               __..----..__
        `.`.| |:          _,-':::''' '  `:`-._
          `.:\||       _,':::::'         `::::`-.
            \\`|    _,':::::::'     `:.     `':::`.
             ;` `-''  `::::::.                  `::\
          ,-'      .::'  `:::::.         `::..    `:\
        ,' /_) -.            `::.           `:.     |
      ,'.:     `    `:.        `:.     .::.          \
 __,-'   ___,..-''-.  `:.        `.   /::::.         |
|):'_,--'           `.    `::..       |::::::.      ::\
 `-'                 |`--.:_::::|_____\::::::::.__  ::|
                     |   _/|::::|      \::::::|::/\  :|
                     /:./  |:::/        \__:::):/  \  :\             $$\ 
                   ,'::'  /:::|        ,'::::/_/    `. ``-.__        $$ |
 $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\ $$\    $$\ $$$$$$\   $$$$$$\  $$ |  $$\ 
 \____$$\  \____$$\  \____$$\ $$  __$$\\$$\  $$  |\____$$\ $$  __$$\ $$ | $$  |
 $$$$$$$ | $$$$$$$ | $$$$$$$ |$$ |  \__|\$$\$$  / $$$$$$$ |$$ |  \__|$$$$$$  / 
$$  __$$ |$$  __$$ |$$  __$$ |$$ |       \$$$  / $$  __$$ |$$ |      $$  _$$<  
\$$$$$$$ |\$$$$$$$ |\$$$$$$$ |$$ |        \$  /  \$$$$$$$ |$$ |      $$ | \$$\ 
 \_______| \_______| \_______|\__|         \_/    \_______|\__|      \__|  \__|
```
#### Drop in some json, get a response... or don't. I don't care. 

## To run:
#### A million ways to do this.
* `cd /path/to/aaarvark'
* `node index.js`
* Aaarvark should respond with: `aaarvark is go`
* End session with `ctrl-c`

## To add interaction:
* Create mock json file in `canned_json` directory
* Create route in `index.js` with respone as:
``` javascript
    router.route('/yourRoutePath')
      .get(function(req,res) {
        // your get request
      })
      .post(function(req,res) {
        // your post request and response
        var yourRouteVariable = require('./canned_json/your_json_file.json');
        console.log(req.body);
    
        res.json(yourRouteVariable);
      }); 
```
* using `console.log(req.body)` will display parameters sent from app webservice (described below). Append `req.body.yourParameterName` to return that specific parameter
* for fast prototyping of get requests, the `canned_json` directory matches the route `\json\*filenameWithoutExtension`. 

## To build webservice request in app with Alamofire:
* Open your webservice swift file
* Starting building function like so:
``` swift
    func yourWebserviceName(parameter1:String, parameter2:String, parameter3:String, parameter4:String) {
      let params:[String:String] = ["param1":parameter1,
                                    "param2":parameter2,
                                    "param3":parameter3,
                                    "param4":parameter4]
      
      Alamofire.request(yourBaseURL.appendingPathComponent("yourWebserviceName"), method: .post, parameters: params) // method isn't required, and defaults to .get
        .validate(statusCode: 200..<300) // validates response code
        .validate(contentType: ["application/json"]) // validates response type
        .responseJSON { (response) in
          print(response) // response block
      }
  }
```
* Make sure `yourBaseURL.appendingPathComponent("yourWebserviceName")` matches `router.route('/*yourRoutePath')` 

## Xcode Specific Requirements:
#### How to circumvent required https in development.
* Replace `yourServerNameGoesHere` and add to your `info.plist` file:

``` xml
  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsArbitraryLoadsInWebContent</key>
    <true/>
    <key>NSExceptionDomains</key>
    <dict>
      <key>yourServerNameGoesHere</key>
      <dict>
        <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
        <true/>
        <key>NSIncludeSubdomains</key>
        <true/>
      </dict>
    </dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
```

## Reference Material:
* [Express 4.x API Reference](http://expressjs.com/en/4x/api.html)
* [Build Restful API using Node and Express 4](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
* [Build Request in Alamofire](https://github.com/Alamofire/Alamofire#making-a-request)
