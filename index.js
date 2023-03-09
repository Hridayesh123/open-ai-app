const {Configuration, OpenAIApi} = require("openai");
const express = require("express");
const bodyParser =  require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(request, response){
    
    response.sendFile(__dirname + "/survey.html");
      
  })

app.post("/", function(request,response){
   var userData=request.body.concerns;

   const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function runCompletion(){
    const prompt=userData;
    const response = await openai.createCompletion({
        model : "text-davinci-003",
        prompt : prompt,
        max_tokens : 2048,
        temperature : 1
    });
    console.log(response.data);
 
   
  
}
runCompletion();

   response.send(response.choices[0]["text"]);
})



app.listen(3000, function(req,res){
    console.log("server is running on port 3000");
})
