const getHomepage =(req,res) => {
    res.render('homepage',{pageTitle: 'Homepage'});

}

module.exports={getHomepage};