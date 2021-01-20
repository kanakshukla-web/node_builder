// 1.dimensionData
exports.dimensionData = (req, res) => {
  let prod_Id = req.params.prod_Id;
  let query = `SELECT * FROM dimensions where Prod_Id = ${prod_Id}`;
  console.log(query);

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log("dimensionData");
      res.status(200).json({
        Response: {
          Code: "1003",
          Details: "product could not found",
          Status: "error",
          Title: "Dimensions Data",
          Result: err,
        },
      });
    }
    res.status(200).json({
      Response: {
        Code: "1000",
        Details: "product sent successfully",
        Status: "completed",
        Title: "Dimensions Data",
        Result: result,
      },
    });
  });
};

// 2.getDimensionTypes
exports.dimensionTypes = (req, res) => {
  let prod_name = req.params.prod_name;
  let query = `SELECT * FROM dimension_types WHERE ProdName = '${prod_name}'`;
  //console.log(query);

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log("dimensionTypes");
      res.status(200).json({
        Response: {
          Code: "1003",
          Details: "product dimension_types could not found",
          Status: "error",
          Title: "dimension Types",
          Result: err,
        },
      });
    }
    res.status(200).json({
      Response: {
        Code: "1000",
        Details: "product sent successfully",
        Status: "completed",
        Title: "Dimension Types",
        Result: result,
      },
    });
  });
};

// 3.productDetails
exports.productDetails = (req, res) => {
  let prod_name = req.params.prod_name;
  let query = `SELECT * FROM product_details WHERE ProdName = '${prod_name}'`;

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log("dimensionTypes");
      res.status(200).json({
        Response: {
          Code: "1003",
          Details: "product productDetails could not found",
          Status: "error",
          Title: "product Details",
          Result: err,
        },
      });
    }
    res.status(200).json({
      Response: {
        Code: "1000",
        Details: "product sent successfully",
        Status: "completed",
        Title: "Product Details",
        Result: result,
      },
    });
  });
};

function getSelectQuery(id) {
  let query;
  id = id.toLowerCase();

  switch (id) {
    case "handle_types":
      query = `SELECT * FROM handle_types`;
      break;
    case "latches":
      query = `SELECT * FROM latches`;
      break;
    case "lidstays":
      query = `SELECT * FROM lidstays`;
      break;
    case "corners":
      query = `SELECT * FROM corners`;
      break;
    case "productslist":
      query = `SELECT * FROM productslist`;
      break;
    case "prod_colors":
      query = `SELECT * FROM prod_colors`;
      break;
    case "foampadding":
      query = `SELECT * FROM foampadding`;
      break;
    case "platematerials":
      query = `SELECT * FROM platematerials`;
      break;
    case "quality":
      query = `SELECT * FROM quality`;
      break;
    case "stackables":
      query = `SELECT * FROM stackables`;
      break;
    case "lackables":
      query = `SELECT * FROM lackables`;
      break;
    case "lidtypes":
      query = `SELECT * FROM lidtypes`;
      break;
  }
  return query;
}

// 4.productData
exports.productData = (req, res) => {
  var id = req.params.id;
  let query = getSelectQuery(id);
 
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log("productData " + id);
      res.status(200).json({
        Response: {
          Code: "1003",
          Details: "product Data could not found",
          Status: "error",
          Title: "product Data",
          Result: err,
        },
      });
    }
    res.status(200).json({
      Response: {
        Code: "1000",
        Details: "product sent successfully",
        Status: "completed",
        Title: "Hardware Data",
        Result: result,
      },
    });
  });
};

function getFieldName(itemType) {
  itemType = itemType.toLowerCase();
  switch (itemType) {
    case "color":
      fieldName = "Color";
      break;
    case "platematerial":
      fieldName = "Applied_PlateMaterial";
      break;
    case "quality":
      fieldName = "Quality";
      break;
    case "lackable":
      fieldName = "Lackable";
      break;
    case "stackable":
      fieldName = "Stackable";
      break;
    case "lidtype":
      fieldName = "LidType";
      break;
    case "foampadding":
      fieldName = "Applied_FoamPadding";
      break;
    case "eggfoam":
      fieldName = "IsEggFormLid";
      break;
    case "mount":
      fieldName = "IsMounted";
      break;
    case "kit":
      fieldName = "IsKit";
      break;
    case "handle":
      fieldName = "Applied_Handle";
      break;
    case "latch":
      fieldName = "Applied_Latch";
      break;
    case "lidstay":
      fieldName = "Applied_Lidstays";
      break;
    case "wheel":
      fieldName = "Applied_Corners";
      break;
    case "length":
      fieldName = "Length";
      break;
    case "width":
      fieldName = "Width";
      break;
    case "#-height-#":
      fieldName = "Height";
      break;
    case "lid height":
      fieldName = "LidHeight";
      break;
  }
  return fieldName;
}

//5. update Product
exports.updateProduct = (req, res, next) => {
  let fieldName;
  let query;
  let itemType = req.body.itemType;
  let value = req.body.value;
  let prod_name = req.body.prod_name;
  itemType = itemType.toLowerCase();
  if (
    itemType != "length" &&
    itemType != "width" &&
    itemType != "#-height-#" &&
    itemType != "lid height"
  ) {
    fieldName = getFieldName(itemType);
    query = `UPDATE product_details SET ${fieldName} ='${value}' WHERE ProdName = '${prod_name}'`;

    let otherValue;
    if (itemType == "Mount" || itemType == "Kit") {
      if (value == "1") {
        otherValue = "0";
      }
      if (value == "0") {
        otherValue = "1";
      }
      query = `UPDATE product_details SET IsMounted ='${value}', IsKit ='${otherValue}' WHERE ProdName = '${prod_name}'`;
      if (itemType == "Kit")
        query = `UPDATE product_details SET IsKit ='${value}', IsMounted ='${otherValue}' WHERE ProdName = '${prod_name}'`;
    }
  } else {
    // query = `UPDATE Product_Details, dimension_types
    // SET dimension_types.Dim_DefaultValue = ${value},
    //     Product_Details.Length = ${value}
    // WHERE
    //     Product_Details.ProdName = dimension_types.ProdName
    //     AND dimension_types.ProdName = '${prod_name}' AND dimension_types.Dim_Name = '${itemType}'`;
    fieldName = getFieldName(itemType);
    query = `UPDATE product_details SET ${fieldName} ='${value}' WHERE ProdName = '${prod_name}'`;
  }
  console.log(query);

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.status(200).json({
        Response: {
          Code: "1003",
          Details: "product could not be updated.",
          Status: "error",
          Title: "updateProduct",
          Result: err,
        },
      });
    }
    res.status(200).json({
      Response: {
        Code: "1000",
        Details: "product updated successfully",
        Status: "completed",
        Title: "Update Product",
        Result: result,
      },
    });
  });
};
