"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentVariaty = exports.DeliveryVariaty = exports.DeliveryStatus = exports.Promocode = exports.Order = exports.FeedBackProduct = exports.FavoriteProduct = exports.InnerDocument = exports.Product = exports.Category = exports.OrderAddress = exports.FeedBack = exports.User = exports.Role = void 0;
const dbConfig = require('./db.config');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
}
//'edostavka','root','root',{host:'localhost',dialect:'mysql'}
);
const primaryKey = () => {
    return {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    };
};
const getForeignKey = (key) => {
    return { allowNull: false, name: key };
};
const options = {
    freezeTableName: true,
    timestamps: false
};
exports.Role = sequelize.define('user_role', {
    idRole: primaryKey(),
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, options);
exports.User = sequelize.define('user', {
    idUser: primaryKey(),
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, options);
exports.FeedBack = sequelize.define('feedback', {
    idFeedBack: primaryKey(),
    commentary: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, options);
exports.OrderAddress = sequelize.define('order_address', {
    idAddress: primaryKey(),
    contry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    building: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, options);
exports.Category = sequelize.define('categories', {
    idCategory: primaryKey(),
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, options);
exports.Product = sequelize.define('product', {
    idProduct: primaryKey(),
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raiting: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, options);
exports.InnerDocument = sequelize.define('inner_document', {
    idDocument: primaryKey(),
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, options);
exports.FavoriteProduct = sequelize.define('favorite_product', {
    idFavProduct: primaryKey(),
    commentary: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, options);
exports.FeedBackProduct = sequelize.define('feedback_product', {
    idFeedProduct: primaryKey(),
    commentary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mark: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    datePublication: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, options);
exports.Order = sequelize.define('user_order', {
    idOrder: primaryKey(),
    createdDate: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    orderPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    commentary: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, options);
exports.Promocode = sequelize.define('promocode', {
    idPromocode: primaryKey(),
    code: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true
    }
}, options);
exports.DeliveryStatus = sequelize.define('delivery_status', {
    idStatus: primaryKey(),
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, options);
exports.DeliveryVariaty = sequelize.define('delivery_variaty', {
    idDelivery: primaryKey(),
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, options);
exports.PaymentVariaty = sequelize.define('payment_variaty', {
    idPayment: primaryKey(),
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, options);
exports.Role.hasMany(exports.User, {
    foreignKey: getForeignKey('roleId')
});
exports.User.belongsTo(exports.Role, {
    foreignKey: getForeignKey('roleId')
});
exports.User.hasMany(exports.FeedBack, {
    foreignKey: getForeignKey('userId')
});
exports.FeedBack.belongsTo(exports.User, {
    foreignKey: getForeignKey('userId')
});
exports.User.hasMany(exports.OrderAddress, {
    foreignKey: getForeignKey('userId')
});
exports.OrderAddress.belongsTo(exports.User, {
    foreignKey: getForeignKey('userId')
});
exports.Category.hasMany(exports.Product, {
    foreignKey: getForeignKey('categoryId')
});
exports.Product.belongsTo(exports.Category, {
    foreignKey: getForeignKey('categoryId')
});
exports.Product.hasMany(exports.InnerDocument, {
    foreignKey: getForeignKey('productId')
});
exports.InnerDocument.belongsTo(exports.Product, {
    foreignKey: getForeignKey('productId')
});
exports.FavoriteProduct.belongsTo(exports.Product, {
    foreignKey: getForeignKey('productId')
});
exports.FavoriteProduct.belongsTo(exports.User, {
    foreignKey: getForeignKey('userId')
});
exports.User.hasMany(exports.FavoriteProduct, {
    foreignKey: getForeignKey('userId')
});
exports.Product.hasMany(exports.FavoriteProduct, {
    foreignKey: getForeignKey('productId')
});
exports.FeedBackProduct.belongsTo(exports.Product, {
    foreignKey: getForeignKey('productId')
});
exports.FeedBackProduct.belongsTo(exports.User, {
    foreignKey: getForeignKey('userId')
});
exports.User.hasMany(exports.FeedBack, {
    foreignKey: getForeignKey('userId')
});
exports.Product.hasMany(exports.FeedBack, {
    foreignKey: getForeignKey('userId')
});
exports.User.hasMany(exports.Order, {
    foreignKey: getForeignKey('userId')
});
exports.Promocode.hasMany(exports.Order, {
    foreignKey: {
        name: 'promoId'
    }
});
exports.DeliveryStatus.hasMany(exports.Order, {
    foreignKey: getForeignKey('statusId')
});
exports.DeliveryVariaty.hasMany(exports.Order, {
    foreignKey: getForeignKey('deliveryId')
});
exports.PaymentVariaty.hasMany(exports.Order, {
    foreignKey: getForeignKey('paymentId')
});
exports.Order.belongsTo(exports.User, {
    foreignKey: getForeignKey('userId')
});
exports.Order.belongsTo(exports.Promocode, {
    foreignKey: {
        name: 'promoId'
    }
});
exports.Order.belongsTo(exports.DeliveryStatus, {
    foreignKey: getForeignKey('statusId')
});
exports.Order.belongsTo(exports.DeliveryVariaty, {
    foreignKey: getForeignKey('deliveryId')
});
exports.Order.belongsTo(exports.PaymentVariaty, {
    foreignKey: getForeignKey('paymentId')
});
sequelize.authenticate().then(() => {
    console.log('Connection to database was successfully');
}).catch((e) => {
    console.log('Connection to database was lost = ' + e);
});
sequelize.sync().then(() => {
    console.log('tables was created');
}).catch(e => {
    console.log('when be creating table something was wrong = ' + e);
});
//export default sequelize;
//# sourceMappingURL=database.database.js.map