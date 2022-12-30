
const dbConfig = require('./db.config')
const {Sequelize,DataTypes} = require('sequelize')
 const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
  }
   //'edostavka','root','root',{host:'localhost',dialect:'mysql'}
)
const primaryKey = ()=>{
  return {
    type:DataTypes.BIGINT,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  }
}
const getForeignKey = (key)=>{
  return {allowNull:false,name:key}
}
const options = {
  freezeTableName:true,
  timestamps:false
}

export const Role = sequelize.define('user_role', {
  idRole: primaryKey(),
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, options)
export const User = sequelize.define('user',{
  idUser:primaryKey(),
  name:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  surname:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  middleName:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  phoneNumber:{
    type:DataTypes.STRING(150),
    allowNull:false,
    unique:true
  },
  password:{
    type:DataTypes.STRING(150),
    allowNull:false
  }
},options)
export const FeedBack = sequelize.define('feedback',{
    idFeedBack:primaryKey(),
  commentary:{
      type:DataTypes.STRING,
      allowNull:false
  }
},options)
export const OrderAddress = sequelize.define('order_address',{
  idAddress:primaryKey(),
  contry: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city:{
    type:DataTypes.STRING,
    allowNull:false
  },
  street:{
    type:DataTypes.STRING,
    allowNull:false
  },
  building:{
    type:DataTypes.STRING,
    allowNull:false
  }
},options)
export const Category = sequelize.define('categories',{
  idCategory:primaryKey(),
  title:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true,
  }
},options)
export const Product = sequelize.define('product',{
  idProduct:primaryKey(),
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },
  raiting:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false
  },
  count:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  link:{
    type:DataTypes.STRING,
    allowNull:false
  }
},options)
export const InnerDocument = sequelize.define('inner_document',{
  idDocument:primaryKey(),
  path:{
    type:DataTypes.STRING,
    allowNull:false,
  }
},options)
export const FavoriteProduct = sequelize.define('favorite_product',{
  idFavProduct:primaryKey(),
  commentary:{
    type:DataTypes.STRING,
    allowNull:false
  },
},options)
export const FeedBackProduct = sequelize.define('feedback_product',{
  idFeedProduct:primaryKey(),
  commentary:{
    type:DataTypes.STRING,
    allowNull:false
  },
  mark:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  datePublication:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull:false
  },
},options)
export const Order = sequelize.define('user_order',{
  idOrder:primaryKey(),
  createdDate:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull:false
  },
  orderPrice:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  commentary:{
    type:DataTypes.STRING,
    allowNull:false
  }
},options)
export const Promocode = sequelize.define('promocode',{
  idPromocode:primaryKey(),
  code:{
    type:DataTypes.STRING(7),
    allowNull:false,
    unique:true
  }
},options)
export const DeliveryStatus = sequelize.define('delivery_status',{
  idStatus:primaryKey(),
  title:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  }
},options)
export const DeliveryVariaty = sequelize.define('delivery_variaty',{
  idDelivery:primaryKey(),
  title:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false
  }
},options)
export const PaymentVariaty = sequelize.define('payment_variaty',{
  idPayment:primaryKey(),
  title:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  }
},options)

Role.hasMany(User,{
  foreignKey:getForeignKey('roleId')
})
User.belongsTo(Role,{
  foreignKey:getForeignKey('roleId')
})
User.hasMany(FeedBack,{
  foreignKey:getForeignKey('userId')
})
FeedBack.belongsTo(User,{
  foreignKey:getForeignKey('userId')
})
User.hasMany(OrderAddress,{
  foreignKey:getForeignKey('userId')
})
OrderAddress.belongsTo(User,{
  foreignKey:getForeignKey('userId')
})
Category.hasMany(Product,{
  foreignKey:getForeignKey('categoryId')
})
Product.belongsTo(Category,{
  foreignKey:getForeignKey('categoryId')
})
Product.hasMany(InnerDocument,{
  foreignKey:getForeignKey('productId')
})
InnerDocument.belongsTo(Product,{
  foreignKey:getForeignKey('productId')
})
FavoriteProduct.belongsTo(Product,{
  foreignKey:getForeignKey('productId')
})
FavoriteProduct.belongsTo(User,{
  foreignKey:getForeignKey('userId')
})
User.hasMany(FavoriteProduct,{
  foreignKey:getForeignKey('userId')
})
Product.hasMany(FavoriteProduct,{
  foreignKey:getForeignKey('productId')
})
FeedBackProduct.belongsTo(Product,{
  foreignKey:getForeignKey('productId')
})
FeedBackProduct.belongsTo(User,{
  foreignKey:getForeignKey('userId')
})
User.hasMany(FeedBack,{
  foreignKey:getForeignKey('userId')
})
Product.hasMany(FeedBack,{
  foreignKey:getForeignKey('userId')
})

User.hasMany(Order,{
  foreignKey:getForeignKey('userId')
})
Promocode.hasMany(Order,{
  foreignKey:{
    name:'promoId'
  }
})
DeliveryStatus.hasMany(Order,{
  foreignKey:getForeignKey('statusId')
})
DeliveryVariaty.hasMany(Order,{
  foreignKey:getForeignKey('deliveryId')
})
PaymentVariaty.hasMany(Order,{
  foreignKey:getForeignKey('paymentId')
})
Order.belongsTo(User,{
  foreignKey:getForeignKey('userId')
})
Order.belongsTo(Promocode,{
  foreignKey:{
    name:'promoId'
  }
})
Order.belongsTo(DeliveryStatus,{
  foreignKey:getForeignKey('statusId')
})
Order.belongsTo(DeliveryVariaty,{
  foreignKey:getForeignKey('deliveryId')
})
Order.belongsTo(PaymentVariaty,{
  foreignKey:getForeignKey('paymentId')
})





sequelize.authenticate().then(()=>{
  console.log('Connection to database was successfully')
}).catch((e)=>{
  console.log('Connection to database was lost = '+e)
})

sequelize.sync().then(()=>{
  console.log('tables was created')
}).catch(e=>{
  console.log('when be creating table something was wrong = '+ e)
})
//export default sequelize;


