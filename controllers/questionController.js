const askQuestion=(req,res) =>{
    res.render('./question/askQuestion', {pageTitle: 'Ask Question'});
}

module.exports={askQuestion }