const userModel=require("../models/usermodel");
const generateToken=require("../middlewares/tokengenerator")
const bcrypt=require("bcrypt")
module.exports.registerUser= async function registerUser(req,res){
    try{
        console.log(req.body)


        console.log(process.env.PORT)
console.log(process.env.JWT_KEY);
       
       const h= await userModel.create(req.body);
       console.log(h);
       console.log(h._doc)
       const{Password,...niku}=h._doc;
       console.log(niku)
       console.log(Password)
       if(niku){
        res.json({
            data:niku

        })
        

       }
       else{
        console.log("dsnbchjb")

       }
       


      

    }
    catch(err){
        console.log(err.message)
       

        res.status(500).json({
           
           error:err.message
        })
    }
}
    


module.exports.loginUser = async function loginUser(req, res) {
    try {
        let data = req.body;
        console.log("Request data:", data);
        
        let user = await userModel.findOne({ email: data.email });
        console.log("User found:", user);
        
        if (user) {
            const match = await bcrypt.compare(data.Password,user.Password);
            console.log("Entered Password:", data.Password);
            console.log("Hashed Password from DB:", user.Password);
            console.log("Password match:", match);
            
            if (match) {
                const token = generateToken(user.id);
                user.token = token;
                await user.save();
                
                res.json({
                    data: user,
                    token: token
                });
            } else {
                return res.status(401).json({
                    error: 'Wrong credentials'
                });
            }
        } else {
            return res.status(404).json({
                error: 'User not found. Please enter correct credentials.'
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports.logout=async function logout(req,res){
    res.cookie('isloggedin'," ",{maxAge:1});

    res.json({
        data:"logout successful"
    })

}