/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/family"

module.exports = {

  /**
   * `FamilyController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('create', {success:{message: "Record created successfully"}});

        })
 
  },


  /**
   * `FamilyController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {families: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the records"}});
    });

  },


  /**
   * `FamilyController.update()`
   */
   update: function (req, res) {

  if(req.method != "POST"){
    return res.view('update');
    } 

    var args = {
        data: req.body,
        headers: { "Content-Type": "application/json" }
    };  
  
  var contact = req.allParams();
  //creates new URL for PUT method
  var endpoint2 = endpoint + "/" +  contact.id;
  
  client.put(endpoint2, args, function (data, response) {
   if(response.statusCode != "200"){
                return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('update', {success:{message: "Record created successfully"}});

        })
  },


  /**
   * `FamilyController.delete()`
   */
  delete: function (req, res) {
    
      if(req.method != "POST"){
        return res.view('delete');
      }

      var args = {
        data: req.body,
        headers: {"Content-Type": "application/json"}
      };

      var contact = req.allParams();

      var endpoint2 = "http://localhost:1337/family/" + contact.id;

      client.delete (endpoint2, args, function (data, response){
        
        if(response.statusCode != "200"){
          return res.view('delete', {error:{message: response.statusMessage + ": " + data.reason}});
        }
      
        return res.view('delete', {success:{message: "Record deleted successfully"}})
      
      })
  },

};

