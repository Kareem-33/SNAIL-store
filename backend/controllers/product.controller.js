import Product from '../models/product.model.js';

import cloudinary from '../lib/cloudinary.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(!products.length) {
      return res.status(404).json({ success: false, message: "No products found" });
    }
    res.status(200).json({success: true, message: "Products fetched successfully", data: products});
  } catch (error) {
    console.error(`Error in getAllProducts controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    if(!featuredProducts.length) {
      return res.status(404).json({ success: false, message: "No featured products found" });
    }
    res.status(200).json({ success: true, message: "Featured products fetched successfully", data: featuredProducts });
  } catch (error) {
    console.error(`Error in getFeaturedProducts controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const createProduct = async (req, res) => {
  try {
    const { title, description, image, price, category, isFeatured, stock } = req.body;
    if (!title || !description || !image || !price || !category || !stock) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let cloudinaryResponse;
    if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: 'products'});
    }

    const newProduct = new Product({
      title,
      description,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : '',
      price,
      category,
      isFeatured,
      stock
    })

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
  } catch (error) {
    console.error(`Error in createProduct controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if(product.image) {
      const publicId = product.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
      console.log(`Image deleted from Cloudinary: ${product.image}`);
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteProduct controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getRecommendedProducts = async (req, res) => {
  try {
    const recommendedProducts = await Product.aggregate([
      {
        $sample: { size: 5 } // Randomly select 5 products
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          price: 1,
          category: 1,
          isFeatured: 1
        }
      }
    ]);
    if (!recommendedProducts.length) {
      return res.status(404).json({ success: false, message: "No recommended products found" });
    }
    res.status(200).json({ success: true, message: "Recommended products fetched successfully", data: recommendedProducts });
  } catch (error) {
    console.error(`Error in getRecommendedProducts controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (!products.length) {
      return res.status(404).json({ success: false, message: `No products found in category: ${category}` });
    }
    res.status(200).json({ success: true, message: `Products in category: ${category} fetched successfully`, data: products });
  } catch (error) {
    console.error(`Error in getProductsByCategory controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" }); 
  }
}

export const toggleFeaturedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    await product.save();
    res.status(200).json({ success: true, message: "Product featured status updated successfully", data: product });
  } catch (error) {
    console.error(`Error in toggleFeaturedStatus controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}