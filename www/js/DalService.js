angular.module('starter.DalServices', [])

  .factory('DAL', function($cordovaSQLite){

    var services={
      prepareDB: function(){
        try {
          if(window.cordova) {
            db = $cordovaSQLite.openDB({name:"serveyDB.db",location:'default'});
          }
          else {
            db = openDatabase("serveyDB.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
          }

          db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Questions (Question text)");
          });

        } catch (error) {
          alert(error);
        }
      },
      saveQuestion: function(res){
        try {

          db.transaction(function (tx) {
            var query = "INSERT INTO Questions (Question) VALUES (?)";
            $cordovaSQLite.execute(db, query, [JSON.stringify(res.data)])
          });

        } catch (error) {
          alert(error);
        }
      },
      getQuestion: function(){
        var questionList={};

        return $cordovaSQLite.execute(db, 'Select * from Questions')
          .then(function(res) {

              if (res.rows.length > 0) {
                questionList = res.rows.item(0).Question;
              }
              return questionList;
            }
          );
      }
    }
    return services;
  })


