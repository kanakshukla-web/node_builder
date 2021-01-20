var empty = require("is-empty");

// 1.userDetails
exports.validateLogIn = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (empty(email) || empty(password)) {
    return res.status(200).json({
      Response: {
        Code: 404,
        Details: "Email or password can not be blank",
        Status: "error",
        Title: "Invalid Request",
      },
    });
  }
  let query = `SELECT * FROM login_tbl WHERE Email = '${email}' AND Password = '${password}'`;

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      return res.status(200).json({
        Response: {
          Code: 1003,
          Details: err.message,
          Status: "failed",
          Title: "User LogIn ",
          Result:err
        },
      });
    }
    if (result != null && result.length > 0) {
      res.status(200).json({
        Response: {
          Code: 1000,
          Details: "User Record fetched successfully",
          Status: "completed",
          Title: "User Record ",
          Result: result,
        },
      });
    } else {
      res.status(200).json({
        Response: {
          Code: 1001,
          Details: "User Record not found",
          Status: "failed",
          Title: "User Record ",
          Result: result,
        },
      });
    }
  });
};

// 2.registerData
exports.registerData = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  if (empty(email) || empty(password) || empty(username)) {
    return res.status(200).json({
      Response: {
        Code: 404,
        Details: "Email or password can not be blank",
        Status: "error",
        Title: "Invalid Request",
      },
    });
  }
  var query = `INSERT INTO login_tbl (Username,Password,Email,IsActive) VALUES ('${username}', '${password}','${email}',0)`;
  console.log(query);
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(200).json({
        Response: {
          Code: 1003,
          Details: err.message,
          Status: "failed",
          Title: "User Record ",
          Result:err
        },
      });
    }
    console.log(result);
    if (result != null && result.affectedRows == 1) {
      res.status(200).json({
        Response: {
          Code: 1000,
          Details: "User Record Inserted successfully",
          Status: "completed",
          Title: "User Record ",
          Result: result,
        },
      });
    } else {
      res.status(200).json({
        Response: {
          Code: 1002,
          Details: "User Record could not Inserted",
          Status: "failed",
          Title: "User Record ",
          Result: result,
        },
      });
    }
  });
};
