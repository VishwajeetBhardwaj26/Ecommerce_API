const router = require("express").Router();
const Product = require("../models/Product");
const { verifyJwt, verifyTokenAndAdmin,verifyTokenAndAuthorization } = require("./verifyJwt");

//Create Products
router.post("/create",verifyTokenAndAdmin,async (req,res)=>{
    const newProductDetail=  new Product(req.body);
    try {
        const dbSavedResponse= await newProductDetail.save();
        res.status(200).json(dbSavedResponse);
    } catch (error) {
        res.status(500).json(error);
    }
});
//get single product
router.get("/find/:product_id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.product_id });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// Product list
router.get("/getProducts",async(req,res)=>{
    const CategoryQuery=req.query.category;
    try {
        let filteredProducts;
        if(CategoryQuery){
            filteredProducts=await Product.find({
                category:{
                    $in:[CategoryQuery]
                }
            })
        }else{
            filteredProducts=await Product.find();
        }
        res.status(200).json(filteredProducts);
    } catch (error) {
        res.status(500).json(error);
    }
})




module.exports = router;
