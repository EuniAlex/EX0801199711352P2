var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all  YA
      GET       /byid/:id Ya
      GET       /bycompany/:company YA
      GET       /byagerange/:min/:max Ya 
      GET       /bytag/:tag Ya
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', (req, res, next) => {
    /*
    empModel.xyz( (err, docs)=>{
      return res.status(200).json(docs);
    });
    */
    empModel.getEmployees( (err,docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:"Murio"});
      }
        return res.status(200).json(docs);
    })
  });// all

  router.get('/byid/:id',(req,res,next)=>{
      empModel.getEmployeesById(req.params.id, (err,docs)=>{
        if(err){
          console.log(err);
          return res.status(500).json({error:"Murio"});
        }
          return res.status(200).json(docs);
      })
  });// byid

  router.get('/bycompany/:company',(req,res,next)=>{
    empModel.getEmployeesByCompany(req.params.company, (err,docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:"Murio"});
      }
        return res.status(200).json(docs);
    })
  });// bycompany

  router.get('/byagerange/:min/:max',(req,res,next)=>{
    empModel.getEmployeesByAgeRange(parseInt(req.params.min),parseInt(req.params.max),(err,docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:"Murio"});
      }
        return res.status(200).json(docs);
    })
  });// byagerange

  
  router.get('/bytag/:tag',(req,res,next)=>{
    empModel.getEmployeesByTag(req.params.tag, (err,docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({error:"Murio"});
      }
        return res.status(200).json(docs);
    })
  });// bytags
  
  router.put('/addtag/:id', function(req,res,next){
    empModel.addEmployeeATag((req.body.tag || '').split('|'),req.params.id,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"Murio"});
        }
        return res.status(200).json(result);
    });//end mongoModel
});//end put

  return router;
}

module.exports = initEmployee;
