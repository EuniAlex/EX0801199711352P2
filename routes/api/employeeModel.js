var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');
  lib.getEmployees = (handler)=>{
    // implementar
    // obtener todos los documentos
    empColl.find({}).toArray(
      (err,docs)=>{
          if(err){
            return handler(new Error("No Implementado"), null);
          }else{
            return handler(null,docs);
          }
      }
    );//toArray
  }//getEmployees

  lib.getEmployeesById = (id, handler) => {
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    empColl
    .find({"_id":new ObjectID(id)})
    .project({"email":1,"phone":1,"name":1,"age":1})
    .toArray((err,docs)=>{
        if(err){
          return handler(new Error("No Implementado"), null);
        }else{
          return handler(null,docs);
        }
    });
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    empColl
    .find({"company":{"$in": Array.isArray(company)? company:[company]}})
    .project({"email":1,"name":1,"company":1})
    .toArray((err,docs)=>{
        if(err){
           handler(new Error("No Implementado"), null);
        }else{
           handler(null,docs);
        }
    });
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
   empColl
    .find({"$and":[{"age":{"$gte":ageLowLimit}},{"age":{"lte":ageHighLimit}}]})
    .project({"email":1,"name":1,"age":1})
    .toArray((err,docs)=>{
      if(err){
         handler(new Error("No Implementado"), null);
      }else{
         handler(null,docs);
      }
    });
  }

  lib.getEmployeesByTag = (tag, handler) => {
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    empColl
    .find({"tag":{"$in": Array.isArray(tag)? tag:[tag]}})
    .project({"email":1,"name":1,"tags":1})
    .toArray((err,docs)=>{
        if(err){
           handler(new Error("No Implementado"), null);
        }else{
           handler(null,docs);
        }
    });
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    var acutalTag = Array.isArray(tag)? tag: [tag];
    var updateTag = {"$set": {"tag": acutalTag}};
        empColl.updateOne({"_id": ObjectID(id)},updateTag,(err,res)=>{
            if(err){
                handler(err,null);
            }else{
                handler(null,res.result);
            }// end if (err)
        });
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    empColl.deleteOne({"_id":ObjectID(id)},(err,result)=>{
      if(err) {
        handler(err, null);
      }else{
        handler(null, result.result);
      }
    });
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
